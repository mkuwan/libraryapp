// ** React Imports
import {ReactNode, useContext} from 'react'

// ** MUI Imports
import {styled, Theme, useTheme} from '@mui/material/styles'
import MuiSwipeableDrawer, { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer'
import {SidebarContext} from "../../context/SidebarContext";
import {useMediaQuery} from "@mui/material";



const SwipeableDrawer = styled(MuiSwipeableDrawer)<SwipeableDrawerProps>({
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
    }
})

const Drawer = ({hidden, children}:{hidden:boolean, children:ReactNode}) => {
    const { sidebarWidth, navVisible, setNavVisibility } = useContext(SidebarContext);

    // const hidden: boolean = false;
    const theme = useTheme()

    // Drawer Props for Mobile & Tablet screens
    const MobileDrawerProps = {
        open: navVisible,
        onOpen: () => setNavVisibility(true),
        onClose: () => setNavVisibility(false),
        ModalProps: {
            keepMounted: true // Better open performance on mobile.
        }
    }

    // Drawer Props for Desktop screens
    const DesktopDrawerProps = {
        open: true,
        onOpen: () => null,
        onClose: () => null
    }

    return (
        <SwipeableDrawer
            className='layout-vertical-nav'
            variant={hidden ? 'temporary' : 'permanent'}
            {...(hidden ? { ...MobileDrawerProps } : { ...DesktopDrawerProps })}
            PaperProps={{ sx: { width: sidebarWidth } }}
            sx={{
                width: sidebarWidth,
                '& .MuiDrawer-paper': {
                    borderRight: 0,
                    backgroundColor: theme.palette.background.default
                }
            }}
        >
            {children}
        </SwipeableDrawer>
    )
}

export default Drawer
