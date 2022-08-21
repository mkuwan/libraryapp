import {AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import React, {useContext, useState} from "react";
import {ManagerMenuItem} from "./ManagerMenuItem";
import {useNavigate} from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {ManagerUserMenuItem} from "./ManagerUserMenuItem";
import {ManagerContext} from "../../context/ManagerContext";

const Title_Md = () => {
    return(
        <>
            <AutoStoriesIcon sx={{ display: { xs: 'none', md: 'flex'}, mr: 1 }}/>
            <Typography
                variant={"h6"}
                noWrap
                sx={{ mr: 2, display: { xs: 'none', md: 'flex'},
                    fontFamily:[
                        '-apple-system',
                        'BlinkMacSystemFont',
                        '"Segoe UI"',
                        'Roboto',
                        '"Helvetica Neue"',
                        '"Apple Color Emoji"',
                        '"Segoe UI Emoji"',
                        '"Segoe UI Symbol"',
                        'HiraKakuProN-W3',
                        "Yu Gothic",
                        'Meiryo',
                        'Arial',
                        'sans-serif',],
                    fontWeight: 700, color: 'inherit'}}>
                不思議な図書館管理者画面
            </Typography>
        </>
    )
}

const Title_Xs = () => {
    return(
        <>
            <AutoStoriesIcon sx={{ display: { xs: 'flex', md: 'none'}, mr: 1 }}/>
            <Typography
                variant={"h5"}
                noWrap
                sx={{ mr: 2, display: { xs: 'flex', md: 'none'},
                    flexGrow: 1,
                    fontFamily:[
                        '-apple-system',
                        'BlinkMacSystemFont',
                        '"Segoe UI"',
                        'Roboto',
                        '"Helvetica Neue"',
                        '"Apple Color Emoji"',
                        '"Segoe UI Emoji"',
                        '"Segoe UI Symbol"',
                        'HiraKakuProN-W3',
                        "Yu Gothic",
                        'Meiryo',
                        'Arial',
                        'sans-serif',],
                    fontWeight: 700, color: 'inherit'}}>
                不思議な図書館管理者画面
            </Typography>
        </>
    )
}

export const ManagerTopBar = () => {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const { goCustomerView } = useContext(ManagerContext);

    const handleOpenNavMenu = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(e.currentTarget);
    }
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    }

    const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(e.currentTarget);
    }
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }

    return(
        <AppBar position={"static"}>
            <Container maxWidth={false}>
                <Toolbar disableGutters={true}>
                    {/*xs menu*/}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size={"large"}
                            aria-label={"xs-menu-icon"}
                            aria-controls={"menu-appbar"}
                            aria-haspopup={true}
                            onClick={handleOpenNavMenu}
                            color={"inherit"}>
                            <MenuIcon/>
                        </IconButton>
                        {/*menu*/}
                        <Menu
                            id={"menu-appbar"}
                            anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none'}, }}>
                            {ManagerMenuItem.map((page) => (
                                <MenuItem
                                    key={page.label}
                                    onClick={() => {
                                        handleCloseNavMenu();
                                        navigate(page.path);
                                    }}
                                >{page.label}</MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Title_Xs/>

                    {/*md menu*/}
                    <Title_Md/>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex'}}}>
                        {ManagerMenuItem.map((page) => (
                           <Button key={page.label}
                                   onClick={() => {
                                       handleCloseNavMenu();
                                       navigate(page.path)
                                   }}
                                   variant={"contained"}
                                   color={"secondary"}
                                   sx={{ mx:1, color: 'white', backgroundColor: '#006064'}}
                                   startIcon={page.icon}
                                   // sx={{ my: 2, color: 'white', display: 'block'}}
                           >{page.label}</Button>
                        ))}
                    </Box>

                    {/*user menu*/}
                    <Box sx={{ flexGrow: 0}}>
                        <IconButton onClick={handleOpenUserMenu}
                                    sx={{ p: 0}}>
                            <AccountCircleIcon fontSize={"large"}
                                               sx={{ color: 'white'}}/>
                        </IconButton>
                        <Menu open={Boolean(anchorElUser)}
                              sx={{ mt: '45px'}}
                              id={"menu-appbar"}
                              anchorEl={anchorElUser}
                              anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                              keepMounted
                              transformOrigin={{vertical: 'top', horizontal: 'right'}}
                              onClose={handleCloseUserMenu}>
                            {ManagerUserMenuItem.map((page) => (
                                <MenuItem
                                    key={page.label}
                                    onClick={() => {
                                        handleCloseUserMenu();
                                        if(page.label === 'ログアウト')
                                            goCustomerView();
                                        navigate(page.path);
                                    }}
                                >{page.label}</MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}