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

const ModalAddRoom = props => {
  const classes = useStyles();

  const { open, handleClose, allRooms, handleChange, editMode,
    createNewRoom, cancelCreateNewRoom, newRoom, allLocations } = props;

  return (

    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editMode ? `Modifying ${newRoom.name}` : `Add a room`}</Modal.Title>
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
              value={newRoom.name}
              onChange={handleChange("name")}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              size="small"
              id="description-input"
              label="Description"
              value={newRoom.description}
              onChange={handleChange("description")}
            />
          </Grid>

          <Grid item xs={12} md={12}>

            <FormControl className={classes.fillAvailable}>
              <InputLabel id="select-location-label">Location</InputLabel>
              <Select
                labelId="select-location-label"
                id="select-location"
                value={newRoom.location || []}
                onChange={handleChange("location")}
                input={<Input />}
              >
                <MenuItem value="" disabled>Select location</MenuItem>
                {allLocations.map(location => (
                  <MenuItem key={location._id} value={location._id}>{location.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

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
        <Button variant="primary" onClick={createNewRoom}>
          Add room
        </Button>
      </Modal.Footer>

    </Modal>
  )
};

ModalAddRoom.defaultProps = {
  editMode: true
};

export default ModalAddRoom;