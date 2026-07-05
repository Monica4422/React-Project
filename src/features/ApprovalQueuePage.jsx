import React, { useMemo } from 'react';
import { Box, Button, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Typography, Stack, Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../components/PageHeader';
import { updateRequestStatus } from '../store/slices/procurementSlice';

const ApprovalQueuePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const items = useSelector((state) => state.procurement.items);

  const pendingRequests = useMemo(
    () => items.filter((request) => request.status === 'Pending'),
    [items]
  );

  const handleDecision = (id, decision) => {
    dispatch(updateRequestStatus({ id, status: decision, reviewer: user?.name || 'Manager' }));
  };

  return (
    <Box>
      <PageHeader title="Approval Queue" subtitle="Review procurement submissions and approve or reject them" />
      <Card className="table-card">
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">Pending Requests</Typography>
            <Chip label={pendingRequests.length ? `${pendingRequests.length} pending` : 'No pending requests'} color={pendingRequests.length ? 'warning' : 'success'} />
          </Stack>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Request</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.title}</TableCell>
                  <TableCell>{request.owner}</TableCell>
                  <TableCell>{request.department}</TableCell>
                  <TableCell>${request.amount}</TableCell>
                  <TableCell>{request.priority}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button size="small" variant="contained" color="success" onClick={() => handleDecision(request.id, 'Approved')}>
                        Approve
                      </Button>
                      <Button size="small" variant="outlined" color="error" onClick={() => handleDecision(request.id, 'Rejected')}>
                        Reject
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ApprovalQueuePage;
