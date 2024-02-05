import { tokens } from "../theme";

export const mockDataTeam = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    age: 35,
    phone: "(665)121-5454",
    access: "admin",
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    age: 42,
    phone: "(421)314-2288",
    access: "manager",
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    age: 45,
    phone: "(422)982-6739",
    access: "user",
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    age: 16,
    phone: "(921)425-6742",
    access: "admin",
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    age: 31,
    phone: "(421)445-1189",
    access: "user",
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    age: 150,
    phone: "(232)545-6483",
    access: "manager",
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferraraclifford@gmail.com",
    age: 44,
    phone: "(543)124-0123",
    access: "user",
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossinifrances@gmail.com",
    age: 36,
    phone: "(222)444-5555",
    access: "user",
  },
  {
    id: 9,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
  },
];

export const mockDataContacts = [
  { id: 1, name: "John Doe", phone: "123-456-7890", amount: 500.25, timestamp: "2024-01-05T12:30:00Z", date: "2024-01-05", transactionID: "ABC123", location: "City A", category: "Online Shopping", recieverID: 101 },
  { id: 2, name: "Alice Johnson", phone: "987-654-3210", amount: 1200.75, timestamp: "2024-01-06T09:15:00Z", date: "2024-01-06", transactionID: "DEF456", location: "City B", category: "Groceries", recieverID: 102 },
  { id: 3, name: "Bob Smith", phone: "555-123-4567", amount: 800.50, timestamp: "2024-01-07T14:00:00Z", date: "2024-01-07", transactionID: "GHI789", location: "City C", category: "Travel", recieverID: 103 },
  { id: 4, name: "Eva Davis", phone: "111-222-3333", amount: 300.90, timestamp: "2024-01-08T11:45:00Z", date: "2024-01-08", transactionID: "JKL012", location: "City A", category: "Dining", recieverID: 104 },
  { id: 5, name: "Charlie Brown", phone: "999-888-7777", amount: 1500.20, timestamp: "2024-01-09T16:30:00Z", date: "2024-01-09", transactionID: "MNO345", location: "City B", category: "Electronics", recieverID: 105 },
  { id: 6, name: "Grace Wilson", phone: "333-444-5555", amount: 600.75, timestamp: "2024-01-10T13:20:00Z", date: "2024-01-10", transactionID: "PQR678", location: "City C", category: "Clothing", recieverID: 106 },
  { id: 7, name: "Daniel Lee", phone: "777-666-5555", amount: 1000.40, timestamp: "2024-01-11T10:10:00Z", date: "2024-01-11", transactionID: "STU901", location: "City A", category: "Home Improvement", recieverID: 107 },
  { id: 8, name: "Sophia Turner", phone: "444-555-6666", amount: 450.30, timestamp: "2024-01-12T15:50:00Z", date: "2024-01-12", transactionID: "VWX234", location: "City B", category: "Health & Wellness", recieverID: 108 },
  { id: 9, name: "Oliver Reed", phone: "666-777-8888", amount: 750.60, timestamp: "2024-01-13T12:40:00Z", date: "2024-01-13", transactionID: "YZA567", location: "City C", category: "Entertainment", recieverID: 109 },
  { id: 10, name: "Mia Garcia", phone: "222-111-9999", amount: 1100.90, timestamp: "2024-01-14T09:30:00Z", date: "2024-01-14", transactionID: "BCD890", location: "City A", category: "Automotive", recieverID: 110 },
  { id: 11, name: "Liam Rodriguez", phone: "888-999-0000", amount: 350.45, timestamp: "2024-01-15T14:20:00Z", date: "2024-01-15", transactionID: "EFG123", location: "City B", category: "Travel", recieverID: 111 },
  { id: 12, name: "Emma Hernandez", phone: "444-333-2222", amount: 900.80, timestamp: "2024-01-16T11:10:00Z", date: "2024-01-16", transactionID: "HIJ456", location: "City C", category: "Electronics", recieverID: 112 },
  { id: 13, name: "Noah Taylor", phone: "777-888-9999", amount: 200.25, timestamp: "2024-01-17T16:00:00Z", date: "2024-01-17", transactionID: "KLM789", location: "City A", category: "Dining", recieverID: 113 },
  { id: 14, name: "Ava Martinez", phone: "111-222-3333", amount: 1300.70, timestamp: "2024-01-18T13:45:00Z", date: "2024-01-18", transactionID: "NOP012", location: "City B", category: "Online Shopping", recieverID: 114 },
  { id: 15, name: "Isaac Davis", phone: "555-666-7777", amount: 500.40, timestamp: "2024-01-19T10:35:00Z", date: "2024-01-19", transactionID: "QRS345", location: "City C", category: "Clothing", recieverID: 115 },
  { id: 16, name: "Scarlett Brown", phone: "999-888-7777", amount: 950.55, timestamp: "2024-01-20T15:25:00Z", date: "2024-01-20", transactionID: "TUV678", location: "City A", category: "Health & Wellness", recieverID: 116 },
  { id: 17, name: "Carter White", phone: "333-444-5555", amount: 600.90, timestamp: "2024-01-21T12:15:00Z", date: "2024-01-21", transactionID: "WXY901", location: "City B", category: "Entertainment", recieverID: 117 },
  { id: 18, name: "Lily Adams", phone: "777-666-5555", amount: 400.25, timestamp: "2024-01-22T09:05:00Z", date: "2024-01-22", transactionID: "ZAB234", location: "City C", category: "Automotive", recieverID: 118 },
  { id: 19, name: "Logan Harris", phone: "444-555-6666", amount: 700.60, timestamp: "2024-01-23T13:55:00Z", date: "2024-01-23", transactionID: "BCD567", location: "City A", category: "Home Improvement", recieverID: 119 },
  { id: 20, name: "Zoe Turner", phone: "666-777-8888", amount: 850.80, timestamp: "2024-01-24T10:45:00Z", date: "2024-01-24", transactionID: "DEF890", location: "City B", category: "Groceries", recieverID: 120 }
]
;

