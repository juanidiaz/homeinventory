import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  test: {
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.error.contrastText,
  }
}));

export default function LocationsInput(props) {
  const { newLocation, allLocations, handleChange, createNewLocation, cancelCreateNewLocation } = props
  const classes = useStyles();

  return (
    <Paper>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            size="small"
            id="name-input"
            label="Name"
            onChange={handleChange()("name")}
            value={newLocation.name || ""}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size="small"
            id="description-input"
            label="Description"
            onChange={handleChange()("description")}
            value={newLocation.description || ""}
          />
        </Grid>

        <Grid item xs={2} md={4}>
          <TextField
            size="small"
            id="streetNumber-input"
            label="Number"
            onChange={handleChange("address")("streetNumber")}
            value={newLocation.address ? newLocation.address.streetNumber : ""}
          />
        </Grid>

        <Grid item xs={10} md={8}>
          <TextField
            fullWidth
            size="small"
            id="street-input"
            label="Street"
            onChange={handleChange("address")("street")}
            value={newLocation.address ? newLocation.address.street : ""}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size="small"
            id="street2-input"
            label="Street 2"
            onChange={handleChange("address")("street2")}
            value={newLocation.address ? newLocation.address.street2 : ""}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size="small"
            id="city-input"
            label="City"
            onChange={handleChange("address")("city")}
            value={newLocation.address ? newLocation.address.city : ""}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size="small"
            id="province-input"
            label="Province"
            onChange={handleChange("address")("province")}
            value={newLocation.address ? newLocation.address.province : ""}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size="small"
            id="country-input"
            label="Country"
            onChange={handleChange("address")("country")}
            value={newLocation.address ? newLocation.address.country : ""}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Button variant="contained" disabled={!newLocation.name} className={classes.test} onClick={() => createNewLocation()}>Add location</Button>
        </Grid>

        <Grid item xs={12} md={6}>
          <Button variant="contained" onClick={() => cancelCreateNewLocation()}>Cancel</Button>
        </Grid>

      </Grid>

    </Paper>
  )
}

LocationsInput.defaultProps = {
  newLocation: {
    name: "",
    description: "",
    isActive: true,
    user: "",
    pictures: "",
    files: "",
    status: "",
    address: {
      streetNumber: "",
      street: "",
      street2: "",
      city: "",
      province: "",
      country: ""
    }
  }
}
