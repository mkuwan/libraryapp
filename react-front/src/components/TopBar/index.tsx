import {alpha, AppBar, Box, IconButton, InputBase, styled, Toolbar, Typography} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';


const theme = createTheme();

theme.typography.h3 = {
    fontSize: '0.9rem',
    '@media (min-width:600px)': {
        fontSize: '1.2rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '1.5rem',
    },
};

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {backgroundColor: alpha(theme.palette.common.white, 0.25)},
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    }
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0 , 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

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
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder={"本を検索..."}
                                         inputProps={{'aria-label': 'search'}}/>
                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
        // <nav className={'top-nav navbar-expand bg-gradient-primary-green'}>
        //
        // </nav>
    );
}

export default TopBar;