import os
from urllib.parse import quote_plus

DB_HOST = os.getenv("DB_HOST", "db")
DB_PORT = int(os.getenv("DB_PORT", "3306"))
DB_NAME = os.getenv("DB_NAME", "it_service")
DB_USER = os.getenv("DB_USER", "Tobyman")
DB_PASS = os.getenv("DB_PASS", "test@##w0rd")
CORS_ORIGINS = [o.strip() for o in os.getenv("CORS_ORIGINS", "*").split(",")]

USER_ENC = quote_plus(DB_USER)
PASS_ENC = quote_plus(DB_PASS)

DATABASE_URL = (
    f"mysql+pymysql://{USER_ENC}:{PASS_ENC}@{DB_HOST}:{DB_PORT}/{DB_NAME}?charset=utf8mb4"
)
#CORS_ORIGINS = [o.strip() for o in os.getenv("CORS_ORIGINS", "*").split(",")]
#DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}?charset=utf8mb4"

# Admin auth (for CMS)
ADMIN_USER = os.getenv("ADMIN_USER", "admin")
ADMIN_PASS = os.getenv("ADMIN_PASS", "test@##w0rd")
JWT_SECRET = os.getenv("JWT_SECRET", "test@##w0rd")
JWT_EXPIRE_MIN = int(os.getenv("JWT_EXPIRE_MIN", "240"))  # 4 hours default
