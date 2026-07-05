import React, { memo } from 'react';
import { Box, Alert, Button, Typography } from '@mui/material';

const ErrorState = memo(function ErrorState({ title = 'Something went wrong', message = 'Please try again later.', onRetry }) {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Alert severity="error" sx={{ mb: 2 }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{message}</Typography>
      </Alert>
      {onRetry && (
        <Button variant="contained" onClick={onRetry}>
          Retry
        </Button>
      )}
    </Box>
  );
});

export default ErrorState;
