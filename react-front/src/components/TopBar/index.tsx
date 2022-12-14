import {
    alpha,
    AppBar,
    Badge,
    Box,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    styled,
    Toolbar,
    Typography
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import MoreIcon from '@mui/icons-material/MoreVert';
import React, {ReactElement, useContext, useState} from "react";
import {SidebarContext} from "../../context/SidebarContext";

const theme = createTheme();

theme.typography.h3 = {
    fontSize: '1.0rem',
    [theme.breakpoints.down('sm')]:{
        fontSize: '0.7rem',
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '0.8rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '0.8rem',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '1.0rem',
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
            width: '30ch',
        },
    },
}));

export type MailInfoProps = {
    num: number,
    content: string
}

export type NotifyInfoProps = {
    num: number,
    content: string
}

type TopBarProps = {
    mailProps?: MailInfoProps[],
    notifyProps?: NotifyInfoProps[]
}



export const TopBar = (props: TopBarProps ) => {
    const { toggleOpenClose } = useContext(SidebarContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

    const { isHidden } = useContext(SidebarContext);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const menuId = 'topbar-account-menu';
    const mobileMenuId = 'topbar-mobile-menu';

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    }

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    }



    const standardIconMenu =(
        <>
            <IconButton size={'large'}
                        aria-label={'show badge new mails'}
                        color={'inherit'}>
                <Badge badgeContent={props.mailProps?.length}
                       color={'secondary'}>
                    <MailIcon />
                </Badge>
            </IconButton>
            <IconButton size={'large'}
                        aria-label={'show notifications'}
                        color={'inherit'}>
                <Badge badgeContent={props.notifyProps?.length}
                       color={'primary'}>
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <IconButton size={'large'}
                        edge={'end'}
                        aria-label={'show account'}
                        aria-controls={menuId}
                        aria-haspopup={true}
                        onClick={handleProfileMenuOpen}
                        color={'inherit'}>
                <AccountCircleIcon/>
            </IconButton>
        </>
    );


    const renderMenu = (
        <Menu anchorEl={anchorEl}
              anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
              }}
              id={menuId}
              keepMounted={true}
              transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
              }}
              open={isMenuOpen}
              onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>??????????????????</MenuItem>
            <MenuItem onClick={handleMenuClose}>???????????????</MenuItem>
        </Menu>
    );


    const renderMobileMenu = (
        <Menu anchorEl={mobileMoreAnchorEl}
              anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
              }}
              id={mobileMenuId}
              keepMounted={true}
              transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
              }}
              open={isMobileMenuOpen}
              onClose={handleMobileMenuClose}>
            <MenuItem>
                <IconButton size={'large'}
                            aria-label={'show badge new mails'}
                            color={'inherit'}>
                    <Badge badgeContent={props.mailProps?.length}
                           color={'secondary'}>
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>???????????????</p>
            </MenuItem>
            <MenuItem>
                <IconButton size={'large'}
                            aria-label={'show notifications'}
                            color={'inherit'}>
                    <Badge badgeContent={props.notifyProps?.length}
                           color={'primary'}>
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>????????????</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton size={'large'}
                            edge={'end'}
                            aria-label={'show account'}
                            aria-controls={menuId}
                            aria-haspopup={true}
                            color={'inherit'}>
                    <AccountCircleIcon/>
                </IconButton>
                <p>???????????????</p>
            </MenuItem>
        </Menu>
    )

    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position={'static'} className={'bg-custom-dark'} >
                {/*<Toolbar sx={{ display: {xs: 'none', sm: 'flex'} }}>*/}
                <Toolbar>
                    {isHidden && (
                        <IconButton size={'large'}
                                    edge={'start'}
                                    color={'inherit'}
                                    aria-label={'open drawer'}
                                    sx={{ mr: 2 }}
                                    onClick={toggleOpenClose}>
                            <MenuIcon/>
                        </IconButton>
                    )}

                    <ThemeProvider theme={theme}>
                        <Typography variant={'h3'}>
                            ?????????????????????
                        </Typography>
                    </ThemeProvider>
                    {/*<Search>*/}
                    {/*    <SearchIconWrapper>*/}
                    {/*        <SearchIcon />*/}
                    {/*    </SearchIconWrapper>*/}
                    {/*    <StyledInputBase placeholder={"????????????..."}*/}
                    {/*                     inputProps={{'aria-label': 'search'}}/>*/}
                    {/*</Search>*/}
                    <Box sx={{ flexGrow: 1 }}/>

                    {/*md???????????????*/}
                    <Box sx={{ display: { xs: 'none', md: 'flex'}}}>
                        {standardIconMenu}
                    </Box>

                    {/*xs???????????????*/}
                    <Box sx={{ display: { xs: 'flex', md: 'none'}}}>
                        <IconButton size={'large'}
                                    aria-label={'show more'}
                                    aria-controls={mobileMenuId}
                                    aria-haspopup={true}
                                    onClick={handleMobileMenuOpen}
                                    color={'inherit'}>
                            <MoreIcon/>
                        </IconButton>
                    </Box>

                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}

export default TopBar;