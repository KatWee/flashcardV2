import './App.css';
import React, { useEffect, useState } from 'react';

import MenuAppBar from "./components/AppBar";
import SearchBar from "./components/SearchBar";
import CreateButton from "./components/CreateButton";
import Box from "@mui/material/Box";
import Modal from "./components/CardModal";
import Card from "./components/Card";

function App() {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState(null);
  const [editingCardId, setEditingCardId] = useState(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/flashcards")
      .then((res) => res.json())
      .then((data) => setCards(data))
      .catch((err) => console.error(err));
  }, []);


  const handleOpen = () => {
    setAction('create');
    setEditingCardId(null);
    setNewQuestion('');
    setNewAnswer('');
    setOpen(true);
  };

  const handleEdit = (card) => {
    setAction('edit');
    setEditingCardId(card.id);
    setNewQuestion(card.question);
    setNewAnswer(card.answer);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAction(null);
    setEditingCardId(null);
    setNewQuestion('');
    setNewAnswer('');
  };

  const createCard = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: newQuestion,
          answer: newAnswer,
          status: false,
        }),
      });

      if (!res.ok) {
        throw new Error(`Create failed: ${res.status}`);
      }

      const data = await res.json();
      setCards((prev) => [...prev, data]);
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  const updateCard = async () => {
    if (!editingCardId) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/flashcards/${editingCardId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: newQuestion,
          answer: newAnswer,
          status: false,
        }),
      });

      if (!res.ok) {
        throw new Error(`Update failed: ${res.status}`);
      }

      const data = await res.json();
      setCards((prev) => prev.map((card) => (card.id === editingCardId ? data : card)));
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCard = async (cardId) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/flashcards/${cardId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error(`Delete failed: ${res.status}`);
      }

      setCards((prev) => prev.filter((card) => card.id !== cardId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <MenuAppBar />
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 4, px: 2 }}>
        <CreateButton onClick={handleOpen} />
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <SearchBar />
        </Box>
      </Box>
      <Modal
        open={open}
        handleClose={handleClose}
        action={action}
        question={newQuestion}
        answer={newAnswer}
        onQuestionChange={setNewQuestion}
        onAnswerChange={setNewAnswer}
        onSave={action === 'create' ? createCard : updateCard}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Box sx={{ width: '80%' }}>
          <Card cards={cards} onEdit={handleEdit} onDelete={deleteCard} />
        </Box>
      </Box>
      
    </div>
  )
}

export default App
