import React, { memo, useCallback, useMemo } from 'react';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Typography, Stack, Menu, MenuItem } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { toggleSidebar, toggleTheme } from '../store/slices/uiSlice';
import { logoutUser } from '../store/slices/authSlice';

const Layout = memo(function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);
  const themeMode = useSelector((state) => state.ui.themeMode);
  const notifications = useSelector((state) => state.notification.items);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMenu = useCallback((event) => setAnchorEl(event.currentTarget), []);
  const handleCloseMenu = useCallback(() => setAnchorEl(null), []);
  const handleToggleSidebar = useCallback(() => dispatch(toggleSidebar()), [dispatch]);
  const handleToggleTheme = useCallback(() => dispatch(toggleTheme()), [dispatch]);
  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
    navigate('/login');
  }, [dispatch, navigate]);

  const unreadCount = useMemo(() => notifications.filter((item) => !item.read).length, [notifications]);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', bgcolor: '#f8fafc' }}>
      <Sidebar open={sidebarOpen} />
      <Box component="main" sx={{ flexGrow: 1, ml: sidebarOpen ? '240px' : 0, transition: 'margin 0.3s ease' }}>
        <AppBar position="sticky" color="transparent" elevation={0} sx={{ borderBottom: '1px solid rgba(15,23,42,0.08)', bgcolor: 'rgba(248,250,252,0.92)' }}>
          <Toolbar>
            <IconButton onClick={handleToggleSidebar} sx={{ mr: 2 }}>
              <MenuRoundedIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
              Enterprise Governance, Risk, Compliance & Procurement Platform
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton>
                <SearchRoundedIcon />
              </IconButton>
              <IconButton onClick={handleToggleTheme}>
                {themeMode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
              </IconButton>
              <IconButton>
                <Badge badgeContent={unreadCount} color="error">
                  <NotificationsRoundedIcon />
                </Badge>
              </IconButton>
              <Avatar onClick={handleOpenMenu} sx={{ ml: 1, cursor: 'pointer' }}>
                {user?.name?.charAt(0) || 'U'}
              </Avatar>
            </Stack>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
              <MenuItem disabled>{user?.name}</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: { xs: 2, md: 4 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
});

export default Layout;
