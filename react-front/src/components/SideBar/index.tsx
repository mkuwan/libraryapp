import React, {ReactNode, useCallback, useContext, useState} from 'react'

import {makeStyles, styled, Theme, useTheme} from '@mui/material/styles'
import MuiSwipeableDrawer, { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer'
import {SidebarContext} from "../../context/SidebarContext";
import {
    Box,
    Divider,
    Stack,
    SwipeableDrawer,
    Typography,
} from "@mui/material";
import Menu from "./Menu";
import {NavLink, Route, Routes, useNavigate} from "react-router-dom";
import {menuItem} from "./MenuItem";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone';
import {ManagerContext} from "../../context/ManagerContext";


const StyledSwipeableDrawer = styled(SwipeableDrawer)<SwipeableDrawerProps>({
    overflowX: 'hidden',
    transition: 'width .25s ease-in-out',
    '& ul': {
        listStyle: 'none'
    },
    '& .MuiListItem-gutters': {
        paddingLeft: 4,
        paddingRight: 4
    },
    '& .MuiDrawer-paper': {
        left: 'unset',
        right: 'unset',
        overflowX: 'hidden',
        transition: 'width .25s ease-in-out, box-shadow .25s ease-in-out'
    },
})


export const SideBar = () => {
    const { sidebarWidth, isOpen, isHidden, onOpen, onClose } = useContext(SidebarContext);
    const { isManagerView, goManagerView, isManagerLogin } = useContext(ManagerContext);
    const theme = useTheme();
    const navigate = useNavigate();

    const goLoginPage = useCallback(() => {
        onClose();
        goManagerView();
    },[])

    return (
        <>
            <StyledSwipeableDrawer
                anchor={'left'}
                variant={isHidden ? 'temporary' : 'persistent'}
                open={isHidden ? isOpen : true}
                onOpen={isHidden ? onOpen : () => null}
                onClose={isHidden ? onClose : () => null}
                PaperProps={
                    { sx: {
                            width: sidebarWidth,
                            background: 'linear-gradient(180deg, #0e1e24 30%, #00c6b6 100%)',
                        }
                    }
                }
                // Drawerがpersistent表示されても幅分だけ位置をずらす
                sx={{
                    width: sidebarWidth,
                    '& .MuiDrawer-paper': {
                        borderRight: 0,
                    }
                }}>
                <Box height={'4rem'}
                     display="flex"
                     justifyContent="center"
                     alignItems="center">
                    メニュー
                </Box>
                <Divider color={'white'}/>
                <Menu>
                    {menuItem.map((item, index) => (
                        <Box display={'flex'}
                             paddingRight={theme.spacing(0.5)}
                             m={1}
                             minHeight={theme.mixins.toolbar.minHeight}>
                            <NavLink to={item.path}
                                     key={index}
                                     onClick={onClose}
                                     style={{textDecoration: 'none'}}>
                                <Stack direction={'row'}>
                                    <Typography color={item.iconColor}>{item.icon}</Typography>
                                    <Typography color={item.fontColor}>{item.label}</Typography>
                                </Stack>
                            </NavLink>
                        </Box>
                    ))}
                </Menu>
                <footer style={{
                    color: "white",
                    // backgroundColor: "darkgreen",
                    width: "100%",
                    position: "absolute",
                    bottom: 0,
                }}>
                    <Box display={'flex'}
                         paddingRight={theme.spacing(0.5)}
                         mx={3} mt={2.5}
                         minHeight={'3rem'}>
                        <NavLink to={'/login'}
                                 key={'admin_key'}
                                 onClick={goLoginPage}
                                 style={{textDecoration: 'none'}}>
                            <Stack direction={'row'}>
                                <AdminPanelSettingsIcon color={'action'}/>
                                <Typography color={"darkgreen"}>管理者画面</Typography>
                            </Stack>
                        </NavLink>
                    </Box>
                </footer>
            </StyledSwipeableDrawer>
        </>
    )
}

export default SideBar
