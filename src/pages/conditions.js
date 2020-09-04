import { makeStyles } from '@material-ui/core/styles';
import { getAllConditions, createNewCondition } from '../../src/lib/apiCondition';
import Button from '@material-ui/core/Button';
import ConditionsInput from '../../components/input/ConditionsInput';
import ConditionsList from '../../components/lists/ConditionsList';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function conditionsPage() {
  const classes = useStyles();

  const [showElements, setShowElements] = React.useState(true);
  const [allConditionsState, setAllConditionsState] = React.useState([]);
  const [newCondition, setNewCondition] = React.useState({});

  React.useEffect(() => getConditions(), []);

  const getConditions = () => {
    getAllConditions().then(allConditions => {
      setAllConditionsState(allConditions);
    })
  }

  const handleChange = name => event => {
    setNewCondition({
      ...newCondition,
      [name]: event.target.value
    });
  };

  const handleClickOnCreateNewCondition = () => {

    createNewCondition(newCondition).then(condition => {
      console.log("ADDED!", condition);
      getConditions()
      setShowElements(true);
    })
  };

  const handleClickOnCancelNewCondition = () => {
    setNewCondition({})
    setShowElements(true);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h3>Conditions</h3>
        </Grid>

        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={() => setShowElements(true)}>Show all conditions</Button>
        </Grid>

        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={() => setShowElements(false)}>Add new condition</Button>
        </Grid>

        <Grid item xs={12}>
          {showElements ?
            <ConditionsList
              allConditions={allConditionsState}
            />
            :
            <ConditionsInput
              allConditions={allConditionsState}
              handleChange={handleChange}
              createNewCondition={handleClickOnCreateNewCondition}
              cancelCreateNewCondition={handleClickOnCancelNewCondition}
            />
          }
        </Grid>

      </Grid>

    </div>
  )
}
