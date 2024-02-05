import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import axios from "axios";

const BarChart = ({ isDashboard = true }) => {
  const [chartData, setChartData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const textColor = theme.palette.mode === "dark" ? colors.grey[100] : colors.grey[800];

  const colorScale = {
    "Cash in": "#FF6B6B",      // Cute Pink
    "debit": "#6A0572",        // Deep Purple
    "Cash out": "#A3F7BF",     // Mint Green
    'payment': "#FFD166",      // Sunny Yellow
    'transfer': "#80CED7"      // Soft Blue
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/barchart");
        setChartData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data initially
    fetchData();

    // Set up an interval to fetch data every second
    const intervalId = setInterval(fetchData, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <ResponsiveBar
    data={chartData.map((entry) => ({
      id: `Month ${entry.month}`, // Use month as id
      ...entry.frauds.reduce(
        (acc, fraud) => ({
          ...acc,
          [fraud.type]: fraud.count,
        }),
        {}
      ),
    }))}
    
    
      theme={{
        axis: {
          domain: {
            line: { stroke: colors.grey[100] },
          },
          legend: { text: { fill: colors.grey[100] } },
          ticks: {
            line: { stroke: colors.grey[100], strokeWidth: 1 },
            text: { fill: colors.grey[100] },
          },
        },
        legends: { text: { fill: colors.grey[100] } },
      }}
      keys={Object.keys(colorScale)}
      indexBy="id"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={(bar) => colorScale[bar.id]}
      borderColor={{ from: "color", modifiers: [["darker", "1.6"]] }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "city",
        legendPosition: "middle",
        legendOffset: 32,
        tickTextProps: { style: { fill: textColor } },
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "count",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={true}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
        fill: colors.grey[100],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={(e) => `Total count in ${e.indexValue}: ${e.formattedValue}`}
      groupMode="stacked"
    />
  );
};

export default BarChart;
