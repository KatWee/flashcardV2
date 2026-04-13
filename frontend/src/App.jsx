import './App.css';
import * as React from 'react';

import MenuAppBar from "./components/AppBar";
import SearchBar from "./components/SearchBar";
import CreateButton from "./components/CreateButton";
import Box from "@mui/material/Box";
import Modal from "./components/CardModal";
import Card from "./components/Card";

function App() {
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState(null);
  
  const handleOpen = () => {
    setAction('create');
    setOpen(true);
  };
  
  const handleClose = () => setOpen(false);

  return (
    <div>
      <MenuAppBar />
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 4, px: 2 }}>
        <CreateButton onClick={handleOpen} />
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <SearchBar />
        </Box>
      </Box>
      <Modal open={open} handleClose={handleClose} action={action}/>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Box sx={{ width: '80%' }}>
          <Card />
        </Box>
      </Box>
      
    </div>
  )
}

export default App
