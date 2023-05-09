import { useSelector } from "react-redux";
import { Stepper, Step, StepLabel } from "@mui/material";
import {
  MenuItem,
  FormControl,
  Select,
  Typography,
  Box,
  Button,
  TextField,
  useTheme,
  InputLabel,
} from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { ColorModeContext, tokens } from "../../theme";
import { useContext } from "react";
import Contact from "./Contact";
import Menu from "./Menu";
import Header from "../../components/Header";
import Team from "./Team";

const Forum = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [activeStep, setActiveStep] = useState(0);

  // Define the options for the dropdown and create a state to store the selected option
  const options = [
    { value: "MENU", label: "MENU" },
    { value: "CONTACT", label: "CONTACT" },
    { value: "TEAM", label: "TEAM" },
    { value: "INVOICE", label: "INVOICE" },
  ];

  const [selectedOption, setSelectedOption] = useState("");

  // Create a function to handle the change event of the dropdown
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // const handleFormSubmit = async (values, onSubmitProps) => {
  //   console.log("Form submitted:", values);
  //   if (isLogin) await login(values, onSubmitProps);
  //   if (isRegister) await register(values, onSubmitProps);
  // };

  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log(values);
    console.log(values.itemName);

    if (selectedOption === "MENU") {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.itemName,
          sold: values.itemSold,
          cost: values.itemCost,
          type: values.itemType,
        }),
      };

      const response = await fetch(
        "http://localhost:8800/menu",
        requestOptions
      );
      const data = await response.json();
      console.log(data);
    }
    if (selectedOption === "CONTACT") {
        console.log("contacts");
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.fullName,
            email: values.contactEmail,
            desc: values.desc,
            phone: values.contact,
            address: values.address1,
            city: values.city,
            zipCode: values.zipCode,
          }),
        };
  
        const response = await fetch(
          "http://localhost:8800/contact",
          requestOptions
        );
        const data = await response.json();
        console.log(data);
    }
    if (selectedOption === "TEAM") {
        console.log("team");
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.fullName,
            email: values.contactEmail,
            phone: values.contact,
            age: values.age,
            access: values.access,
          }),
        };
  
        const response = await fetch(
          "http://localhost:8800/team",
          requestOptions
        );
        const data = await response.json();
        console.log(data);
    }
  };

  return (
    <Box ml={2} mr={2}>
      <FormControl fullWidth variant="outlined">
        <InputLabel sx={{ ml: 2, flex: 1 }} placeholder="Search">
          <Typography variant="h4">SELECT A TABLE TO ADD TO</Typography>
        </InputLabel>
        <Select
          value={selectedOption}
          onChange={handleChange}
          sx={{
            display: "flex",
            justifyContent: "right",
            backgroundColor: { color: colors.primary[100] },
            width: "100vh",
            borderRadius: "0.25rem",
            p: "0.25rem 1rem",
            "& .MuiSvgIcon-root": {
              pr: "0.25rem",
              width: "3rem",
            },
            "& .MuiSelect-select:focus": {
              backgroundColor: { color: colors.greenAccent[500] },
            },
          }}
        >
          <MenuItem value="">
            <em>Select an option</em>
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Typography variant="h4">{option.label}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema(selectedOption)}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {selectedOption === "MENU" && (
                <Box m="20px">
                  <Header
                    title="ADD TO MENU"
                    subtitle="Create a New User Profile"
                  />

                  <Menu
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                </Box>
              )}
              {selectedOption === "CONTACT" && (
                <Box m="20px">
                  <Header
                    title="ADD TO CONTACT"
                    subtitle="Create a New User Profile"
                  />
                  <Contact
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                </Box>
              )}
              {selectedOption === "TEAM" && (
                <Box m="20px">
                  <Header
                    title="ADD TO TEAM"
                    subtitle="Create a New Team Member"
                  />
                  <Team
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                </Box>
              )}
              <Box m="20px">
                {selectedOption && (
                  <Box display="flex" justifyContent="end" mt="20px">
                    <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      sx={{
                        backgroundColor: colors.primary[400],
                        boxShadow: "none",
                        color: "white",
                        borderRadius: 0,
                        padding: "15px 40px",
                      }}
                    >
                      {selectedOption === "MENU" && "Add New Food Item"}
                      {selectedOption === "CONTACT" && "Add New Contact"}
                      {selectedOption === "TEAM" && "Add New Team Member"}
                      {selectedOption === "INVOICE" && "Add New Invoice"}
                    </Button>
                  </Box>
                )}
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const phoneRegExp = /^(\+977)?[9][6-9]\d{8}$/;
const roleRegex = /(staff|manager|admin)/i;
const categoryRegex = /(Main|Starter|Drink)/;

const validationSchema = (selectedOption) => {
    switch (selectedOption) {
      case "MENU":
        return yup.object().shape({
          itemName: yup.string().required("required"),
          itemCost: yup.number().required("required"),
          itemType: yup.string().matches(categoryRegex, "Main, Starter or Drink", { excludeEmptyString: true }).required("required"),
          itemSold: yup.number(),
        });
      case "CONTACT":
        return yup.object().shape({
          fullName: yup.string().required("required"),
          desc: yup.string().required("required"),
          contactEmail: yup.string().email("invalid contactEmail").required("required"),
          contact: yup
            .string()
            .matches(phoneRegExp, "Phone number is not valid")
            .required("required"),
          address1: yup.string().required("required"),
          city: yup.string().required("required"),
          zipCode: yup.number().required("required"),
        });
      case "TEAM":
        return yup.object().shape({
          fullName: yup.string().required("required"),
          contactEmail: yup.string().email("invalid contactEmail").required("required"),
          contact: yup
            .string()
            .matches(phoneRegExp, "Phone number is not valid")
            .required("required"),
          age: yup.number().required("required"),
          access: yup.string().matches(roleRegex, "Manager, User or Admin", { excludeEmptyString: true }).required("required")
        });
      case "INVOICE":
        return yup.object().shape({});
      default:
        return yup.object().shape({});
    }
  };
  
const checkoutSchema = yup.object().shape({
  // menu
  itemName: yup.string().required("required"),
  itemCost: yup.number().required("required"),
  itemType: yup.string().required("required"),
  itemSold: yup.number(),

  //contact
  fullName: yup.string().required("required"),
  desc: yup.string().required("required"),
  contactEmail: yup.string().email("invalid contactEmail").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  city: yup.string().required("required"),
  zipCode: yup.number().required("required"),

  //team
  fullName: yup.string().required("required"),
  contactEmail: yup.string().email("invalid contactEmail").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  age: yup.number().required("required"),
  

});
const initialValues = {
  itemName: "",
  itemCost: "",
  itemType: "",
  itemSold: 0,
  fullName: "",
  desc: "",
  contactEmail: "",
  contact: "",
  address1: "",
  city: "",
  zipCode: "",
  age: "",
};

export default Forum;
