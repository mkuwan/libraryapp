import {useContext} from "react";
import {ManagerContext} from "../../context/ManagerContext";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Container, IconButton} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import loginImage from '../../assets/library-image01.jpg'

export const Login = () => {
    const { goCustomerView } = useContext(ManagerContext);
    return(
        // , display: { xs: 'none', sm: 'block', md: 'block'}
        <>
            <Container maxWidth={'md'} sx={{ mt: '2rem'}}>
                <Card sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                        <CardMedia
                            sx={{
                                display: { xs: 'none', sm: 'block', md: 'block'},
                                width: 300, height: 300
                                }}
                            component={"image"}
                            image={loginImage}
                        />
                        <CardContent sx={{flex: '1 0 auto', flexDirection: 'column'}}>
                            コンテント
                            <div>
                                div
                            </div>
                            <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                                <Button onClick={goCustomerView}>
                                    戻る
                                </Button>
                                <Button onClick={goCustomerView}>
                                    ログイン
                                </Button>
                            </Box>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                                <ExpandMore
                                    sx={{ marginLeft: 'auto'}}
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                        </CardContent>
                    </Box>
                </Card>
            </Container>
        </>
    )
}
// className={'row justify-content-center col-xl-10 col-lg-12 col-md-9'}