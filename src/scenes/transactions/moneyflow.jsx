import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";

const Customertransactions = (props) => {
  const theme = useTheme();
  const colors = theme.palette.mode;
  const [customerTrans, setCustomerTrans] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const columns = [
    { field: "Transaction_ID", headerName: "ID" },
    { field: "Customer_ID", headerName: "Customer ID", flex: 1 },
    { field: "Destination_Account", headerName: "Receiver ID", flex: 1 },
    {
      field: "Amount",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.Amount}
        </Typography>
      ),
    },
    { field: "Date", headerName: "Date", flex: 1 },
    { field: "Location", headerName: "Location", flex: 1 },
    { field: "Category", headerName: "Category", flex: 1 },
    { field: "Type", headerName: "Type", flex: 1 },
    { field: "Time", headerName: "Time", flex: 1 },
    { field: "OldBalanceOrg", headerName: "Old Balance", flex: 1 },
    { field: "NewBalanceOrg", headerName: "New Balance", flex: 1 },
  ];

  const fetchData = async () => {
    try {
      if (selectedCustomerId) {
        const response = await axios.get(`http://localhost:5001/api/customer/${selectedCustomerId}/money_flow`, {
          headers: {
            "Content-Type": "application/json",
          },
          // Add additional configurations if needed
        });

        const data = response.data;
      console.log("Data received:", data.transactions);

      // Using the callback function to log the updated state
      setCustomerTrans( data.transactions);
    }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRowClick = (params) => {
    setSelectedCustomerId(params.row.Customer_ID);
  };

  useEffect(() => {
    // console.log("Customer id", Customer_ID);
    // Fetch data initially
    fetchData();

    // // Fetch data at intervals (e.g., every 1000 milliseconds or 1 second)
    // const intervalId = setInterval(fetchData, 1000);

    // // Clear the interval when the component is unmounted
    // return () => clearInterval(intervalId);
  }, [selectedCustomerId]);

  return (
    <Box m="20px">
      <Header
        title="FINANCIAL FRAUDS"
        subtitle="List of latest fraudulent transactions"
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
        }}
      >
        <DataGrid
          rows={customerTrans}
          columns={columns}
          pageSize={25}
          getRowId={(row) => row.Transaction_ID}
          onRowClick={handleRowClick}
        />
      </Box>
    </Box>
  );
};

export default Customertransactions;
