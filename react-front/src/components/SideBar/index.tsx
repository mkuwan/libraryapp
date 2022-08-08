import React, {ReactNode, useContext, useState} from 'react'

import {styled, Theme, useTheme} from '@mui/material/styles'
import MuiSwipeableDrawer, { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer'
import {SidebarContext} from "../../context/SidebarContext";
import {
    Box,
    Button,
    Divider,
    Fab,
    IconButton, List, ListItemButton, ListItemIcon,ListItemText, Tooltip,
    Stack,
    SwipeableDrawer,
    Typography,
    useMediaQuery,
    Zoom
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Menu from "./Menu";
import {NavLink, Route, Routes, useNavigate} from "react-router-dom";
import {menuItem} from "./MenuItem";
import Link from '@mui/material/Link';

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
    const theme = useTheme();
    const navigate = useNavigate();

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
            </StyledSwipeableDrawer>
        </>

    )
}

export default SideBar
