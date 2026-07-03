from sqlalchemy.orm import Session
from .models import Kami


def create_kami(db: Session, kami):
    db_kami = Kami(**kami.model_dump())
    db.add(db_kami)
    db.commit()
    db.refresh(db_kami)
    return db_kami


def get_kami(db: Session):
    return db.query(Kami).all()