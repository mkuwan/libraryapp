import React, {useContext} from 'react';
import './App.css';
import TopBar, {MailInfoProps} from "./components/TopBar";
import SideBar from "./components/SideBar";
import {SidebarContext} from "./context/SidebarContext";
import {Box, Stack, useMediaQuery} from "@mui/material";
import {ThemeProvider, createTheme, Theme} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {Route, Routes} from "react-router-dom";
import {menuItem} from "./components/SideBar/MenuItem";

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

  return (
      <>
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
      </>
  );
}

export default App;
