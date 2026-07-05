import React, { useEffect } from 'react';
import { Box, Button, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { fetchAuditData } from '../store/slices/auditSlice';

const AuditPage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.audit.items);

  useEffect(() => {
    dispatch(fetchAuditData());
  }, [dispatch]);

  const navigate = useNavigate();

  return (
    <Box>
      <PageHeader title="Audit Center" subtitle="Review activity history, user actions and system logs" />
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 3 }}>
        <Button variant="contained" onClick={() => navigate('/reports')}>Generate Report</Button>
      </Stack>
      <Card className="table-card">
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.user}</TableCell>
                  <TableCell>{item.action}</TableCell>
                  <TableCell>{item.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AuditPage;
