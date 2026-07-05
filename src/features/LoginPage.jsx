import React, { useEffect } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography, Alert, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../store/slices/authSlice';

const schema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, error } = useSelector((state) => state.auth);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (values) => dispatch(loginUser(values));

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'linear-gradient(135deg, #0f172a, #2563eb)' }}>
      <Card sx={{ width: { xs: '90%', md: 420 }, borderRadius: 4, boxShadow: 10 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Sign in to e-GRCP
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Centralized governance, compliance and procurement workspace
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField label="Username" fullWidth {...register('username')} error={Boolean(errors.username)} helperText={errors.username?.message} />
              <TextField label="Password" type="password" fullWidth {...register('password')} error={Boolean(errors.password)} helperText={errors.password?.message} />
              <Button type="submit" variant="contained" disabled={status === 'loading'}>
                {status === 'loading' ? 'Signing in...' : 'Sign in'}
              </Button>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link to="/forgot-password">Forgot password?</Link>
                <Link to="/reset-password">Reset password</Link>
              </Box>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
