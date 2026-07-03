from fastapi import APIRouter

router = APIRouter(
    prefix="/kami",
    tags=["Kami"]
)

@router.get("/")
def get_all_kami():
    return [
        {
            "id": 1,
            "name": "Amaterasu",
            "title": "Sun Goddess"
        },
        {
            "id": 2,
            "name": "Susanoo",
            "title": "Storm God"
        },
        {
            "id": 3,
            "name": "Inari",
            "title": "God/Goddess of Harvest"
        }
    ]