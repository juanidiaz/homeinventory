import { makeStyles } from '@material-ui/core/styles';
import { getAllCategories, createNewCategory } from '../../src/lib/apiCategory';
import Button from '@material-ui/core/Button';
import CategoriesInput from '../../components/input/CategoriesInput';
import CategoriesList from '../../components/lists/CategoriesList';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function categoriesPage() {
  const classes = useStyles();

  const [showElements, setShowElements] = React.useState(true);
  const [allCategoriesState, setAllCategoriesState] = React.useState([]);
  const [newCategory, setNewCategory] = React.useState({});

  React.useEffect(() => getCategories(), []);

  const getCategories = () => {
    getAllCategories().then(allCategories => {
      setAllCategoriesState(allCategories);
    })
  }

  const handleChange = name => event => {
    setNewCategory({
      ...newCategory,
      [name]: event.target.value
    });
  };

  const handleClickOnCreateNewCategory = () => {
    console.log("TRYING", newCategory);

    createNewCategory(newCategory).then(category => {
      console.log("ADDED!", category);
      getCategories()
      setShowElements(true);
    })
  };

  const handleClickOnCancelNewCategory = () => {
    setNewCategory({})
    setShowElements(true);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h3>Categories</h3>
        </Grid>

        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={() => setShowElements(true)}>Show all categories</Button>
        </Grid>

        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={() => setShowElements(false)}>Add new category</Button>
        </Grid>

        <Grid item xs={12}>
          {showElements ?
            <CategoriesList
              allCategories={allCategoriesState}
            />
            :
            <CategoriesInput
              allCategories={allCategoriesState}
              handleChange={handleChange}
              createNewCategory={handleClickOnCreateNewCategory}
              cancelCreateNewCategory={handleClickOnCancelNewCategory}
            />
          }
        </Grid>

      </Grid>

    </div>
  )
}
