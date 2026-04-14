import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function BasicTextFields({ label, value, onChange }) {
    return (
        <Box
            component="form"
            sx={{ m: 1 }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id={`outlined-basic-${label}`}
                label={label}
                variant="outlined"
                sx={{ width: '100%' }}
                value={value}
                onChange={onChange}
            />
        </Box>
    );
}