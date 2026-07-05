import React, { memo, useCallback, useMemo, useEffect, useState } from 'react';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Typography, Stack, Menu, MenuItem, TextField, InputAdornment } from '@mui/material';
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
import { fetchNotifications, markAllAsRead } from '../store/slices/notificationSlice';

const Layout = memo(function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);
  const themeMode = useSelector((state) => state.ui.themeMode);
  const notifications = useSelector((state) => state.notification.items);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const [searchAnchorEl, setSearchAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleOpenMenu = useCallback((event) => setAnchorEl(event.currentTarget), []);
  const handleCloseMenu = useCallback(() => setAnchorEl(null), []);
  const handleToggleSidebar = useCallback(() => dispatch(toggleSidebar()), [dispatch]);
  const handleToggleTheme = useCallback(() => dispatch(toggleTheme()), [dispatch]);
  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
    navigate('/login');
  }, [dispatch, navigate]);
  const handleOpenNotifications = useCallback(
    (event) => {
      setNotifAnchorEl(event.currentTarget);
      dispatch(markAllAsRead());
    },
    [dispatch]
  );
  const handleCloseNotifications = useCallback(() => setNotifAnchorEl(null), []);
  const handleOpenSearch = useCallback((event) => setSearchAnchorEl(event.currentTarget), []);
  const handleCloseSearch = useCallback(() => {
    setSearchAnchorEl(null);
    setSearchQuery('');
  }, []);
  const handleSearchNavigate = useCallback(
    (path) => {
      navigate(path);
      handleCloseSearch();
    },
    [navigate, handleCloseSearch]
  );

  const unreadCount = useMemo(() => notifications.filter((item) => !item.read).length, [notifications]);
  const pageLinks = useMemo(
    () => [
      { title: 'Dashboard', path: '/dashboard' },
      { title: 'Procurement', path: '/procurement' },
      { title: 'Vendors', path: '/vendors' },
      { title: 'Risk', path: '/risk' },
      { title: 'Compliance', path: '/compliance' },
      { title: 'Audit', path: '/audit' },
      { title: 'Reports', path: '/reports' },
      { title: 'Settings', path: '/settings' }
    ],
    []
  );
  const searchResults = useMemo(
    () =>
      pageLinks.filter((page) => page.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [pageLinks, searchQuery]
  );

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
              <IconButton onClick={handleOpenSearch}>
                <SearchRoundedIcon />
              </IconButton>
              <IconButton onClick={handleToggleTheme}>
                {themeMode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
              </IconButton>
              <IconButton onClick={handleOpenNotifications}>
                <Badge badgeContent={unreadCount} color="error">
                  <NotificationsRoundedIcon />
                </Badge>
              </IconButton>
              <Avatar onClick={handleOpenMenu} sx={{ ml: 1, cursor: 'pointer' }}>
                {user?.name?.charAt(0) || 'U'}
              </Avatar>
            </Stack>
            <Menu anchorEl={searchAnchorEl} open={Boolean(searchAnchorEl)} onClose={handleCloseSearch} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
              <Box sx={{ p: 2, minWidth: 280, maxWidth: 320 }}>
                <TextField
                  fullWidth
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search pages..."
                  size="small"
                  InputProps={{ startAdornment: <InputAdornment position="start"><SearchRoundedIcon /></InputAdornment> }}
                />
                {searchResults.length > 0 ? (
                  searchResults.map((page) => (
                    <MenuItem key={page.path} onClick={() => handleSearchNavigate(page.path)}>
                      {page.title}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No pages found</MenuItem>
                )}
              </Box>
            </Menu>
            <Menu anchorEl={notifAnchorEl} open={Boolean(notifAnchorEl)} onClose={handleCloseNotifications} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
              {notifications.length === 0 ? (
                <MenuItem disabled>No notifications</MenuItem>
              ) : (
                notifications.map((notification) => (
                  <MenuItem key={notification.id} onClick={handleCloseNotifications}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: notification.read ? 400 : 700 }}>
                        {notification.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {notification.description}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))
              )}
            </Menu>
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
