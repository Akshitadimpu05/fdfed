import React, { useEffect, useState } from 'react';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  MdChevronLeft,
  MdApartment,
  MdWrongLocation,
  MdLeaderboard,
  MdAdminPanelSettings,
  MdSubscriptions,
} from 'react-icons/md';
import { useTheme } from '@mui/material/styles';
import { CiLogin } from 'react-icons/ci';
import { FaBox } from 'react-icons/fa';

const navItems = [
  {
    text: 'Resident',
    icon: null,
  },
  {
    text: 'My Apartments',
    icon: <MdApartment />,
    path: '/dash',
  },
  {
    text: 'Complaints',
    icon: <MdWrongLocation />,
    path: '/dash/complaints',
  },
  {
    text: 'Owner',
    icon: null,
  },
  {
    text: 'Owning Projects',
    icon: <MdLeaderboard />,
    path: '/dashboard/owning-apartments',
  },
  {
    text: 'Subsciptions',
    icon: <MdSubscriptions />,
    path: '/dashboard/subscription',
  },
  {
    text: 'Security',
    icon: null,
  },
  {
    text: 'Add Log',
    icon: <CiLogin />,
    path: '/dashboard/security',
  },
  {
    text: 'Add Parcel',
    icon: <FaBox />,
    path: '/dashboard/parcels',
  },
  {
    text: 'Admin',
    icon: null,
  },
  {
    text: 'Apartments',
    icon: <MdAdminPanelSettings />,
    path: '/dashboard/admin/apartments',
  },
];

const SideBar = ({ drawerWidth }) => {
  const [active, setActive] = useState('');
  const navigate = useNavigate();
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const { pathname } = useLocation();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  return (
    <Box
      sx={{
        width: drawerWidth,
        height: '100%',
        flexShrink: 0,
        borderRight: '0.8px solid gray',
        position: 'fixed',
        zIndex: 1000,
        overflowY: 'auto',
        boxShadow:
          '0 4px 8px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.06)', // Neat shadow
      }}
    >
      <Box
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            color: theme.palette.text.primary,
          },
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {/* Drawer Items */}
        <List>
          {navItems.map(({ text, icon, path }) => {
            if (!icon) {
              return (
                <Typography key={text} sx={{ m: '2.25rem 0 1rem 3rem' }}>
                  {text}
                </Typography>
              );
            }
            const lcText = text.toLowerCase();

            return (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(path);
                    setActive(lcText);
                  }}
                  sx={{
                    backgroundColor:
                      active === lcText
                        ? theme.palette.secondary[300]
                        : 'transparent',
                    color:
                      active === lcText
                        ? theme.palette.primary[600]
                        : theme.palette.secondary[100],
                  }}
                >
                  <ListItemIcon
                    sx={{
                      ml: '2rem',
                      color:
                        active === lcText
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[200],
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                  {active === lcText && <MdChevronLeft sx={{ ml: 'auto' }} />}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
};

export default SideBar;
