import { getAuth } from "../../utils/common";
import { makeStyles } from "@material-ui/core/styles";
import { getAllCompanies, createNewCompany, updateCompany } from "../../src/lib/apiCompany";
import CompaniesList from "../../components/lists/CompaniesList";
import Button from "react-bootstrap/Button";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import ModalAddCompany from "../../components/modals/ModalAddCompany";

const useStyles = makeStyles((theme) => ({

}));

export default function companiesPage(props) {
  const classes = useStyles();

  const { user } = props;

  const [allCompanies, setAllCompanies] = React.useState([]);
  const [newCompany, setNewCompany] = React.useState({});
  const [openModal, setOpenModal] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);

  React.useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = () => {
    getAllCompanies().then(companies => {
      setAllCompanies(companies);
    });
  }

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditMode(false);
  };

  const handleChange = name => event => {
    setNewCompany({
      ...newCompany,
      [name]: event.target.value
    });
  };

  const handleClickOnCreateNewCompany = company => {
    if (editMode) {
      updateCompany(company).then(() => {
        handleCloseModal();
        getCompanies();
      })
    } else {
      createNewCompany(company).then(() => {
        handleCloseModal();
        getCompanies();
      })
    }
  };

  const handleClickOnCancelNewCompany = () => {
    setNewCompany({})
    handleCloseModal();
  };

  const handleClickEditCompany = company => {
    setNewCompany(company)
    setEditMode(true)
    setOpenModal(true);
  };

  console.log("== newCompany ==", newCompany)

  return allCompanies ? (

    <div>

      <ModalAddCompany
        open={openModal}
        handleClose={handleCloseModal}
        handleChange={handleChange}
        allCompanies={allCompanies}
        createNewCompany={handleClickOnCreateNewCompany}
        cancelCreateNewCompany={handleClickOnCancelNewCompany}
        company={newCompany}
        editMode={editMode}
      />

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h3>Companies</h3>
        </Grid>

        <Grid item xs={6} md={3}>
          <Button variant="success" className={classes.fillAvailable}
            size="sm"
            onClick={() => setOpenModal(true)}
          >
            <AddIcon fontSize="small" /> New company
          </Button>
        </Grid>

        <Grid item xs={12}>
          <CompaniesList
            allCompanies={allCompanies}
            editCompany={handleClickEditCompany}
          />
        </Grid>

      </Grid>
    </div>

  ) : (
      <h1>LOADING... COMPANIES</h1>
    );
};

companiesPage.getInitialProps = async (ctx) => getAuth(ctx);