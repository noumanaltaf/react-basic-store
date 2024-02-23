import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import ProfileMenu from '../ProfileMenu';
import { ProfileSelectedValie } from '../ProfileMenu/ProfileMenu';
import { useNavigate } from 'react-router-dom';

interface IStickyNavbar {
  title: string;
  onLogout(): void;
}

const StickyNavbar = ({ title, onLogout }: IStickyNavbar) => {
  const navigate = useNavigate();

  const handleOnSelection = (v: ProfileSelectedValie) => {
    switch (v) {
      case 'user-login':
      case 'admin-login':
        navigate(`/${v}`);
        break;
      case 'logout':
        onLogout();
        break;
      default:
    }
  }

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <ProfileMenu onSelection={handleOnSelection} />
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(StickyNavbar);
