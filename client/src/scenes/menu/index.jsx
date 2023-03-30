import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Menu = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [menuData, setMenu] = useState([]);
  useEffect(() => {
    const fetchAllMenu = async () => {
      try {
        const res = await axios.get("http://localhost:8800/menu");
        setMenu(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllMenu();
  }, []);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.7},
    {
      field: "name",
      headerName: "Name",
      flex: 1.3,
      cellClassName: "name-column--cell",
    },
    
    {
      field: "sold",
      headerName: "Sold Amount",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
    },
    {
        field: "cost",
        headerName: "Cost",
        headerAlign: "left",
        align: "left",
        flex: 1,
        renderCell: (params) => (
          <Typography color={colors.greenAccent[500]}>
              ${params.row.cost}
          </Typography>
        )
      },
  ];

  return (
    <Box m="20px">
      <Header
        title="MENU"
        subtitle="List of Menu items"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={menuData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Menu;

