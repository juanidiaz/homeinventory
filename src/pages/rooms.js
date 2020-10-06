import { getAuth } from "../../utils/common";
import { makeStyles } from "@material-ui/core/styles";
import { getAllRooms, createNewRoom } from "../../src/lib/apiRoom";
// import Button from "@material-ui/core/Button";
import Button from "react-bootstrap/Button";
import RoomsInput from "../../components/input/RoomsInput";
import RoomsList from "../../components/lists/RoomsList";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function roomsPage() {
  const classes = useStyles();

  const [showElements, setShowElements] = React.useState(true);
  const [allRoomsState, setAllRoomsState] = React.useState([]);
  const [newRoom, setNewRoom] = React.useState({});

  React.useEffect(() => getRooms(), []);

  const getRooms = () => {
    getAllRooms().then(allRooms => {
      setAllRoomsState(allRooms);
    })
  }

  const handleChange = name => event => {
    setNewRoom({
      ...newRoom,
      [name]: event.target.value
    });
  };

  const handleClickOnCreateNewRoom = () => {

    createNewRoom(newRoom).then(room => {
      getRooms()
      setShowElements(true);
    })
  };

  const handleClickOnCancelNewRoom = () => {
    setNewRoom({})
    setShowElements(true);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h3>Rooms</h3>
        </Grid>

        <Grid item xs={6}>
          {showElements ?
            <Button variant="success" size="sm" onClick={() => setShowElements(false)}>
              <AddIcon fontSize="small" />Add new room
              </Button>
            :
            null
            //<Button variant="dark" size="sm" onClick={() => setShowElements(true)}>Show all categories</Button>
          }
        </Grid>

        <Grid item xs={12}>
          {showElements ?
            <RoomsList
              allRooms={allRoomsState}
            />
            :
            <RoomsInput
              allRooms={allRoomsState}
              handleChange={handleChange}
              createNewRoom={handleClickOnCreateNewRoom}
              cancelCreateNewRoom={handleClickOnCancelNewRoom}
            />
          }
        </Grid>

      </Grid>

    </div>
  )
};

roomsPage.getInitialProps = async (ctx) => getAuth(ctx);