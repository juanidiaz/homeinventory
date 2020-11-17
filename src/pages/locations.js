import { getAuth } from "../../utils/common";
import { makeStyles } from "@material-ui/core/styles";
import { getAllLocations, createNewLocation, updateLocation } from "../../src/lib/apiLocation";
import Button from "react-bootstrap/Button";
import LocationsInput from "../../components/input/LocationsInput";
import LocationsList from "../../components/lists/LocationsList";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import ModalAddLocation from "../../components/modals/ModalAddLocation";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function locationsPage() {
  const classes = useStyles();

  const [openModal, setOpenModal] = React.useState(false);
  const [allLocations, setAllLocations] = React.useState([]);
  const [newLocation, setNewLocation] = React.useState({});
  const [editMode, setEditMode] = React.useState(false);

  React.useEffect(() => getLocations(), []);

  const getLocations = () => {
    getAllLocations().then(allLocations => {
      setAllLocations(allLocations);
    })
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditMode(false);
  };

  const handleChange = name => event => {
    setNewLocation({
      ...newLocation,
      [name]: event.target.value
    });
  };

  const handleChangeAddress = name => event => {
    setNewLocation({
      ...newLocation,
      address: {
        ...newLocation.address,
        [name]: event.target.value
      }
    });
  };

  const handleClickToAddLocation = () => {
    setNewLocation({})
    setOpenModal(true);
  };

  const handleClickOnCreateNewLocation = () => {
    if (editMode) {
      updateLocation(newLocation).then(() => {
        setOpenModal(false);
        setEditMode(false);
        getLocations();
      })
    } else {
      createNewLocation(newLocation).then(() => {
        setOpenModal(false);
        setEditMode(false);
        getLocations();
      })
    }
  };

  const handleClickOnCancelNewLocation = () => {
    setNewLocation({})
    setOpenModal(true);
  };

  const handleClickEditLocation = location => {
    setNewLocation(location)
    setEditMode(true)
    setOpenModal(true);
  };

  return allLocations ? (
    <div className={classes.root}>

      <ModalAddLocation
        open={openModal}
        handleClose={handleCloseModal}
        handleChange={handleChange}
        handleChangeAddress={handleChangeAddress}
        allLocations={allLocations}
        createNewLocation={handleClickOnCreateNewLocation}
        cancelCreateNewLocation={handleClickOnCancelNewLocation}
        newLocation={newLocation}
        editMode={editMode}
      />

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h3>Locations</h3>
        </Grid>

        <Grid item xs={6}>
          <Button variant="success" className={classes.fillAvailable}
            size="sm" onClick={() => handleClickToAddLocation()}
          >
            <AddIcon fontSize="small" />Add new location</Button>
        </Grid>

        <Grid item xs={12}>
          <LocationsList
            allLocations={allLocations}
            editLocation={handleClickEditLocation}
          />
        </Grid>

      </Grid>

    </div>
  ) : (
      <h1>LOADING... CONDITIONS</h1>
    );
};

locationsPage.getInitialProps = async (ctx) => getAuth(ctx);