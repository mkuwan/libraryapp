import {Box, Stack} from "@mui/material";
import {Theme, useTheme} from "@mui/material/styles";
import {ReactNode} from "react";

export const Menu = ({children}:{children:ReactNode}) => {
    const theme = useTheme();

    return(
        <Stack display={'flex'}
               alignItems={'start'}
               justifyContent={'start'}
               paddingRight={theme.spacing(4.5)}
               m={2}
               style={{transition: 'padding .25s ease-in-out'}}
               minHeight={theme.mixins.toolbar.minHeight}>
            {children}
        </Stack>
    )
}

export default Menu;