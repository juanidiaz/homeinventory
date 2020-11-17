import { getAuth } from "../../utils/common";
import { makeStyles } from "@material-ui/core/styles";
import { getAllContracts, createNewContract, updateContract } from "../../src/lib/apiContract";
import ContractsList from "../../components/lists/ContractsList";
import Button from "react-bootstrap/Button";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import ModalAddContract from "../../components/modals/ModalAddContract";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function contractsPage(props) {
  const classes = useStyles();

  const { user } = props;

  const [openModal, setOpenModal] = React.useState(false);
  const [allContracts, setAllContracts] = React.useState([]);
  const [newContract, setNewContract] = React.useState({});
  const [editMode, setEditMode] = React.useState(false);

  React.useEffect(() => getContracts(), []);

  const getContracts = () => {
    getAllContracts().then(contracts => {
      setAllContracts(contracts);
    });
  }

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditMode(false);
  };

  const handleChange = name => event => {
    setNewContract({
      ...newContract,
      [name]: event.target.value
    });
  };

  const handleClickOnCreateNewContract = () => {
    if (editMode) {
      updateContract(newContract).then(() => {
        handleCloseModal();
        getContracts();
      })
    } else {
      createNewContract(newContract).then(() => {
        handleCloseModal();
        getContracts();
      })
    }
  };

  const handleClickOnCancelNewContract = () => {
    setNewContract({})
    handleCloseModal();
  };

  const handleClickEditContract = contract => {
    setNewContract(contract)
    setEditMode(true)
    setOpenModal(true);
  };

  console.log("== newContract ==", newContract)

  return allContracts ? (

    <div>

      <ModalAddContract
        open={openModal}
        handleClose={handleCloseModal}
        handleChange={handleChange}
        allContracts={allContracts}
        createNewContract={handleClickOnCreateNewContract}
        cancelCreateNewContract={handleClickOnCancelNewContract}
        newContract={newContract}
        editMode={editMode}
      />

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h3>Contracts</h3>
        </Grid>

        <Grid item xs={6} md={3}>
          <Button variant="success" className={classes.fillAvailable}
            size="sm"
            onClick={() => setOpenModal(true)}
          >
            <AddIcon fontSize="small" /> New contract
          </Button>
        </Grid>

        <Grid item xs={12}>
          <ContractsList
            allContracts={allContracts}
            editContract={handleClickEditContract}
          />
        </Grid>

      </Grid>
    </div>

  ) : (
      <h1>LOADING... CONTRACTS</h1>
    );
};

contractsPage.getInitialProps = async (ctx) => getAuth(ctx);