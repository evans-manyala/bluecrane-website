from sqlalchemy.orm import Session
from . import models, schemas

# --- Services ---
def get_services(db: Session):
    return db.query(models.Service).order_by(models.Service.created_at.desc()).all()

def create_service(db: Session, data: schemas.ServiceCreate):
    svc = models.Service(
        name=data.name,
        slug=data.slug,
        description=data.description,
        price=data.price,
    )
    db.add(svc)
    db.commit()
    db.refresh(svc)
    return svc

def get_service(db: Session, service_id: int):
    return db.query(models.Service).filter(models.Service.id == service_id).first()

def update_service(db: Session, service_id: int, data: schemas.ServiceCreate):
    svc = db.query(models.Service).filter(models.Service.id == service_id).first()
    if svc:
        svc.name = data.name
        svc.slug = data.slug
        svc.description = data.description
        svc.price = data.price
        db.commit()
        db.refresh(svc)
    return svc

def delete_service(db: Session, service_id: int):
    svc = db.query(models.Service).filter(models.Service.id == service_id).first()
    if svc:
        db.delete(svc)
        db.commit()
    return svc

# --- Tickets ---
def create_ticket(db: Session, data: schemas.TicketCreate):
    t = models.Ticket(
        name=data.name,
        email=data.email,
        subject=data.subject,
        message=data.message,
        status="open",
    )
    db.add(t)
    db.commit()
    db.refresh(t)
    return t

def get_tickets(db: Session):
    return db.query(models.Ticket).order_by(models.Ticket.created_at.desc()).all()

def get_ticket(db: Session, ticket_id: int):
    return db.query(models.Ticket).filter(models.Ticket.id == ticket_id).first()

def update_ticket(db: Session, ticket_id: int, status: str):
    t = db.query(models.Ticket).filter(models.Ticket.id == ticket_id).first()
    if t:
        t.status = status
        db.commit()
        db.refresh(t)
    return t

def delete_ticket(db: Session, ticket_id: int):
    t = db.query(models.Ticket).filter(models.Ticket.id == ticket_id).first()
    if t:
        db.delete(t)
        db.commit()
    return t

# --- About ---
def get_about(db: Session):
    return db.query(models.About).first()

def update_about(db: Session, data: schemas.AboutCreate):
    about = db.query(models.About).first()
    if not about:
        about = models.About(content=data.content)
        db.add(about)
    else:
        about.content = data.content
    db.commit()
    db.refresh(about)
    return about

# --- Leaders ---
def get_leaders(db: Session):
    return db.query(models.Leader).all()

def create_leader(db: Session, data: schemas.LeaderCreate):
    leader = models.Leader(
        name=data.name,
        photo=data.photo,
        bio=data.bio,
    )
    db.add(leader)
    db.commit()
    db.refresh(leader)
    return leader

def update_leader(db: Session, leader_id: int, data: schemas.LeaderCreate):
    leader = db.query(models.Leader).filter(models.Leader.id == leader_id).first()
    if leader:
        leader.name = data.name
        leader.photo = data.photo
        leader.bio = data.bio
        db.commit()
        db.refresh(leader)
    return leader

def delete_leader(db: Session, leader_id: int):
    leader = db.query(models.Leader).filter(models.Leader.id == leader_id).first()
    if leader:
        db.delete(leader)
        db.commit()
    return leader

# --- Resources ---
def get_resources(db: Session):
    return db.query(models.Resource).all()

def create_resource(db: Session, data: schemas.ResourceCreate):
    resource = models.Resource(
        title=data.title,
        description=data.description,
        type=data.type,
        url=data.url,
    )
    db.add(resource)
    db.commit()
    db.refresh(resource)
    return resource

def update_resource(db: Session, resource_id: int, data: schemas.ResourceCreate):
    resource = db.query(models.Resource).filter(models.Resource.id == resource_id).first()
    if resource:
        resource.title = data.title
        resource.description = data.description
        resource.type = data.type
        resource.url = data.url
        db.commit()
        db.refresh(resource)
    return resource

def delete_resource(db: Session, resource_id: int):
    resource = db.query(models.Resource).filter(models.Resource.id == resource_id).first()
    if resource:
        db.delete(resource)
        db.commit()
    return resource

# --- Partners ---
def get_partners(db: Session):
    return db.query(models.Partner).all()

def create_partner(db: Session, data: schemas.PartnerCreate):
    partner = models.Partner(
        name=data.name,
        logo=data.logo,
        link=data.link,
    )
    db.add(partner)
    db.commit()
    db.refresh(partner)
    return partner

def update_partner(db: Session, partner_id: int, data: schemas.PartnerCreate):
    partner = db.query(models.Partner).filter(models.Partner.id == partner_id).first()
    if partner:
        partner.name = data.name
        partner.logo = data.logo
        partner.link = data.link
        db.commit()
        db.refresh(partner)
    return partner

def delete_partner(db: Session, partner_id: int):
    partner = db.query(models.Partner).filter(models.Partner.id == partner_id).first()
    if partner:
        db.delete(partner)
        db.commit()
    return partner
