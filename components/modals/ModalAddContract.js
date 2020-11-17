import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextField from "@material-ui/core/TextField";
import { FormControl, InputLabel, Select, MenuItem, Input } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  fillAvailable: {
    width: "-webkit-fill-available"
  }
}));

const ModalAddContract = props => {
  const classes = useStyles();
  const { open, handleClose, allContracts, handleChange, editMode, 
    createNewContract, cancelCreateNewContract, newContract } = props;

  return (

    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editMode ? `Modifying ${newContract.name}` : `Add a contract`}</Modal.Title>
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
              value={newContract.name}
              onChange={handleChange("name")}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              size="small"
              id="description-input"
              label="Description"
              value={newContract.description}
              onChange={handleChange("description")}
            />
          </Grid>

        </Grid>

      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
      </Button>
        <Button variant="primary" onClick={createNewContract}>
          Add contract
        </Button>
      </Modal.Footer>

    </Modal>
  )
};

ModalAddContract.defaultProps = {
  editMode: true
};

export default ModalAddContract;