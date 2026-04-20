from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from bson import ObjectId
from datetime import datetime
from database import cards_col
from auth import get_current_user

from fastapi.middleware.cors import CORSMiddleware

from routes_auth import router as auth_router

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
def create_card(card: Flashcard, current_user: str = Depends(get_current_user)):
    """Create a new flashcard (protected route)."""
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
    """List all flashcards (public route - no authentication required)."""
    docs = cards_col.find()
    return [serialize(d) for d in docs]

@app.get("/flashcards/{card_id}")
def get_card(card_id: str):
    """Get a single flashcard (public route - no authentication required)."""
    doc = cards_col.find_one({"_id": ObjectId(card_id)})
    if not doc:
        raise HTTPException(404, "Card not found")
    return serialize(doc)

@app.put("/flashcards/{card_id}")
def update_card(card_id: str, card: Flashcard):
    """Update a flashcard (public route - status can be updated without login)."""
    result = cards_col.update_one(
        {"_id": ObjectId(card_id)},
        {"$set": {"question": card.question, "answer": card.answer, "status": card.status}}
    )
    if result.matched_count == 0:
        raise HTTPException(404, "Card not found")
    updated = cards_col.find_one({"_id": ObjectId(card_id)})
    return serialize(updated)

@app.delete("/flashcards/{card_id}")
def delete_card(card_id: str, current_user: str = Depends(get_current_user)):
    """Delete a flashcard (protected route)."""
    result = cards_col.delete_one({"_id": ObjectId(card_id)})
    if result.deleted_count == 0:
        raise HTTPException(404, "Card not found")
    return {"status": "deleted"}

# Include routers
app.include_router(auth_router)