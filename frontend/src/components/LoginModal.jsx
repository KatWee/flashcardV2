import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

export default function ModalComponent({ open, handleClose, action }) {
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Welcome to FlashCard Learning App
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <TextInput label="Username" />
                        <TextInput label="Password" />
                        <Button variant="contained" onClick={handleClose}
                            sx={{ backgroundColor: 'var(--primary)', width: '100%' }}
                        >
                            Sing in
                        </Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}