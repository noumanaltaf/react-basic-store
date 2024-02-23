import React, { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { FormControlStyled } from './Filter.styled';

interface IFilter {
    categories: string[];
    handleFilter(updatedCategories: string[]): void
}
const Filter = ({ categories, handleFilter }: IFilter) => {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleSelectChange = (event: SelectChangeEvent<any>) => {
        setSelectedCategories(event.target.value);
        handleFilter(event.target.value);
    };

    return (
        <FormControlStyled>
            <InputLabel id="filter-by-categories">Filter by Categories</InputLabel>
            <Select
                labelId="filter-by-categories"
                id="filter-by-categories-select"
                multiple
                value={selectedCategories}
                onChange={handleSelectChange}
                renderValue={(selected) => selected.join(', ')}
            >
                {categories.map((category, isx) => (
                    <MenuItem key={isx} value={category}>
                        {category}
                    </MenuItem>
                ))}
            </Select>
        </FormControlStyled>
    );
};

export default React.memo(Filter);