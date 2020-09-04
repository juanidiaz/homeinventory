import { makeStyles } from '@material-ui/core/styles';
import { getAllLocations, createNewLocation } from '../../src/lib/apiLocation';
import Button from '@material-ui/core/Button';
import LocationsInput from '../../components/input/LocationsInput';
import LocationsList from '../../components/lists/LocationsList';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function locationsPage() {
  const classes = useStyles();

  const [showElements, setShowElements] = React.useState(true);
  const [allLocationsState, setAllLocationsState] = React.useState([]);
  const [newLocation, setNewLocation] = React.useState({});

  React.useEffect(() => getLocations(), []);

  const getLocations = () => {
    getAllLocations().then(allLocations => {
      setAllLocationsState(allLocations);
    })
  }

  const handleChange = name => event => {
    setNewLocation({
      ...newLocation,
      [name]: event.target.value
    });
  };

  const handleClickOnCreateNewLocation = () => {

    createNewLocation(newLocation).then(location => {
      console.log("ADDED!", location);
      getLocations()
      setShowElements(true);
    })
  };

  const handleClickOnCancelNewLocation = () => {
    setNewLocation({})
    setShowElements(true);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h3>Locations</h3>
        </Grid>

        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={() => setShowElements(true)}>Show all locations</Button>
        </Grid>

        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={() => setShowElements(false)}>Add new location</Button>
        </Grid>

        <Grid item xs={12}>
          {showElements ?
            <LocationsList
              allLocations={allLocationsState}
            />
            :
            <LocationsInput
              allLocations={allLocationsState}
              handleChange={handleChange}
              createNewLocation={handleClickOnCreateNewLocation}
              cancelCreateNewLocation={handleClickOnCancelNewLocation}
            />
          }
        </Grid>

      </Grid>

    </div>
  )
}
