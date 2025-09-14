from sqlalchemy import Column, Integer, String, Text, DateTime, func, Numeric
from .db import Base

class Service(Base):
    __tablename__ = "services"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False, unique=True, index=True)
    slug = Column(String(140), nullable=False, unique=True, index=True)
    description = Column(Text, nullable=False)
    price = Column(Numeric(10,2), nullable=False, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Ticket(Base):
    __tablename__ = "tickets"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    email = Column(String(200), nullable=False, index=True)
    subject = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    status = Column(String(40), nullable=False, default="open")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class About(Base):
    __tablename__ = "about"
    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)

class Leader(Base):
    __tablename__ = "leaders"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    photo = Column(String(255))  # URL or file path
    bio = Column(Text)

class Resource(Base):
    __tablename__ = "resources"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text)
    type = Column(String(50))  # e.g., 'article', 'brochure', 'policy', 'news'
    url = Column(String(255))  # link to file or article

class Partner(Base):
    __tablename__ = "partners"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    logo = Column(String(255))  # URL or file path
    link = Column(String(255))  # Partner website