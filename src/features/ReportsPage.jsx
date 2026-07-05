import React, { useEffect } from 'react';
import { Box, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../components/PageHeader';
import { fetchReports } from '../store/slices/reportSlice';

const ReportsPage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.report.items);

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  return (
    <Box>
      <PageHeader title="Reporting Center" subtitle="Export-ready reports for procurement, vendors, compliance and risk" />
      <Card className="table-card">
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReportsPage;
