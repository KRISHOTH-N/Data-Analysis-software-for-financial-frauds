import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function App() {
  // Dummy dataset
  const data = Array.from({ length: 31 }, (_, i) => ({
    date: `2024-01-${i + 1}`,
    income: Math.floor(Math.random() * 1000) + 500,
    expenses: Math.floor(Math.random() * 600) + 200,
  }));

  // Calculate daily balance
  data.forEach((entry, index) => {
    entry.balance = index === 0 ? entry.income - entry.expenses : data[index - 1].balance + entry.income - entry.expenses;
  });

  return (
    <div className="App">
      <h1>Money Flow Visualization</h1>
      <LineChart width={800} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="balance" stroke="#8884d8" name="Balance" />
        <Line type="monotone" dataKey="income" stroke="#82ca9d" name="Income" />
        <Line type="monotone" dataKey="expenses" stroke="#ff7300" name="Expenses" />
      </LineChart>
    </div>
  );
}

export default App;



