import React, { memo, useMemo, useCallback } from 'react';
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { useNavigate, useLocation } from 'react-router-dom';

const items = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardRoundedIcon /> },
  { label: 'Procurement', path: '/procurement', icon: <ShoppingCartRoundedIcon /> },
  { label: 'Vendors', path: '/vendors', icon: <BusinessRoundedIcon /> },
  { label: 'Risk', path: '/risk', icon: <WarningRoundedIcon /> },
  { label: 'Compliance', path: '/compliance', icon: <FactCheckRoundedIcon /> },
  { label: 'Audit', path: '/audit', icon: <HistoryRoundedIcon /> },
  { label: 'Reports', path: '/reports', icon: <AssessmentRoundedIcon /> },
  { label: 'Settings', path: '/settings', icon: <SettingsRoundedIcon /> }
];

const Sidebar = memo(function Sidebar({ open }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate]
  );

  const visibleItems = useMemo(() => items, []);

  return (
    <Drawer variant="persistent" open={open} sx={{ '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box', bgcolor: '#0f172a', color: 'white' } }}>
      <Box sx={{ p: 3, borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
        <Typography variant="h6">e-GRCP</Typography>
        <Typography variant="body2" color="grey.400">Governance Suite</Typography>
      </Box>
      <List>
        {visibleItems.map((item) => (
          <ListItemButton key={item.path} selected={location.pathname === item.path} onClick={() => handleNavigation(item.path)} sx={{ color: 'white' }}>
            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
});

export default Sidebar;
