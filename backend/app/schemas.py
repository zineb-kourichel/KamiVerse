from pydantic import BaseModel

class KamiCreate(BaseModel):
    name: str
    title: str
    description: str
    symbol: str
    domain: str
    myth: str
    shrine: str
    image_url: str


class KamiResponse(KamiCreate):
    id: int

    class Config:
        from_attributes = True