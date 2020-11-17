import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
  fillAvailable: {
    width: "-webkit-fill-available"
  }
}));

const ModalAddLocation = props => {
  const classes = useStyles();

  const { open, handleClose, allLocations, handleChange, handleChangeAddress, handleChangeCheckbox,
    editMode, createNewLocation, cancelCreateNewLocation, newLocation } = props;

  return (

    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editMode ? `Modifying ${newLocation.name}` : `Add a location`}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={6} md={6}>
            <TextField
              fullWidth
              required
              size="small"
              id="name-input"
              label="Name"
              // variant="outlined"
              value={newLocation.name}
              onChange={handleChange("name")}
            />
          </Grid>

          <Grid item xs={6} md={6}>
            <FormControlLabel
              control={
                <Checkbox checked={newLocation.isActive} onChange={handleChangeCheckbox} name="isActive" />
              }
              label="Active"
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              size="small"
              id="description-input"
              label="Description"
              value={newLocation.description ? newLocation.description : ""}
              onChange={handleChange("description")}
            />
          </Grid>

          <Grid item xs={4} md={4}>
            <TextField
              fullWidth
              size="small"
              id="streetNumber-input"
              label="Street Number"
              value={newLocation.address ? newLocation.address.streetNumber : ""}
              onChange={handleChangeAddress("streetNumber")}
            />
          </Grid>

          <Grid item xs={4} md={4}>
            <TextField
              fullWidth
              size="small"
              id="street-input"
              label="Street"
              value={newLocation.address ? newLocation.address.street : ""}
              onChange={handleChangeAddress("street")}
            />
          </Grid>

          <Grid item xs={4} md={4}>
            <TextField
              fullWidth
              size="small"
              id="street2-input"
              label="Street2"
              value={newLocation.address ? newLocation.address.street2 : ""}
              onChange={handleChangeAddress("street2")}
            />
          </Grid>

          <Grid item xs={4} md={4}>
            <TextField
              fullWidth
              size="small"
              id="city-input"
              label="City"
              value={newLocation.address ? newLocation.address.city : ""}
              onChange={handleChangeAddress("city")}
            />
          </Grid>

          <Grid item xs={4} md={4}>
            <TextField
              fullWidth
              size="small"
              id="province-input"
              label="Province"
              value={newLocation.address ? newLocation.address.province : ""}
              onChange={handleChangeAddress("province")}
            />
          </Grid>

          <Grid item xs={4} md={4}>
            <TextField
              fullWidth
              size="small"
              id="country-input"
              label="Country"
              value={newLocation.address ? newLocation.address.country : ""}
              onChange={handleChangeAddress("country")}
            />
          </Grid>



          <Grid item xs={6}>
            <Button variant="secondary"
              className={classes.fillAvailable}
              onClick={handleClose}
              disabled
            >
              Add picture
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button variant="secondary"
              className={classes.fillAvailable}
              onClick={handleClose}
              disabled
            >
              Add file
            </Button>
          </Grid>



        </Grid>

      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
      </Button>
        <Button variant="primary" onClick={createNewLocation}>
          {editMode ? "Save changes" : "Add location"}
        </Button>
      </Modal.Footer>

    </Modal>
  )
};

ModalAddLocation.defaultProps = {
  editMode: true
};

export default ModalAddLocation;