import React, { useEffect, useMemo } from 'react';
import { Grid, Card, CardContent, Typography, Box, Stack, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from 'recharts';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import { fetchDashboardData } from '../store/slices/dashboardSlice';

const palette = ['#2563eb', '#0f766e', '#f59e0b', '#dc2626'];

const DashboardPage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dashboard.data);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const metrics = useMemo(() => {
    const requests = data?.requests || [];
    const risks = data?.risks || [];
    const total = requests.length;
    return [
      { title: 'Total Requests', value: total, subtitle: 'Across all departments', color: '#2563eb' },
      { title: 'Pending Requests', value: requests.filter((item) => item.status === 'Pending').length, subtitle: 'Awaiting review', color: '#f59e0b' },
      { title: 'Approved Requests', value: requests.filter((item) => item.status === 'Approved').length, subtitle: 'Cleared successfully', color: '#0f766e' },
      { title: 'Risks', value: risks.length, subtitle: 'High risk vendors', color: '#dc2626' }
    ];
  }, [data]);

  const trendData = useMemo(() => [
    { name: 'Jan', requests: 18, risks: 8 },
    { name: 'Feb', requests: 22, risks: 10 },
    { name: 'Mar', requests: 27, risks: 7 },
    { name: 'Apr', requests: 31, risks: 11 }
  ], []);

  const spendingData = useMemo(() => [
    { name: 'IT', value: 42000 },
    { name: 'Operations', value: 31000 },
    { name: 'Security', value: 22000 },
    { name: 'Facilities', value: 15000 }
  ], []);

  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const ctAs = useMemo(
    () => [
      { title: 'Create Request', path: '/procurement', roles: ['Administrator', 'Procurement Manager', 'Employee'] },
      { title: 'Approval Queue', path: '/approval', roles: ['Administrator', 'Procurement Manager'] },
      { title: 'Audit Center', path: '/audit', roles: ['Administrator', 'Auditor'] }
    ].filter((cta) => cta.roles.includes(user?.role)),
    [user]
  );

  return (
    <Box>
      <PageHeader title="Executive Dashboard" subtitle="A unified view of governance, procurement, risk and compliance activity" />
      {ctAs.length > 0 && (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 3 }}>
          {ctAs.map((cta) => (
            <Button key={cta.path} variant="outlined" onClick={() => navigate(cta.path)}>
              {cta.title}
            </Button>
          ))}
        </Stack>
      )}
      <Grid container spacing={3}>
        {metrics.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <StatCard {...item} />
          </Grid>
        ))}
        <Grid item xs={12} md={8}>
          <Card className="table-card">
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Monthly Procurement Trend</Typography>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="requests" stroke="#2563eb" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="table-card">
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Department Spending</Typography>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={spendingData} dataKey="value" nameKey="name" outerRadius={90}>
                    {spendingData.map((entry, index) => (
                      <Cell key={entry.name} fill={palette[index % palette.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={7}>
          <Card className="table-card">
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Recent Activity</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Request</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(data?.requests || []).slice(0, 4).map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.title}</TableCell>
                      <TableCell>{request.department}</TableCell>
                      <TableCell>{request.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card className="table-card">
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Risk Trend</Typography>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="risks" fill="#dc2626" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
