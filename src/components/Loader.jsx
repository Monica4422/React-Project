import React, { memo } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loader = memo(function Loader({ message = 'Loading...' }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 240, flexDirection: 'column', gap: 2 }}>
      <CircularProgress />
      <Typography variant="body2" color="text.secondary">{message}</Typography>
    </Box>
  );
});

export default Loader;