export const mockDataInvoices = [
  { id: 1, name: "John Doe", phone: "123-456-7890", amount: 500.25, timestamp: "2024-01-05T12:30:00Z", date: "2024-01-05", transactionID: "ABC123", location: "City A", category: "Online Shopping", recieverID: 101 },
  { id: 2, name: "Alice Johnson", phone: "987-654-3210", amount: 1200.75, timestamp: "2024-01-06T09:15:00Z", date: "2024-01-06", transactionID: "DEF456", location: "City B", category: "Groceries", recieverID: 102 },
  { id: 3, name: "Bob Smith", phone: "555-123-4567", amount: 800.50, timestamp: "2024-01-07T14:00:00Z", date: "2024-01-07", transactionID: "GHI789", location: "City C", category: "Travel", recieverID: 103 },
  { id: 4, name: "Eva Davis", phone: "111-222-3333", amount: 300.90, timestamp: "2024-01-08T11:45:00Z", date: "2024-01-08", transactionID: "JKL012", location: "City A", category: "Dining", recieverID: 104 },
  { id: 5, name: "Charlie Brown", phone: "999-888-7777", amount: 1500.20, timestamp: "2024-01-09T16:30:00Z", date: "2024-01-09", transactionID: "MNO345", location: "City B", category: "Electronics", recieverID: 105 },
  { id: 6, name: "Grace Wilson", phone: "333-444-5555", amount: 600.75, timestamp: "2024-01-10T13:20:00Z", date: "2024-01-10", transactionID: "PQR678", location: "City C", category: "Clothing", recieverID: 106 },
  { id: 7, name: "Daniel Lee", phone: "777-666-5555", amount: 1000.40, timestamp: "2024-01-11T10:10:00Z", date: "2024-01-11", transactionID: "STU901", location: "City A", category: "Home Improvement", recieverID: 107 },
  { id: 8, name: "Sophia Turner", phone: "444-555-6666", amount: 450.30, timestamp: "2024-01-12T15:50:00Z", date: "2024-01-12", transactionID: "VWX234", location: "City B", category: "Health & Wellness", recieverID: 108 },
  { id: 9, name: "Oliver Reed", phone: "666-777-8888", amount: 750.60, timestamp: "2024-01-13T12:40:00Z", date: "2024-01-13", transactionID: "YZA567", location: "City C", category: "Entertainment", recieverID: 109 },
  { id: 10, name: "Mia Garcia", phone: "222-111-9999", amount: 1100.90, timestamp: "2024-01-14T09:30:00Z", date: "2024-01-14", transactionID: "BCD890", location: "City A", category: "Automotive", recieverID: 110 },
  { id: 11, name: "Liam Rodriguez", phone: "888-999-0000", amount: 350.45, timestamp: "2024-01-15T14:20:00Z", date: "2024-01-15", transactionID: "EFG123", location: "City B", category: "Travel", recieverID: 111 },
  { id: 12, name: "Emma Hernandez", phone: "444-333-2222", amount: 900.80, timestamp: "2024-01-16T11:10:00Z", date: "2024-01-16", transactionID: "HIJ456", location: "City C", category: "Electronics", recieverID: 112 },
  { id: 13, name: "Noah Taylor", phone: "777-888-9999", amount: 200.25, timestamp: "2024-01-17T16:00:00Z", date: "2024-01-17", transactionID: "KLM789", location: "City A", category: "Dining", recieverID: 113 },
  { id: 14, name: "Ava Martinez", phone: "111-222-3333", amount: 1300.70, timestamp: "2024-01-18T13:45:00Z", date: "2024-01-18", transactionID: "NOP012", location: "City B", category: "Online Shopping", recieverID: 114 },
  { id: 15, name: "Isaac Davis", phone: "555-666-7777", amount: 500.40, timestamp: "2024-01-19T10:35:00Z", date: "2024-01-19", transactionID: "QRS345", location: "City C", category: "Clothing", recieverID: 115 },
  { id: 16, name: "Scarlett Brown", phone: "999-888-7777", amount: 950.55, timestamp: "2024-01-20T15:25:00Z", date: "2024-01-20", transactionID: "TUV678", location: "City A", category: "Health & Wellness", recieverID: 116 },
  { id: 17, name: "Carter White", phone: "333-444-5555", amount: 600.90, timestamp: "2024-01-21T12:15:00Z", date: "2024-01-21", transactionID: "WXY901", location: "City B", category: "Entertainment", recieverID: 117 },
  { id: 18, name: "Lily Adams", phone: "777-666-5555", amount: 400.25, timestamp: "2024-01-22T09:05:00Z", date: "2024-01-22", transactionID: "ZAB234", location: "City C", category: "Automotive", recieverID: 118 },
  { id: 19, name: "Logan Harris", phone: "444-555-6666", amount: 700.60, timestamp: "2024-01-23T13:55:00Z", date: "2024-01-23", transactionID: "BCD567", location: "City A", category: "Home Improvement", recieverID: 119 },
  { id: 20, name: "Zoe Turner", phone: "666-777-8888", amount: 850.80, timestamp: "2024-01-24T10:45:00Z", date: "2024-01-24", transactionID: "DEF890", location: "City B", category: "Groceries", recieverID: 120 }
];

