import { getAuth } from "../../utils/common";
import { makeStyles } from "@material-ui/core/styles";
import { getAllPolicies, createNewPolicy, updatePolicy } from "../../src/lib/apiPolicy";
import PoliciesList from "../../components/lists/PoliciesList";
import Button from "react-bootstrap/Button";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import ModalAddPolicy from "../../components/modals/ModalAddPolicy";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function policiesPage(props) {
  const classes = useStyles();

  const { user } = props;

  const [openModal, setOpenModal] = React.useState(false);
  const [allPolicies, setAllPolicies] = React.useState([]);
  const [newPolicy, setNewPolicy] = React.useState({});
  const [editMode, setEditMode] = React.useState(false);

  React.useEffect(() => getPolicies(), []);

  const getPolicies = () => {
    getAllPolicies().then(policies => {
      setAllPolicies(policies);
    });
  }

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditMode(false);
  };

  const handleChange = name => event => {
    setNewPolicy({
      ...newPolicy,
      [name]: event.target.value
    });
  };

  const handleClickOnCreateNewPolicy = () => {
    if (editMode) {
      updatePolicy(newPolicy).then(() => {
        handleCloseModal();
        getPolicies();
      })
    } else {
      createNewPolicy(newPolicy).then(() => {
        handleCloseModal();
        getPolicies();
      })
    }
  };

  const handleClickOnCancelNewPolicy = () => {
    setNewPolicy({})
    handleCloseModal();
  };

  const handleClickEditPolicy = policy => {
    setNewPolicy(policy)
    setEditMode(true)
    setOpenModal(true);
  };

  console.log("== newPolicy ==", newPolicy)

  return allPolicies ? (

    <div>

      <ModalAddPolicy
        open={openModal}
        handleClose={handleCloseModal}
        handleChange={handleChange}
        allPolicies={allPolicies}
        createNewPolicy={handleClickOnCreateNewPolicy}
        cancelCreateNewPolicy={handleClickOnCancelNewPolicy}
        newPolicy={newPolicy}
        editMode={editMode}
      />

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h3>Policies</h3>
        </Grid>

        <Grid item xs={6} md={3}>
          <Button variant="success" className={classes.fillAvailable}
            size="sm"
            onClick={() => setOpenModal(true)}
          >
            <AddIcon fontSize="small" /> New policy
          </Button>
        </Grid>

        <Grid item xs={12}>
          <PoliciesList
            allPolicies={allPolicies}
            editPolicy={handleClickEditPolicy}
          />
        </Grid>

      </Grid>
    </div>

  ) : (
      <h1>LOADING... POLICIES</h1>
    );
};

policiesPage.getInitialProps = async (ctx) => getAuth(ctx);