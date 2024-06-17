import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

// Styling for the logo
const logoStyle = {
  width: '70px',
  height: 'auto',
  cursor: 'pointer',
};

// Functional component for the application's app bar
function AppAppBar({ mode, toggleColorMode }) {
  const navigate = useNavigate(); // Hook from react-router-dom for navigation
  const [anchorEl, setAnchorEl] = React.useState(null); // State for managing menu anchor element

  // Function to handle opening the menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle closing the menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Function to handle menu item click and navigate to the specified link
  const handleItemClick = (link) => {
    navigate(link); // Navigate to the specified link
    handleMenuClose(); // Close the menu after navigation
  };

  // JSX structure of the component
  return (
    <div>
      {/* Application's app bar */}
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            {/* Logo section */}
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <img
                  src="soma.png"
                  alt="logo"
                  style={logoStyle}
                  onClick={() => handleItemClick('/')} // Navigate to home on logo click
                />
              </Box>
            </Box>
            
            {/* Navigation links section (visible on larger screens) */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <MenuItem sx={{ color: 'black' }} onClick={() => handleItemClick('/task')}>Task</MenuItem>
              <MenuItem sx={{ color: 'black' }} onClick={() => handleItemClick('/calendar')}>Calendar</MenuItem>
              <MenuItem sx={{ color: 'black' }} onClick={() => handleItemClick('/queries')}>Queries</MenuItem>
            </Box>
            
            {/* Menu button section (visible on smaller screens) */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuOpen} // Open menu on button click
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              {/* Menu component */}
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)} // Menu open state
                onClose={handleMenuClose} // Close menu
              >
                <MenuItem sx={{ color: 'black' }} onClick={() => handleItemClick('/task')}>Tasks</MenuItem>
                <MenuItem sx={{ color: 'black' }} onClick={() => handleItemClick('/calendar')}>Calendar</MenuItem>
                <MenuItem sx={{ color: 'black' }} onClick={() => handleItemClick('/queries')}>Queries</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

// Prop types validation for AppAppBar component
AppAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired, // Mode prop should be either 'dark' or 'light'
  toggleColorMode: PropTypes.func.isRequired, // toggleColorMode prop should be a function
};

export default AppAppBar;
