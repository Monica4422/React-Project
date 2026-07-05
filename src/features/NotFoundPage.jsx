import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <Box sx={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
      Page not found
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
      The requested route does not exist in the governance workspace.
    </Typography>
    <Button component={Link} to="/dashboard" variant="contained">
      Return home
    </Button>
  </Box>
);

export default NotFoundPage;
