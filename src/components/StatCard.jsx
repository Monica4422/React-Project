import React, { memo } from 'react';
import { Card, CardContent, Stack, Typography } from '@mui/material';

const StatCard = memo(function StatCard({ title, value, subtitle, color }) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: '0 10px 30px rgba(15,23,42,0.08)' }}>
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">{title}</Typography>
          <Typography variant="h4" component="div" sx={{ color }}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">{subtitle}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
});

export default StatCard;
