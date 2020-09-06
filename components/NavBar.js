import { makeStyles } from '@material-ui/core/styles';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  rootAppBar: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  return (
    <>
      <div className={classes.rootAppBar}>
        <Navbar fixed='top' expanded={expanded} collapseOnSelect expand="md" bg="dark" variant="dark" className="pl-2 pr-2">
          <Navbar.Brand href="/">myInventory</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(expanded ? false : true)} />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto" onClick={() => setExpanded(false)}>
              <Link href="/categories"><a className="nav-link">Categories</a></Link>
              <Link href="/companies"><a className="nav-link">Companies</a></Link>
              <Link href="/conditions"><a className="nav-link">Conditions</a></Link>
              <Link href="/contacts"><a className="nav-link">Contacts</a></Link>
              <Link href="/contracts"><a className="nav-link">Contracts</a></Link>
              <Link href="/items"><a className="nav-link">Items</a></Link>
              <Link href="/locations"><a className="nav-link">Locations</a></Link>
              <Link href="/policies"><a className="nav-link">Policies</a></Link>
              <Link href="/rooms"><a className="nav-link">Rooms</a></Link>
              <Link href="/subCategories"><a className="nav-link">Subcategories</a></Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Navbar fixed='bottom' bg="dark" variant="dark" className="pl-2 pr-2">
          <Navbar.Text>myInventory @ 2020</Navbar.Text>
          <Nav>
            <Navbar.Text>version 1.0</Navbar.Text>
          </Nav>
        </Navbar>

      </div>
    </>
  );
}
