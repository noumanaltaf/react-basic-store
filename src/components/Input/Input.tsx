import React from 'react';
import { StandardTextFieldProps, TextField } from '@mui/material';

interface IInput extends StandardTextFieldProps {
}

function Input({ label, value, onChange, ...otherProps }: IInput) {
    return (
        <TextField
            label={label}
            value={value}
            onChange={onChange}
            fullWidth
            variant="outlined"
            {...otherProps}
        />
    );
}

export default React.memo(Input);