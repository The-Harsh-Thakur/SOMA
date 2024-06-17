import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';

function ToggleColorMode({ mode, toggleColorMode }) {
  return (
    <Box sx={{ maxWidth: '32px' }}>
      {/* Button to toggle color mode */}
      <Button
        variant="text"
        onClick={toggleColorMode} // Handle click event to toggle color mode
        size="small"
        aria-label="button to toggle theme"
        sx={{ minWidth: '32px', height: '32px', p: '4px' }} // Styling for button size and padding
      >
        {mode === 'dark' ? ( // Render WbSunnyRoundedIcon if mode is dark, otherwise ModeNightRoundedIcon
          <WbSunnyRoundedIcon fontSize="small" />
        ) : (
          <ModeNightRoundedIcon fontSize="small" />
        )}
      </Button>
    </Box>
  );
}

// PropTypes for type checking
ToggleColorMode.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired, // mode should be either 'dark' or 'light' and is required
  toggleColorMode: PropTypes.func.isRequired, // toggleColorMode function is required
};

export default ToggleColorMode;
