from app.database import SessionLocal, engine, Base
from app import models

Base.metadata.create_all(bind=engine)

db = SessionLocal()

kami_data = [
    {
        "name": "Amaterasu",
        "title": "Goddess of the Sun",
        "description": "The most revered deity in Shinto, ruler of the heavens and ancestress of the Japanese imperial line.",
        "symbol": "The sun, the sacred mirror (Yata no Kagami)",
        "domain": "Sun, light, the universe",
        "myth": "When her brother Susanoo's violent behavior drove her to hide in a cave, the world fell into darkness. The other kami lured her out with music, dance, and a mirror, restoring light to the world.",
        "shrine": "Ise Grand Shrine (Ise Jingu)",
        "image_url": ""
    },
    {
        "name": "Susanoo",
        "title": "God of Storms and the Sea",
        "description": "A powerful and impulsive kami, brother to Amaterasu, known for both destructive storms and heroic deeds.",
        "symbol": "The sword Kusanagi",
        "domain": "Storms, sea, wind",
        "myth": "After being exiled from heaven for his misbehavior, Susanoo slew the eight-headed serpent Yamata no Orochi to save a maiden, discovering the legendary sword Kusanagi in its tail.",
        "shrine": "Yaegaki Shrine",
        "image_url": ""
    },
    {
        "name": "Tsukuyomi",
        "title": "God of the Moon",
        "description": "A quiet, mysterious kami associated with the night sky, often overshadowed by his siblings Amaterasu and Susanoo.",
        "symbol": "The moon",
        "domain": "Moon, night, time",
        "myth": "Tsukuyomi killed the food goddess Uke Mochi in disgust at how she produced food, an act that so angered Amaterasu she refused to share the sky with him — explaining why sun and moon are never seen together.",
        "shrine": "Tsukiyomi Shrine, Kyoto",
        "image_url": ""
    },
    {
        "name": "Izanagi",
        "title": "Creator God",
        "description": "Primordial god who, with his partner Izanami, created the islands of Japan and many other kami.",
        "symbol": "The jeweled spear",
        "domain": "Creation, life",
        "myth": "Izanagi and Izanami stirred the ocean with a jeweled spear, and the droplets that fell formed the first islands of Japan.",
        "shrine": "Izanagi Shrine, Awaji Island",
        "image_url": ""
    },
    {
        "name": "Izanami",
        "title": "Creator Goddess",
        "description": "Partner of Izanagi and mother of many kami, later became goddess of the underworld (Yomi) after her death.",
        "symbol": "The underworld gate",
        "domain": "Creation, death",
        "myth": "Izanami died giving birth to the fire god and became ruler of Yomi, the land of the dead, after Izanagi's failed attempt to bring her back to the living world.",
        "shrine": "Izanami Shrine, Matsue",
        "image_url": ""
    },
    {
        "name": "Inari",
        "title": "Deity of Rice, Prosperity, and Foxes",
        "description": "One of the most widely worshipped kami in Japan, associated with agriculture, business success, and fertility.",
        "symbol": "The fox (kitsune)",
        "domain": "Rice, harvest, prosperity",
        "myth": "Inari's messengers, the kitsune, are said to guard rice fields and homes, and thousands of vermilion torii gates lead up the mountain at Fushimi Inari in offering.",
        "shrine": "Fushimi Inari Taisha, Kyoto",
        "image_url": ""
    },
    {
        "name": "Hachiman",
        "title": "God of War and Divine Protector",
        "description": "Guardian deity of Japan and the samurai class, later associated with protection of the nation.",
        "symbol": "The dove",
        "domain": "War, archery, protection",
        "myth": "Hachiman was historically linked to Emperor Ojin and came to be seen as a protector of warriors, with shrines built by samurai clans seeking his blessing before battle.",
        "shrine": "Usa Jingu, Oita",
        "image_url": ""
    },
    {
        "name": "Raijin",
        "title": "God of Thunder and Lightning",
        "description": "A fierce-looking kami often depicted surrounded by drums that create thunder, frequently paired with Fujin.",
        "symbol": "Thunder drums (taiko)",
        "domain": "Thunder, lightning, storms",
        "myth": "Raijin is said to strike his drums to create thunder, and is often shown alongside Fujin, the wind god, guarding temple gates as protective figures.",
        "shrine": "Sensoji Temple gate depictions, Tokyo",
        "image_url": ""
    },
    {
        "name": "Fujin",
        "title": "God of Wind",
        "description": "One of the oldest Shinto deities, often depicted carrying a large bag of winds over his shoulders.",
        "symbol": "The wind bag",
        "domain": "Wind, air",
        "myth": "Fujin is said to have been present at the creation of the world, releasing the winds from his bag to clear the mists and let the sunlight through.",
        "shrine": "Sensoji Temple gate depictions, Tokyo",
        "image_url": ""
    },
    {
        "name": "Ebisu",
        "title": "God of Fishermen and Good Fortune",
        "description": "One of the Seven Lucky Gods, patron of fishermen, luck, and prosperity in business.",
        "symbol": "The fishing rod and sea bream",
        "domain": "Fishing, commerce, luck",
        "myth": "Often depicted smiling with a fishing rod and a large red sea bream, Ebisu is one of the few Shinto-native deities among the Seven Lucky Gods.",
        "shrine": "Nishinomiya Shrine",
        "image_url": ""
    }
]

for kami in kami_data:
    existing = db.query(models.Kami).filter(models.Kami.name == kami["name"]).first()
    if not existing:
        db.add(models.Kami(**kami))

db.commit()
db.close()
print("Database seeded successfully!")