import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function BasicTextFields({ label, value, onChange, type = "text", ...props }) {
    return (
        <Box
            sx={{ m: 1 }}
        >
            <TextField
                id={`outlined-basic-${label}`}
                label={label}
                variant="outlined"
                sx={{ width: '100%' }}
                value={value}
                onChange={onChange}
                type={type}
                {...props}
            />
        </Box>
    );
}