// ** React Imports
import React, {ReactNode, useContext, useState} from 'react'

// ** MUI Imports
import {styled, Theme, useTheme} from '@mui/material/styles'
import MuiSwipeableDrawer, { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer'
import {SidebarContext} from "../../context/SidebarContext";
import {Box, Button, Divider, Fab, IconButton, SwipeableDrawer, useMediaQuery, Zoom} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

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

    // Drawer Props for Mobile & Tablet screens
    // const MobileDrawerProps = {
    //     open: isOpen,
    //     onOpen: () => onOpen,
    //     onClose: () => onClose,
    //     ModalProps: {
    //         keepMounted: true, // Better open performance on mobile.
    //     }
    // }
    //
    // Drawer Props for Desktop screens
    // const DesktopDrawerProps = {
    //     open: true,
    //     onOpen: () => null,
    //     onClose: () => null
    // }
    //
    // const toggleDrawer = () =>
    //         (event: React.KeyboardEvent | React.MouseEvent) => {
    //             if (
    //                 event &&
    //                 event.type === 'keydown' &&
    //                 ((event as React.KeyboardEvent).key === 'Tab' ||
    //                     (event as React.KeyboardEvent).key === 'Shift')
    //             ) {
    //                 onClose();
    //             }
    //         };
    // <StyledSwipeableDrawer の中で以下を使用してもいいのですが、なぜか画面クリックしても閉じない...why?
    // {...(isHidden ? { ...MobileDrawerProps } : { ...DesktopDrawerProps })}


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

                {/*{isHidden && (*/}
                {/*    <Box display="flex"*/}
                {/*         justifyContent="flex-end"*/}
                {/*         alignItems="flex-end">*/}
                {/*        <Fab onClick={onClose}*/}
                {/*             color={'primary'}*/}
                {/*             size={'small'}>*/}
                {/*            <ChevronLeftIcon fontSize={'large'} />*/}
                {/*        </Fab>*/}
                {/*    </Box>*/}
                {/*)}*/}
                <Box height={'4rem'}
                     display="flex"
                     justifyContent="center"
                     alignItems="center">
                    メニュー
                </Box>
                <Divider color={'white'}/>
                ssss
            </StyledSwipeableDrawer>
        </>

    )
}

export default SideBar
