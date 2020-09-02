import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function CategoriesInput(props) {
  const { allCategories, handleChange, createNewCategory, cancelCreateNewCategory } = props
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          required
          id="name-input"
          label="Name"
          variant="outlined"
          onChange={handleChange("name")}
        />
        <TextField
          required
          id="description-input"
          label="Description"
          variant="outlined"
          onChange={handleChange("description")}
        />
        <Button variant="contained" color="secondary" onClick={() => createNewCategory()}>Add category</Button>
        <Button variant="contained" color="secondary" onClick={() => cancelCreateNewCategory()}>Cancel</Button>

      </div>
    </form>
  )
}
