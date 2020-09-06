import { makeStyles } from '@material-ui/core/styles';
import { getAllLocations, createNewLocation } from '../../src/lib/apiLocation';
// import Button from '@material-ui/core/Button';
import Button from 'react-bootstrap/Button';
import LocationsInput from '../../components/input/LocationsInput';
import LocationsList from '../../components/lists/LocationsList';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';

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

  const handleChange = path => name => event => {
    if (path) {
      setNewLocation({
        ...newLocation,
        [path]: {
          ...newLocation[path],
          [name]: event.target.value
        }
      });
    } else {
      setNewLocation({
        ...newLocation,
        [name]: event.target.value
      });
    }

  };

  const handleClickOnCreateNewLocation = () => {

    createNewLocation(newLocation).then(location => {
      console.log("ADDED!", location);
      getLocations();
      setNewLocation({})
      setShowElements(true);
    })
  };

  const handleClickOnCancelNewLocation = () => {
    setNewLocation({})
    setShowElements(true);
  };

  console.log("=====================", newLocation);

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h3>Locations</h3>
        </Grid>

        <Grid item xs={6}>
          {showElements ?
            <Button variant="success" size="sm" onClick={() => setShowElements(false)}>
              <AddIcon fontSize="small" />Add new location</Button>
            :
            null
            //<Button variant="dark" size="sm" onClick={() => setShowElements(true)}>Show all categories</Button>
          }
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
              newLocation={newLocation}
            />
          }
        </Grid>

      </Grid>

    </div>
  )
}
