import { getAllLocations } from "../../src/lib/apiLocation";
import { getAllRooms } from "../../src/lib/apiRoom";
import { getAllCategories, getCategory } from "../../src/lib/apiCategory";
import { getAllSubCategories } from "../../src/lib/apiSubCategory";
import { getAllConditions } from "../../src/lib/apiCondition";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  formControl: {
    // padding: theme.spacing(1),
    margin: theme.spacing(1),
    minWidth: 120,
  },
  test: {
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.error.contrastText,
  }
}));

export default function ItemsInput(props) {
  const { allItems, handleChange, createNewItem, cancelCreateNewItem, newItem,
    handleChangeSelect
  } = props
  const classes = useStyles();

  const [allCategories, setAllCategories] = React.useState([]);
  const [allConditions, setAllConditions] = React.useState([]);
  const [allLocations, setAllLocations] = React.useState([]);
  const [allRooms, setAllRooms] = React.useState([]);
  const [subCategoriesState, setSubCategoriesState] = React.useState([]);

  React.useEffect(() => {
    getAllCategories().then(categories => setAllCategories(categories));
    getAllConditions().then(conditions => setAllConditions(conditions));
    getAllLocations().then(locations => setAllLocations(locations));
    getAllRooms().then(rooms => setAllRooms(rooms));
  }, []);

  React.useEffect(() => {
    console.log("CHANGE", newItem.category)

    if (newItem.category) {
      getCategory(newItem.category).then(category => setSubCategoriesState(category.subCategories));
    }
  }, [newItem]);

  console.log("INPUT", { subCategoriesState, allConditions, allLocations, allRooms })

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return allCategories && allConditions && allLocations && allRooms ? (
    <Paper>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12} md={6}>
          <TextField
            className={classes.root}
            fullWidth
            required
            size="small"
            id="name-input"
            label="Name"
            onChange={handleChange("name")}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            className={classes.root}
            fullWidth
            size="small"
            id="description-input"
            label="Description"
            onChange={handleChange("description")}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl className={classes.formControl}>
            <InputLabel>Location</InputLabel>
            <Select
              labelId="select-location-label"
              id="select-location"
              input={<Input />}
              MenuProps={MenuProps}
              value={newItem.location}
              onChange={handleChange("location")}
            >
              <MenuItem value="" disabled>Select a location</MenuItem>
              {allLocations.map(location => (
                <MenuItem key={location._id} value={location._id}>{location.name}</MenuItem>
              ))}

            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl className={classes.formControl}>
            <InputLabel>Room</InputLabel>
            <Select
              labelId="select-room-label"
              id="select-room"
              input={<Input />}
              fullWidth
              MenuProps={MenuProps}
              value={newItem.room}
              onChange={handleChange("room")}
            >
              <MenuItem value="" disabled>Select a room</MenuItem>
              {allRooms.map(room => (
                <MenuItem key={room._id} value={room._id}>{room.name}</MenuItem>
              ))}

            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl className={classes.formControl}>
            <InputLabel>Category</InputLabel>
            <Select
              labelId="select-category-label"
              id="select-category"
              input={<Input />}
              fullWidth
              MenuProps={MenuProps}
              value={newItem.category}
              onChange={handleChange("category")}
            >
              <MenuItem value="" disabled>Select a category</MenuItem>
              {allCategories.map(category => (
                <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
              ))}

            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl className={classes.formControl}>
            <InputLabel>Sub Category</InputLabel>
            <Select
              labelId="select-subCategory-label"
              id="select-subCategory"
              input={<Input />}
              fullWidth
              MenuProps={MenuProps}
              value={subCategoriesState}
              onChange={handleChange("subCategory")}
            >
              <MenuItem value="" disabled>Select a subCategory</MenuItem>
              {subCategoriesState ? subCategoriesState.map(subCategory => {
                console.log("THIS ONE", subCategory)

                return (
                  <MenuItem key={subCategory._id} value={subCategory._id}>{subCategory.name}</MenuItem>
                )
              }) : null}

            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <Button variant="contained" className={classes.test} onClick={() => createNewItem()}>Add item</Button>
        </Grid>

        <Grid item xs={12} md={6}>
          <Button variant="contained" onClick={() => cancelCreateNewItem()}>Cancel</Button>
        </Grid>

      </Grid>

    </Paper>
  ) : (
      <h1>LOADING...</h1>
    );
}
