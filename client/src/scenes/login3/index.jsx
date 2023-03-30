import { Box, Typography, useTheme, useMediaQuery,IconButton } from "@mui/material";
import Form from "./Form";
import { useContext } from "react";
import { ColorModeContext,tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
const LoginPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={colors.greenAccent[600]}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="grey[900]">
          Resturant Management System
        </Typography>
      </Box>
      
      <Box 
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={colors.primary[400]}
        
        
      >
        <Box 
        justifyContent="space-between"
        display={"flex"}>
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Socipedia, the Social Media for Sociopaths!
        </Typography>

        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        </Box>
        
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
