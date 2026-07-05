import React, { useEffect } from 'react';
import { Box, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../components/PageHeader';
import { fetchComplianceData } from '../store/slices/complianceSlice';

const CompliancePage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.compliance.items);

  useEffect(() => {
    dispatch(fetchComplianceData());
  }, [dispatch]);

  return (
    <Box>
      <PageHeader title="Compliance Center" subtitle="Track compliance items, due dates and renewal priorities" />
      <Card className="table-card">
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Due Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.dueDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CompliancePage;
