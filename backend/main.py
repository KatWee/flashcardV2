from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from bson import ObjectId
from datetime import datetime
from database import cards_col

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Flashcard(BaseModel):
    question: str
    answer: str
    status: bool

def serialize(doc):
    return {
        "id": str(doc["_id"]),
        "question": doc["question"],
        "answer": doc["answer"],
        "status": doc["status"],
        "created_at": doc["created_at"]
    }

@app.post("/flashcards")
def create_card(card: Flashcard):
    card.status = False

    doc = {
        "question": card.question,
        "answer": card.answer,
        "status": card.status,
        "created_at": datetime.utcnow()
    }
    result = cards_col.insert_one(doc)
    doc["_id"] = result.inserted_id
    return serialize(doc)

@app.get("/flashcards")
def list_cards():
    docs = cards_col.find()
    return [serialize(d) for d in docs]

@app.get("/flashcards/{card_id}")
def get_card(card_id: str):
    doc = cards_col.find_one({"_id": ObjectId(card_id)})
    if not doc:
        raise HTTPException(404, "Card not found")
    return serialize(doc)

@app.put("/flashcards/{card_id}")
def update_card(card_id: str, card: Flashcard):
    result = cards_col.update_one(
        {"_id": ObjectId(card_id)},
        {"$set": {"question": card.question, "answer": card.answer, "status": card.status}}
    )
    if result.matched_count == 0:
        raise HTTPException(404, "Card not found")
    updated = cards_col.find_one({"_id": ObjectId(card_id)})
    return serialize(updated)

@app.delete("/flashcards/{card_id}")
def delete_card(card_id: str):
    result = cards_col.delete_one({"_id": ObjectId(card_id)})
    if result.deleted_count == 0:
        raise HTTPException(404, "Card not found")
    return {"status": "deleted"}