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

export default function ModalComponent({
    open,
    handleClose,
    action,
    question,
    answer,
    onQuestionChange,
    onAnswerChange,
    onSave,
}) {
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
                        {action === 'create' ? 'Create a new card' : 'Edit card'}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <TextInput
                            label="Question"
                            value={question}
                            onChange={(event) => onQuestionChange(event.target.value)}
                        />
                        <TextInput
                            label="Answer"
                            value={answer}
                            onChange={(event) => onAnswerChange(event.target.value)}
                        />
                        <Button
                            variant="contained"
                            onClick={onSave}
                            sx={{ backgroundColor: 'var(--primary)', width: '100%' }}
                        >
                            {action === 'create' ? 'Create Card' : 'Save Changes'}
                        </Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}