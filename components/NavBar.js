import { makeStyles } from '@material-ui/core/styles';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  rootAppBar: {
    flexGrow: 1,
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

  const [expanded, setExpanded] = React.useState(false);
  console.log("expanded", expanded)
  return (
    <>
      <div className={classes.rootAppBar}>
        <Navbar expanded={expanded} collapseOnSelect expand="md" bg="dark" variant="dark" className="pl-2">
          <Navbar.Brand href="/">myInventory</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(expanded ? false : true)}/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Link href="/items"><a className="nav-link" onClick={() => setExpanded(expanded ? false : true)}>Items</a></Link>
              <Link href="/categories"><a className="nav-link" onClick={() => setExpanded(expanded ? false : true)}>Categories</a></Link>
              <Link href="/rooms"><a className="nav-link" onClick={() => setExpanded(expanded ? false : true)}>Rooms</a></Link>
              <Link href="/locations"><a className="nav-link" onClick={() => setExpanded(expanded ? false : true)}>Locations</a></Link>
              <Link href="/conditions"><a className="nav-link" onClick={() => setExpanded(expanded ? false : true)}>Conditions</a></Link>
              {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
            </Nav>
            {/* <Nav>
            <Nav.Link href="#deets">Log in</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav> */}
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
}
