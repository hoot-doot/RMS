import { Box,  Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { mockTransactions } from "../../data/mockData";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import PieChart from "../../components/PieChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { IconButton } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";


const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  return (
    
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" >
        

          
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(17, 1fr)"
        gridAutoRows="95px"
        gap="20px"
      >
        {/* ROW 1 */}
       
        
        <Box
          gridColumn="span 12"
          gridRow= "span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            
            backgroundImage: 
            "url('../../assets/top.png')",
            // "url('../../assets/image 8.png')",
            // mixBlendMode : "overlay",
            // opacity: 0.7,
            backgroundSize: "fit",
            backgroundPosition: "center",
          }}
        >
          
        </Box>
        <Box
          gridColumn="span 5"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Highest Earner
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                Noodles
              </Typography>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <PieChart isDashboard={true} />
          </Box>
        </Box>
        {/* <Box
          gridColumn="span 5"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          
          p="30px"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box> */}
        {/* ROW 2 */}

        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="431,225"
            subtitle="Sales Obtained"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="18"
            subtitle="Employee Count"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="84"
            subtitle="Customer count"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          onClick={() => {
            navigate(`/menu`);
          }}
          // gridColumn="span 6"
          // gridRow="span "
          // backgroundColor={colors.primary[400]}
          // display="flex"
          // alignItems="center"
          // justifyContent="center"
          sx={{
            
            gridColumn: "span 6",
            gridRow: "span ",

            padding: "30px",
            backgroundImage: 
            // "url('../../assets/Group 5.png')",
            "linear-gradient(45deg,rgba(32,41,62, 0.9),rgba(32,41,62, 0.7)), url('../../assets/image 6.png')",
            backgroundBlendMode : "overlay",
            // opacity: 0.7,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transitionTimingFunction: "ease-in",
            transition: "width 2s, height 2s, transform 2s",
            '&:hover': {
              padding: "30px",
              paddingTop:"20px",

              backgroundImage: 
              // "url('../../assets/Group 5.png')",
              "linear-gradient(45deg,rgba(32,41,62, 0.9),rgba(32,41,62, 0)), url('../../assets/image 6.png')",
              opacity: 1,
              
            }
            
          }}
        >
          <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
                mt="12px"
              >
                <Typography variant="h1" color={"#F8F8F8"}>
                  Menu
                </Typography>
          </Box>
        </Box>
        
        <Box
        onClick={() => {
          navigate(`/calendar`);
        }}
          // gridColumn="span 6"
          // gridRow="span "
          // backgroundColor={colors.primary[400]}
          // display="flex"
          // alignItems="center"
          // justifyContent="center"
          sx={{
            gridColumn: "span 6",
            gridRow: "span ",

            padding: "30px",
            backgroundImage: 
            // "url('../../assets/Group 5.png')",
            "linear-gradient(45deg,rgba(32,41,62, 0.9),rgba(32,41,62, 0.75)), url('../../assets/image 8.png')",
            // mixBlendMode : "overlay",
            // opacity: 0.7,
            backgroundSize: "cover",
            backgroundPosition: "center",
            '&:hover': {
              padding: "30px",
              paddingTop:"20px",

              backgroundImage: 
            // "url('../../assets/Group 5.png')",
            "linear-gradient(45deg,rgba(32,41,62, 0.9),rgba(32,41,62, 0)), url('../../assets/image 8.png')",
            opacity: 1,
            }
          }}
        >
          <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
                mt="12px"
              >
                <Typography variant="h1" color={"#F8F8F8"}>
                  Calendar
                </Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 5"

          gridRow="span 5"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[400]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 12"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              {/* <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton> */}
            </Box>
          </Box>
          <Box height="320px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        
        
        
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
