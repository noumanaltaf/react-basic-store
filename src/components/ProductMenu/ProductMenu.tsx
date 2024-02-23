import React from 'react';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ContainerStyled } from './ProductMenu.styles';

export type ProfileMenuActionType = 'edit' | 'delete';

interface IProductMenu {
    onSelectionChange(type: ProfileMenuActionType): void
}
const ProductMenu = ({ onSelectionChange }: IProductMenu) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <ContainerStyled>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
            >
                <MenuItem onClick={() => onSelectionChange('edit')}>
                    Edit
                </MenuItem>
                <MenuItem onClick={() => onSelectionChange('delete')}>
                    Delete
                </MenuItem>
            </Menu>
        </ContainerStyled>
    );
};

export default React.memo(ProductMenu);