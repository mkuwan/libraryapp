import React, {useCallback, useContext, useState} from "react";
import {ManagerContext} from "../../context/ManagerContext";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Container, FormControl,
    Grid, IconButton, Input, InputAdornment, InputLabel, OutlinedInput,
    styled, TextField
} from "@mui/material";
import loginImage from '../../assets/library-image01.jpg'
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});



export const Login = () => {
    const { goCustomerView, managerLogin } = useContext(ManagerContext);
    const [showPassword, setShowPassword] = useState(false);
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const goCustomerPage = useCallback(() => {
        // alert('goto book list page');
        goCustomerView();
        navigate('/');
    },[])

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onLogin = () => {
        let response = managerLogin(userId, password);
        if(response)
            navigate('/admin')
        else
            alert('ログインできませんでした')
    }

    return(
        <>
            <Container maxWidth={'md'} sx={{ mt: '2rem'}}>
                <Card sx={{ display: 'flex' }}>
                    <Grid container>
                        <Grid item sm={6} xs={12}>
                            <Img src={loginImage}/>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <CardContent sx={{ flexDirection: 'column' }}>
                                <TextField
                                    label={'ユーザーID'}
                                    variant={'outlined'}
                                    required
                                    onChange={(e) => {
                                        setUserId(e.target.value);
                                    }}
                                    fullWidth/>
                                <FormControl sx={{ mr: 1, mt: 1 }} variant="outlined" fullWidth>
                                    <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                            </CardContent>
                            <CardActions>
                                <Button onClick={goCustomerPage}
                                        variant={'contained'}
                                        color={'success'}
                                        sx={{ ml: 1, mr: 7}}
                                        fullWidth>
                                    戻る
                                </Button>
                                <Button onClick={onLogin}
                                        variant={'contained'}
                                        sx={{ mr: 1}}
                                        fullWidth>
                                    ログイン
                                </Button>
                            </CardActions>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
        </>
    )
}
// className={'row justify-content-center col-xl-10 col-lg-12 col-md-9'}