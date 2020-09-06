import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from 'next/link'

import MenuIcon from '@material-ui/icons/Menu';
import { ButtonLink } from '../utils/common';

const useStyles = makeStyles((theme) => ({
  rootAppBar: {
    flexGrow: 1,
    marginBottom: 63,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className={classes.rootAppBar}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              myInventory
          </Typography>
            <Button className={classes.menuButton} color="secondary" variant="contained" component={ButtonLink} href={'/'} >HOME</Button>
            <Button className={classes.menuButton} color="secondary" variant="contained" component={ButtonLink} href={'/items'} >Items</Button>
            <Button className={classes.menuButton} color="secondary" variant="contained" component={ButtonLink} href={'/categories'} >Categories</Button>
            <Button className={classes.menuButton} color="secondary" variant="contained" component={ButtonLink} href={'/rooms'} >Rooms</Button>
            <Button className={classes.menuButton} color="secondary" variant="contained" component={ButtonLink} href={'/locations'} >Locations</Button>
            <Button className={classes.menuButton} color="secondary" variant="contained" component={ButtonLink} href={'/conditions'} >Conditions</Button>
          </Toolbar>
        </AppBar>
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>

    </>
  );
}
