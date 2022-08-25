import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import { SettingsProvider} from "./context/SettingsContext";
import {SidebarProvider} from "./context/SidebarContext";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {ManagerProvider} from "./context/ManagerContext";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const theme = createTheme();

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <SettingsProvider>
              <QueryClientProvider client={queryClient}>
                  <ManagerProvider>
                      <SidebarProvider>
                          <BrowserRouter>
                              {/*<Helmet>*/}
                              {/*    <title>MK Business Software</title>*/}
                              {/*</Helmet>*/}
                              <CssBaseline/>
                              <App />
                          </BrowserRouter>
                      </SidebarProvider>
                  </ManagerProvider>
              </QueryClientProvider>
          </SettingsProvider>
      </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
