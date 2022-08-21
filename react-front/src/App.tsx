import React, {useContext} from 'react';
import './App.css';
import TopBar, {MailInfoProps} from "./components/TopBar";
import SideBar from "./components/SideBar";
import {SidebarContext} from "./context/SidebarContext";
import {Box, Stack, Typography, useMediaQuery} from "@mui/material";
import {ThemeProvider, createTheme, Theme} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {NavLink, Route, Routes} from "react-router-dom";
import {menuItem} from "./components/SideBar/MenuItem";
import {ManagerContext} from "./context/ManagerContext";
import {Login} from "./page/Login";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import {ManagerTopBar} from "./components/ManagerTopBar";
import {ManagerMenuItem} from "./components/ManagerTopBar/ManagerMenuItem";
import {ManagerUserMenuItem} from "./components/ManagerTopBar/ManagerUserMenuItem";

function App() {

    const demoMailInfo: MailInfoProps[] = [
        {
            num: 1,
            content: 'メールその1だよ'
        },
        {
            num: 2,
            content: 'メールその2'
        }
    ]
    const { isHidden } = useContext(SidebarContext);
    const { isManagerView, goManagerView, isManagerLogin } = useContext(ManagerContext);

  return (
      <>
          {isManagerView ?
              (
                  <div>
                      {isManagerLogin ?
                          (
                              <Stack direction={'column'}>
                                  <ManagerTopBar/>
                                  <div>
                                      <Routes>
                                          {ManagerMenuItem.map((item, index) => (
                                              <Route path={item.path}
                                                     element={item.content}
                                                     key={index}/>
                                          ))}
                                          {ManagerUserMenuItem.map((item, index) => (
                                              <Route path={item.path}
                                                     element={item.content}
                                                     key={index}/>
                                          ))}
                                      </Routes>
                                  </div>
                              </Stack>
                          ) : (
                              <Routes>
                                  <Route path={"/login"}
                                         element={<Login/>}/>
                              </Routes>
                          )}
                  </div>
              ) : (
              <Stack direction={'row'}>
                  <SideBar/>
                  <Box sx={{ flexGrow: 1 }}>
                      <TopBar mailProps={demoMailInfo}/>
                      <div>
                          <Routes>
                              {menuItem.map((item, index) => (
                                  <Route path={item.path}
                                         element={item.content}
                                         key={index}
                                  />
                              ))}
                          </Routes>
                      </div>
                  </Box>
              </Stack>
              )}

      </>
  );
}

export default App;
