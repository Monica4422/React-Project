import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Card, CardContent, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography, TextField, MenuItem, Stack, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../components/PageHeader';
import { fetchProcurementData, addRequest } from '../store/slices/procurementSlice';

const ProcurementPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const items = useSelector((state) => state.procurement.items);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [notification, setNotification] = useState('');
  const [formValues, setFormValues] = useState({ title: '', department: '', amount: '', priority: 'Medium' });

  useEffect(() => {
    dispatch(fetchProcurementData());
  }, [dispatch]);

  const userRequests = useMemo(
    () => items.filter((item) => item.owner === user?.name),
    [items, user]
  );

  const visibleItems = useMemo(() => {
    return userRequests.filter((item) => {
      const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.department.toLowerCase().includes(search.toLowerCase());
      const matchStatus = status === 'All' || item.status === status;
      return matchSearch && matchStatus;
    });
  }, [userRequests, search, status]);

  const handleChange = (key) => (event) => {
    setFormValues((current) => ({ ...current, [key]: event.target.value }));
  };

  const handleSubmit = () => {
    if (!formValues.title || !formValues.department || !formValues.amount) {
      setNotification('Please complete all fields before submitting your request.');
      return;
    }

    dispatch(
      addRequest({
        id: `PR-${Date.now()}`,
        title: formValues.title,
        department: formValues.department,
        status: 'Pending',
        amount: Number(formValues.amount),
        owner: user?.name || 'Unknown',
        priority: formValues.priority,
        submittedAt: new Date().toISOString()
      })
    );

    setFormValues({ title: '', department: '', amount: '', priority: 'Medium' });
    setNotification('Request submitted successfully and is now awaiting manager review.');
  };

  return (
    <Box>
      <PageHeader title="Procurement Workspace" subtitle="Create requests, track status and collaborate with approvals" />
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Card className="table-card">
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Create Request</Typography>
              {notification && <Alert severity="success" sx={{ mb: 2 }}>{notification}</Alert>}
              <Stack spacing={2}>
                <TextField label="Request Title" value={formValues.title} onChange={handleChange('title')} fullWidth />
                <TextField label="Department" value={formValues.department} onChange={handleChange('department')} fullWidth />
                <TextField label="Amount" type="number" value={formValues.amount} onChange={handleChange('amount')} fullWidth />
                <TextField select label="Priority" value={formValues.priority} onChange={handleChange('priority')} fullWidth>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </TextField>
                <Button variant="contained" onClick={handleSubmit}>Submit Request</Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={7}>
          <Card className="table-card">
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Track Request Status</Typography>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 2 }}>
                <TextField label="Search request" value={search} onChange={(event) => setSearch(event.target.value)} fullWidth />
                <TextField select label="Status" value={status} onChange={(event) => setStatus(event.target.value)} sx={{ minWidth: 180 }}>
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                </TextField>
              </Stack>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {visibleItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.department}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>${item.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProcurementPage;
