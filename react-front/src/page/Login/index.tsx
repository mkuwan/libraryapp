import {useContext, useState} from "react";
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


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});


export const Login = () => {
    const { goCustomerView } = useContext(ManagerContext);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

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
                                    fullWidth={true}/>
                                <FormControl sx={{ mr: 1, mt: 1 }} variant="outlined" fullWidth={true}>
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        // value={values.password}
                                        // onChange={handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                            </CardContent>
                            <CardActions>
                                <Button onClick={goCustomerView}
                                        variant={'contained'}
                                        color={'success'}
                                        sx={{ ml: 1, mr: 7}}
                                        fullWidth={true}>
                                    戻る
                                </Button>
                                <Button onClick={goCustomerView}
                                        variant={'contained'}
                                        sx={{ mr: 1}}
                                        fullWidth={true}>
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