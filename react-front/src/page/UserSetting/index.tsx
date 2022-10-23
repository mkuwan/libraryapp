import {
    alpha,
    AppBar,
    Box, Button,
    Card,
    Container,
    Grid,
    InputBase,
    styled,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import React, {useRef, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import {UserType, UserTypeInit} from "../../types/UserType";


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: 'auto'
    // width: '100%',
    // [theme.breakpoints.up('sm')]: {
    //     marginLeft: theme.spacing(-2),
    //     width: 'auto',
    // },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        // [theme.breakpoints.up('sm')]: {
        //     width: '20ch',
        //     '&:focus': {
        //         width: '30ch',
        //     },
        // },
    },
}));


export const UserSetting = () => {
    const [searchValue, setSearchValue] = useState('');
    const [account, setAccount] = useState<UserType>(UserTypeInit);
    const inputRef = useRef(null);
    const [requiredError, setRequiredError] = useState(false);

    const resetAccount = () => {
        setAccount(UserTypeInit);
    }

    return(
        <React.Fragment>
            <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ flexGrow: 1 }} marginTop={'2rem'}>
                    <Grid container marginTop={'2rem'}>
                        <AppBar position={"static"} sx={{ bgcolor: '#002984'}} >
                            <Toolbar>
                                <Box sx={{ flexGrow: 1, display: 'flex'}}>
                                    <Search>
                                        <SearchIconWrapper>
                                            <SearchIcon/>
                                        </SearchIconWrapper>
                                        <StyledInputBase placeholder={'利用者ID検索...'}
                                                         inputProps={{ 'aria-label': 'search'}}
                                                         onChange={(event) => {
                                                             setSearchValue(event.target.value);
                                                         }}
                                                         onKeyDown={(event) => {
                                                             if(event.key==='Enter' && searchValue){
                                                                 // handleSearch(search)
                                                             }
                                                         }}/>
                                    </Search>
                                </Box>

                                <Box sx={{ flexGrow: 0, display: 'flex'}}>
                                    <Button variant={"contained"} color={"success"}>新規</Button>
                                </Box>

                            </Toolbar>
                        </AppBar>
                    </Grid>
                    <Card sx={{ paddingRight: '1rem', paddingBottom: '2rem' }}>
                        <Grid container spacing={1} marginTop={'2rem'}>
                            <Grid item xs={3} display={"flex"} justifyContent={"right"} >
                                <Typography marginRight={'5px'}>利用者ID :</Typography>
                            </Grid>
                            <Grid item xs={9} display={"flex"}>
                                <Typography>{account.accountId}</Typography>
                            </Grid>

                        </Grid>
                        <Grid container spacing={1} marginTop={'1rem'} >
                            <Grid item xs={3} display={"flex"} justifyContent={"right"} marginBottom={'2rem'}>
                                <Typography marginRight={'5px'}>利用者名 :</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField required
                                           error={requiredError}
                                           inputRef={inputRef}
                                           fullWidth
                                           helperText={requiredError===true ? "利用者名は必須です" : ""}
                                           variant={'standard'} />
                            </Grid>
                            <Grid item xs={3} display={"flex"} justifyContent={"right"} marginBottom={'2rem'}>
                                <Typography marginRight={'5px'}>連絡先 :</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField fullWidth variant={'standard'}/>
                            </Grid>
                            <Grid item xs={3} display={"flex"} justifyContent={"right"} marginBottom={'2rem'}>
                                <Typography  marginRight={'5px'}>備考 :</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField fullWidth
                                           multiline
                                           minRows={3}
                                />
                            </Grid>
                        </Grid>
                        <Box marginTop={'2rem'}>
                            <Grid container >
                                <Grid item xs={3} display={"flex"} justifyContent={"right"} marginBottom={'2rem'}/>
                                <Grid item xs={9} container justifyContent={"space-between"} alignItems={"center"} >
                                    <Button variant={"contained"} color={"warning"}>削除</Button>
                                    <Button variant={"contained"}>登録</Button>
                                </Grid>
                            </Grid>
                        </Box>

                    </Card>
                </Box>
            </Container>


        </React.Fragment>
    )
}