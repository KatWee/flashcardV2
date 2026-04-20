import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';

import TextInput from './TextInput';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

export default function ModalComponent({ open, handleClose, onLogin }) {
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(credentials);
        setCredentials({ username: '', password: '' });
        handleClose();
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                        Welcome to FlashCard Learning App
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextInput 
                            label="Username" 
                            value={credentials.username}
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                        />
                        <TextInput 
                            label="Password" 
                            type="password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        />
                        <Button variant="contained" type="submit"
                            sx={{ backgroundColor: 'var(--primary)', width: '100%', mt: 2 }}
                        >
                            Sign in
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}