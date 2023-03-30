import { Box,  Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import PieChart from "../../components/PieChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { useEffect } from "react";
import axios from "axios";


const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const [transactionsData, setTransactions] = useState([]);
  useEffect(() => {
    const fetchAllTransactions = async () => {
      try {
        const res = await axios.get("http://localhost:8800/transactions");
        setTransactions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTransactions();
  }, []);
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
                Menu
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                Top Earners
              </Typography>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <PieChart isDashboard={true} />
          </Box>
        </Box>
        
        {/* ROW 2 */}

        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          borderRadius={1}
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
          borderRadius={1}
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
          borderRadius={1}
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
          sx={{
            
            gridColumn: "span 6",
            gridRow: "span ",

            padding: "30px",
            backgroundImage: 
            "linear-gradient(45deg,rgba(32,41,62, 0.9),rgba(32,41,62, 0.7)), url('../../assets/image 6.png')",
            backgroundBlendMode : "overlay",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transitionTimingFunction: "ease-in",
            transition: "width 2s, height 2s, transform 2s",
            '&:hover': {
              padding: "30px",
              paddingTop:"20px",

              backgroundImage: 
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
          sx={{
            gridColumn: "span 6",
            gridRow: "span ",

            padding: "30px",
            backgroundImage: 
            "linear-gradient(45deg,rgba(32,41,62, 0.9),rgba(32,41,62, 0.75)), url('../../assets/image 8.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            '&:hover': {
              padding: "30px",
              paddingTop:"20px",

              backgroundImage: 
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
          {transactionsData.map((transaction, i) => (
            <Box
              key={`${transaction.txid}-${i}`}
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
                  {transaction.txid}
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
          <Box height="350px" m="-20px 10px 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
