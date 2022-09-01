import {BookImage} from "../../components/BookImage";
import {
    alpha, AppBar,
    Box, Button,
    Card,
    CardContent, CardMedia,
    Container,
    Grid, InputBase, Modal, Pagination,
    Paper,
    Stack, styled,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField, Toolbar,
    Typography
} from "@mui/material";
import React, {ChangeEvent, useCallback, useEffect, useMemo, useRef, useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
import {Text} from "mdi-material-ui";
import {API_URL, API_VERSION1, CONTROLLER_BOOK, CONTROLLER_RENT} from "../../constant/HostData";
import axios, {AxiosResponse} from "axios";
import BookType from "../../types/BookType";


const BASE_URI = `${API_URL}${API_VERSION1}${CONTROLLER_BOOK}`;
const RENT_URI = `${API_URL}${API_VERSION1}${CONTROLLER_RENT}`;




type ResponseDataType = {
    allCount: number,
    bookViewModels: BookType[]
}

type SearchType = {
    value: string,
    page: number
}


/**
 * React.memo, useMemo, useCallbackはそれぞれメモ化する対象が違います
 *  React.memo: コンポーネント
 *  useCallback: コールバック関数
 *  useMemo: 計算結果の値
 *
 *  useCallbackとReact.memoは併用して使うものです
 *  useCallbackはReact.memoでメモ化したコンポーネントに、useCallbackでメモ化したコールバック関数を渡す
 */

const HeaderText = React.memo(({value}: {value: string | number | undefined}) => {
    return(
        <Typography fontSize={"small"}
                    fontStyle={"italic"}
                    variant={"body1"}
                    display={"inline"}
                    sx={{ wordWrap: 'break-word',
                        overflowWrap: "break-word",
                        textDecoration: 'underline'}}>
            {value}
        </Typography>
    )
})

const ContentText = React.memo(({value}:{value: string | number | undefined}) => (
    <Typography fontSize={"medium"}
                variant={"body1"}
                display={"inline"}
                sx={{ display: { md: 'inline'},
                    wordWrap: 'break-word',
                    marginLeft: 2}}>
        {value}
    </Typography>
))

const MessageText = React.memo(({value, color}:{value: string, color: string }) => (
    <Typography fontSize={"medium"}
                sx={{ color: color,
                    wordWrap: 'break-word'}}>
        {value}
    </Typography>
))


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(-2),
        width: 'auto',
    },
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
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '30ch',
            },
        },
    },
}));


