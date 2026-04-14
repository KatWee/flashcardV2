import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';

export default function InputWithIcon({ value, onChange }) {
  return (
    <FormControl variant="standard" sx={{ width: '80%' }}>
      <InputLabel htmlFor="input-with-icon-adornment">
        Search by card question
      </InputLabel>
      <Input
        id="input-with-icon-adornment"
        value={value}
        onChange={onChange}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  );
}