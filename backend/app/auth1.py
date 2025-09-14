from datetime import datetime, timedelta, timezone
from typing import Optional
import jwt
from fastapi import Header, HTTPException, status, Depends
from .config import ADMIN_USER, ADMIN_PASS, JWT_SECRET, JWT_EXPIRE_MIN

def create_token() -> str:
    now = datetime.now(timezone.utc)
    payload = {
        "sub": ADMIN_USER,
        "iat": int(now.timestamp()),
        "exp": int((now + timedelta(minutes=JWT_EXPIRE_MIN)).timestamp()),
        "scope": "admin"
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")

def verify_token(auth_header: Optional[str] = Header(None)):
    if not auth_header or not auth_header.lower().startswith("bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing token")
    token = auth_header.split(" ", 1)[1]
    try:
        decoded = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        if decoded.get("scope") != "admin":
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")
        return decoded
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired")
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

def authenticate(creds: dict) -> str:
    if creds.get("username") == ADMIN_USER and creds.get("password") == ADMIN_PASS:
        return create_token()
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Bad credentials")
