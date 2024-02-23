import styled from "@emotion/styled";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export const Description = styled(Typography)`
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2; 
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
`;

export const Title = styled(Typography)`
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1; 
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
`;

export const ContainerCardStyled = styled(Card) <{ isAdmin: boolean }>`
    max-width: ${({ isAdmin }) => isAdmin ? 'unset' : '350px'};
    width: ${({ isAdmin }) => isAdmin ? '100%' : 'unset'};
    height: ${({ isAdmin }) => isAdmin ? '100px' : '300px'};
    position: relative;
    display:  ${({ isAdmin }) => isAdmin ? 'grid' : 'flex'};
    flex-direction:  ${({ isAdmin }) => isAdmin ? 'row' : 'column'};
    grid-template-columns: ${({ isAdmin }) => isAdmin ? '20% 80%' : 'unset'};
`;

export const CardContentStyled = styled(CardContent) <{ isAdmin: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 5px;
    display: ${({ isAdmin }) => isAdmin ? 'grid' : 'block'};
    grid-template-columns: ${({ isAdmin }) => isAdmin ? '70% 30%' : 'unset'};
`;

export const CardMediaStyled = styled(CardMedia) <{ isAdmin: boolean }>`
    height: ${({ isAdmin }) => isAdmin ? 'unset' : '120px'};
    background-size: ${({ isAdmin }) => isAdmin ? 'contain' : 'cover'};
`