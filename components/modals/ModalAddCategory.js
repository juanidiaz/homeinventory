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

const ModalAddCategory = props => {
  const classes = useStyles();
  const elementType = 'category';
  const { handleClose, open, allCategories, allSubCategories, handleChange, 
    editMode, createNewCategory, cancelCreateNewCategory, newCategory } = props;

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

  return (

    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editMode ? `Modifying ${newCategory.name}` : `Add a ${elementType}`}</Modal.Title>
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
              value={newCategory.name}
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
              value={newCategory.description}
              onChange={handleChange("description")}
            />
          </Grid>

          <Grid item xs={12} md={12}>

            <FormControl className={classes.fillAvailable}>
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

          </Grid>

          <Grid item xs={6}>
            <Button variant="secondary"
              className={classes.fillAvailable}
              onClick={handleClose}
              disabled
            >
              Add picture
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button variant="secondary"
              className={classes.fillAvailable}
              onClick={handleClose}
              disabled
            >
              Add file
            </Button>
          </Grid>

        </Grid>

      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
      </Button>
        <Button variant="primary" onClick={createNewCategory}>
          {editMode ? 'Save changes' : `Add ${elementType}`}
        </Button>
      </Modal.Footer>

    </Modal>
  )
};

ModalAddCategory.defaultProps = {
  addMode: true
};

export default ModalAddCategory;