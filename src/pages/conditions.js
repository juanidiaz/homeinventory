import { getAuth } from "../../utils/common";
import { makeStyles } from "@material-ui/core/styles";
import { getAllConditions, createNewCondition, updateCondition } from "../../src/lib/apiCondition";
import Button from "react-bootstrap/Button";
import ConditionsInput from "../../components/input/ConditionsInput";
import ConditionsList from "../../components/lists/ConditionsList";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import ModalAddCondition from "../../components/modals/ModalAddCondition";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function conditionsPage() {
  const classes = useStyles();

  const [openModal, setOpenModal] = React.useState(false);
  const [allConditions, setAllConditions] = React.useState([]);
  const [newCondition, setNewCondition] = React.useState({});
  const [editMode, setEditMode] = React.useState(false);

  React.useEffect(() => getConditions(), []);

  const getConditions = () => {
    getAllConditions().then(allConditions => {
      setAllConditions(allConditions);
    })
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditMode(false);
  };

  const handleChange = name => event => {
    setNewCondition({
      ...newCondition,
      [name]: event.target.value
    });
  };

  const handleClickOnCreateNewCondition = () => {
    if (editMode) {
      updateCondition(newCondition).then(() => {
        setOpenModal(false);
        setEditMode(false);
        getConditions();
      })
    } else {
      createNewCondition(newCondition).then(() => {
        setOpenModal(false);
        setEditMode(false);
        getConditions();
      })
    }
  };

  const handleClickOnCancelNewCondition = () => {
    setNewCondition({})
    openModal(true);
  };

  const handleClickEditCondition = condition => {
    setNewCondition(condition)
    setEditMode(true)
    setOpenModal(true);
  };

  return allConditions ? (
    <div className={classes.root}>

      <ModalAddCondition
        open={openModal}
        handleClose={handleCloseModal}
        handleChange={handleChange}
        allConditions={allConditions}
        createNewCondition={handleClickOnCreateNewCondition}
        cancelCreateNewCondition={handleClickOnCancelNewCondition}
        newCondition={newCondition}
        editMode={editMode}
      />

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h3>Conditions</h3>
        </Grid>

        <Grid item xs={6}>
          <Button variant="success" className={classes.fillAvailable}
            size="sm" onClick={() => setOpenModal(true)}
          >
            <AddIcon fontSize="small" />Add new condition</Button>
        </Grid>

        <Grid item xs={12}>
          <ConditionsList
            allConditions={allConditions}
            editCondition={handleClickEditCondition}
          />
        </Grid>

      </Grid>

    </div>
  ) : (
      <h1>LOADING... CONDITIONS</h1>
    );
};

conditionsPage.getInitialProps = async (ctx) => getAuth(ctx);