import { Typography,MenuItem,Select,FormControl, Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import profileImage from "../assets/profile.jpeg";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Help from "@mui/icons-material/Help";
import { Link } from 'react-router-dom';
import { setLogin } from '../authSlice'; // Adjust the path according to your project structure
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect,useState } from "react";

const Topbar = () => {
  const [user, setUser] = useState("");
  const [picture, setPicture] = useState("");
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  // const fullName = `${user.firstName} ${user.lastName}`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8800/login");
        if (response.data.loggedIn === true) {
          setUser(response.data.user[0].firstName);
          setPicture(response.data.user[0].picture);
          console.log(response.data.user[0].picture);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log(picture);
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8800/login");
  //     if (response.data.loggedIn === true) {
  //       const user = (response.data.user[0].firstName);
  //       console.log(user);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // fetchData();
  const logout = () => {
    try {
      const response = axios.get("http://localhost:8800/logout");
    } catch (error) {
      console.log(error);
    }
  }
  
  

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

        <FormControl variant="standard" value={user}>
            <Select
              value={user}
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
              <MenuItem  value={user} >
                <Box display='flex'  justifyContent="space-between" align-items= "center" >
                <Box
                  component="img"
                  alt="profile"
                  src={`http://localhost:8800/image/${picture}`}
                  // src={`${picture}`}
                  // src={`../../assets/${picture}`}
                  height="40px"
                  width="40px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                  
                />
                <Typography variant="h5" sx={{ mt: "8px", ml:"10px" }}>{user}</Typography>
                </Box>
              </MenuItem>
              <MenuItem onClick={logout} component={Link} to="/">
                Log Out
              </MenuItem>
            </Select>
          </FormControl>
      </Box>
    </Box>
  );
};

export default Topbar;
