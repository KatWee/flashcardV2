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

import Modal from "./CardModal";

const cards = [
  {
    id: 1,
    question: 'Plants',
    answer: 'Plants are essential for all life.',
  },
  {
    id: 2,
    question: 'dfasdfsdafdsafdsafsdafdsf',
    answer: 'asdfasfasdfsafsdafsadfsdafsdafsdfsdafsdfsdfsdafsdafsadfsdfasiuruqwoiuerwiqurpwquroiuweoir',
  },
  {
    id: 3,
    question: 'Plants',
    answer: 'Plants are essential for all life.',
  },
  {
    id: 4,
    question: 'Plants',
    answer: 'Plants are essential for all life.',
  },
  {
    id: 5,
    question: 'Plants',
    answer: 'Plants are essential for all life.',
  },
];

function CardComponent() {
  const [showAnswers, setShowAnswers] = React.useState({});

  const toggleAnswer = (cardId) => {
    setShowAnswers((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

    const [open, setOpen] = React.useState(false);
    const [action, setAction] = React.useState(null);
    
    const handleOpen = () => {
      setAction('edit');
      setOpen(true);
    };
    
    const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
        gap: 2,
      }}
    >
      {cards.map((card, index) => (
        <Card key={card.id} sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom sx={{fontSize: 20, wordBreak: 'break-word' }}>
                {card.question}
                </Typography>
                <Button size="small" onClick={() => toggleAnswer(card.id)}><VisibilityIcon/>Show Answer</Button>
                {showAnswers[card.id] && (
                  <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                  {card.answer}
                  </Typography>
                )}
            </CardContent>
            <CardActions>
                <Box sx={{display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <Button size="small" onClick={handleOpen}>
                        <EditNoteIcon />
                    </Button>
                    <Button size="small" sx={{ color: '#f44336' }}>
                        <DeleteIcon />
                    </Button>
                </Box>
                
            </CardActions>
        </Card>
      ))}

      <Modal open={open} handleClose={handleClose} action={action}/>
    </Box>
  );
}

export default CardComponent;
