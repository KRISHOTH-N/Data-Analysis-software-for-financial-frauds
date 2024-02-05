import { useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import axios from "axios";
import Map from "../map/Map.jsx";



const Calendar2 = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [senderData, setSenderData] = useState(null);
  const [senderPhoto, setSenderPhoto] = useState(null);
  const [fraudCustomerId, setFraudCustomerId] = useState(null);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };
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
            // src={data:image/jpeg;base64,${photo}}
            src={photo}
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
  const handleRowClick = async (Customer_ID) => {
    // setSelectedRow(params.row);
    try {
      // Fetch sender data
      const senderResponse = await axios.get(
        `http://localhost:5001/api/customers/${Customer_ID}`
      );
      const senderData = senderResponse.data.customer;
      console.log("Sender Data received:", senderData);
  
      // Fetch sender photo
      const senderPhotoResponse = await axios.get(
        `http://localhost:5001/api/customer/photo/${Customer_ID}`,
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
        setopenDetailsBox(true);
        setSenderPhoto(senderPhotoBlobUrl);
  
        // Update sender data with the blob URL
        setSenderData({ ...senderData, Photo: senderPhotoBlobUrl });
      }
    } catch (error) {
      console.error("Error fetching sender data:", error);
    }
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
            border: '2px solid ${colors.grey[100]}',
            height: '50px',
          }}
        />
      </Box>
    );
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openDetailsBox, setopenDetailsBox] = useState(false);
  
 
  const handleEventClick = (selected) => {
    handleRowClick(selected.event.title);
    setFraudCustomerId(selected.event.title);
   

    // if (
    //   window.confirm(
    //     Are you sure you want to delete the event '${selected.event.title}'
    //   )
    // ) {
    //   // Set the selected event data
    //   handleRowClick(selected.event);
    //   // Open the dialog
    //   setIsDialogOpen(true);
    //   // Remove the event
    //   selected.event.remove();
    // }
  };
 

  const handleCloseModal = () => {
    setIsDialogOpen(false);
    setSelectedRow(null);
    setSenderData(null);
    setSenderPhoto(null);
  };
 

  

  
  const handleConfirmFraud = async () => {
    try {
      console.log(fraudCustomerId);

      const response = await axios.post('http://localhost:5001/api/confirmFraud', {
        customer_id: fraudCustomerId,
      });

      // Handle the response data if needed
      console.log(response.data);
    } catch (error) {
      // Handle error responses
      console.error('Error confirming fraud:', error);
    }
  };
  const handleNotFraud = (selected) => {
    console.log("Selected:", selectedRow);
  
  };
  

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
              {
                id: "12315",
                title: "All-day event",
                date: "2022-09-14",
              },
              {
                id: "5123",
                title: "Timed event",
                date: "2022-09-28",
              },
            ]}
          />
        </Box>
      </Box>
      <Dialog open={openDetailsBox} onClose={handleCloseModal} sx={{ borderRadius: "8px" }}>
        <DialogTitle sx={{ backgroundColor: colors.primary[700], color: colors.grey[100] }}>
          Transaction Details
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: colors.primary[400], color: colors.grey[100], display: 'flex', alignItems: 'center' }}>
          {senderData && <CustomerDetails data={senderData} photo={senderPhoto} />}
          <ArrowBetweenSenderAndReceiver />
          {/* {receiverData && <CustomerDetails data={receiverData} photo={receiverPhoto} />} */}
        </DialogContent>
        <Grid container spacing={2} marginLeft={1}>
            <Grid item xs={12} md={3}>
                <Map/>
            </Grid>
            <Grid item xs={12} md={3}>
                <Button onClick={handleNotFraud} sx={{ backgroundColor: colors.greenAccent[500], color: colors.grey[100], mt: "20px", alignSelf: 'center' }}>
                  Innocent
                </Button>
            </Grid>
            
            <Grid item xs={12} md={3}>
            
              <Button onClick={handleConfirmFraud} sx={{ backgroundColor: colors.redAccent[500], color: colors.grey[100], mt: "20px", alignSelf: 'center' }}>
               Fraud
              </Button>
            </Grid>
            <Grid item xs={12} md={3}>
                <Button onClick={()=>setopenDetailsBox(false)} sx={{ backgroundColor: colors.blueAccent[500], color: colors.grey[100], mt: "20px", alignSelf: 'center' }}>
                 Close
                </Button>
            </Grid>
            
            
        </Grid>
        
       
        


      </Dialog>
    </Box>
  );
};

export default Calendar2;