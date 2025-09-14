import time
from fastapi import FastAPI, Depends, HTTPException, status, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
import os
import shutil

from .db import Base, engine, get_db
from . import schemas, crud, models
from .config import CORS_ORIGINS
from .auth import authenticate, verify_token

app = FastAPI(title="IT Tech Service API", version="1.1.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS if CORS_ORIGINS != ["*"] else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def _init_db(max_wait=60):
    start = time.time()
    while True:
        try:
            Base.metadata.create_all(bind=engine)
            break
        except Exception:
            if time.time() - start > max_wait:
                raise
            time.sleep(2)

@app.on_event("startup")
def on_startup():
    _init_db()

@app.get("/api/health")
def health():
    return {"status": "ok"}

# --- File Upload Endpoint ---
UPLOAD_DIR = "../web/frontend/src/assets"

def save_upload_file(upload_file: UploadFile, subdir: str):
    os.makedirs(os.path.join(UPLOAD_DIR, subdir), exist_ok=True)
    file_location = os.path.join(UPLOAD_DIR, subdir, upload_file.filename)
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
    # Return relative path for frontend use
    return f"/src/assets/{subdir}/{upload_file.filename}"

@app.post("/upload/{category}")
async def upload_file(category: str, file: UploadFile = File(...)):
    allowed = ["leaders", "partners", "services", "aboutus", "resources"]
    if category not in allowed:
        return JSONResponse({"error": "Invalid category"}, status_code=400)
    url = save_upload_file(file, category)
    return {"url": url}

# --- Services ---
@app.get("/api/services", response_model=list[schemas.ServiceOut])
def list_services(db: Session = Depends(get_db)):
    return crud.get_services(db)

@app.post("/api/services", response_model=schemas.ServiceOut, status_code=201)
def add_service(payload: schemas.ServiceCreate, db: Session = Depends(get_db), _=Depends(verify_token)):
    existing = db.query(models.Service).filter(
        (models.Service.name == payload.name) | (models.Service.slug == payload.slug)
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Service name or slug already exists")
    return crud.create_service(db, payload)

@app.patch("/api/services/{service_id}", response_model=schemas.ServiceOut)
def update_service(service_id: int, payload: schemas.ServiceCreate, db: Session = Depends(get_db), _=Depends(verify_token)):
    svc = db.query(models.Service).get(service_id)
    if not svc:
        raise HTTPException(status_code=404, detail="Service not found")
    conflict = db.query(models.Service).filter(
        ((models.Service.name == payload.name) | (models.Service.slug == payload.slug)) & (models.Service.id != service_id)
    ).first()
    if conflict:
        raise HTTPException(status_code=400, detail="Service name or slug already exists")
    svc.name = payload.name
    svc.slug = payload.slug
    svc.description = payload.description
    svc.price = payload.price
    db.commit()
    db.refresh(svc)
    return svc

@app.delete("/api/services/{service_id}", status_code=204)
def delete_service(service_id: int, db: Session = Depends(get_db), _=Depends(verify_token)):
    svc = db.query(models.Service).get(service_id)
    if not svc:
        raise HTTPException(status_code=404, detail="Service not found")
    db.delete(svc)
    db.commit()
    return {"ok": True}

# --- Tickets ---
@app.post("/api/tickets", response_model=schemas.TicketOut, status_code=201)
def submit_ticket(payload: schemas.TicketCreate, db: Session = Depends(get_db)):
    return crud.create_ticket(db, payload)

@app.get("/api/tickets", response_model=list[schemas.TicketOut])
def admin_list_tickets(db: Session = Depends(get_db), _=Depends(verify_token)):
    return crud.get_tickets(db)

@app.get("/api/tickets/{ticket_id}", response_model=schemas.TicketOut)
def get_ticket(ticket_id: int, db: Session = Depends(get_db), _=Depends(verify_token)):
    ticket = crud.get_ticket(db, ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket

@app.patch("/api/tickets/{ticket_id}", response_model=schemas.TicketOut)
def update_ticket(ticket_id: int, status: str, db: Session = Depends(get_db), _=Depends(verify_token)):
    ticket = crud.update_ticket(db, ticket_id, status)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket

@app.delete("/api/tickets/{ticket_id}", status_code=204)
def delete_ticket(ticket_id: int, db: Session = Depends(get_db), _=Depends(verify_token)):
    ticket = crud.delete_ticket(db, ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return {"ok": True}

# --- About ---
@app.get("/api/about", response_model=schemas.AboutOut)
def get_about(db: Session = Depends(get_db)):
    about = crud.get_about(db)
    if not about:
        raise HTTPException(status_code=404, detail="About not found")
    return about

@app.put("/api/about", response_model=schemas.AboutOut)
def update_about(payload: schemas.AboutCreate, db: Session = Depends(get_db), _=Depends(verify_token)):
    return crud.update_about(db, payload)

# --- Leaders ---
@app.get("/api/leaders", response_model=list[schemas.LeaderOut])
def get_leaders(db: Session = Depends(get_db)):
    return crud.get_leaders(db)

@app.post("/api/leaders", response_model=schemas.LeaderOut, status_code=201)
def create_leader(payload: schemas.LeaderCreate, db: Session = Depends(get_db), _=Depends(verify_token)):
    return crud.create_leader(db, payload)

@app.patch("/api/leaders/{leader_id}", response_model=schemas.LeaderOut)
def update_leader(leader_id: int, payload: schemas.LeaderCreate, db: Session = Depends(get_db), _=Depends(verify_token)):
    leader = crud.update_leader(db, leader_id, payload)
    if not leader:
        raise HTTPException(status_code=404, detail="Leader not found")
    return leader

@app.delete("/api/leaders/{leader_id}", status_code=204)
def delete_leader(leader_id: int, db: Session = Depends(get_db), _=Depends(verify_token)):
    leader = crud.delete_leader(db, leader_id)
    if not leader:
        raise HTTPException(status_code=404, detail="Leader not found")
    return {"ok": True}

# --- Resources ---
@app.get("/api/resources", response_model=list[schemas.ResourceOut])
def get_resources(db: Session = Depends(get_db)):
    return crud.get_resources(db)

@app.post("/api/resources", response_model=schemas.ResourceOut, status_code=201)
def create_resource(payload: schemas.ResourceCreate, db: Session = Depends(get_db), _=Depends(verify_token)):
    return crud.create_resource(db, payload)

@app.patch("/api/resources/{resource_id}", response_model=schemas.ResourceOut)
def update_resource(resource_id: int, payload: schemas.ResourceCreate, db: Session = Depends(get_db), _=Depends(verify_token)):
    resource = crud.update_resource(db, resource_id, payload)
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")
    return resource

@app.delete("/api/resources/{resource_id}", status_code=204)
def delete_resource(resource_id: int, db: Session = Depends(get_db), _=Depends(verify_token)):
    resource = crud.delete_resource(db, resource_id)
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")
    return {"ok": True}

# --- Partners ---
@app.get("/api/partners", response_model=list[schemas.PartnerOut])
def get_partners(db: Session = Depends(get_db)):
    return crud.get_partners(db)

@app.post("/api/partners", response_model=schemas.PartnerOut, status_code=201)
def create_partner(payload: schemas.PartnerCreate, db: Session = Depends(get_db), _=Depends(verify_token)):
    return crud.create_partner(db, payload)

@app.patch("/api/partners/{partner_id}", response_model=schemas.PartnerOut)
def update_partner(partner_id: int, payload: schemas.PartnerCreate, db: Session = Depends(get_db), _=Depends(verify_token)):
    partner = crud.update_partner(db, partner_id, payload)
    if not partner:
        raise HTTPException(status_code=404, detail="Partner not found")
    return partner

@app.delete("/api/partners/{partner_id}", status_code=204)
def delete_partner(partner_id: int, db: Session = Depends(get_db), _=Depends(verify_token)):
    partner = crud.delete_partner(db, partner_id)
    if not partner:
        raise HTTPException(status_code=404, detail="Partner not found")
    return {"ok": True}

# --- Auth ---
@app.post("/api/auth/login")
def login(creds: dict):
    token = authenticate(creds)
    return {"token": token}