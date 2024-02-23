import React from 'react';
import Typography from '@mui/material/Typography';
import { CardContentStyled, CardMediaStyled, ContainerCardStyled, Description, Title } from './ProductCard.styles';
import Rating from '@mui/material/Rating';
import ProductMenu from '../ProductMenu';
import Box from '@mui/material/Box';
import { useAuth } from '../../utils/hooks';
import { ProfileMenuActionType } from '../ProductMenu/ProductMenu';
import { Product } from '../../reducers/products';

interface IProductCard {
    product: Product;
    isAdmin: boolean;
    onDelete?(id: number): void;
    onEdit?(id: number): void;
    onChangeRating?(id: number, value: number): void;
}

const ProductCard = ({ product, isAdmin, onDelete = () => undefined, onEdit = () => undefined, onChangeRating = () => undefined }: IProductCard) => {
    const { isLoggedIn } = useAuth();

    const onSelectionChange = (type: ProfileMenuActionType) => {
        if (type === 'edit') {
            onEdit(product?.id);
        } else {
            onDelete(product?.id)
        }
    }

    return (
        <ContainerCardStyled isAdmin={isAdmin}>
            {isAdmin && <ProductMenu onSelectionChange={onSelectionChange} />}
            <CardMediaStyled
                isAdmin={isAdmin}
                image={product.image}
            />
            <CardContentStyled isAdmin={isAdmin}>
                <Box>
                    <Title gutterBottom variant="h5">
                        {product.title}
                    </Title>
                    <Description variant="body2" color="textSecondary">
                        {product.description}
                    </Description>
                </Box>
                <Box>
                    <Typography variant="body2">
                        ${product.price}
                    </Typography>
                    {isLoggedIn && <Rating
                        name="simple-controlled"
                        value={product.rating}
                        readOnly={isAdmin}
                        onChange={(event, newValue) => {
                            onChangeRating(product.id, newValue ?? 0);
                        }}
                    />}
                </Box>
            </CardContentStyled>
        </ContainerCardStyled>
    );
};

export default React.memo(ProductCard);