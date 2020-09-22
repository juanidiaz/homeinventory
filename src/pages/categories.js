import { getAuth } from '../../utils/common';
import { makeStyles } from '@material-ui/core/styles';
import { getAllCategories, createNewCategory } from '../../src/lib/apiCategory';
import { getAllSubCategories, createNewSubCategory } from '../../src/lib/apiSubCategory';
import Button from 'react-bootstrap/Button';
import CategoriesList from '../../components/lists/CategoriesList';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import ModalAddCategory from '../../components/modals/ModalAddCategory';
import ModalAddSubCategory from '../../components/modals/ModalAddSubCategory';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  fillAvailable: {
    width: '-webkit-fill-available'
  }
}));

export default function categoriesPage(props) {
  const classes = useStyles();

  const { user } = props;

  const [allCategories, setAllCategories] = React.useState([]);
  const [newCategory, setNewCategory] = React.useState({});
  const [newSubCategory, setNewSubCategory] = React.useState({});
  const [openModalCategory, setOpenModalCategory] = React.useState(false);
  const [openModalSubCategory, setOpenModalSubCategory] = React.useState(false);

  React.useEffect(() => getCategories(), []);

  const getCategories = () => {
    getAllCategories().then(categories => {
      setAllCategories(categories);
    });
  }

  const handleCloseModal = () => {
    setOpenModalCategory(false);
  };

  const handleCloseModalSubCategory = () => {
    setOpenModalSubCategory(false);
  };

  const handleChange = name => event => {
    setNewCategory({
      ...newCategory,
      [name]: event.target.value
    });
  };

  const handleChangeSubCategory = name => event => {
    setNewSubCategory({
      ...newSubCategory,
      user: user._id,
      [name]: event.target.value
    });
  };

  const handleClickOnCreateNewCategory = () => {
    createNewCategory(newCategory).then(category => {
      setOpenModalCategory(false);
    })
  };

  const handleClickOnCreateNewSubCategory = () => {
    newSubCategory
    createNewSubCategory(newSubCategory).then(subCategory => {
      setOpenModalSubCategory(false);
    })
  };

  const handleClickOnCancelNewCategory = () => {
    setNewCategory({})
  };

  const handleClickOnCancelNewSubCategory = () => {
    setNewSubCategory({})
  };

  return allCategories ? (
    <div className={classes.root}>

      <ModalAddCategory
        open={openModalCategory}
        handleClose={handleCloseModal}
        handleChange={handleChange}
        allCategories={allCategories}
        createNewCategory={handleClickOnCreateNewCategory}
        cancelCreateNewCategory={handleClickOnCancelNewCategory}
        newCategory={newCategory}
      />

      <ModalAddSubCategory
        open={openModalSubCategory}
        handleClose={handleCloseModalSubCategory}
        handleChange={handleChangeSubCategory}
        createNewSubCategory={handleClickOnCreateNewSubCategory}
        cancelCreateNewSubCategory={handleClickOnCancelNewSubCategory}
        newSubCategory={newSubCategory}
      />

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h3>Categories</h3>
        </Grid>

        <Grid item xs={6} md={3}>
          <Button variant="success" className={classes.fillAvailable}
            size="sm" onClick={() => setOpenModalCategory(true)}
          >
            <AddIcon fontSize="small" /> New category
          </Button>
        </Grid>

        <Grid item xs={6} md={3}>
          <Button variant="warning" className={classes.fillAvailable}
            size="sm" onClick={() => setOpenModalSubCategory(true)}
          >
            <AddIcon fontSize="small" /> New sub category
          </Button>
        </Grid>

        <Grid item xs={12}>
          <CategoriesList
            allCategories={allCategories}
          />
        </Grid>

      </Grid>

    </div>
  ) : (
      <h1>LOADING...</h1>
    );
};

categoriesPage.getInitialProps = async (ctx) => getAuth(ctx);