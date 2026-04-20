import * as React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RestoreIcon from '@mui/icons-material/Restore';

function CardComponent({ cards = [], onEdit, onDelete, onChangeStatus, token }) {
  const [showAnswers, setShowAnswers] = React.useState({});

  const toggleAnswer = (cardId) => {
    setShowAnswers((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
        gap: 2,
      }}
    >
      {cards.length > 0 ? (
        cards.map((card) => (
          <Card key={card.id} sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom sx={{ fontSize: 20, wordBreak: 'break-word' }}>
                {card.question}
              </Typography>
              <Button size="small" onClick={() => toggleAnswer(card.id)}>
                {!showAnswers[card.id] ? <VisibilityIcon /> : <VisibilityOffIcon />}
                {!showAnswers[card.id] ? 'Show Answer' : 'Hide Answer' }
              </Button>
              {showAnswers[card.id] && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                    {card.answer} 
                  </Typography>
                  {!card.status && 
                  <Button size="small" onClick={() => onChangeStatus(card)}>
                    <CheckCircleIcon /> Clear
                  </Button>
                  }
                </Box>
              )}
              {card.status && 
                <Button size="small" onClick={() => onChangeStatus(card)}>
                  <RestoreIcon /> Restore
                </Button>
                }
            </CardContent>
            {token && (
                <CardActions>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                  <Button size="small" onClick={() => onEdit(card)}>
                    <EditNoteIcon />
                  </Button>
                  <Button size="small" sx={{ color: '#f44336' }} onClick={() => onDelete(card.id)}>
                    <DeleteIcon />
                  </Button>
                </Box>
              </CardActions>
            )}
            
          </Card>
        ))
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center', width: '100%' }}>
          No flashcards yet.
        </Typography>
      )}

    </Box>
  );
}

export default CardComponent;
