import React from 'react';
import { Box, Button, Card, CardContent, TextField, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const ResetPasswordPage = () => (
  <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Card sx={{ width: { xs: '90%', md: 420 }, borderRadius: 4 }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Reset password
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Choose a new secure password for your account.
        </Typography>
        <Stack spacing={2}>
          <TextField label="New password" type="password" fullWidth />
          <TextField label="Confirm password" type="password" fullWidth />
          <Button variant="contained">Update password</Button>
          <Link to="/login">Back to login</Link>
        </Stack>
      </CardContent>
    </Card>
  </Box>
);

export default ResetPasswordPage;
