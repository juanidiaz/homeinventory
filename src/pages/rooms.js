import { getAuth } from "../../utils/common";
import { makeStyles } from "@material-ui/core/styles";
import { getAllRooms, createNewRoom, updateRoom } from "../../src/lib/apiRoom";
import { getAllLocations } from "../../src/lib/apiLocation";
import Button from "react-bootstrap/Button";
import RoomsInput from "../../components/input/RoomsInput";
import RoomsList from "../../components/lists/RoomsList";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import ModalAddRoom from "../../components/modals/ModalAddRoom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function roomsPage() {
  const classes = useStyles();

  const [openModal, setOpenModal] = React.useState(false);
  const [allRooms, setAllRooms] = React.useState([]);
  const [allLocations, setAllLocations] = React.useState([]);
  const [newRoom, setNewRoom] = React.useState({});
  const [editMode, setEditMode] = React.useState(false);

  React.useEffect(() => {
    getRooms();
    getLocations();
  }, []);

  const getRooms = () => {
    getAllRooms().then(allRoomsDB => {
      setAllRooms(allRoomsDB);
    })
  };

  const getLocations = () => {
    getAllLocations().then(allLocationsDB => {
      setAllLocations(allLocationsDB);
    })
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditMode(false);
  };

  const handleChangeCheckbox = event => {
    setNewRoom({
      ...newRoom,
      [event.target.name]: event.target.checked
    });
  };

  const handleChange = name => event => {
    setNewRoom({
      ...newRoom,
      [name]: event.target.value
    });
  };

  const handleClickToAddRoom = () => {
    setNewRoom({})
    setOpenModal(true);
  };

  const handleClickOnCreateNewRoom = () => {
    if (editMode) {
      updateRoom(newRoom).then(() => {
        setOpenModal(false);
        setEditMode(false);
        getRooms();
      })
    } else {
      createNewRoom(newRoom).then(() => {
        setOpenModal(false);
        setEditMode(false);
        getRooms();
      })
    }
  };

  const handleClickOnCancelNewRoom = () => {
    setNewRoom({})
    openModal(true);
  };

  const handleClickEditRoom = room => {
    setNewRoom(room)
    setEditMode(true)
    setOpenModal(true);
  };

  return allRooms ? (
    <div className={classes.root}>

      <ModalAddRoom
        open={openModal}
        handleClose={handleCloseModal}
        handleChange={handleChange}
        handleChangeCheckbox={handleChangeCheckbox}
        allRooms={allRooms}
        allLocations={allLocations}
        createNewRoom={handleClickOnCreateNewRoom}
        cancelCreateNewRoom={handleClickOnCancelNewRoom}
        newRoom={newRoom}
        editMode={editMode}
      />

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h3>Rooms</h3>
        </Grid>

        <Grid item xs={6} md={3}>
          <Button variant="success" className={classes.fillAvailable}
            size="sm" onClick={() => handleClickToAddRoom()}
          >
            <AddIcon fontSize="small" /> New room
          </Button>
        </Grid>

        <Grid item xs={12} className={"mb-3"}>
          <RoomsList
            allRooms={allRooms}
            editRoom={handleClickEditRoom}
          />
        </Grid>

      </Grid>

    </div>
  ) : (
      <h1>LOADING... ROOMS</h1>
    );
};

roomsPage.getInitialProps = async (ctx) => getAuth(ctx);