from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class ServiceBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    slug: str = Field(..., min_length=2, max_length=140)
    description: str = Field(..., min_length=10)
    price: float = 0.0

class ServiceCreate(ServiceBase):
    pass

class ServiceOut(ServiceBase):
    id: int
    class Config:
        from_attributes = True

class TicketCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    subject: str = Field(..., min_length=2, max_length=200)
    message: str = Field(..., min_length=5)

class TicketOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    subject: str
    message: str
    status: str
    class Config:
        from_attributes = True

# --- New Schemas Below ---

class AboutBase(BaseModel):
    content: str

class AboutCreate(AboutBase):
    pass

class AboutOut(AboutBase):
    id: int
    class Config:
        from_attributes = True

class LeaderBase(BaseModel):
    name: str
    photo: Optional[str]
    bio: Optional[str]

class LeaderCreate(LeaderBase):
    pass

class LeaderOut(LeaderBase):
    id: int
    class Config:
        from_attributes = True

class ResourceBase(BaseModel):
    title: str
    description: Optional[str]
    type: str
    url: str

class ResourceCreate(ResourceBase):
    pass

class ResourceOut(ResourceBase):
    id: int
    class Config:
        from_attributes = True

class PartnerBase(BaseModel):
    name: str
    logo: Optional[str]
    link: Optional[str]

class PartnerCreate(PartnerBase):
    pass

class PartnerOut(PartnerBase):
    id: int
    class Config:
        from_attributes = True