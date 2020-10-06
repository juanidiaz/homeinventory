import { Grid, TextField, MenuItem, FormGroup } from "@material-ui/core";
import FormikCheckbox from "../formik/formikCheckbox";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ErrorMessage, Form, Formik, Field } from "formik";
import * as Yup from "yup";

const ModalAddCompany = props => {

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
  }

  const getProvinceList = country => {

    const provinceNameArray = [];

    switch (country.value) {
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
  }

  getProvinceList({ value: "CA", name: "CANADA" });

  console.log("=====", company.country)

  const initialValues = {
    name: "",
    description: "",
    isActive: "",
    user: "automatic",
    icon: "companyIcon.png",
    companyFullName: "",
    connectInfo: {
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
      country: "CA",
    }
  }


  const NewCompanySchema = Yup.object().shape({
    name: Yup.string().required().min(5),
    connectInfo: Yup.object().shape(
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

          console.log(" = SUBMIT =");

          return new Promise(res => {
            setTimeout(() => {
              console.log(values);
              console.log(formikHelpers);
              console.log("---------");
              res();
            }, 5000);
          })
        }}>

        {({ values, errors, isSubmitting, isValidating }) => (
          <Form>

            <Modal.Body>

              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={2}
              >

                <Grid item xs={12} md={12}>
                  <pre>{JSON.stringify(errors, null, 2)}</pre>
                </Grid>

                <Grid item xs={12} md={12}>
                  <FormGroup>
                    <Field name="name" as={TextField} placeholder="Name" label="Name" fullWidth />
                    <ErrorMessage name="name" />
                  </FormGroup>
                </Grid>

                <Grid item xs={12} md={12}>
                  <FormGroup>
                    <Field name="description" placeholder="Description" as={TextField} multiline rows={2} rowsMax={5} fullWidth />
                    <ErrorMessage name="description" />
                  </FormGroup>
                </Grid>

                <Grid item xs={12} md={12}>
                  <FormikCheckbox name="isActive" label="Active element" color="primary" />
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

                <Grid item xs={12} md={12}>
                  <FormGroup>
                    <Field name="connectInfo.tel" as={TextField} label="Telephone" fullWidth />
                    <ErrorMessage name="connectInfo.tel" />
                  </FormGroup>

                </Grid>

                <Grid item xs={12} md={12}>
                  <FormGroup>
                    <Field name="connectInfo.tel2" as={TextField} label="Telephone 2" fullWidth />
                    <ErrorMessage name="connectInfo.tel2" />
                  </FormGroup>

                </Grid>

                <Grid item xs={12} md={12}>
                  <FormGroup>
                    <Field name="connectInfo.email" as={TextField} label="Email" type="email" fullWidth />
                    <ErrorMessage name="connectInfo.email" />
                  </FormGroup>

                </Grid>

                <Grid item xs={12} md={12}>
                  <FormGroup>
                    <Field name="connectInfo.email2" as={TextField} label="Email 2" type="email" fullWidth />
                    <ErrorMessage name="connectInfo.email2" />
                  </FormGroup>

                </Grid>

                <Grid item xs={12} md={12}>
                  <FormGroup>
                    <Field name="connectInfo.url" as={TextField} label="URL" fullWidth />
                    <ErrorMessage name="connectInfo.url" />
                  </FormGroup>

                </Grid>

                <Grid item xs={12} md={12}>
                  <FormGroup>
                    <Field name="address.streetNumber" as={TextField} label="Street Number" fullWidth />
                    <ErrorMessage name="address.streetNumber" />
                  </FormGroup>

                </Grid>

                <Grid item xs={12} md={12}>
                  <FormGroup>
                    <Field name="address.street" as={TextField} label="Street" fullWidth />
                    <ErrorMessage name="address.street" />
                  </FormGroup>

                </Grid>

                <Grid item xs={12} md={12}>
                  <FormGroup>
                    <Field name="address.street2" as={TextField} label="Street2" fullWidth />
                    <ErrorMessage name="address.street2" />
                  </FormGroup>

                </Grid>

                <Grid item xs={12} md={12}>
                  <FormGroup>
                    <Field name="address.country" as={TextField} label="Country" as={TextField} select fullWidth>
                      {getCountryList().map(country =>
                        <MenuItem key={country.value} value={country.value} disabled={!country.value || country.value === "--"}>{country.name}</MenuItem>)}
                    </Field>
                    <ErrorMessage name="address.country" />
                  </FormGroup>
                </Grid>

                <Grid item xs={12} md={12}>
                  <FormGroup>
                    <Field name="address.province" as={TextField} label="Province" fullWidth />
                    <ErrorMessage name="address.province" />
                  </FormGroup>

                </Grid>

                <Grid item xs={12} md={12}>
                  <FormGroup>
                    <Field name="address.city" as={TextField} label="City" fullWidth />
                    <ErrorMessage name="address.city" />
                  </FormGroup>

                </Grid>

                <Grid item xs={12} md={12}>
                  <pre>{JSON.stringify(values, null, 2)}</pre>
                </Grid>

              </Grid>
            </Modal.Body>

            <Modal.Footer>
              <Button type="submit"
                disabled={isSubmitting || isValidating}
              >
                Submit here!
              </Button>

              <Button variant="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button variant="primary"
                onClick={createNewCompany}
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