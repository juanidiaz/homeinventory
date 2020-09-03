import { makeStyles } from '@material-ui/core/styles';
import { getAllItems, createNewItem } from '../../src/lib/apiItem';
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
          <Button variant="contained" color="primary" onClick={() => setShowElements(false)}>Add new item</Button>
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
              createNewItem={handleClickOnCreateNewItem}
              cancelCreateNewItem={handleClickOnCancelNewItem}
            />
          }
        </Grid>

      </Grid>

    </div>
  )
}
