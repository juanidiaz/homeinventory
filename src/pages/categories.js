import Button from '@material-ui/core/Button';
import CategoriesInput from '../../components/input/CategoriesInput';
import CategoriesList from '../../components/lists/CategoriesList';
import { getAllCategories, createNewCategory } from '../../src/lib/apiCategory'

export default function categoriesPage() {
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
    <div>
      <h3>CATEGORIES</h3>

      <Button variant="contained" color="primary" onClick={() => setShowElements(true)}>Show all categories</Button>
      <Button variant="contained" color="primary" onClick={() => setShowElements(false)}>Add new category</Button>

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

    </div>
  )
}
