import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { Button } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { Typography } from "@mui/material";
import axios from "axios";

const Irregular_transactions = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [customerTrans, setCustomerTrans] = useState([]);
  const [headerNames, setHeaderNames] = useState(null);
  const [threshold, setThreshold] = useState(1.7); // Set your default threshold here

  const customer_columns = [
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
    { field: "Customer_ID", headerName: "Customer ID", flex: 0.5 },
    { field: "Name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "Account_Balance", headerName: "Account Balance", flex: 1 },
    { field: "Mobile_Number", headerName: "Mobile Number", flex: 1 },
    { field: "Email", headerName: "Email", flex: 1 },
    { field: "Address", headerName: "Address", flex: 1 },
    { field: "PAN_Number", headerName: "PAN", flex: 1 },
    { field: "Aadhaar_Number", headerName: "Aadhaar", flex: 1 },
  ];

  const customer_transaction_headernames = [
    { field: "Transaction_ID", headerName: "ID" },
    { field: "Customer_ID", headerName: "Customer_ID", flex: 1 },
    { field: "Destination_Account", headerName: "Receiver_ID", flex: 1 },
    {
      field: "Amount",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.value}
        </Typography>
      ),
    },
    { field: "Date", headerName: "Date", flex: 1 },
    { field: "Location", headerName: "Location", flex: 1 },
    { field: "Category", headerName: "Category", flex: 1 },
    { field: "Type", headerName: "Type", flex: 1 },
    { field: "OldBalanceOrg", headerName: "Old Balance", flex: 1 },
    { field: "NewBalanceOrg", headerName: "New Balance", flex: 1 },
  ];

  useEffect(() => {
    console.log("Before fetch");
    axios
      .get("http://localhost:5001/api/customer-details")
      .then((response) => {
        console.log("Data received:", response.data);
        setContacts(response.data);
        setHeaderNames(customer_columns);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(
          error.message || "An error occurred while fetching data."
        );
      });
  }, []);

  const fetchIrregularTransactions = async (customerId) => {
    console.log("get irregular transactions data", customerId);
    try {
      if (customerId) {
        const response = await axios.post(
          `http://localhost:5001/api/find-irregular-transactions`,
          {
            customer_id: customerId,
            deviation_threshold: threshold,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;
        console.log("Irregular Transactions:", data);
        setCustomerTrans(data.transactions);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRowClick = (params) => {
    const customerId = params.row.Customer_ID;
    console.log(params);
    console.log(customerId);
    setCustomerId(customerId);
    fetchIrregularTransactions(customerId);
  };

  
  const handleThresholdChange = (event) => {
    const newThreshold = parseFloat(event.target.value);
    setThreshold(newThreshold);
  };

  const handleReloadClick = () => {
    // Call the function to fetch irregular transactions with the updated threshold
    if (customerId) {
      fetchIrregularTransactions(customerId);
    }
  };
  

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {customerId == null && customerTrans.length === 0 ? (
          <Header
            title="ACCOUNT HOLDER DETAILS"
            subtitle="List of Customers"
          />
        ) : (
          <>
          <Header title="IRREGULAR TRANSACTIONS" subtitle="Irregular Transactions details" /><Box>
              {/* Input field for threshold */}
              <label htmlFor="thresholdInput" style={{ marginRight: '10px' }}>
                Threshold:
              </label>
              <input
                type="number"
                id="thresholdInput"
                value={threshold}
                onChange={handleThresholdChange}
                style={{ width: '60px' }} />

                {/* Button to reload table */}
                <Button
                  onClick={handleReloadClick}
                  sx={{
                    backgroundColor: colors.blueAccent[700],
                    color: colors.grey[100],
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginLeft: '10px',
                  }}
                >
                  Reload Table
                </Button>
            </Box>
            </>
        )}

      

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download
          </Button>
        </Box>
      </Box>

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
        {customerId == null && customerTrans.length === 0 ? (
          <DataGrid
            rows={contacts}
            columns={customer_columns}
            pageSize={25}
            getRowId={(row) => row.Customer_ID}
            onRowClick={handleRowClick}
          />
        ) : (
          <DataGrid
            rows={customerTrans}
            columns={customer_transaction_headernames}
            pageSize={25}
            getRowId={(row) => row.Transaction_ID}
            onRowClick={handleRowClick}
          />
        )}
      </Box>
    </Box>
  );
};

export default Irregular_transactions;
