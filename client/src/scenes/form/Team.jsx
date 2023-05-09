import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

const Team = ({ values, touched, errors, handleBlur, handleChange }) => {
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
        label="Full Name"
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
        type="number"
        label="Age"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.age}
        name="age"
        error={!!touched.age && !!errors.age}
        helperText={touched.age && errors.age}
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
        label="Access"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.access}
        name="access"
        error={!!touched.access && !!errors.access}
        helperText={touched.access && errors.access}
        sx={{ gridColumn: "span 4" }}
      />
    </Box>
  );
};

export default Team;
