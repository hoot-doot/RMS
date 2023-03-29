import { Typography,MenuItem,Select,FormControl, Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import profileImage from "../assets/profile.jpeg";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Help from "@mui/icons-material/Help";
import { Link } from 'react-router-dom';

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="right" m={3} mb={0}>
      

      {/* ICONS */}
      <Box display="flex"  >
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon sx={{ fontSize: "25px" }}/>
          ) : (
            <LightModeOutlinedIcon sx={{ fontSize: "25px" }}/>
          )}
        </IconButton>
        <IconButton component={Link} to="/form" >
          <SettingsOutlinedIcon sx={{ fontSize: "25px" }} />
        </IconButton>
        <IconButton  component={Link} to="/faq" >
          <Help sx={{ fontSize: "23px" }} />
        </IconButton>

        <FormControl variant="standard" value="Anshu">
            <Select
              value="Anshu"
              sx={{
                backgroundColor: {color: colors.primary[100]},
                width: "160px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: {color: colors.primary[200]},

                },
              }}
              input={<InputBase />}
            >
              <MenuItem  value="Anshu" >
                <Box display='flex'  justifyContent="space-between" align-items= "center" >
                <Box
                  component="img"
                  alt="profile"
                  src={profileImage}
                  height="40px"
                  width="40px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                  
                />
                <Typography variant="h5" sx={{ mt: "8px" }}>Anshu</Typography>
                </Box>
              </MenuItem>
              <MenuItem>Log Out</MenuItem>
            </Select>
          </FormControl>
      </Box>
    </Box>
  );
};

export default Topbar;
