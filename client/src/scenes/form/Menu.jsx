import { Box, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";


const Menu = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  setFieldValue,
}) => {
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
        label="Item Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.itemName}
        name="itemName"
        error={!!touched.itemName && !!errors.itemName}
        helperText={touched.itemName && errors.itemName}
        sx={{ gridColumn: "span 4" }}
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

  );
};

export default Menu;
