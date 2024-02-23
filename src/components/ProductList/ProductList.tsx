import React from 'react';
import Grid from '@mui/material/Grid';
import ProductCard from '../ProductCard';
import ListItem from '@mui/material/ListItem';
import { Product } from '../../reducers/products';
import { ListStyled } from './ProductList.styles';

interface IProductList {
    products: Product[];
    isAdmin: boolean;
    onProductDelete?(id: number): void;
    onProductEdit?(product: number): void;
    onChangeRating?(id: number, rating: number): void;
}

const ProductList = ({ products, isAdmin, onChangeRating, onProductEdit, onProductDelete }: IProductList) => {

    return isAdmin ? (
        <ListStyled>
            {products?.map((product) => (
                <ListItem>
                    <ProductCard product={product} isAdmin={isAdmin} onEdit={onProductEdit} onDelete={onProductDelete} />
                </ListItem>
            ))}
        </ListStyled>
    ) : (
        <Grid container spacing={2} padding={'3rem'}>
            {products?.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={3}>
                    <ProductCard product={product} isAdmin={isAdmin} onChangeRating={onChangeRating} />
                </Grid>
            ))}
        </Grid>
    );
};

export default React.memo(ProductList);