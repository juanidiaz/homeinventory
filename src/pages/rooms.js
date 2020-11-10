import { getAuth } from "../../utils/common";
import { makeStyles } from "@material-ui/core/styles";
import { getAllRooms, createNewRoom, updateRoom } from "../../src/lib/apiRoom";
// import Button from "@material-ui/core/Button";
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
  const [newRoom, setNewRoom] = React.useState({});
  const [editMode, setEditMode] = React.useState(false);

  React.useEffect(() => getRooms(), []);

  const getRooms = () => {
    getAllRooms().then(allRooms => {
      setAllRooms(allRooms);
    })
  }

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditMode(false);
  };

  const handleChange = name => event => {
    setNewRoom({
      ...newRoom,
      [name]: event.target.value
    });
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
        allRooms={allRooms}
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
            size="sm" onClick={() => setOpenModal(true)}
          >
            <AddIcon fontSize="small" /> New room
          </Button>
        </Grid>

        <Grid item xs={12}>
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