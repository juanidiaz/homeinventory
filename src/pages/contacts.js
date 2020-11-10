import { getAuth } from "../../utils/common";
import { makeStyles } from "@material-ui/core/styles";
import { getAllContacts, createNewContact, updateContact } from "../../src/lib/apiContact";
import Button from "react-bootstrap/Button";
import ContactsList from "../../components/lists/ContactsList";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import ModalAddContact from "../../components/modals/ModalAddContact";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function contactsPage() {
  const classes = useStyles();

  const [openModal, setOpenModal] = React.useState(false);
  const [allContacts, setAllContacts] = React.useState([]);
  const [newContact, setNewContact] = React.useState({});
  const [editMode, setEditMode] = React.useState(false);

  React.useEffect(() => getContacts(), []);

  const getContacts = () => {
    getAllContacts().then(allContacts => {
      setAllContacts(allContacts);
    })
  }

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditMode(false);
  };

  const handleChange = name => event => {
    setNewContact({
      ...newContact,
      [name]: event.target.value
    });
  };

  const handleClickOnCreateNewContact = () => {
    if (editMode) {
      updateContact(newContact).then(() => {
        setOpenModal(false);
        setEditMode(false);
        getContacts();
      })
    } else {
      createNewContact(newContact).then(() => {
        setOpenModal(false);
        setEditMode(false);
        getContacts();
      })
    }
  };

  const handleClickOnCancelNewContact = () => {
    setNewContact({})
    openModal(true);
  };

  const handleClickEditContact = contact => {
    setNewContact(contact)
    setEditMode(true)
    setOpenModal(true);
  };

  return allContacts ? (
    <div className={classes.root}>

      <ModalAddContact
        open={openModal}
        handleClose={handleCloseModal}
        handleChange={handleChange}
        allContacts={allContacts}
        createNewContact={handleClickOnCreateNewContact}
        cancelCreateNewContact={handleClickOnCancelNewContact}
        newContact={newContact}
        editMode={editMode}
      />

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h3>Contacts</h3>
        </Grid>

        <Grid item xs={6}>
        <Button variant="success" className={classes.fillAvailable}
            size="sm" onClick={() => setOpenModal(true)}
          >
            <AddIcon fontSize="small" />Add new contact</Button>
        </Grid>

        <Grid item xs={12}>
            <ContactsList
              allContacts={allContacts}
              editContact={handleClickEditContact}
              />
            </Grid>

      </Grid>

    </div>
  ) : (
    <h1>LOADING... ITEMS</h1>
  );
};

contactsPage.getInitialProps = async (ctx) => getAuth(ctx);