export const mockTransactions = [
  {
    txId: "01e4dsa",
    user: "johndoe",
    date: "2021-09-01",
    cost: "43.95",
  },
  {
    txId: "0315dsaa",
    user: "jackdower",
    date: "2022-04-01",
    cost: "133.45",
  },
  {
    txId: "01e4dsa",
    user: "aberdohnny",
    date: "2021-09-01",
    cost: "43.95",
  },
  {
    txId: "51034szv",
    user: "goodmanave",
    date: "2022-11-05",
    cost: "200.95",
  },
  {
    txId: "0a123sb",
    user: "stevebower",
    date: "2022-11-02",
    cost: "13.55",
  },
  {
    txId: "01e4dsa",
    user: "aberdohnny",
    date: "2021-09-01",
    cost: "43.95",
  },
  {
    txId: "120s51a",
    user: "wootzifer",
    date: "2019-04-15",
    cost: "24.20",
  },
  {
    txId: "0315dsaa",
    user: "jackdower",
    date: "2022-04-01",
    cost: "133.45",
  },
];

export const mockBarData = [
  {
    city: "Mumbai",
    transactions: [
      { category: "Phishing", count: 20 },
      { category: "Money Laundering", count: 15 },
      { category: "Identity Theft", count: 10 },
      // Add more categories as needed
    ],
  },
  {
    city: "Delhi",
    transactions: [
      { category: "Phishing", count: 25 },
      { category: "Money Laundering", count: 18 },
      { category: "Identity Theft", count: 12 },
      // Add more categories as needed
    ],
  },
  {
    city: "Bangalore",
    transactions: [
      { category: "Phishing", count: 30 },
      { category: "Money Laundering", count: 22 },
      { category: "Identity Theft", count: 8 },
      // Add more categories as needed
    ],
  },
  {
    city: "Jaipur",
    transactions: [
      { category: "Phishing", count: 10 },
      { category: "Money Laundering", count: 8 },
      { category: "Identity Theft", count: 5 },
      // Add more categories as needed
    ],
  },
  {
    city: "Chennai",
    transactions: [
      { category: "Phishing", count: 15 },
      { category: "Money Laundering", count: 12 },
      { category: "Identity Theft", count: 7 },
      // Add more categories as needed
    ],
  },
  {
    city: "Hyderabad",
    transactions: [
      { category: "Phishing", count: 18 },
      { category: "Money Laundering", count: 10 },
      { category: "Identity Theft", count: 15 },
      // Add more categories as needed
    ],
  },
  {
    city: "Kolkata",
    transactions: [
      { category: "Phishing", count: 22 },
      { category: "Money Laundering", count: 15 },
      { category: "Identity Theft", count: 12 },
      // Add more categories as needed
    ],
  },
  {
    city: "Pune",
    transactions: [
      { category: "Phishing", count: 28 },
      { category: "Money Laundering", count: 20 },
      { category: "Identity Theft", count: 10 },
      // Add more categories as needed
    ],
  },
  {
    city: "Ahmedabad",
    transactions: [
      { category: "Phishing", count: 12 },
      { category: "Money Laundering", count: 8 },
      { category: "Identity Theft", count: 5 },
      // Add more categories as needed
    ],
  },
  {
    city: "Coimbatore",
    transactions: [
      { category: "Phishing", count: 14 },
      { category: "Money Laundering", count: 32 },
      { category: "Identity Theft", count: 25 },
    ],
  },
  {
    city: "Indore",
    transactions: [
      { category: "Phishing", count: 11 },
      { category: "Money Laundering", count: 23 },
      { category: "Identity Theft", count: 8 },
    ],
  },
  {
    city: "Surat",
    transactions: [
      { category: "Phishing", count: 31 },
      { category: "Money Laundering", count: 45 },
      { category: "Identity Theft", count: 21 },
    ],
  },
  {
    city: "Bhopal",
    transactions: [
      { category: "Phishing", count: 12 },
      { category: "Money Laundering", count: 6 },
      { category: "Identity Theft", count: 4 },
    ],
  },
  {
    city: "Visakhapatnam",
    transactions: [
      { category: "Phishing", count: 22 },
      { category: "Money Laundering", count: 18 },
      { category: "Identity Theft", count: 6 },
    ],
  },
];

