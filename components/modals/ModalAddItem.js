import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextField from "@material-ui/core/TextField";
import { FormControl, InputLabel, Select, MenuItem, Input, InputAdornment } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
  fillAvailable: {
    width: "-webkit-fill-available"
  }
}));

const ModalAddItem = props => {
  const classes = useStyles();

  const { open, handleClose, handleChange, handleChangeDate, handleChangeCheckbox, editMode,
    createNewItem, cancelCreateNewItem, newItem, allItems, allLocations, allCategories,
    allSubCategories, allRooms, allConditions, allCompanies, allContracts } = props;

  const getRoomsFromLocation = location => {
    if (!allRooms) return;

    return allRooms.map(room => {
      if (!room.isActive) return;

      if (location === room.location._id) return (
        <MenuItem key={room._id} value={room._id}>{room.name}</MenuItem>
      )
    })
  };

  return !allLocations ? null : (

    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editMode ? `Modifying ${newItem.name}` : `Add an item`}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={6} md={6}> {/* Name */}
            <TextField
              fullWidth
              required
              size="small"
              id="name-input"
              label="Name"
              value={newItem.name}
              onChange={handleChange("name")}
            />
          </Grid>

          <Grid item xs={6} md={6}>
            <FormControlLabel
              control={
                <Checkbox checked={newItem.isActive} onChange={handleChangeCheckbox} name="isActive" />
              }
              label="Active"
            />
          </Grid>

          <Grid item xs={12} md={12}> {/* Description */}
            <TextField
              fullWidth
              multiline
              rows={4}
              rowsMax={6}
              size="small"
              id="description-input"
              label="Description"
              value={newItem.description}
              onChange={handleChange("description")}
            />
          </Grid>

          <Grid item xs={12} md={12}> {/* Location */}
            <FormControl className={classes.fillAvailable}>
              <InputLabel id="select-location-label">Location</InputLabel>
              <Select
                labelId="select-location-label"
                id="select-location"
                value={newItem.location}
                onChange={handleChange("location")}
                input={<Input />}
              >
                <MenuItem value="" disabled>Select location</MenuItem>
                {allLocations.map(location => {
                  if (!location.isActive) return;

                  return (
                    <MenuItem key={location._id} value={location._id}>{location.name}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={12}> {/* Room */}
            <FormControl className={classes.fillAvailable}>
              <InputLabel id="select-room-label">Room</InputLabel>
              <Select
                labelId="select-room-label"
                id="select-room"
                value={newItem.room}
                onChange={handleChange("room")}
                input={<Input />}
                disabled={!newItem.location}
              >
                <MenuItem value="" disabled>Select room</MenuItem>

                {getRoomsFromLocation(newItem.location)}

              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={12}> {/* Category */}
            <FormControl className={classes.fillAvailable}>
              <InputLabel id="select-category-label">Category</InputLabel>
              <Select
                labelId="select-category-label"
                id="select-category"
                value={newItem.category}
                onChange={handleChange("category")}
                input={<Input />}
              >
                <MenuItem value="" disabled>Select category</MenuItem>
                {allCategories.map(category => {
                  if (!category.isActive) return;

                  return (
                    <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                  )
                })}
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

          <Grid item xs={12} md={12}> {/* Condition */}
            <FormControl className={classes.fillAvailable}>
              <InputLabel id="select-condition-label">Condition</InputLabel>
              <Select
                labelId="select-condition-label"
                id="select-condition"
                value={newItem.condition}
                onChange={handleChange("condition")}
                input={<Input />}
              >
                <MenuItem value="" disabled>Select item's condition</MenuItem>
                {allConditions.map(condition => {
                  if (!condition.isActive) return;

                  return (
                    <MenuItem key={condition._id} value={condition._id}>{condition.name}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={12}> {/* Notes */}
            <TextField
              fullWidth
              multiline
              rows={4}
              rowsMax={6}
              size="small"
              id="notes-input"
              label="Notes"
              value={newItem.notes}
              onChange={handleChange("notes")}
              placeholder="Some notes about this item..."
            />
          </Grid>

          <Grid item xs={4}> {/* Estimated value */}
            <FormControl fullWidth className={classes.margin}>
              <InputLabel htmlFor="estimatedValue-input">Estimated current value</InputLabel>
              <Input
                id="estimatedValue-input"
                value={newItem.estimatedValue}
                onChange={handleChange("estimatedValue")}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                endAdornment={<InputAdornment position="end">CAD</InputAdornment>}
              />
            </FormControl>
          </Grid>

          <Grid item xs={4}> {/* Model */}
            <TextField
              fullWidth
              size="small"
              id="model-input"
              label="Model"
              value={newItem.model}
              onChange={handleChange("model")}
            />
          </Grid>

          <Grid item xs={4}> {/* Brand */}
            <TextField
              fullWidth
              size="small"
              id="brand-input"
              label="Brand"
              value={newItem.brand}
              onChange={handleChange("brand")}
            />
          </Grid>

          <Grid item xs={12} md={12}> {/* Serial number */}
            <TextField
              fullWidth
              size="small"
              id="serialNumber-input"
              label="Serial number"
              value={newItem.serialNumber}
              onChange={handleChange("serialNumber")}
            />
          </Grid>

          <Grid item xs={12} md={12}> {/* Purchase date */}

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                autoOk
                variant="dialog"
                clearable
                format="MM/dd/yyyy"
                margin="normal"
                id="purchaseDate-date-picker-inline"
                label="Purchase date"
                value={newItem.purchaseInfo && newItem.purchaseInfo.purchaseDate ? newItem.purchaseInfo.purchaseDate : ''}
                // value={newItem.purchaseDate}
                onChange={handleChangeDate("purchaseDate")}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item xs={12} md={12}> {/* Company */}
            <FormControl className={classes.fillAvailable}>
              <InputLabel id="select-company-label">Company</InputLabel>
              <Select
                labelId="select-company-label"
                id="select-company"
                value={newItem.company}
                onChange={handleChange("company")}
                input={<Input />}
              >
                <MenuItem value="" disabled>Select company</MenuItem>
                {allCompanies.map(company => {
                  if (!company.isActive) return;

                  return (
                    <MenuItem key={company._id} value={company._id}>{company.name}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>







        </Grid>

      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
      </Button>
        <Button variant="primary" onClick={createNewItem}>
          Add item
        </Button>
      </Modal.Footer>

    </Modal>
  )
};

ModalAddItem.defaultProps = {
  editMode: true
};

export default ModalAddItem;