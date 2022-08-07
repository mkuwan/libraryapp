// ** React Import
import { ReactNode, useRef, useState } from 'react'

// ** MUI Import
import Box, { BoxProps } from '@mui/material/Box'
import {styled, Theme, useTheme} from '@mui/material/styles'

// ** Component Imports
import Drawer from './Drawer'
import {useMediaQuery} from "@mui/material";


const StyledBoxForShadow = styled(Box)<BoxProps>({
    top: 50,
    left: -8,
    zIndex: 2,
    height: 75,
    display: 'none',
    position: 'absolute',
    pointerEvents: 'none',
    width: 'calc(100% + 15px)',
    '&.d-block': {
        display: 'block'
    }
})

const SideBar = () => {
    const [hidden, setHidden] = useState(true);

    // setHidden(useMediaQuery((theme: Theme) => theme.breakpoints.down('lg')));


    return (
        <Drawer hidden={hidden}>
            Header

            <Box sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
                Box
            </Box>
        </Drawer>
    )
}

export default SideBar
