import React from 'react';
import {
    InputLabel,
    NativeSelect,
} from '@mui/material';
import { FormControlStyled } from './SortByMenu.styles';

interface ISortByMenu {
    onSelectionChange(value: number): void;
}
function SortByMenu({ onSelectionChange }: ISortByMenu) {

    return (
        <FormControlStyled>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Sort by
            </InputLabel>
            <NativeSelect
                defaultValue={30}
                inputProps={{
                    name: 'age',
                    id: 'uncontrolled-native',
                }}
                onChange={(e) => onSelectionChange(Number(e.target.value))}
            >
                <option value={10}>Title</option>
                <option value={20}>Price (low to high)</option>
                <option value={30}>Price (high to low)</option>
                <option value={40}>Average rating (high to low)</option>
            </NativeSelect>
        </FormControlStyled>
    );
}

export default React.memo(SortByMenu);