// ** React Imports
import {ReactNode, useContext} from 'react'

// ** MUI Imports
import {styled, Theme, useTheme} from '@mui/material/styles'
import MuiSwipeableDrawer, { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer'
import {SidebarContext} from "../../context/SidebarContext";
import {Button, IconButton, SwipeableDrawer, useMediaQuery} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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

    // const hidden: boolean = false;
    const theme = useTheme()

    // Drawer Props for Mobile & Tablet screens
    const MobileDrawerProps = {
        open: isOpen,
        onOpen: () => onOpen,
        onClose: () => onClose,
        ModalProps: {
            keepMounted: true, // Better open performance on mobile.
            background: 'blue'
        }
    }

    // Drawer Props for Desktop screens
    const DesktopDrawerProps = {
        open: true,
        onOpen: () => null,
        onClose: () => null
    }


    return (
        <>
            <StyledSwipeableDrawer
                // className={'bg-custom-dark'}
                anchor={'left'}
                variant={isHidden ? 'temporary' : 'persistent'}
                {...(isHidden ? { ...MobileDrawerProps } : { ...DesktopDrawerProps })}
                PaperProps={
                    { sx:
                        {
                            width: sidebarWidth,
                            // backgroundColor: 'beige',
                            background: 'linear-gradient(180deg, #282c34 0%, darkblue 5%)',
                        }
                    }
                }
                sx={{
                    width: sidebarWidth,
                    '& .MuiDrawer-paper': {
                        borderRight: 0,
                    }
                }}
            >
                メニュー
                <IconButton onClick={onClose}>
                    <MenuIcon />
                </IconButton>
            </StyledSwipeableDrawer>
        </>

    )
}

export default SideBar
