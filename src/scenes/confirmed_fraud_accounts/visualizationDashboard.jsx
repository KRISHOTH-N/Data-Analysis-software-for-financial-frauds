// visualizationDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Paper, Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Tree from 'react-d3-tree';

const VisualizationPage = () => {
  const { customerId } = useParams();
  const [moneyFlowData, setMoneyFlowData] = useState(null);

  useEffect(() => {
    // Fetch data from the endpoint
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/customer/${customerId}/money_flow`);
        setMoneyFlowData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [customerId]);

  const formatDataForLineChart = () => {
    if (!moneyFlowData) return [];

    // Group data by type and month
    const groupedData = moneyFlowData.transactions.reduce((acc, transaction) => {
      const month = transaction.Date.split('/')[0];
      if (!acc[transaction.Type]) {
        acc[transaction.Type] = {
          name: transaction.Type,
          data: [],
        };
      }

      // Check if the month already exists for the type
      const existingMonthIndex = acc[transaction.Type].data.findIndex((entry) => entry.month === month);

      if (existingMonthIndex !== -1) {
        // If the month exists, update the balance
        acc[transaction.Type].data[existingMonthIndex].balance += transaction.Amount;
      } else {
        // If the month doesn't exist, add a new entry
        acc[transaction.Type].data.push({
          month,
          balance: transaction.Amount,
        });
      }

      return acc;
    }, {});

    // Convert object to array
    return Object.values(groupedData);
  };

  const renderLineChart = () => {
    const dataForLineChart = formatDataForLineChart();

    // Sort months in chronological order
    const sortedMonths = Array.from(new Set(dataForLineChart.flatMap((typeData) => typeData.data.map((entry) => entry.month)))).sort();

    return (
      <LineChart width={3000} height={400} data={dataForLineChart} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" ticks={sortedMonths} />
        <YAxis />
        <Tooltip />
        <Legend />
        {dataForLineChart.map((typeData) => (
          <Line
            key={typeData.name}
            type="monotone"
            dataKey="balance"
            data={typeData.data}
            stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
            name={typeData.name}
          />
        ))}
      </LineChart>
    );
  };

  const calculateTotalBalance = () => {
    if (!moneyFlowData) return 0;
    return moneyFlowData.transactions.reduce((acc, transaction) => acc + transaction.NewBalanceOrg, 0);
  };

  const calculateAmountSpent = () => {
    if (!moneyFlowData) return 0;
    return moneyFlowData.transactions.reduce((acc, transaction) => acc + (transaction.Type === 'payment' ? transaction.Amount : 0), 0);
  };

  const calculateNumberOfTransactions = () => {
    return moneyFlowData?.transactions.length || 0;
  };

  const calculateAmountReceived = () => {
    if (!moneyFlowData) return 0;
    return moneyFlowData.transactions.reduce((acc, transaction) => acc + (transaction.Type === 'cash In' ? transaction.Amount : 0), 0);
  };

  const isEven = (num) => num % 2 === 0;

  const calculateAmountSpentByType = () => {
    if (!moneyFlowData) return {};

    const spentByType = {};

    moneyFlowData.transactions.forEach((transaction) => {
      const type = transaction.Type || 'Unknown';
      spentByType[type] = (spentByType[type] || 0) + transaction.Amount;
    });

    return spentByType;
  };

  const renderTreeChart = () => {
    const dataForTreeChart = {
      name: 'Money Spent by Type',
      children: Object.entries(calculateAmountSpentByType()).map(([type, amount]) => ({
        name: type,
        attributes: {
          amount,
        },
      })),
    };

    const containerStyles = {
      width: '100%',
      height: '100%', // Adjust the height as needed
      backgroundColor: '#fff',
    };

    return (
      <Tree 
        data={dataForTreeChart}
        orientation="vertical"
        translate={{ x: 300, y: 150 }}
        collapsible={false}
        styles={{ links: { stroke: '#fff' }, nodes: { node: { circle: { fill: '#2196F3', stroke: '#2196F3', strokeWidth: 2 } } } }}
      />
    );
  };

  return (
    <div>
      <h1>Visualization Page for Customer ID: {customerId}</h1>

      {moneyFlowData && (
        <Grid container spacing={3} marginLeft={1}>
          {/* Stat Boxes */}
          <Grid item xs={12} md={2}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', backgroundColor: isEven(0) ? '#2196F3' : '#fff', color: isEven(0) ? '#fff' : '#000' }}>
              <Typography variant="h6">Balance</Typography>
              <Typography variant="h4">{`$ ${calculateTotalBalance().toFixed(2)}`}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={2}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', backgroundColor: isEven(1) ? '#2196F3' : '#fff', color: isEven(1) ? '#fff' : '#000' }}>
              <Typography variant="h6">Amount Spent</Typography>
              <Typography variant="h4">{`$ ${calculateAmountSpent().toFixed(2)}`}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={2}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', backgroundColor: isEven(2) ? '#2196F3' : '#fff', color: isEven(2) ? '#fff' : '#000' }}>
              <Typography variant="h6">Number of Transactions</Typography>
              <Typography variant="h4">{calculateNumberOfTransactions()}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={2}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', backgroundColor: isEven(3) ? '#2196F3' : '#fff', color: isEven(3) ? '#fff' : '#000' }}>
              <Typography variant="h6">Amount Received</Typography>
              <Typography variant="h4">{`$ ${calculateAmountReceived().toFixed(2)}`}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>

          </Grid>
          

          {/* Line Chart */}
          <Grid item xs={12} md={8} >
            <Card>
              <CardContent style={{"background-color": "white"}}>
                <Typography variant="h5" component="div" color={"black"}>
                  Monthly Total Amount by Type
                </Typography>
                {renderLineChart()}
              </CardContent>
            </Card>
          </Grid>

          {/* Tree Chart
          <Grid item xs={12} md={8}>
            <Card style={{"height": "100%"}}>
              <CardContent style={{"background-color": "white", "height": "100%"}}>
                <Typography variant="h5" component="div" color={"black"}>
                  Money Spent by Type
                </Typography>
                {renderTreeChart()}
              </CardContent>
            </Card>
          </Grid> */}
        </Grid>
      )}
    </div>
  );
};

export default VisualizationPage;