export const BookList = () => {
    const [searchValue, setSearchValue] = useState('');
    const [bookList, setBookList] = useState<BookType[]>([]);
    const [pageNum, setPageNum] = useState(1);
    const [pageCount, setPageCount] =useState(1);
    const [bookCount, setBookCount] = useState(0);
    const [selectedBook, setSelectedBook] = useState<BookType>();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [pageSize, setPageSize] = useState(3);


    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 450,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 2,
        p: 2,
    };



    /**
     * 蔵書数変更用Modal View
     * @constructor
     */
    const ModalBookRental =  () => {
        const [enable, setEnable] = useState(false);
        const [userCode, serUserCode] = useState('');
        const [rentMessage, setRentMessage] = useState('');
        const [messageColor, setMessageColor] = useState('blue');
        const [isRented, setIsRented] = useState(false);

        /**
         * 入力された利用者IDの貸出可能か確認します
         * @param userCode
         * @constructor
         */
        const CheckCanRent = (userCode: string): boolean => {
            const url = `${RENT_URI}/user`;
            axios.post<string>(url, {userCode: userCode})
                .then((response) => {
                    setRentMessage(response.data);
                    if (response.status === 200) {
                        setMessageColor('blue');
                        setEnable(true);
                        return true;
                    } else {
                        setMessageColor('red');
                        return false;
                    }
                })
                .catch((reason) => {
                    alert(reason.message);
                    setMessageColor('red');
                    setRentMessage(reason.message);
                    return false;
                });
            return false;
        }


        const RentBook = (userId: string, bookId: string): boolean => {
            const url = `${RENT_URI}/book`;
            axios.post<string>(url, {
                userCode: userId,
                bookId: bookId
            }).then((response) => {
                setMessageColor('blue');
                setRentMessage(response.data);
                if(response.status === 200){
                    // const clone = [...bookList];
                    // let updatingIndex = bookList.findIndex(x => x.bookId === bookId);
                    // clone[updatingIndex].rentedCount++;
                    // setBookList(clone);
                    return true;
                }

                else
                    return false;
            }).catch((error) => {
                console.log(error.message);
                setMessageColor('red');
                setRentMessage(error.message);
                return false;
            })
            return true;
        }

        const ReCount = (bookId: string) => {
            const clone = [...bookList];
            let updatingIndex = bookList.findIndex(x => x.bookId === bookId);
            clone[updatingIndex].rentedCount++;
            setBookList(clone);
        }


        return (
            <React.Fragment>
                <Modal
                    hideBackdrop
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="set-book-rent"
                    aria-describedby="set-book-rent">
                    <Box sx={{ ...style,  textOverflow: "ellipsis" }}>
                        <Typography noWrap fontWeight={"bold"} >貸出処理</Typography>
                        <p/>
                        <Typography noWrap>{selectedBook?.titleAndAuthor}</Typography>

                        <div style={{ display: 'flex', marginTop: '1rem', alignItems: 'center', justifyContent: 'center'}}>
                            <Typography display={"inline"} sx={{ mr: '1rem'}}>利用者IDを入力してください</Typography>
                        </div>

                        <div style={{ display: 'flex', marginTop: '1rem', alignItems: 'center', justifyContent: 'center'}}>
                            <TextField label={"利用者ID"}
                                       color={"success"}
                                       disabled={enable}
                                       onChange={(e) => {
                                           serUserCode(e.target.value);
                                       }}
                                onKeyDown={async (e) => {
                                    if (e.key === 'Enter' && userCode) {
                                        CheckCanRent(userCode)
                                    }
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', marginTop: '1rem', alignItems: 'center', justifyContent: 'center'}}>
                            <MessageText value={rentMessage} color={messageColor}/>
                        </div>

                        <div style={{ display: 'flex', marginTop: '1rem', alignItems: 'center', justifyContent: 'end'}}>
                            <Button onClick={() => {
                                if(selectedBook && isRented)
                                    ReCount(selectedBook.bookId);
                                handleClose();
                            }}>閉じる</Button>
                            <Button
                                disabled={!enable}
                                onClick={() => {
                                    if(selectedBook && userCode.length > 0){
                                        RentBook(userCode, selectedBook.bookId);
                                        setEnable(false);
                                        setIsRented(true);
                                    }
                                }}
                            >借りる</Button>
                        </div>

                    </Box>
                </Modal>
            </React.Fragment>
        );
    };


    /**
     * 書籍情報取得処理
     * @param
     */
    const handleSearch = useCallback((props: SearchType) =>{

        const url = `${BASE_URI}/list/search2`

        const data = new FormData();
        data.append('titleAuthorIsbn', props.value);
        data.append('page', props.page.toString());
        data.append('size', pageSize.toString());

        const f = async() => {
            await axios.post<ResponseDataType>(url, data)
                .then((response) => {
                    if(response.status === 200){
                        setBookList(response.data.bookViewModels);
                        setBookCount(response.data.allCount);
                        if(props.page === 1)
                            calculatePage(response.data.allCount);
                    }
                })
                .catch((reason) => {
                    alert(reason.message);
                })
                .finally(() => {

                })
        }
        f().then();
    }, [])

    const calculatePage = (allCount: number) => {
        // 切り上げ
        const pages = Math.ceil(allCount / pageSize);

        setPageCount(pages);
        setPageNum(1);
    }


    return(
        <Container maxWidth={false} sx={{ mt: '1rem', mb: '1rem'}}>
            <AppBar position={"static"}>
                <Toolbar>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>
                        <StyledInputBase placeholder={'検索...'}
                                         inputProps={{ 'aria-label': 'search'}}
                                         onChange={(event) => {
                                             setSearchValue(event.target.value);
                                         }}
                                         onKeyDown={(event) => {
                                             if(event.key==='Enter' && searchValue){
                                                 const search: SearchType = {
                                                     value: searchValue,
                                                     page: 1
                                                 }
                                                 handleSearch(search)
                                             }
                                         }}
                        />
                    </Search>
                    {bookCount > 0 ? (
                        <Typography marginLeft={'3rem'}>{bookCount} 件取得</Typography>
                    ):(<></>)}
                </Toolbar>
            </AppBar>

            {bookList.map((book, index, array) => (
                <Card sx={{ boxShadow: '0 1rem 1rem -1rem hsl(200 50% 20% / 40%)',
                    border: 0.5,
                    marginTop: 0.5,
                    marginBottom: '1rem'}}>
                    <Grid display={"flex"} sx={{ m: 1 }}>
                        <Grid item style={{ width: '150px', marginRight: 0 }}>
                            <Box width={'150px'} height={'200px'}>
                                <BookImage isbn={book?.isbn}/>
                            </Box>
                            <div>
                                <Typography justifyContent={"center"} display={"inline"}>蔵書数: </Typography>
                                <Typography display={"inline"}>{book.amount}</Typography>
                            </div>
                            <div>
                                <Typography display={"inline"}>貸出数: </Typography>
                                <Typography display={"inline"}>{book.rentedCount}</Typography>
                            </div>
                            <Button sx={{ mt: 1}}
                                    variant={"contained"}
                                    disabled={book.amount <= book.rentedCount}
                                    onClick={() => {
                                        setSelectedBook(book);
                                        handleOpen();
                                    }}>借りる</Button>
                            <ModalBookRental/>
                        </Grid>
                        <Grid item marginLeft={1}>
                            <Grid item direction={'column'}>
                                <div>
                                    <HeaderText  value={'タイトル・著者'}/>
                                    <ContentText value={book.titleAndAuthor}/>
                                </div>
                                <div>
                                    <HeaderText  value={'ISBN'}/>
                                    <ContentText value={book.isbn}/>
                                </div>
                                <div>
                                    <HeaderText  value={'ISSN'}/>
                                    <ContentText value={book.issn}/>
                                </div>
                                <div>
                                    <HeaderText  value={'版'}/>
                                    <ContentText value={book.version}/>
                                </div>
                                <div>
                                    <HeaderText  value={'シリーズ'}/>
                                    <ContentText value={book.series}/>
                                </div>
                                <div>
                                    <HeaderText  value={'出版情報等'}/>
                                    <ContentText value={book.publishInfo}/>
                                </div>
                                <div>
                                    <HeaderText  value={'サイズなど'}/>
                                    <ContentText value={book.sizeInfo}/>
                                </div>

                                <input style={{ visibility: 'hidden', height: 0 }}
                                       value={book.bookId}/>
                            </Grid>

                        </Grid>
                    </Grid>
                </Card>
            ))}

            <div style={{textAlign: "center", marginTop: '1rem'}}>
                <Pagination count={pageCount}
                            variant={"outlined"}
                            shape={"rounded"}
                            color={"primary"}
                            showFirstButton={true}
                            showLastButton={true}
                            onChange={(event, pageNumber) => {
                                setPageNum(pageNumber);
                                console.log(pageNumber);
                                const search: SearchType = {
                                    value: searchValue,
                                    page: pageNumber
                                }
                                handleSearch(search)
                            }}
                            page={pageNum}
                            sx={{
                                display: 'inline-block'
                            }}
                />
            </div>

        </Container>


    )
}

export default BookList;