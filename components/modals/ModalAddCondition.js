import { Grid } from "@material-ui/core";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextField from "@material-ui/core/TextField";

const ModalAddCondition = props => {
  const { open, handleClose, allConditions, handleChange, editMode, createNewCondition, cancelCreateNewCondition, newCondition } = props;

  return (

    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
      <Modal.Title>{editMode ? `Modifying ${newCondition.name}` : `Add a condition`}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
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
              value={newCondition.name}
              onChange={handleChange("name")}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              size="small"
              id="description-input"
              label="Description"
              value={newCondition.description}
              onChange={handleChange("description")}
            />
          </Grid>

        </Grid>

      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
      </Button>
        <Button variant="primary" onClick={createNewCondition}>
          Add condition
        </Button>
      </Modal.Footer>

    </Modal>
  )
};

ModalAddCondition.defaultProps = {
  editMode: true
};

export default ModalAddCondition;