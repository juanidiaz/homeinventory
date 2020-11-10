import { Grid } from "@material-ui/core";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextField from "@material-ui/core/TextField";

const ModalAddContact = props => {
  const { open, handleClose, allContacts, handleChange, editMode, createNewContact, cancelCreateNewContact, newContact } = props;

  return (

    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
      <Modal.Title>{editMode ? `Modifying ${newContact.name}` : `Add a contact`}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Grid
          container
          direction="row"
          justify="center"
          alignContacts="center"
          spacing={2}
        >
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              required
              size="small"
              id="name-input"
              label="Name"
              // variant="outlined"
              value={newContact.name}
              onChange={handleChange("name")}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              size="small"
              id="description-input"
              label="Description"
              value={newContact.description}
              onChange={handleChange("description")}
            />
          </Grid>

        </Grid>

      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
      </Button>
        <Button variant="primary" onClick={createNewContact}>
          Add contact
        </Button>
      </Modal.Footer>

    </Modal>
  )
};

ModalAddContact.defaultProps = {
  editMode: true
};

export default ModalAddContact;