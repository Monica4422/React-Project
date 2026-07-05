import React from 'react';
import { Box, Button, Card, CardContent, TextField, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => (
  <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Card sx={{ width: { xs: '90%', md: 420 }, borderRadius: 4 }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Forgot password
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Enter your email address to receive a secure reset link.
        </Typography>
        <Stack spacing={2}>
          <TextField label="Email" fullWidth />
          <Button variant="contained">Send link</Button>
          <Link to="/login">Back to login</Link>
        </Stack>
      </CardContent>
    </Card>
  </Box>
);

export default ForgotPasswordPage;
