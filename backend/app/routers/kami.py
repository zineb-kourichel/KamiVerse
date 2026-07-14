from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/kami",
    tags=["Kami"]
)

@router.get("/", response_model=list[schemas.KamiResponse])
def get_all_kami(db: Session = Depends(get_db)):
    return db.query(models.Kami).all()

@router.get("/{kami_id}", response_model=schemas.KamiResponse)
def get_kami(kami_id: int, db: Session = Depends(get_db)):
    kami = db.query(models.Kami).filter(models.Kami.id == kami_id).first()
    if not kami:
        raise HTTPException(status_code=404, detail="Kami not found")
    return kami

@router.post("/", response_model=schemas.KamiResponse)
def create_kami(kami: schemas.KamiCreate, db: Session = Depends(get_db)):
    new_kami = models.Kami(**kami.model_dump())
    db.add(new_kami)
    db.commit()
    db.refresh(new_kami)
    return new_kami