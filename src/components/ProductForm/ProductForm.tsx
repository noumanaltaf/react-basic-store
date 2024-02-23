import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, InputLabel, FormControl, Select, MenuItem, Box } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { AdddButtonStyled } from './ProductForm.styles';
import { Product } from '../../reducers/products';

interface IAddProductModal {
    open: boolean;
    setAddEdirProductOpen(open: boolean): void;
    product?: Product | null;
    setProduct(product: Product | null): void;
    categories: string[]
    onSubmit(type: 'edit' | 'add', product: any): void;
}
const AddProductModal = ({ open, product, setAddEdirProductOpen, setProduct, categories, onSubmit }: IAddProductModal) => {

    const [data, setData] = React.useState<Product | null>();

    React.useEffect(
        () => {
            setData(product);
        },
        [product]
    )

    const handleChange = (name: string, value: any) => {
        setData((prev) => ({
            ...prev,
            [name]: value
        }) as any);
    }

    const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            handleChange('image', event.target.files[0] as any);
        }
    };

    const onClose = () => setAddEdirProductOpen(false);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        onSubmit(Boolean(product) ? 'edit' : 'add', data);
        onClose();
    };

    const handleOpenDialog = () => {
        setAddEdirProductOpen(true);
        setData(null);
        setProduct(null);
    }

    return (
        <Box>
            <AdddButtonStyled color="primary" aria-label="add" onClick={handleOpenDialog}>
                <AddIcon />
            </AdddButtonStyled>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>{Boolean(product) ? 'Edit Product' : 'Add Product'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>Fill out the form to add a new product.</DialogContentText>
                    <Box sx={{ my: 2 }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Product Name"
                            type="text"
                            fullWidth
                            value={data?.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                        />
                    </Box>
                    <Box sx={{ my: 2 }}>
                        <TextField
                            margin="dense"
                            id="description"
                            label="Description"
                            type="text"
                            multiline
                            rows={4}
                            fullWidth
                            value={data?.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                        />
                    </Box>
                    <Box sx={{ my: 2 }}>
                        <TextField
                            margin="dense"
                            id="price"
                            label="Price"
                            type="number"
                            fullWidth
                            value={data?.price}
                            onChange={(e) => handleChange('price', Number(e.target.value))}
                        />
                    </Box>
                    <Box sx={{ my: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                                labelId="category-label"
                                id="category"
                                value={data?.category}
                                label="Category"
                                onChange={(e) => handleChange('category', e.target.value)}
                            >
                                {categories.map((cat) => <MenuItem value={cat}>{cat}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Box>
                    {!Boolean(product) && <Box sx={{ my: 2 }}>
                        <label htmlFor="picture">
                            <input accept="image/*" id="picture" type="file" hidden onChange={handlePictureChange} />
                            <Button variant="contained" component="span" startIcon={<PhotoCamera />}>
                                Upload Picture
                            </Button>
                        </label>
                    </Box>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {Boolean(product) ? 'Edit Product' : 'Add Product'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default React.memo(AddProductModal);