export const mockPieData = [
  {
    id: "Mumbai",
    label: "Mumbai",
    value: 500.25,
    color: "hsl(104, 70%, 50%)",
  },
  {
    id: "Delhi",
    label: "Delhi",
    value: 1200.75,
    color: "hsl(162, 70%, 50%)",
  },
  {
    id: "Bangalore",
    label: "Bangalore",
    value: 800.50,
    color: "hsl(291, 70%, 50%)",
  },
  {
    id: "Jaipur",
    label: "Jaipur",
    value: 300.90,
    color: "hsl(229, 70%, 50%)",
  },
  {
    id: "Chennai",
    label: "Chennai",
    value: 1500.20,
    color: "hsl(344, 70%, 50%)",
  },
  {
    id: "Hyderabad",
    label: "Hyderabad",
    value: 600.75,
    color: "hsl(45, 70%, 50%)",
  },
  {
    id: "Kolkata",
    label: "Kolkata",
    value: 1000.40,
    color: "hsl(90, 70%, 50%)",
  },
  {
    id: "Pune",
    label: "Pune",
    value: 450.30,
    color: "hsl(135, 70%, 50%)",
  },
  {
    id: "Ahmedabad",
    label: "Ahmedabad",
    value: 750.60,
    color: "hsl(180, 70%, 50%)",
  },
  {
    id: "Coimbatore",
    label: "Coimbatore",
    value: 1100.90,
    color: "hsl(270, 70%, 50%)",
  },
];

