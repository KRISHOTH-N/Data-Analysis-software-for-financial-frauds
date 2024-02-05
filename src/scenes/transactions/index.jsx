// TransactionHistory.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import { debounce } from "lodash";

const TransactionHistory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [frauds, setFrauds] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [senderData, setSenderData] = useState(null);
  const [receiverData, setReceiverData] = useState(null);
  const [senderPhoto, setSenderPhoto] = useState(null);
  const [receiverPhoto, setReceiverPhoto] = useState(null);

  const CustomerDetails = ({ data, photo }) => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 50px' }}>
        <Typography>
          Customer Name: {data.Name}
        </Typography>
        <Typography>
          Customer Address: {data.Address}
        </Typography>
        <Typography>
          Customer Phone Number: {data.Mobile_Number}
        </Typography>
        <Typography>
          Customer Balance: {data.Account_Balance}
        </Typography>
        <Typography>
          Customer Email: {data.Email}
        </Typography>
        {photo ? (
          <img
            src={`data:image/jpeg;base64,${photo}`}
            alt="Sender Photo"
            style={{ maxWidth: '100px', marginTop: '20px' }}
          />
        ) : (
          <img
            src={`http://localhost:5001/api/customer/photo/${data.Customer_ID}`}
            alt="No Photo"
            style={{ maxWidth: '100px', marginTop: '20px' }}
          />
        )}
      </Box>
    );
  };

  const ArrowBetweenSenderAndReceiver = () => {
    return (
      <Box sx={{ position: 'relative', marginTop: '20px' }}>
        {/* Arrow between sender and receiver */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: `2px solid ${colors.grey[100]}`,
            height: '50px',
          }}
        />
      </Box>
    );
  };

  const columns = [
    { field: "Transaction_ID", headerName: "ID" },
    { field: "Customer_ID", headerName: "Customer_ID", flex: 1 },
    { field: "Destination_Account", headerName: "Receiver_ID", flex: 1 },
    {
      field: "Amount",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ₹ {params.value}
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

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/transactions", { 
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',

          
          // You can add other headers as needed
        },
      });
      
      const data = response.data;
      console.log("Data received:", data);
      setFrauds(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const debouncedFetchData = debounce(fetchData, 500);

  
  const handleRowClick = async (params) => {
    setSelectedRow(params.row);
  
    try {
      // Fetch sender data
      const senderResponse = await axios.get(
        `http://localhost:5001/api/customers/${params.row.Customer_ID}`
      );
      const senderData = senderResponse.data.customer;
      console.log("Sender Data received:", senderData);
  
      // Fetch sender photo
      const senderPhotoResponse = await axios.get(
        `http://localhost:5001/api/customer/photo/${params.row.Customer_ID}`,
        { responseType: 'arraybuffer' }
      );
      console.log("Sender Photo Response:", senderPhotoResponse);
  
      if (senderPhotoResponse && senderPhotoResponse.status === 404) {
        console.log("Sender Photo not found");
        setSenderPhoto(null);
      } else {
        const senderPhotoBlob = new Blob([senderPhotoResponse.data], { type: 'image/jpeg' });
        const senderPhotoBlobUrl = URL.createObjectURL(senderPhotoBlob);
        console.log("Sender Photo received:", senderPhotoBlobUrl);
        setSenderPhoto(senderPhotoBlobUrl);
  
        // Update sender data with the blob URL
        setSenderData({ ...senderData, Photo: senderPhotoBlobUrl });
      }
    } catch (error) {
      console.error("Error fetching sender data:", error);
    }
  };
    

  const handleCloseModal = () => {
    setSelectedRow(null);
    setSenderData(null);
    // setReceiverData(null);
    setSenderPhoto(null);
    // setReceiverPhoto(null);
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      debouncedFetchData();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [debouncedFetchData]);

  console.log("fraud", frauds)

  return (
    <Box m="20px">
      <Header
        title="Latest Transactions"
        subtitle="List of latest transactions with id details"
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
          rows={frauds}
          columns={columns}
          pageSize={25}
          getRowId={(row) => row.Transaction_ID}
          onRowClick={handleRowClick}
        />
      </Box>

      <Dialog open={!!selectedRow} onClose={handleCloseModal} sx={{ borderRadius: "8px" }}>
        <DialogTitle sx={{ backgroundColor: colors.primary[700], color: colors.grey[100] }}>
          Transaction Details
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: colors.primary[400], color: colors.grey[100], display: 'flex', alignItems: 'center' }}>
          {senderData && <CustomerDetails data={senderData}  />}
          <ArrowBetweenSenderAndReceiver />
          {/* {receiverData && <CustomerDetails data={receiverData}  />}  */}
        </DialogContent>
        <Button onClick={handleCloseModal} sx={{ backgroundColor: colors.redAccent[500], color: colors.grey[100], mt: "20px", alignSelf: 'center' }}>
          Close
        </Button>
      </Dialog>
    </Box>
  );
};

export default TransactionHistory;
