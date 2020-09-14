import { getAuth } from '../../utils/common';
import { makeStyles } from '@material-ui/core/styles';
import { getAllCategories, createNewCategory } from '../../src/lib/apiCategory';
// import Button from '@material-ui/core/Button';
import Button from 'react-bootstrap/Button';
import CategoriesInput from '../../components/input/CategoriesInput';
import CategoriesList from '../../components/lists/CategoriesList';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function categoriesPage() {
  const classes = useStyles();

  const [showElements, setShowElements] = React.useState(true);
  const [allCategories, setAllCategories] = React.useState([]);
  const [newCategory, setNewCategory] = React.useState({});

  React.useEffect(() => getCategories(), []);

  const getCategories = () => {
    getAllCategories().then(categories => {
      setAllCategories(categories);
    });
  }

  const handleChange = name => event => {
    setNewCategory({
      ...newCategory,
      [name]: event.target.value
    });
  };

  const handleClickOnCreateNewCategory = () => {

    createNewCategory(newCategory).then(category => {
      getCategories()
      setShowElements(true);
    })
  };

  const handleClickOnCancelNewCategory = () => {
    setNewCategory({})
    setShowElements(true);
  };

  return allCategories ? (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h3>Categories</h3>
        </Grid>

        <Grid item xs={6}>
          {showElements ?
            <Button variant="success" size="sm" onClick={() => setShowElements(false)}>
              <AddIcon fontSize="small" />Add new category</Button>
            :
            null
            //<Button variant="dark" size="sm" onClick={() => setShowElements(true)}>Show all categories</Button>
          }
        </Grid>

        <Grid item xs={12}>
          {showElements ?
            <CategoriesList
              allCategories={allCategories}
            />
            :
            <CategoriesInput
              allCategories={allCategories}
              handleChange={handleChange}
              createNewCategory={handleClickOnCreateNewCategory}
              cancelCreateNewCategory={handleClickOnCancelNewCategory}
              newCategory={newCategory}
            />
          }
        </Grid>

      </Grid>

    </div>
  ) : (
      <h1>LOADING...</h1>
    );
  };

  categoriesPage.getInitialProps = async (ctx) => getAuth(ctx);