import {Box} from "@mui/material";
import {Theme} from "@mui/material/styles";

export const Menu = ({ theme } : {theme : Theme}) => {
    return(
        <Box display={'flex'}
             alignItems={'center'}
             justifyContent={'space-between'}
             paddingRight={theme.spacing(4.5)}
             style={{transition: 'padding .25s ease-in-out'}}
             minHeight={theme.mixins.toolbar.minHeight}
        >

        </Box>
    )
}

export default Menu;