export const mockLineData = [
  {
  "id": "Mumbai",
  "color": tokens("dark").greenAccent[500],
  "data": [
    { x: "JAN", y: 101 },
    { x: "FEB", y: 75 },
    { x: "MARCH", y: 36 },
    { x: "APRIL", y: 216 },
    { x: "MAY", y: 35 },
    { x: "JUNE", y: 236 },
    { x: "JULY", y: 88 },
    { x: "AUGUST", y: 232 },
    { x: "SEPTEMBER", y: 281 },
    { x: "OCTOBER", y: 1 },
    { x: "NOVEMBER", y: 35 },
    { x: "DECEMBER", y: 14 },
  ],
},
{
  id: "Delhi",
  color: tokens("dark").blueAccent[300],
  data: [
    { x: "JAN", y: 212 },
    { x: "FEB", y: 190 },
    { x: "MARCH", y: 270 },
    { x: "APRIL", y: 9 },
    { x: "MAY", y: 75 },
    { x: "JUNE", y: 175 },
    { x: "JULY", y: 33 },
    { x: "AUGUST", y: 189 },
    { x: "SEPTEMBER", y: 97 },
    { x: "OCTOBER", y: 87 },
    { x: "NOVEMBER", y: 299 },
    { x: "DECEMBER", y: 251 },
  ],
},
{
  id: "Bangalore",
  color: tokens("dark").redAccent[200],
  data: [
    { x: "JAN", y: 191 },
    { x: "FEB", y: 136 },
    { x: "MARCH", y: 91 },
    { x: "APRIL", y: 190 },
    { x: "MAY", y: 211 },
    { x: "JUNE", y: 152 },
    { x: "JULY", y: 189 },
    { x: "AUGUST", y: 152 },
    { x: "SEPTEMBER", y: 8 },
    { x: "OCTOBER", y: 197 },
    { x: "NOVEMBER", y: 107 },
    { x: "DECEMBER", y: 170 },
  ],
},
];

