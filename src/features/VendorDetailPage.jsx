import React, { useEffect } from 'react';
import { Box, Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { fetchVendorData } from '../store/slices/vendorSlice';

const VendorDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const vendor = useSelector((state) => state.vendor.items.find((item) => item.id.toString() === id));

  useEffect(() => {
    if (!vendor) {
      dispatch(fetchVendorData());
    }
  }, [dispatch, vendor]);

  if (!vendor) {
    return <Typography>Vendor not found</Typography>;
  }

  return (
    <Box>
      <PageHeader title="Vendor Detail" subtitle="Review vendor compliance, contracts and risk profile" />
      <Button variant="outlined" onClick={() => navigate('/vendors')} sx={{ mb: 3 }}>
        Back to Vendor List
      </Button>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card className="table-card">
            <CardContent>
              <Typography variant="h6">{vendor.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Category: {vendor.category}
              </Typography>
              <Typography>Status: {vendor.status}</Typography>
              <Typography>Risk: {vendor.risk}</Typography>
              <Typography>Score: {vendor.score}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="table-card">
            <CardContent>
              <Typography variant="h6">Compliance Snapshot</Typography>
              <Typography sx={{ mb: 1 }}>Last review: {vendor.lastReview || 'Q1 2026'}</Typography>
              <Typography>Contract status: {vendor.contractStatus || 'Active'}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VendorDetailPage;
