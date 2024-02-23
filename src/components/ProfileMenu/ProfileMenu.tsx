import React from 'react';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';

export type ProfileSelectedValie = 'admin-login' | 'user-login' | 'logout';
interface IProfileMenu {
    onSelection(value: ProfileSelectedValie): void;
}

const ProfileMenu = ({ onSelection }: IProfileMenu) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOnSelection = (v: ProfileSelectedValie) => {
        handleClose();
        onSelection(v);
    }

    return (
        <>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                style={{ color: 'white' }}
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
                <MenuItem onClick={() => handleOnSelection('admin-login')}>
                    Admin Login
                </MenuItem>
                <MenuItem onClick={() => handleOnSelection('user-login')}>
                    User Login
                </MenuItem>
                <MenuItem onClick={() => handleOnSelection('logout')}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};

export default React.memo(ProfileMenu);