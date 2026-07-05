import React, { useEffect } from 'react';
import { Box, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { fetchVendorData } from '../store/slices/vendorSlice';

const VendorsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.vendor.items);

  useEffect(() => {
    dispatch(fetchVendorData());
  }, [dispatch]);

  return (
    <Box>
      <PageHeader title="Vendor Governance" subtitle="Monitor vendor profiles, risk posture and compliance readiness" />
      <Card className="table-card">
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Risk</TableCell>
                <TableCell>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((vendor) => (
                <TableRow
                  key={vendor.id}
                  hover
                  onClick={() => navigate(`/vendors/${vendor.id}`)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>{vendor.name}</TableCell>
                  <TableCell>{vendor.category}</TableCell>
                  <TableCell>{vendor.status}</TableCell>
                  <TableCell>{vendor.risk}</TableCell>
                  <TableCell>{vendor.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};

export default VendorsPage;
