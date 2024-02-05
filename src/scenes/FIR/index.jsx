import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

function App() {
  const [chartType, setChartType] = useState('bar');

  // Dummy dataset
  const data = [
    { month: 'January', city: 'New York', transactions: 150 },
    { month: 'January', city: 'Los Angeles', transactions: 120 },
    { month: 'February', city: 'New York', transactions: 180 },
    { month: 'February', city: 'Los Angeles', transactions: 90 },
    // Add more data as needed
  ];

  // Group data by month
  const dataByMonth = data.reduce((acc, entry) => {
    const key = entry.month;
    acc[key] = acc[key] || [];
    acc[key].push(entry);
    return acc;
  }, {});

  const handleChartTypeChange = (e) => {
    setChartType(e.target.value);
  };

  return (
    <div className="App">
      <h1>Monthly Transactions by City</h1>
      <div>
        <label>
          <input type="radio" value="bar" checked={chartType === 'bar'} onChange={handleChartTypeChange} />
          Bar Chart
        </label>
        <label>
          <input type="radio" value="line" checked={chartType === 'line'} onChange={handleChartTypeChange} />
          Line Chart
        </label>
        <label>
          <input type="radio" value="area" checked={chartType === 'area'} onChange={handleChartTypeChange} />
          Area Chart
        </label>
        <label>
          <input type="radio" value="scatter" checked={chartType === 'scatter'} onChange={handleChartTypeChange} />
          Scatter Plot
        </label>
      </div>
      {chartType === 'bar' ? (
        <BarChart width={800} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="city" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(dataByMonth).map((month) => (
            <Bar key={month} dataKey="transactions" stackId="a" fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
          ))}
        </BarChart>
      ) : chartType === 'line' ? (
        <LineChart width={800} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="city" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(dataByMonth).map((month) => (
            <Line
              key={month}
              type="monotone"
              dataKey="transactions"
              stackId="a"
              stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
            />
          ))}
        </LineChart>
      ) : chartType === 'area' ? (
        <AreaChart width={800} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="city" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(dataByMonth).map((month) => (
            <Area
              key={month}
              type="monotone"
              dataKey="transactions"
              stackId="a"
              fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
            />
          ))}
        </AreaChart>
      ) : (
        <ScatterChart width={800} height={400} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="city" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(dataByMonth).map((month) => (
            <Scatter
              key={month}
              dataKey="transactions"
              fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
            />
          ))}
        </ScatterChart>
      )}
    </div>
  );
}

export default App;
