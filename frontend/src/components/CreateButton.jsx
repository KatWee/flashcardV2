import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';

export default function CreateButtons({ onClick }) {
  return (
    <div>
      <Button variant="contained" onClick={onClick}
        sx={{ backgroundColor: 'var(--primary)', marginLeft: 2 }}
      >
        <AddBoxIcon />New Card
      </Button>
    </div>
  );
}