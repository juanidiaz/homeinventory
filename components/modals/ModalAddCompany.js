import { makeStyles } from "@material-ui/core/styles";
import { Grid, MenuItem, FormGroup, TextField, Paper } from "@material-ui/core";
import FormikCheckbox from "../formik/formikCheckbox";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ErrorMessage, Form, Formik, Field } from "formik";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
paperRoot:{
  padding: 10,
  background: "whitesmoke !important"
}
}));

const ModalAddCompany = props => {
  const classes = useStyles();

  const { open, handleClose, handleChange, allCompanies, editMode,
    createNewCompany, cancelCreateNewCompany, company } = props;
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const getCountryList = () => {
    const countryList = require("country-list");
    const countryNameList = countryList.getNameList()
    let countryNameArray = [
      { value: "", name: "Select country" },
      { value: "CA", name: "CANADA" },
      { value: "US", name: "UNITED STATES" },
      { value: "MX", name: "MEXICO" },
      { value: "--", name: "- - - - - - - - - - - - - - - - -" }
    ];
    const dontAddThese = ["CA", "US", "MX"];

    Object.keys(countryNameList).map(country => {
      if (!dontAddThese.includes(countryNameList[country])) countryNameArray.push({ value: countryNameList[country], name: country.toUpperCase() })
    })

    return countryNameArray;
  };

  const getProvinceList = countryCode => {

    const provinceNameArray = [];

    switch (countryCode) {
      case "CA":
        let canada = require("canada");
        let provinces = canada.provinces

        Object.keys(provinces).map(province => {
          provinceNameArray.push({ value: province, name: provinces[province] })
        })

        break;

      case "US":

        break;

      case "MX":

        break;

      default:

        break;
    }

    return provinceNameArray;
  };

  const initialValues = {
    name: "",
    description: "",
    isActive: true,
    user: "automatic",
    icon: "companyIcon.png",
    companyFullName: "",
    contactInfo: {
      tel: "",
      tel2: "",
      email: "",
      email2: "",
      url: "",
    },
    address: {
      streetNumber: "",
      street: "",
      street2: "",
      city: "",
      province: "",
      country: "",
    }
  };

  const NewCompanySchema = Yup.object().shape({
    name: Yup.string().required().min(5),
    contactInfo: Yup.object().shape(
      {
        tel: Yup.string().matches(/^\d{10,}$/, "Telephone need to be at least 10 numbers long"),
        tel2: Yup.string().matches(/^\d{10,}$/, "Telephone need to be at least 10 numbers long"),
        email: Yup.string().email().required(),
        email2: Yup.string().email(),
        url: Yup.string().url(),
      }
    ),
    address: Yup.object().shape(
      {
        streetNumber: Yup.number(),
        street: Yup.string(),
        street2: Yup.string(),
        city: Yup.string(),
        province: Yup.string(),
        country: Yup.string().required(),
      }
    )
  });

  return (

    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a company</Modal.Title>
      </Modal.Header>

      <Formik

        validationSchema={NewCompanySchema}

        initialValues={initialValues} onSubmit={(values, formikHelpers) => {
          createNewCompany(values);
        }}>

        {({ values, errors, isSubmitting, isValidating }) => (
          <Form>

            <Modal.Body>

              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={2}
              >

                {/* <Grid item xs={12} md={12}>
                  <pre>{JSON.stringify(values, null, 2)}</pre>
                </Grid> */}

                {/* <Grid item xs={12} md={12}>
                  <pre>{JSON.stringify(errors, null, 2)}</pre>
                </Grid> */}

                <Grid item xs={12} md={6}>
                  <FormGroup>
                    <Field name="name" as={TextField} placeholder="Name" label="Name" fullWidth />
                    <ErrorMessage name="name" />
                  </FormGroup>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormikCheckbox name="isActive" label="Active company" color="primary" />
                </Grid>

                <Grid item xs={12} md={12}>
                  <FormGroup>
                    <Field name="description" placeholder="Description" as={TextField} multiline rows={2} rowsMax={5} fullWidth />
                    <ErrorMessage name="description" />
                  </FormGroup>
                </Grid>

                {/* <Field name="icon" placeholder="" fullWidth/> */}
                {/* <Field name="pictures" placeholder="" fullWidth/> */}
                {/* <Field name="files" placeholder="" fullWidth/> */}

                <Grid item xs={12} md={12}>
                  <FormGroup>
                    <Field name="companyFullName" as={TextField} label="Full Name" fullWidth />
                    <ErrorMessage name="companyFullName" />
                  </FormGroup>
                </Grid>

                <Grid item xs={12} md={12}> {/* Contact info */}
                <Paper className={classes.paperRoot}>
                    <Grid
                      container
                      direction="row"
                      justify="flex-start"
                      alignItems="center"
                      spacing={2}
                    >

                      <Grid item xs={12} md={6}>
                        <FormGroup>
                          <Field name="contactInfo.tel" as={TextField} label="Telephone" fullWidth />
                          <ErrorMessage name="contactInfo.tel" />
                        </FormGroup>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <FormGroup>
                          <Field name="contactInfo.tel2" as={TextField} label="Telephone 2" fullWidth disabled={!values.contactInfo.tel} />
                          <ErrorMessage name="contactInfo.tel2" />
                        </FormGroup>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <FormGroup>
                          <Field name="contactInfo.email" as={TextField} label="Email" type="email" fullWidth />
                          <ErrorMessage name="contactInfo.email" />
                        </FormGroup>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <FormGroup>
                          <Field name="contactInfo.email2" as={TextField} label="Email 2" type="email" fullWidth disabled={!values.contactInfo.email} />
                          <ErrorMessage name="contactInfo.email2" />
                        </FormGroup>
                      </Grid>

                      <Grid item xs={12} md={12}>
                        <FormGroup>
                          <Field name="contactInfo.url" as={TextField} label="URL" fullWidth />
                          <ErrorMessage name="contactInfo.url" />
                        </FormGroup>
                      </Grid>

                    </Grid>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={12}> {/* Address info */}
                  <Paper className={classes.paperRoot}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      spacing={2}
                    >

                      <Grid item xs={12} md={2}>
                        <FormGroup>
                          <Field name="address.streetNumber" as={TextField} label="Number" fullWidth />
                          <ErrorMessage name="address.streetNumber" />
                        </FormGroup>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <FormGroup>
                          <Field name="address.street" as={TextField} label="Street" fullWidth />
                          <ErrorMessage name="address.street" />
                        </FormGroup>
                      </Grid>

                      <Grid item xs={12} md={8}>
                        <FormGroup>
                          <Field name="address.street2" as={TextField} label="Street2" fullWidth disabled={!values.address.street} />
                          <ErrorMessage name="address.street2" />
                        </FormGroup>
                      </Grid>

                      <Grid item xs={12} md={8}>
                        <FormGroup>
                          <Field name="address.city" as={TextField} label="City" fullWidth />
                          <ErrorMessage name="address.city" />
                        </FormGroup>
                      </Grid>

                      <Grid item xs={12} md={5}>
                        <FormGroup>
                          <Field name="address.country" as={TextField} label="Country" as={TextField} select fullWidth>
                            {getCountryList().map(country =>
                              <MenuItem key={country.value} value={country.value} disabled={!country.value || country.value === "--"}>{country.name}</MenuItem>)}
                          </Field>
                          <ErrorMessage name="address.country" />
                        </FormGroup>
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <FormGroup>
                          {values.address.country === "CA" ?
                            <Field name="address.province" as={TextField} label="Province" as={TextField} select fullWidth>
                              {getProvinceList(values.address.country).map(province =>
                                <MenuItem key={province.value} value={province.value} disabled={!province.value || province.value === "--"}>{province.name}</MenuItem>)}
                            </Field>
                            :
                            <Field name="address.province" as={TextField} label="Province" fullWidth />
                          }
                          <ErrorMessage name="address.province" />
                        </FormGroup>
                      </Grid>

                    </Grid>
                  </Paper>
                </Grid>

              </Grid>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit"
              >
                {editMode ? "Update company" : "Add company"}
              </Button>

            </Modal.Footer>

          </Form>
        )}
      </Formik>

    </Modal>
  )
};

ModalAddCompany.defaultProps = {
  editMode: true,
};

export default ModalAddCompany;