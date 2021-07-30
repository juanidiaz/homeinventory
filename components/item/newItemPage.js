import { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';

import { useFormik } from 'formik';
import * as yup from 'yup';
import mainConstants from "../../lib/mainConstants.json";
import { getCategories } from "../../controllers/categories";
import { getCompanies } from "../../controllers/companies";
import { getConditions } from "../../controllers/conditions";
import { getContacts } from "../../controllers/contacts";
import { getContracts } from "../../controllers/contracts";
import { getItems } from "../../controllers/items";
import { getLocations } from "../../controllers/locations";
import { getRooms } from "../../controllers/rooms";

import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';

const validationSchema = yup.object({
  name: yup
    .string("")
    .required("Enter a name for the item"),
  // description: yup
  //   .string("")
  //   .required(""),
  // notes: yup
  //   .string("")
  //   .required(""),
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  topPage: {
    padding: theme.spacing(2),
  },
  controlFormLight: {
    marginBottom: 20,

    // (Note: space or no space after & matters. See SASS "parent selector".)
    "& .MuiOutlinedInput-root": {  // - The Input-root, inside the TextField-root
      backgroundColor: mainConstants.form.light.background,
      borderColor: mainConstants.form.light.border,
      "& fieldset": {               // - The <fieldset> inside the Input-root
        borderColor: mainConstants.form.light.border,     // - Set the Input border
      },
      "&:hover fieldset": {
        borderColor: mainConstants.form.light.border,     // - Set the Input border when parent has :hover
      },
      "&.Mui-focused": {   // - Set the Input border when parent is focused 
        color: mainConstants.form.light.borderFocus,
        backgroundColor: mainConstants.form.light.backgroundFocus,
        "& fieldset": {   // - Set the Input border when parent is focused 
          borderColor: mainConstants.form.light.borderFocus,
        },
      },
    },
    "& .MuiInputLabel-root": {
      color: mainConstants.form.light.border,
      "&.Mui-focused": {
        color: mainConstants.form.light.borderFocus,
      },

    },
  },
  controlFormDark: {
    marginBottom: 20,

    // (Note: space or no space after & matters. See SASS "parent selector".)
    "& .MuiOutlinedInput-root": {  // - The Input-root, inside the TextField-root
      backgroundColor: mainConstants.form.dark.background,
      borderColor: mainConstants.form.dark.border,
      color: mainConstants.text.primary,
      "& fieldset": {               // - The <fieldset> inside the Input-root
        borderColor: mainConstants.form.dark.border,     // - Set the Input border
      },
      "&:hover fieldset": {
        borderColor: mainConstants.form.dark.border,     // - Set the Input border when parent has :hover
      },
      "&.Mui-focused fieldset": {   // - Set the Input border when parent is focused 
        borderColor: mainConstants.form.dark.border,
      },
    },
    "& .MuiInputLabel-root": {
      color: mainConstants.form.dark.border,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function AddNewItemPage(props) {
  const { userInfo } = props;
  const classes = useStyles();

  useEffect(() => {
    getAllCategories();
    getAllCompanies();
    getAllConditions();
    getAllContacts();
    getAllContracts();
    getAllItems();
    getAllLocations();
    getAllRooms();
  }, []);

  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [items, setItems] = useState([]);
  const [locations, setLocations] = useState([]);
  const [rooms, setRooms] = useState([]);

  const getAllCategories = () => getCategories().then(categories => setCategories(categories))
  const getAllCompanies = () => getCompanies().then(companies => setCompanies(companies))
  const getAllConditions = () => getConditions().then(conditions => setConditions(conditions))
  const getAllContacts = () => getContacts().then(contacts => setContacts(contacts))
  const getAllContracts = () => getContracts().then(contracts => setContracts(contracts))
  const getAllItems = () => getItems().then(items => setItems(items))
  const getAllLocations = () => getLocations().then(locations => setLocations(locations))
  const getAllRooms = () => getRooms().then(rooms => setRooms(rooms))

  const formik = useFormik({
    initialValues: {
      category: "",
      company: "",
      condition: "",
      contact: "",
      contract: "",
      description: "",
      isActive: false,
      location: "",
      name: "",
      notes: "",
      room: "",
      user: "",
    },
    validationSchema,
    onSubmit: async values => {
      console.log("=== NEW ITEM XXX")

      console.log("=== NEW ITEM", values)
    }
  })

  const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <section className={classes.topPage}>
      <h1>New item</h1>

      <form onSubmit={formik.handleSubmit}>
        <h3>Basic info</h3>

        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>

        <TextField
          className={classes.controlFormLight}
          required
          variant="outlined"
          fullWidth
          id="name"
          name="name"
          label="Item name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          className={classes.controlFormLight}
          variant="outlined"
          fullWidth
          id="description"
          name="description"
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="location-label">Location</InputLabel>
          <Select
            labelId="location-label"
            id="location"
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
            label="Location"
          >
            <MenuItem value="" disabled><em>Select one...</em></MenuItem>
            {locations.map(location => <MenuItem key={location._id} value={location._id}>{location.name}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="room-label">Room</InputLabel>
          <Select
            labelId="room-label"
            id="room"
            name="room"
            value={formik.values.room}
            onChange={formik.handleChange}
            label="Room"
          >
            <MenuItem value="" disabled><em>Select one...</em></MenuItem>
            {rooms.map(room => <MenuItem key={room._id} value={room._id}>{room.name}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            label="Category"
          >
            <MenuItem value="" disabled><em>Select one...</em></MenuItem>
            {categories.map(category => <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>)}
          </Select>
        </FormControl>

        <Divider />
        <h3>Aditional info</h3>
        <p>Pictures...</p>
        <p>Files...</p>

        <Divider />
        <h3>Advanced info</h3>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="condition-label">Condition</InputLabel>
          <Select
            labelId="condition-label"
            id="condition"
            name="condition"
            value={formik.values.condition}
            onChange={formik.handleChange}
            label="Condition"
          >
            <MenuItem value="" disabled><em>Select one...</em></MenuItem>
            {conditions.map(condition => <MenuItem key={condition._id} value={condition._id}>{condition.name}</MenuItem>)}
          </Select>
        </FormControl>

        <TextField
          className={classes.controlFormLight}
          variant="outlined"
          fullWidth
          id="notes"
          name="notes"
          multiline
          label="Notes"
          value={formik.values.notes}
          onChange={formik.handleChange}
          error={formik.touched.notes && Boolean(formik.errors.notes)}
          helperText={formik.touched.notes && formik.errors.notes}
        />

        <TextField
          className={classes.controlFormLight}
          variant="outlined"
          fullWidth
          id="estimatedValue"
          name="estimatedValue"
          label="Estimated value $"
          value={formik.values.estimatedValue}
          onChange={formik.handleChange}
          error={formik.touched.estimatedValue && Boolean(formik.errors.estimatedValue)}
          helperText={formik.touched.estimatedValue && formik.errors.estimatedValue}
        />

        <TextField
          className={classes.controlFormLight}
          variant="outlined"
          fullWidth
          id="model"
          name="model"
          label="Model"
          value={formik.values.model}
          onChange={formik.handleChange}
          error={formik.touched.model && Boolean(formik.errors.model)}
          helperText={formik.touched.model && formik.errors.model}
        />

        <TextField
          className={classes.controlFormLight}
          variant="outlined"
          fullWidth
          id="brand"
          name="brand"
          label="Brand or make"
          value={formik.values.brand}
          onChange={formik.handleChange}
          error={formik.touched.brand && Boolean(formik.errors.brand)}
          helperText={formik.touched.brand && formik.errors.brand}
        />

        <TextField
          className={classes.controlFormLight}
          variant="outlined"
          fullWidth
          id="serialNumber"
          name="serialNumber"
          label="Serial number"
          value={formik.values.serialNumber}
          onChange={formik.handleChange}
          error={formik.touched.serialNumber && Boolean(formik.errors.serialNumber)}
          helperText={formik.touched.serialNumber && formik.errors.serialNumber}
        />

        <h4>Purchase info</h4>

        <TextField
          className={classes.controlFormLight}
          variant="outlined"
          fullWidth
          id="purchaseDate"
          name="purchaseDate"
          label="Purchase date"
          value={formik.values.purchaseDate}
          onChange={formik.handleChange}
          error={formik.touched.purchaseDate && Boolean(formik.errors.purchaseDate)}
          helperText={formik.touched.purchaseDate && formik.errors.purchaseDate}
        />

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="company-label">Company</InputLabel>
          <Select
            labelId="company-label"
            id="company"
            name="company"
            value={formik.values.company}
            onChange={formik.handleChange}
            label="Company"
          >
            <MenuItem value="" disabled><em>Select one...</em></MenuItem>
            {companies.map(company => <MenuItem key={company._id} value={company._id}>{company.name}</MenuItem>)}
          </Select>

        </FormControl>

        <TextField
          className={classes.controlFormLight}
          variant="outlined"
          fullWidth
          id="cost"
          name="cost"
          label="Purchase cost $"
          value={formik.values.cost}
          onChange={formik.handleChange}
          error={formik.touched.cost && Boolean(formik.errors.cost)}
          helperText={formik.touched.cost && formik.errors.cost}
        />

        <p>Has warranty (use chackbox!)</p>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="contract-label">Contract</InputLabel>
          <Select
            labelId="contract-label"
            id="contract"
            name="contract"
            value={formik.values.contract}
            onChange={formik.handleChange}
            label="Contract"
          >
            <MenuItem value="" disabled><em>Select one...</em></MenuItem>
            {contracts.map(contract => <MenuItem key={contract._id} value={contract._id}>{contract.name}</MenuItem>)}
          </Select>

        </FormControl>

        <p>invoice image</p>

        <TextField
          className={classes.controlFormLight}
          variant="outlined"
          fullWidth
          id="purchaseNotes"
          name="purchaseNotes"
          label="Purchase notes"
          multiline
          value={formik.values.purchaseNotes}
          onChange={formik.handleChange}
          error={formik.touched.purchaseNotes && Boolean(formik.errors.purchaseNotes)}
          helperText={formik.touched.purchaseNotes && formik.errors.purchaseNotes}
        />

        <Button
          color="primary"
          variant="contained"
          // fullWidth
          type="submit"
        >
          Add item
        </Button>

      </form>

    </section>
  );
}

export default AddNewItemPage;
