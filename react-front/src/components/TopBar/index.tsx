import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from '@mui/icons-material/Menu';

const theme = createTheme();

theme.typography.h3 = {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
        fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '2rem',
    },
};

export const TopBar = () => {

    return(
        <Box sx={{ flexGrow: 1}}>
            <AppBar position={'static'} className={'bg-custom-dark'}>
                {/*<Toolbar sx={{ display: {xs: 'none', sm: 'flex'} }}>*/}
                <Toolbar>
                    <IconButton size={'large'}
                                edge={'start'}
                                color={'inherit'}
                                aria-label={'open drawer'}
                                sx={{ mr: 2 }}>
                        <MenuIcon/>
                    </IconButton>
                    <ThemeProvider theme={theme}>
                        <Typography variant={'h3'}>
                            不思議な図書館
                        </Typography>
                    </ThemeProvider>
                </Toolbar>
            </AppBar>
        </Box>
        // <nav className={'top-nav navbar-expand bg-gradient-primary-green'}>
        //
        // </nav>
    );
}

export default TopBar;