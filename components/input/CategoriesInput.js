import { makeStyles } from '@material-ui/core/styles';
import { getAllSubCategories } from '../../src/lib/apiSubCategory';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { FormControl, InputLabel, Select, MenuItem, Input } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    // padding: theme.spacing(1),
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    padding: theme.spacing(1),
  },
  test: {
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.error.contrastText,
  }
}));

export default function CategoriesInput(props) {
  const { allCategories, handleChange, createNewCategory, cancelCreateNewCategory, newCategory } = props
  const classes = useStyles();

  const [allSubCategories, setAllSubCategories] = React.useState([]);

  React.useEffect(() => getSubCategories(), []);

  const getSubCategories = () => {
    getAllSubCategories().then(subCategories => {
      setAllSubCategories(subCategories);
    });
  }

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

  return allSubCategories ? (
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
            fullWidth
            required
            size="small"
            id="name-input"
            label="Name"
            variant="outlined"
            onChange={handleChange("name")}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            size="small"
            id="description-input"
            label="Description"
            variant="outlined"

            onChange={handleChange("description")}
          />
        </Grid>

        <Grid item xs={12} md={6}>

          <FormControl className={classes.formControl}>
            <InputLabel id="multiselect-subCategories-label">Sub Categories</InputLabel>
            <Select
              labelId="multiselect-subCategories-label"
              id="multiselect-subCategories"
              multiple
              value={newCategory.subCategories || []}
              onChange={handleChange('subCategories')}
              input={<Input />}
              MenuProps={MenuProps}
            >
              <MenuItem value="" disabled>Select subCategory(s)</MenuItem>
              {allSubCategories.map(subCategory => (
                <MenuItem key={subCategory._id} value={subCategory._id}>{subCategory.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/*
          <FormControl className={classes.formControl}>
            <InputLabel>Sub Categories</InputLabel>
            <Select
              labelId="select-subCategories-label"
              id="select-subCategories"
              input={<Input />}
              MenuProps={MenuProps}
              value={newCategory.subCategories}
              onChange={handleChange("subCategories")}
            >
              <MenuItem value="" disabled>Select subCategory(s)</MenuItem>
              {allSubCategories.map(subCategory => (
                <MenuItem key={subCategory._id} value={subCategory._id}>{subCategory.name}</MenuItem>
              ))}

            </Select>
          </FormControl> 
          */}

        </Grid>

        <Grid item xs={12} md={6}>
          <Button variant="contained" className={classes.test} onClick={() => createNewCategory()}>Add category</Button>
        </Grid>

        <Grid item xs={12} md={6}>
          <Button variant="contained" onClick={() => cancelCreateNewCategory()}>Cancel</Button>
        </Grid>

      </Grid>

    </Paper>
  ) : (
      <h1>LOADING...</h1>
    );
}
