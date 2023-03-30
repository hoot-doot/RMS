import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Login from "./scenes/login"
import Form from "./scenes/form";
import { useSelector } from 'react-redux';
import Menu from "./scenes/menu"
import { Navigate } from 'react-router-dom';
import { setLogin } from "./scenes/authSlice";

// import Form2 from "./scenes/login3";
import LoginPage from "./scenes/login3";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();
  const isLoginPage = location.pathname === "/"
  const isAuth = Boolean(setLogin===null);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!isLoginPage && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {!isLoginPage && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
            
              <Route path="/" element={<LoginPage />} />
              {/* <PrivateRoute> */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/form" element={<Form />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/menu" element={<Menu />} />
              {/* </PrivateRoute> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
