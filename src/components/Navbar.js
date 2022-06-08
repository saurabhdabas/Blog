import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';

import { Link } from 'react-router-dom';

import { auth } from '../firebase-config';
import { signOut } from 'firebase/auth';

const drawerWidth = 260;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#1976d2',
    color: '#1976d2',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function Navbar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const user = JSON.parse(localStorage.getItem('user'));;
  
  const signOutUser = () => {
    signOut(auth).then(()=>{
      localStorage.clear();
    })
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{backgroundColor:"#343A40"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Grid display='flex' sx={{width:"100%"}} alignItems='center' justifyContent='space-between'>
          <Typography variant="h6" noWrap component="div" fontSize={28}fontFamily="'Snowburst One', cursive"  fontWeight={900}>
            Welcome back 👋🏼 ! {user.name}
          </Typography>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            variant="dot"
          >
            <Avatar alt={user.name} src={user.photo} />
          </StyledBadge>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor:"#FFFFFF"
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{padding:2}}>
          <Avatar alt={user.name} src="/story.png" sx={{height:100, width:100}}/>
          <Typography fontFamily="'Snowburst One', cursive" fontWeight={900} ml={2}>StoryBook</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem key="1">
              <Link to="/home" style={{ textDecoration: 'none' }} >
                <ListItemButton>
                  <ListItemIcon><HomeIcon sx={{color:"#1976d2"}}/></ListItemIcon>
                  <ListItemText primary= { 
                    <Typography variant="h7" fontFamily="'Snowburst One', cursive" fontWeight={900} style={{ color: "black" }}>
                      Home
                    </Typography>}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem key="2">
              <Link to="/Create" style={{ textDecoration: 'none' }} >
                <ListItemButton>
                  <ListItemIcon><CreateIcon sx={{color:"#1976d2"}}/></ListItemIcon>
                  <ListItemText primary= { 
                    <Typography variant="h7" fontFamily="'Snowburst One', cursive"  fontWeight={900} style={{ color: "black" }}>
                      Write a Story
                    </Typography>}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem key="3" onClick={signOutUser}>
              <Link to="/" style={{ textDecoration: 'none' }} >
                <ListItemButton>
                  <ListItemIcon><ExitToAppIcon sx={{color:"#1976d2"}}/></ListItemIcon>
                  <ListItemText primary= { 
                    <Typography variant="h7" fontFamily="'Snowburst One', cursive" fontWeight={900} style={{ color: "black" }}>
                      Logout
                    </Typography>}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
