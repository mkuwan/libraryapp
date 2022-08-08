import React, {useContext} from 'react';
import logo from './logo.svg';
import './App.css';
import TopBar, {MailInfoProps} from "./components/TopBar";
import SideBar from "./components/SideBar";
import {SettingsContext, SettingsContextValue} from "./context/SettingsContext";
import {SidebarContext} from "./context/SidebarContext";
import {useMediaQuery} from "@mui/material";
import {ThemeProvider, createTheme, Theme} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Layout from "./components/Layout";

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

    const theme = createTheme();
    // const size = useMediaQuery(() => theme.breakpoints.down('lg'));
    // console.log(`サイズ は middle? ${useMediaQuery(theme.breakpoints.down('md'))}`)

  return (
    <div className="App">
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Layout/>
            {/*<SideBar/>*/}
            {/*<TopBar mailProps={demoMailInfo}/>*/}
        </ThemeProvider>
    </div>
  );
}

export default App;
