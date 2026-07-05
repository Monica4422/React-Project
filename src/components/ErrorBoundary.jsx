import React from 'react';
import { Alert, Box, Button, Typography } from '@mui/material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="h6">Something went wrong</Typography>
            <Typography variant="body2">The application hit an unexpected issue. Please refresh and retry.</Typography>
          </Alert>
          <Button variant="contained" onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
