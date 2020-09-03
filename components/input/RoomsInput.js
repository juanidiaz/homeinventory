import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  test: {
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.error.contrastText,
  }
}));

export default function RoomsInput(props) {
  const { allRooms, handleChange, createNewRoom, cancelCreateNewRoom } = props
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
            variant="outlined"
            onChange={handleChange("name")}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            size="small"
            id="description-input"
            label="Description"
            variant="outlined"
            
            onChange={handleChange("description")}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Button variant="contained" className={classes.test} onClick={() => createNewRoom()}>Add room</Button>
        </Grid>

        <Grid item xs={12} md={6}>
          <Button variant="contained"  onClick={() => cancelCreateNewRoom()}>Cancel</Button>
        </Grid>

      </Grid>

    </Paper>
  )
}
