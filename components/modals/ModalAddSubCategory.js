import { makeStyles, useTheme } from '@material-ui/core/styles';
import { getAllSubCategories } from '../../src/lib/apiSubCategory';
import { Grid } from '@material-ui/core';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TextField from '@material-ui/core/TextField';
import { FormControl, InputLabel, Select, MenuItem, Input } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  fillAvailable: {
    width: '-webkit-fill-available'
  }
}));

const ModalAddSubCategory = props => {
  const classes = useStyles();
  const elementType = 'subcategory';
  const { open, handleClose, handleChange, createNewSubCategory, cancelCreateNewSubCategory, newSubCategory } = props;

  const [allSubCategories, setAllSubCategories] = React.useState([]);

  React.useEffect(() => getSubCategories(), []);

  const getSubCategories = () => {
    getAllSubCategories().then(subCategories => {
      setAllSubCategories(subCategories);
    });
  }

  return (

    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a {elementType}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              required
              size="small"
              id="name-input"
              label="Name"
              // variant="outlined"
              onChange={handleChange("name")}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <TextField
              fullWidth
              size="small"
              id="description-input"
              label="Description"
              // variant="outlined"
              onChange={handleChange("description")}
            />
          </Grid>

        </Grid>

      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
      </Button>
        <Button variant="primary" onClick={createNewSubCategory}>
          Add {elementType}
        </Button>
      </Modal.Footer>

    </Modal>
  )
};

ModalAddSubCategory.defaultProps = {
  addMode: true
};

export default ModalAddSubCategory;