import React from 'react';
import { Box, Card, CardContent, Typography, Stack, Switch, FormControlLabel } from '@mui/material';
import PageHeader from '../components/PageHeader';

const SettingsPage = () => (
  <Box>
    <PageHeader title="User Settings" subtitle="Manage profile, preferences and security controls" />
    <Card className="table-card">
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6">Profile</Typography>
          <Typography variant="body1">Role-based access and notification preferences are available from the governance console.</Typography>
          <FormControlLabel control={<Switch defaultChecked />} label="Enable daily digest" />
          <FormControlLabel control={<Switch />} label="High priority alerts" />
        </Stack>
      </CardContent>
    </Card>
  </Box>
);

export default SettingsPage;
