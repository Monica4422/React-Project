import React, { useEffect } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, CartesianGrid, XAxis, YAxis } from 'recharts';
import PageHeader from '../components/PageHeader';
import { fetchRiskData } from '../store/slices/riskSlice';

const palette = ['#0f766e', '#2563eb', '#f59e0b', '#dc2626'];

const RiskPage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.risk.items);

  useEffect(() => {
    dispatch(fetchRiskData());
  }, [dispatch]);

  return (
    <Box>
      <PageHeader title="Risk Center" subtitle="Visualize risk posture, distribution and mitigation priorities" />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card className="table-card">
            <CardContent>
              <Typography variant="h6">Risk Matrix</Typography>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={items}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="#dc2626" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="table-card">
            <CardContent>
              <Typography variant="h6">Risk Distribution</Typography>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={items} dataKey="score" nameKey="level" outerRadius={90}>
                    {items.map((entry, index) => (
                      <Cell key={entry.name} fill={palette[index % palette.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RiskPage;
