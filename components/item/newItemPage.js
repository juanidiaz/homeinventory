import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';

import { useFormik } from 'formik';
import * as yup from 'yup';
import mainConstants from "../../lib/mainConstants.json";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      notes: "",
      isActive: false,
      user: "",
      age: ""
    },
    validationSchema,
    onSubmit: async values => {
      console.log("=== NEW ITEM XXX")

      console.log("=== NEW ITEM", values)
    }
  })

  return (
    <section>
      <h1>New item</h1>

      <form onSubmit={formik.handleSubmit}>
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
          className={classes.controlFormDark}
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

        <TextField
          className={classes.controlFormLight}
          variant="outlined"
          fullWidth
          id="notes"
          name="notes"
          label="Notes"
          value={formik.values.notes}
          onChange={formik.handleChange}
          error={formik.touched.notes && Boolean(formik.errors.notes)}
          helperText={formik.touched.notes && formik.errors.notes}
        />

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        <Button
          color="primary"
          variant="contained"
          fullWidth type="submit"
        >
          Add item
        </Button>


      </form>

    </section>
  );
}

export default AddNewItemPage;
