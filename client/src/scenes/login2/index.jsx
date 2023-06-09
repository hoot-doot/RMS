import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import Form from "./Form";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Popup from "./Popup";

const LoginPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={colors.primary[500]}
        p="1rem 6%"
        textAlign="center"
      >
        <img
          alt="profile-user"
          width="150px"
          height="150px"
          src={`../../assets/1.png`}
          style={{ cursor: "pointer", borderRadius: "50%" }}
        />
        <Typography fontWeight="bold" fontSize="32px" color="white">
          Cosmo Cafe Admin
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={colors.primary[400]}
      >
        <Box justifyContent="space-between" display={"flex"}>
          <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
            Welcome to Cosmo!
          </Typography>

          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
        </Box>
        <Box>
          <Form />

          <Popup />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
