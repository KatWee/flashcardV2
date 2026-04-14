from pymongo import MongoClient

MONGO_URI = "mongodb://root:root@localhost:27017/?authSource=admin"

client = MongoClient(MONGO_URI)

db = client["flashcard_app"]
cards_col = db["flashcards"]