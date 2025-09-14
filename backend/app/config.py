import os
from urllib.parse import quote_plus

DB_HOST = os.getenv("DB_HOST", "db")
DB_PORT = int(os.getenv("DB_PORT", "3306"))
DB_NAME = os.getenv("DB_NAME", "it_service")
DB_USER = os.getenv("DB_USER", "it_user")
DB_PASS = os.getenv("DB_PASS", "it_password")
CORS_ORIGINS = [o.strip() for o in os.getenv("CORS_ORIGINS", "*").split(",")]

USER_ENC = quote_plus(DB_USER)
PASS_ENC = quote_plus(DB_PASS)

DATABASE_URL = (
    f"mysql+pymysql://{USER_ENC}:{PASS_ENC}@{DB_HOST}:{DB_PORT}/{DB_NAME}?charset=utf8mb4"
)

ADMIN_USER = os.getenv("ADMIN_USER", "admin")
ADMIN_PASS = os.getenv("ADMIN_PASS", "change-me")
JWT_SECRET = os.getenv("JWT_SECRET", "change-this-secret")
JWT_EXPIRE_MIN = int(os.getenv("JWT_EXPIRE_MIN", "240"))
