from sqlalchemy import Column, Integer, String, Text
from .database import Base

class Kami(Base):
    __tablename__ = "kami"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    title = Column(String)
    description = Column(Text)
    symbol = Column(String)
    domain = Column(String)
    myth = Column(Text)
    shrine = Column(String)
    image_url = Column(String)