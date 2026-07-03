from fastapi import FastAPI
from .database import engine, Base
from . import models
from .routers import kami
app = FastAPI(title="KamiVerse API")
app.include_router(kami.router)

Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message": "Welcome to KamiVerse"}