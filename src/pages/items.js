import { getAuth } from "../../utils/common";
import { makeStyles } from "@material-ui/core/styles";
import { getAllItems, createNewItem, updateItem } from "../../src/lib/apiItem";
import Button from "react-bootstrap/Button";
import ItemsList from "../../components/lists/ItemsList";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import ModalAddItem from "../../components/modals/ModalAddItem";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function itemsPage() {
  const classes = useStyles();

  const [openModal, setOpenModal] = React.useState(false);
  const [allItems, setAllItems] = React.useState([]);
  const [newItem, setNewItem] = React.useState({});
  const [editMode, setEditMode] = React.useState(false);

  React.useEffect(() => getItems(), []);

  const getItems = () => {
    getAllItems().then(allItems => {
      setAllItems(allItems);
    })
  }

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditMode(false);
  };

  const handleChange = name => event => {
    setNewItem({
      ...newItem,
      [name]: event.target.value
    });
  };

  const handleClickOnCreateNewItem = () => {
    if (editMode) {
      updateItem(newItem).then(() => {
        setOpenModal(false);
        setEditMode(false);
        getItems();
      })
    } else {
      createNewItem(newItem).then(() => {
        setOpenModal(false);
        setEditMode(false);
        getItems();
      })
    }
  };

  const handleClickOnCancelNewItem = () => {
    setNewItem({})
    openModal(true);
  };

  const handleClickEditItem = item => {
    setNewItem(item)
    setEditMode(true)
    setOpenModal(true);
  };

  return allItems ? (
    <div className={classes.root}>

      <ModalAddItem
        open={openModal}
        handleClose={handleCloseModal}
        handleChange={handleChange}
        allItems={allItems}
        createNewItem={handleClickOnCreateNewItem}
        cancelCreateNewItem={handleClickOnCancelNewItem}
        newItem={newItem}
        editMode={editMode}
      />

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h3>Items</h3>
        </Grid>

        <Grid item xs={6}>
        <Button variant="success" className={classes.fillAvailable}
            size="sm" onClick={() => setOpenModal(true)}
          >
            <AddIcon fontSize="small" />Add new item</Button>
        </Grid>

        <Grid item xs={12}>
            <ItemsList
              allItems={allItems}
              editItem={handleClickEditItem}
              />
            </Grid>

      </Grid>

    </div>
  ) : (
    <h1>LOADING... ITEMS</h1>
  );
};

itemsPage.getInitialProps = async (ctx) => getAuth(ctx);