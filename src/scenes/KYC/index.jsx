import React, { useState, useEffect } from "react";
import { Box, Typography, Button, MenuItem, FormControl, Select } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import axios from "axios";

const KYC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState({});
  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    axios
      .get("http://localhost:5001/api/kyc")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
  };

  const renderTable = (accounts, title) => {
    const columns = [
      { field: "Customer_ID", headerName: "Customer ID", flex: 0.5 },
      { field: "Name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
      { field: "Address", headerName: "Address", flex: 1 },
      { field: "Mobile_Number", headerName: "Mobile Number", flex: 1 },
      { field: "Email", headerName: "Email", flex: 1 },
      {
        field: "Account_Balance",
        headerName: "Account Balance",
        flex: 1,
        renderCell: (params) => (
          <Typography style={{ color: theme.palette.success.main }}>
            ${params.row.Account_Balance}
          </Typography>
        ),
      },
      { field: "PAN_Number", headerName: "PAN Number", flex: 1 },
      { field: "Aadhaar_Number", headerName: "Aadhaar Number", flex: 1 },
      {
        field: "Photo",
        headerName: "Aadhaar Photo",
        flex: 1,
        renderCell: (params) => (
          <img
            src={`data:image/png;base64, ${params.value}`}
            alt="Aadhaar Photo"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        ),
      },
    ];

    return (
      <Box m="20px">
        <Typography variant="h3" color="white">
          {title}
        </Typography>
        <Box
          m="40px 0 0 0"
          height="50vh"
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
            rows={accounts}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      <Header title="INCOMPLETE KYC Data" subtitle="LIST OF ACCOUNTS NOT COMPLETED KYC" />

      <Box mt={2}>
        <FormControl>
          <Select
            value={selectedTable}
            onChange={handleTableChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={null} disabled>
              Select Table
            </MenuItem>
            <MenuItem value="empty_aadhar_accounts">EMPTY AADHAR ACCOUNTS</MenuItem>
            <MenuItem value="empty_pan_accounts">EMPTY PAN ACCOUNTS</MenuItem>
            <MenuItem value="same_mobile_number_accounts">SAME MOBILE NUMBER ACCOUNTS</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {selectedTable === "empty_aadhar_accounts" &&
        data.empty_aadhar_accounts &&
        renderTable(data.empty_aadhar_accounts, "EMPTY AADHAR ACCOUNTS")}

      {selectedTable === "empty_pan_accounts" &&
        data.empty_pan_accounts &&
        renderTable(data.empty_pan_accounts, "EMPTY PAN ACCOUNTS")}

      {selectedTable === "same_mobile_number_accounts" &&
        data.same_mobile_number_accounts &&
        renderTable(data.same_mobile_number_accounts, "SAME MOBILE NUMBER ACCOUNTS")}
    </Box>
  );
};

export default KYC;
