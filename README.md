# 神 KamiVerse

An interactive guide to Shinto mythology — explore the kami (spirits and deities) of Japanese folklore, learn their myths, and find out which one matches your personality.

## Features

- **Explore Kami** — browse a curated pantheon of Shinto deities, each with real mythology, symbols, associated shrines, and artwork
- **Kami Detail Pages** — deep dive into each kami's myth, domain, and shrine
- **Which Kami Are You?** — an interactive quiz that matches you to a kami based on your answers
- Japanese-inspired design throughout: hanko-style seals, ema plaque cards, and kanji watermarks

## Tech Stack

**Frontend**
- Angular 21 (standalone components, signals)
- TypeScript

**Backend**
- FastAPI
- SQLAlchemy + SQLite

## Project Structure
KamiVerse/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI app entrypoint
│   │   ├── models.py        # SQLAlchemy Kami model
│   │   ├── schemas.py       # Pydantic request/response schemas
│   │   ├── database.py      # DB engine/session setup
│   │   └── routers/
│   │       └── kami.py      # Kami API endpoints
│   ├── seed.py               # Seeds the database with Kami data
│   ├── update_kami.py        # Updates/repairs Kami data and images
│   └── requirements.txt
│
└── frontend/
└── src/app/
├── pages/
│   ├── home/          # Landing page
│   ├── kami-list/     # All Kami grid view
│   ├── kami-detail/   # Single Kami detail page
│   └── quiz/          # Which Kami Are You? quiz
├── shared/
│   ├── navbar/
│   └── footer/
├── services/
│   └── kami.ts        # API service
└── models/
└── kami.model.ts  # KamiData interface

## Getting Started

### Prerequisites
- Python 3.10+
- Node.js + npm
- Angular CLI (`npm install -g @angular/cli`)

### Backend Setup

```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python seed.py
uvicorn app.main:app --reload
```

The API will run at `http://127.0.0.1:8000`. Interactive docs available at `http://127.0.0.1:8000/docs`.

### Frontend Setup

In a separate terminal:

```powershell
cd frontend
npm install
ng serve
```

The app will run at `http://localhost:4200`.

**Both servers must be running simultaneously** for the app to work.

## API Endpoints

| Method | Endpoint         | Description               |
|--------|------------------|----------------------------|
| GET    | `/kami/`         | List all Kami             |
| GET    | `/kami/{id}`     | Get a single Kami by ID    |
| POST   | `/kami/`         | Create a new Kami          |

## License

This project is for educational purposes
