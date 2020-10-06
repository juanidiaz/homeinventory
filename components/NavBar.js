import { makeStyles } from "@material-ui/core/styles";
import ReactDOM, { render } from "react-dom";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Link from "next/link";
import ModalLogin from "../components/modals/ModalLogin";

const useStyles = makeStyles((theme) => ({
  rootAppBar: {
    flexGrow: 1,
  },
}));

export default function NavBar(props) {
  const classes = useStyles();

  const { user } = props;

  const WINDOW_USER_SCRIPT_VARIABLE = "__USER__";

  if (user && typeof window !== "undefined") {
    window[WINDOW_USER_SCRIPT_VARIABLE] = user || {};
  }

  const [expanded, setExpanded] = React.useState(false);
  const [menuExpanded, setMenuExpanded] = React.useState(false);
  const [openModalLogin, setOpenModalLogin] = React.useState(false);

  const toggleMenuExpanded = () => {
    if (expanded) {
      setMenuExpanded(true)
      return;
    }
    const currentState = menuExpanded;
    setMenuExpanded(!currentState);
  };

  const handleCloseModalLogin = () => {
    setOpenModalLogin(false);
  };

  return (
    <>

      <ModalLogin
        open={openModalLogin}
        handleClose={handleCloseModalLogin}
      />

      <div className={classes.rootAppBar}>
        <Navbar fixed="top" expanded={expanded} collapseOnSelect expand="md" bg="dark" variant="dark" className="pl-2 pr-2">
          <Navbar.Brand href="/">myInventory</Navbar.Brand>

          {user ?
            <>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(expanded ? false : true)} />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto" onClick={toggleMenuExpanded}>
                  <Link href="/items"><a className="nav-link">Items</a></Link>
                  <NavDropdown title="Setup" id="basic-nav-dropdown" show={expanded || menuExpanded}>

                    {/* <Link href="/categories"><a className="nav-link">Categories</a></Link> */}
                    {/* <Link href="/subCategories"><a className="nav-link">Subcategories</a></Link> */}
                    {/* <Link href="/companies"><a className="nav-link">Companies</a></Link> */}
                    {/* <Link href="/conditions"><a className="nav-link">Conditions</a></Link> */}
                    {/* <Link href="/contacts"><a className="nav-link">Contacts</a></Link> */}
                    {/* <Link href="/contracts"><a className="nav-link">Contracts</a></Link> */}
                    {/* <Link href="/info"><a className="nav-link">Info</a></Link> */}
                    {/* <Link href="/locations"><a className="nav-link">Locations</a></Link> */}
                    {/* <Link href="/policies"><a className="nav-link">Policies</a></Link> */}
                    {/* <Link href="/rooms"><a className="nav-link">Rooms</a></Link> */}

                    <Link href="/categories">
                      <NavDropdown.Item href="/categories">
                        Categories
                      </NavDropdown.Item>
                    </Link>

                    <Link href="/conditions">
                      <NavDropdown.Item href="/conditions">
                        Conditions
                      </NavDropdown.Item>
                    </Link>

                    <NavDropdown.Divider />

                    <Link href="/locations">
                      <NavDropdown.Item href="/locations">
                        Locations
                      </NavDropdown.Item>
                    </Link>

                    <Link href="/rooms">
                      <NavDropdown.Item href="/rooms">
                        Rooms
                      </NavDropdown.Item>
                    </Link>

                    <NavDropdown.Divider />

                    <Link href="/contacts">
                      <NavDropdown.Item href="/contacts">
                        Contacts
                      </NavDropdown.Item>
                    </Link>

                    <Link href="/companies">
                      <NavDropdown.Item href="/companies">
                        Companies
                      </NavDropdown.Item>
                    </Link>

                    <NavDropdown.Divider />

                    <Link href="/contracts">
                      <NavDropdown.Item href="/contracts">
                        Contracts
                      </NavDropdown.Item>
                    </Link>

                    <Link href="/policies">
                      <NavDropdown.Item href="/policies">
                        Policies
                      </NavDropdown.Item>
                    </Link>

                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
              <Nav className="mr-auto">
                <Link href="/userProfile"><a className="nav-link">{user.name}</a></Link>
              </Nav>
            </>
            :
            <>

              <Navbar.Collapse className="justify-content-end">
                <Nav>
                  <a className="nav-link" onClick={() => { setOpenModalLogin(true) }}>
                    Log in
                      </a>
                </Nav>
              </Navbar.Collapse>
            </>
          }
        </Navbar>

        {/* FOOTER */}
        <Navbar fixed="bottom" bg="dark" variant="dark" className="pl-2 pr-2 justify-content-between">
          <Navbar.Text>myInventory @ 2020</Navbar.Text>

          <Navbar.Text>version 1.0</Navbar.Text>

          {user ?
            <Navbar.Text>Logged as: {user.name}</Navbar.Text>
            : null
          }

        </Navbar>

      </div>
    </>
  );
}
