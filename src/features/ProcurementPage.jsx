import React, { useEffect, useMemo, useState } from 'react';
import { Box, Card, CardContent, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography, TextField, MenuItem, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../components/PageHeader';
import { fetchProcurementData } from '../store/slices/procurementSlice';

const ProcurementPage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.procurement.items);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');

  useEffect(() => {
    dispatch(fetchProcurementData());
  }, [dispatch]);

  const visibleItems = useMemo(() => {
    return items.filter((item) => {
      const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.department.toLowerCase().includes(search.toLowerCase());
      const matchStatus = status === 'All' || item.status === status;
      return matchSearch && matchStatus;
    });
  }, [items, search, status]);

  return (
    <Box>
      <PageHeader title="Procurement Workspace" subtitle="Search, filter and review requests with approval visibility" />
      <Card className="table-card">
        <CardContent>
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
    </Box>
  );
};

export default ProcurementPage;