export const mockGeographyData = [
  {
    id: "AFG",
    value: 520600,
  },
  {
    id: "AGO",
    value: 949905,
  },
  {
    id: "ALB",
    value: 329910,
  },
  {
    id: "ARE",
    value: 675484,
  },
  {
    id: "ARG",
    value: 432239,
  },
  {
    id: "ARM",
    value: 288305,
  },
  {
    id: "ATA",
    value: 415648,
  },
  {
    id: "ATF",
    value: 665159,
  },
  {
    id: "AUT",
    value: 798526,
  },
  {
    id: "AZE",
    value: 481678,
  },
  {
    id: "BDI",
    value: 496457,
  },
  {
    id: "BEL",
    value: 252276,
  },
  {
    id: "BEN",
    value: 440315,
  },
  {
    id: "BFA",
    value: 343752,
  },
  {
    id: "BGD",
    value: 920203,
  },
  {
    id: "BGR",
    value: 261196,
  },
  {
    id: "BHS",
    value: 421551,
  },
  {
    id: "BIH",
    value: 974745,
  },
  {
    id: "BLR",
    value: 349288,
  },
  {
    id: "BLZ",
    value: 305983,
  },
  {
    id: "BOL",
    value: 430840,
  },
  {
    id: "BRN",
    value: 345666,
  },
  {
    id: "BTN",
    value: 649678,
  },
  {
    id: "BWA",
    value: 319392,
  },
  {
    id: "CAF",
    value: 722549,
  },
  {
    id: "CAN",
    value: 332843,
  },
  {
    id: "CHE",
    value: 122159,
  },
  {
    id: "CHL",
    value: 811736,
  },
  {
    id: "CHN",
    value: 593604,
  },
  {
    id: "CIV",
    value: 143219,
  },
  {
    id: "CMR",
    value: 630627,
  },
  {
    id: "COG",
    value: 498556,
  },
  {
    id: "COL",
    value: 660527,
  },
  {
    id: "CRI",
    value: 60262,
  },
  {
    id: "CUB",
    value: 177870,
  },
  {
    id: "-99",
    value: 463208,
  },
  {
    id: "CYP",
    value: 945909,
  },
  {
    id: "CZE",
    value: 500109,
  },
  {
    id: "DEU",
    value: 63345,
  },
  {
    id: "DJI",
    value: 634523,
  },
  {
    id: "DNK",
    value: 731068,
  },
  {
    id: "DOM",
    value: 262538,
  },
  {
    id: "DZA",
    value: 760695,
  },
  {
    id: "ECU",
    value: 301263,
  },
  {
    id: "EGY",
    value: 148475,
  },
  {
    id: "ERI",
    value: 939504,
  },
  {
    id: "ESP",
    value: 706050,
  },
  {
    id: "EST",
    value: 977015,
  },
  {
    id: "ETH",
    value: 461734,
  },
  {
    id: "FIN",
    value: 22800,
  },
  {
    id: "FJI",
    value: 18985,
  },
  {
    id: "FLK",
    value: 64986,
  },
  {
    id: "FRA",
    value: 447457,
  },
  {
    id: "GAB",
    value: 669675,
  },
  {
    id: "GBR",
    value: 757120,
  },
  {
    id: "GEO",
    value: 158702,
  },
  {
    id: "GHA",
    value: 893180,
  },
  {
    id: "GIN",
    value: 877288,
  },
  {
    id: "GMB",
    value: 724530,
  },
  {
    id: "GNB",
    value: 387753,
  },
  {
    id: "GNQ",
    value: 706118,
  },
  {
    id: "GRC",
    value: 377796,
  },
  {
    id: "GTM",
    value: 66890,
  },
  {
    id: "GUY",
    value: 719300,
  },
  {
    id: "HND",
    value: 739590,
  },
  {
    id: "HRV",
    value: 929467,
  },
  {
    id: "HTI",
    value: 538961,
  },
  {
    id: "HUN",
    value: 146095,
  },
  {
    id: "IDN",
    value: 490681,
  },
  {
    id: "IND",
    value: 549818,
  },
  {
    id: "IRL",
    value: 630163,
  },
  {
    id: "IRN",
    value: 596921,
  },
  {
    id: "IRQ",
    value: 767023,
  },
  {
    id: "ISL",
    value: 478682,
  },
  {
    id: "ISR",
    value: 963688,
  },
  {
    id: "ITA",
    value: 393089,
  },
  {
    id: "JAM",
    value: 83173,
  },
  {
    id: "JOR",
    value: 52005,
  },
  {
    id: "JPN",
    value: 199174,
  },
  {
    id: "KAZ",
    value: 181424,
  },
  {
    id: "KEN",
    value: 60946,
  },
  {
    id: "KGZ",
    value: 432478,
  },
  {
    id: "KHM",
    value: 254461,
  },
  {
    id: "OSA",
    value: 942447,
  },
  {
    id: "KWT",
    value: 414413,
  },
  {
    id: "LAO",
    value: 448339,
  },
  {
    id: "LBN",
    value: 620090,
  },
  {
    id: "LBR",
    value: 435950,
  },
  {
    id: "LBY",
    value: 75091,
  },
  {
    id: "LKA",
    value: 595124,
  },
  {
    id: "LSO",
    value: 483524,
  },
  {
    id: "LTU",
    value: 867357,
  },
  {
    id: "LUX",
    value: 689172,
  },
  {
    id: "LVA",
    value: 742980,
  },
  {
    id: "MAR",
    value: 236538,
  },
  {
    id: "MDA",
    value: 926836,
  },
  {
    id: "MDG",
    value: 840840,
  },
  {
    id: "MEX",
    value: 353910,
  },
  {
    id: "MKD",
    value: 505842,
  },
  {
    id: "MLI",
    value: 286082,
  },
  {
    id: "MMR",
    value: 915544,
  },
  {
    id: "MNE",
    value: 609500,
  },
  {
    id: "MNG",
    value: 410428,
  },
  {
    id: "MOZ",
    value: 32868,
  },
  {
    id: "MRT",
    value: 375671,
  },
  {
    id: "MWI",
    value: 591935,
  },
  {
    id: "MYS",
    value: 991644,
  },
  {
    id: "NAM",
    value: 701897,
  },
  {
    id: "NCL",
    value: 144098,
  },
  {
    id: "NER",
    value: 312944,
  },
  {
    id: "NGA",
    value: 862877,
  },
  {
    id: "NIC",
    value: 90831,
  },
  {
    id: "NLD",
    value: 281879,
  },
  {
    id: "NOR",
    value: 224537,
  },
  {
    id: "NPL",
    value: 322331,
  },
  {
    id: "NZL",
    value: 86615,
  },
  {
    id: "OMN",
    value: 707881,
  },
  {
    id: "PAK",
    value: 158577,
  },
  {
    id: "PAN",
    value: 738579,
  },
  {
    id: "PER",
    value: 248751,
  },
  {
    id: "PHL",
    value: 557292,
  },
  {
    id: "PNG",
    value: 516874,
  },
  {
    id: "POL",
    value: 682137,
  },
  {
    id: "PRI",
    value: 957399,
  },
  {
    id: "PRT",
    value: 846430,
  },
  {
    id: "PRY",
    value: 720555,
  },
  {
    id: "QAT",
    value: 478726,
  },
  {
    id: "ROU",
    value: 259318,
  },
  {
    id: "RUS",
    value: 268735,
  },
  {
    id: "RWA",
    value: 136781,
  },
  {
    id: "ESH",
    value: 151957,
  },
  {
    id: "SAU",
    value: 111821,
  },
  {
    id: "SDN",
    value: 927112,
  },
  {
    id: "SDS",
    value: 966473,
  },
  {
    id: "SEN",
    value: 158085,
  },
  {
    id: "SLB",
    value: 178389,
  },
  {
    id: "SLE",
    value: 528433,
  },
  {
    id: "SLV",
    value: 353467,
  },
  {
    id: "ABV",
    value: 251,
  },
  {
    id: "SOM",
    value: 445243,
  },
  {
    id: "SRB",
    value: 202402,
  },
  {
    id: "SUR",
    value: 972121,
  },
  {
    id: "SVK",
    value: 319923,
  },
  {
    id: "SVN",
    value: 728766,
  },
  {
    id: "SWZ",
    value: 379669,
  },
  {
    id: "SYR",
    value: 16221,
  },
  {
    id: "TCD",
    value: 101273,
  },
  {
    id: "TGO",
    value: 498411,
  },
  {
    id: "THA",
    value: 506906,
  },
  {
    id: "TJK",
    value: 613093,
  },
  {
    id: "TKM",
    value: 327016,
  },
  {
    id: "TLS",
    value: 607972,
  },
  {
    id: "TTO",
    value: 936365,
  },
  {
    id: "TUN",
    value: 898416,
  },
  {
    id: "TUR",
    value: 237783,
  },
  {
    id: "TWN",
    value: 878213,
  },
  {
    id: "TZA",
    value: 442174,
  },
  {
    id: "UGA",
    value: 720710,
  },
  {
    id: "UKR",
    value: 74172,
  },
  {
    id: "URY",
    value: 753177,
  },
  {
    id: "USA",
    value: 658725,
  },
  {
    id: "UZB",
    value: 550313,
  },
  {
    id: "VEN",
    value: 707492,
  },
  {
    id: "VNM",
    value: 538907,
  },
  {
    id: "VUT",
    value: 650646,
  },
  {
    id: "PSE",
    value: 476078,
  },
  {
    id: "YEM",
    value: 957751,
  },
  {
    id: "ZAF",
    value: 836949,
  },
  {
    id: "ZMB",
    value: 714503,
  },
  {
    id: "ZWE",
    value: 405217,
  },
  {
    id: "KOR",
    value: 171135,
  },
];
