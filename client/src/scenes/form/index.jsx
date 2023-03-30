import React, { useState } from 'react';
import { MenuItem, FormControl, Select, Typography, Box, Button, TextField,useTheme,InputLabel  } from '@mui/material';
import { Formik } from "formik";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from 'axios';
const Form = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  // Define the options for the dropdown and create a state to store the selected option
  const options = [
    { value: 'MENU', label: 'MENU' },
    { value: 'CONTACT', label: 'CONTACT' },
    { value: 'TEAM', label: 'TEAM' },
  ];

  const [selectedOption, setSelectedOption] = useState('');

  // Create a function to handle the change event of the dropdown
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
  const handleFormSubmit = async(values, onSubmitProps) => {
    console.log(values);
  };
  const register = async (values, onSubmitProps) => {
    if (selectedOption === 'MENU'){
      try {
        const response = await axios.post("http://localhost:8800/menu", values);
      } catch (error) {
        console.error(error);
      }
    }
  }
  console.log(selectedOption);
  // Render the dropdown component and the UI based on the selected option
  return (
    <Box  ml={2} mr={2}>
      <FormControl fullWidth variant="outlined" >
        <InputLabel sx={{ ml: 2, flex: 1}} placeholder="Search">
          <Typography variant='h4'>
            SELECT A TABLE TO ADD TO
          </Typography>
        </InputLabel>
        <Select value={selectedOption} onChange={handleChange}
          sx={{
            display:"flex", justifyContent:"right",
            backgroundColor: {color: colors.primary[100]},
            width: "100vh",
            borderRadius: "0.25rem",
            p: "0.25rem 1rem",
            "& .MuiSvgIcon-root": {
              pr: "0.25rem",
              width: "3rem",
            },
            "& .MuiSelect-select:focus": {
              backgroundColor: {color: colors.greenAccent[500]},
            },
        }}>
          <MenuItem value="">
           <em>Select an option</em>
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Typography variant='h4'>
                {option.label}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* MENU */}
      {selectedOption && (
        <Box>
          {selectedOption === 'MENU' && (
            <Box m="20px" >
            <Header title="ADD TO MENU" subtitle="Create a New User Profile" />
      
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={checkoutSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    }}
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Item Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.itemName}
                      name="itemName"
                      error={!!touched.itemName && !!errors.itemName}
                      helperText={touched.itemName && errors.itemName}
                      sx={{ gridColumn: "span 4"}}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Item Type"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.itemType}
                      name="itemType"
                      error={!!touched.itemType && !!errors.itemType}
                      helperText={touched.itemType && errors.itemType}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Item Cost"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.itemCost}
                      name="itemCost"
                      error={!!touched.itemCost && !!errors.itemCost}
                      helperText={touched.itemCost && errors.itemCost}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Number of Items Sold"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.itemSold}
                      name="itemSold"
                      error={!!touched.itemSold && !!errors.itemSold}
                      helperText={touched.itemSold && errors.itemSold}
                      sx={{ gridColumn: "span 4" }}
                    />
                    
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px">
                    <Button type="submit" color="secondary" variant="contained">
                      Create New Item
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
          )}
          {/* NEW CONTACT */}
          {selectedOption === 'CONTACT' && (
            <Box m="20px">
            <Header title="ADD TO CONTACT" subtitle="Create a New User Profile" />
      
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={checkoutSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    }}
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="First Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      name="firstName"
                      error={!!touched.firstName && !!errors.firstName}
                      helperText={touched.firstName && errors.firstName}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Last Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                      name="lastName"
                      error={!!touched.lastName && !!errors.lastName}
                      helperText={touched.lastName && errors.lastName}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Contact Number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.contact}
                      name="contact"
                      error={!!touched.contact && !!errors.contact}
                      helperText={touched.contact && errors.contact}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Address 1"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address1}
                      name="address1"
                      error={!!touched.address1 && !!errors.address1}
                      helperText={touched.address1 && errors.address1}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Address 2"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address2}
                      name="address2"
                      error={!!touched.address2 && !!errors.address2}
                      helperText={touched.address2 && errors.address2}
                      sx={{ gridColumn: "span 4" }}
                    />
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px">
                    <Button type="submit" color="secondary" variant="contained">
                      Create New User
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
          )}


          {/* NEW TEAM */}
          {selectedOption === 'TEAM' && (
            <Box m="20px">
            <Header title="ADD TO STAFF" subtitle="Create a New User Profile" />
      
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={checkoutSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    }}
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="First Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      name="firstName"
                      error={!!touched.firstName && !!errors.firstName}
                      helperText={touched.firstName && errors.firstName}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Last Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                      name="lastName"
                      error={!!touched.lastName && !!errors.lastName}
                      helperText={touched.lastName && errors.lastName}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Contact Number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.contact}
                      name="contact"
                      error={!!touched.contact && !!errors.contact}
                      helperText={touched.contact && errors.contact}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Address 1"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address1}
                      name="address1"
                      error={!!touched.address1 && !!errors.address1}
                      helperText={touched.address1 && errors.address1}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Address 2"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address2}
                      name="address2"
                      error={!!touched.address2 && !!errors.address2}
                      helperText={touched.address2 && errors.address2}
                      sx={{ gridColumn: "span 4" }}
                    />
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px">
                    <Button type="submit" color="secondary" variant="contained">
                      Create New User
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

const phoneRegExp = /^(\+977)?[9][6-9]\d{8}$/;

const checkoutSchema = yup.object().shape({
  // menu
  itemName: yup.string().required("required"),
  itemCost: yup.number().required("required"),
  itemType: yup.string().required("required"),
  itemSold: yup.number(),

  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  itemName: "",
  itemCost: "",
  itemType: "",
  itemSold: 0,
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};
export default Form;