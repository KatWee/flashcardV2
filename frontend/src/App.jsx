import './App.css';
import React, { useEffect, useState } from 'react';

import MenuAppBar from "./components/AppBar";
import SearchBar from "./components/SearchBar";
import CreateButton from "./components/CreateButton";
import Box from "@mui/material/Box";
import Modal from "./components/CardModal";
import Card from "./components/Card";

function App() {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const LOGIN_URL = "http://127.0.0.1:8000/token";

  const handleLogin = async (credentials) => {
    try {
      const formData = new FormData();
      formData.append("username", credentials.username);
      formData.append("password", credentials.password);

      const res = await fetch(LOGIN_URL, {
        method: "POST",
        body: formData,
      });

      console.log("Response received:", res.status, res.statusText); //debug

      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        console.error("JSON parse error:", jsonErr); //debug
        alert("Server returned invalid response");
        return;
      }

      console.log("Login response:", res.status, data); //debug
      if (res.ok) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("username", credentials.username);

        setToken(data.access_token);
        setUsername(credentials.username);
        setOpen(false); // Close modal on successful login
      } else {
        alert(data.detail || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err); //debug
      console.error("Error message:", err.message); //debug
      alert("Server error: " + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    setUsername(null);
  };

  const fetchFlashcards = async () => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await fetch("http://127.0.0.1:8000/flashcards", {
        headers,
      });

      if (res.status === 401) {
        handleLogout();
        return;
      }

      const data = await res.json();
      setCards(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const [open, setOpen] = useState(false);
  const [action, setAction] = useState(null);
  const [editingCardId, setEditingCardId] = useState(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [cards, setCards] = useState([]);
  const [searchKeyword, setsearchKeyword] = useState('');

  // Fetch flashcards on initial load and when token changes
  useEffect(() => {
    fetchFlashcards();
  }, [token]);

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

  const handleSearchChange = (event) => {
    setsearchKeyword(event.target.value);
  };

  const createCard = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          question: newQuestion,
          answer: newAnswer,
          status: false,
        }),
      });

      if (res.status === 401) {
        handleLogout();
        return;
      }

      if (!res.ok) {
        throw new Error(`Create failed: ${res.status}`);
      }

      const data = await res.json();
      setCards((prev) => [...prev, data]);
      handleClose();
    } catch (err) {
      console.error("Create error:", err);
    }
  };

  const updateCard = async () => {
    if (!editingCardId) return;

    const EditingCard = cards.find((card) => card.id === editingCardId);

    try {
      const res = await fetch(`http://127.0.0.1:8000/flashcards/${editingCardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          question: newQuestion,
          answer: newAnswer,
          status: EditingCard.status,
        }),
      });

      if (res.status === 401) {
        handleLogout();
        return;
      }

      if (!res.ok) {
        throw new Error(`Update failed: ${res.status}`);
      }

      const data = await res.json();
      setCards((prev) => prev.map((card) => (card.id === editingCardId ? data : card)));
      handleClose();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const deleteCard = async (cardId) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/flashcards/${cardId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        handleLogout();
        return;
      }

      if (!res.ok) {
        throw new Error(`Delete failed: ${res.status}`);
      }

      setCards((prev) => prev.filter((card) => card.id !== cardId));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const updateCardStatus = async (card) => {
    if (!card?.id) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/flashcards/${card.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: card.question,
          answer: card.answer,
          status: !card.status,
        }),
      });

      if (!res.ok) {
        throw new Error(`Status update failed: ${res.status}`);
      }

      const data = await res.json();
      setCards((prev) => prev.map((existing) => (existing.id === card.id ? data : existing)));
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  return (
    <div>
      <MenuAppBar onLogin={handleLogin} onLogout={handleLogout} isAuthenticated={!!token} username={username} />
      
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 4, px: 2 }}>
          {token && (<CreateButton onClick={handleOpen} />)}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <SearchBar value={searchKeyword} onChange={handleSearchChange} />
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
              <Card
                cards={cards.filter(
                  (card) =>
                    !card.status &&
                    card.question.toLowerCase().includes(searchKeyword.toLowerCase())
                )}
                onEdit={handleEdit}
                onDelete={deleteCard}
                onChangeStatus={updateCardStatus}
                token={token}
              />
            </Box>
          </Box>

          {token && (
            <>
              <hr style={{ width: '80%', marginTop: '2em', marginBottom: '2em' }}/>
              <h2>Archived Cards</h2>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Box sx={{ width: '80%' }}>
                  <Card cards={cards.filter(card => card.status)} onEdit={handleEdit} onDelete={deleteCard} onChangeStatus={updateCardStatus} token={token} />
                </Box>
              </Box>
            </>  
          )}

          
    </div>
  )
}

export default App