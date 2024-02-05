import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import TransactionHistory from "./scenes/transactions/index.jsx";
import Fraudtransactions from "./scenes/fraud-transaction/index2.jsx";
import Customer_Details from "./scenes/customer_details/index.jsx";
import Bar from "./scenes/bar";
import Form from "./scenes/FIR/index.jsx";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/Tutorial/index.jsx";
// import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar2";
import FraudDetection from "./components/FraudDetection.jsx";
import Customertransactions from "./scenes/transactions/moneyflow.jsx";
import KYC from "./scenes/KYC/index.jsx";
import Alert from "./scenes/Alert/index.jsx";
import FraudPredict from "./scenes/FraudPredict/index.jsx";
import Irregular_transactions from "./scenes/irregular-transactions/index.jsx";
import VisualizationPage from "./scenes/customer_details/visualizationDashboard.jsx";
import Confirmed_fraud_accounts from "./scenes/confirmed_fraud_accounts/Confirmed_fraud_accounts.jsx";
import OnlyMap from "./scenes/map/OnlyMap.jsx";
import Translator from "./scenes/Translator/index.jsx";
import Translator2 from "./scenes/Translator/index2.jsx";




function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<TransactionHistory />} /> 
              <Route path="/customers" element={<Customer_Details />} />
              <Route path="/confirmedFraudAccounts" element={<Confirmed_fraud_accounts />} />
              <Route path="/Irregular_transactions" element={<Irregular_transactions />} />
              <Route path="/customer/:customerId/transactions" element={<Customertransactions/>} />
              <Route path="/frauds" element={<Fraudtransactions />} />
              <Route path="/kyc" element={<KYC />}/>
              <Route path="/alert" element={<Alert />}/>
              <Route path="/fraud_predict" element={<FraudPredict />}/>
              <Route path="/visualization-page/:customerId" element={<VisualizationPage/>}/>
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/fir" element={<FAQ />}/>
              <Route path="/calendar" element={<Calendar />} />
              {/* <Route path="/geography" element={<Geography />} /> */}
              <Route path="/geography" element={<OnlyMap />} />
              <Route path="/translator" element={<Translator />}/>
              <Route path="/translator2" element={<Translator2 />}/>






              {/* <Route path="/predict" element={<FraudDetection />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;