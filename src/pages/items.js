import { makeStyles } from '@material-ui/core/styles';
import { getAllItems, createNewItem } from '../../src/lib/apiItem';
import { getAllLocations } from '../../src/lib/apiLocation';
import { getAllRooms } from '../../src/lib/apiRoom';
import { getAllCategories } from '../../src/lib/apiCategory';
import { getAllConditions } from '../../src/lib/apiCondition';

import Button from '@material-ui/core/Button';
import ItemsInput from '../../components/input/ItemsInput';
import ItemsList from '../../components/lists/ItemsList';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function itemsPage() {
  const classes = useStyles();

  const [showElements, setShowElements] = React.useState(true);
  const [allItemsState, setAllItemsState] = React.useState([]);
  const [newItem, setNewItem] = React.useState({});

  React.useEffect(() => getItems(), []);

  const getItems = () => {
    getAllItems().then(allItems => {
      console.log("ALL ROOMS", allItems)
      setAllItemsState(allItems);
    })
  }

  const handleChange = name => event => {
    setNewItem({
      ...newItem,
      [name]: event.target.value
    });
  };

  const handleChangeSelect = name => event => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setNewItem({
      ...newItem,
      [name]: value
    });

  };

  const handleClickOnCreateNewItem = () => {
    console.log("TRYING", newItem);

    createNewItem(newItem).then(item => {
      console.log("ADDED!", item);
      getItems()
      setShowElements(true);
    })
  };

  const handleClickOnCancelNewItem = () => {
    setNewItem({})
    setShowElements(true);
  };

  console.log("  NEW ITEM", newItem)

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h3>Items</h3>
        </Grid>

        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={() => setShowElements(true)}>Show all items</Button>
        </Grid>

        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={() => setShowElements(false)} hidden={!showElements}>Add new item</Button>
        </Grid>

        <Grid item xs={12}>
          {showElements ?
            <ItemsList
              allItems={allItemsState}
            />
            :
            <ItemsInput
              allItems={allItemsState}
              handleChange={handleChange}
              handleChangeSelect={handleChangeSelect}
              createNewItem={handleClickOnCreateNewItem}
              cancelCreateNewItem={handleClickOnCancelNewItem}
              newItem={newItem}
            />
          }
        </Grid>

      </Grid>

    </div>
  )
}
