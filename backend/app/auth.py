from typing import Optional
from fastapi import Header, HTTPException, status, Cookie
import jwt
from .config import JWT_SECRET, JWT_EXPIRE_MIN, ADMIN_USER, ADMIN_PASS
from datetime import datetime, timedelta, timezone

def create_token() -> str:
    now = datetime.now(timezone.utc)
    payload = {
        "sub": ADMIN_USER,
        "iat": int(now.timestamp()),
        "exp": int((now + timedelta(minutes=JWT_EXPIRE_MIN)).timestamp()),
        "scope": "admin",
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")

# ✅ look for the standard Authorization header; also accept a cookie named `token`
def verify_token(
    authorization: Optional[str] = Header(None, alias="Authorization"),
    token_cookie: Optional[str] = Cookie(None, alias="token"),
):
    token = None
    if authorization:
        parts = authorization.split(" ", 1)
        token = parts[1] if len(parts) == 2 else parts[0]  # supports "Bearer <jwt>" or "<jwt>"
    if not token and token_cookie:
        token = token_cookie

    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing token")

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
