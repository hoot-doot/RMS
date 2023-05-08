import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

const Contact = ({ values, touched, errors, handleBlur, handleChange }) => {
  return (
    <Box
      display="grid"
      gap="30px"
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
    >
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="First Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.fullName}
        name="fullName"
        error={!!touched.fullName && !!errors.fullName}
        helperText={touched.fullName && errors.fullName}
        sx={{ gridColumn: "span 4" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Description"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.desc}
        name="desc"
        error={!!touched.desc && !!errors.desc}
        helperText={touched.desc && errors.desc}
        sx={{ gridColumn: "span 4" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Email"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.contactEmail}
        name="contactEmail"
        error={!!touched.contactEmail && !!errors.contactEmail}
        helperText={touched.contactEmail && errors.contactEmail}
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
        label="Address"
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
        label="City"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.city}
        name="city"
        error={!!touched.city && !!errors.city}
        helperText={touched.city && errors.city}
        sx={{ gridColumn: "span 4" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="text"
        label="Zip Code"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.zipCode}
        name="zipCode"
        error={!!touched.zipCode && !!errors.zipCode}
        helperText={touched.zipCode && errors.zipCode}
        sx={{ gridColumn: "span 4" }}
      />
    </Box>
  );
};

export default Contact;
