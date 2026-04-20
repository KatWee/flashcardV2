# flashcardV2
UTS 32516 Internet Programming's Assignment

# Project Overview
The FlashCard Learning App is a lightweight, responsive, single‑page application designed to help users study efficiently using digital flashcards. 

The app provides two user experiences:
1. Normal User (No Authentication Required)
- Can view all flashcards
- Can reveal answers
- Can click “Clear” to mark a card as learned (Cleared cards disappear from the main list)

2. Admin User (Authenticated)
- Authentication is handled via JWT tokens
- Can create new flashcards
- Can edit existing flashcards
- Can delete flashcards
- Can view archived cards (cards cleared by normal users)

## Technical Stack

1. Frontend
- React (Vite)
- Material UI (MUI)
- Fetch API
- LocalStorage

2.Backend
- FastAPI
- JWT Authentication 
- bcrypt
- Pydantic
- CORS Middleware

3.Database
- MongoDB

## Folder Structure
```
flashcard-app
│
├── backend
│   ├── main.py                 # FastAPI entry point, routes, CORS
│   ├── auth.py                 # JWT authentication
│   ├── routes_auth.py          # token login endpoint
│   ├── database.py             # MongoDB connection 
│   └── requirements.txt        # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx             # Main logic and API calls
│   │   ├── components/
│   │   │   ├── AppBar.jsx      # Login/logout UI
│   │   │   ├── LoginModal.jsx  # Admin login modal
│   │   │   ├── Card.jsx        # Flashcar
│   │   │   ├── CardModal.jsx   # Create/edit flashcards
│   │   │   ├── SearchBar.jsx   # Live search
│   │   │   └── TextInput.jsx   # Reusable input component
│   │   └── styles/
│   ├── index.html              
│   └── package.json            # Frontend dependencies
│
└── README.md                   
```