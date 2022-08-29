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
import {API_URL, API_VERSION1, CONTROLLER_BOOK} from "../../constant/HostData";
import axios, {AxiosResponse} from "axios";


const BASE_URI = `${API_URL}${API_VERSION1}${CONTROLLER_BOOK}`;

type BookType = {
    bookId: string;
    bookNumber?: string;
    isbn?: string;
    issn?: string;
    titleAndAuthor: string;
    version?: string;
    series?: string;
    publishInfo?: string;
    sizeInfo?: string;
    amount: number;
    rentedCount: number;
}


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


export const BookRegister = () => {
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
     * 蔵書数変更処理
     */
    const onUpdateHandler = (updateAmount: number) => {
        if(!selectedBook)
            return;
        const url = `${BASE_URI}/register/amount`;
        const data = new FormData();
        data.append('bookId', selectedBook.bookId);
        data.append('amount', updateAmount.toString());

        axios.post(url, data)
            .then((response) => {
                if(response.status === 200){
                    const clone = [...bookList];
                    let updatingIndex = bookList.findIndex(x => x.bookId === selectedBook.bookId);
                    clone[updatingIndex].amount = updateAmount;
                    console.log(clone[updatingIndex].amount + "件に変更しました");
                    // setBookList([]);
                    setBookList(clone);
                }
            })
            .catch((reason) => {
                console.log(reason);
            })
            .finally(() => {

            })
    }

    /**
     * 蔵書数変更用Modal View
     * @constructor
     */
    const ModalBookCount =  () => {
        const [inputError, setInputError] = useState(false);
        const [updateAmount, setUpdateAmount] = useState(0);
        const inputField = useRef<HTMLInputElement>(null);

        return (
            <React.Fragment>
                <Modal
                    hideBackdrop
                    open={open}
                    onLoad={() => inputField.current?.focus()}
                    onClose={handleClose}
                    aria-labelledby="set-book-count"
                    aria-describedby="set-book-count">
                    <Box sx={{ ...style,  textOverflow: "ellipsis" }}>
                        <Typography noWrap fontWeight={"bold"} >蔵書数変更処理</Typography>
                        <p/>
                        <Typography noWrap>{selectedBook?.titleAndAuthor}</Typography>

                        <div style={{ display: 'flex', marginTop: '1rem', alignItems: 'center', justifyContent: 'center'}}>
                            <Typography display={"inline"} sx={{ mr: '1rem'}}>蔵書数:</Typography>
                            <TextField disabled
                                       size={"small"}
                                       inputProps={{ style:{textAlign: 'center'}}}
                                       sx={{ fontSize: '26', width: '5rem'}}
                                       value={selectedBook?.amount}/>
                            <Typography display={"inline"} sx={{ fontSize: 'h5.fontSize'}} >&emsp;&rarr;&emsp;</Typography>
                            <TextField focused
                                       inputRef={inputField}
                                       error={inputError}
                                       onChange={(e) =>{
                                           setInputError(!e.target.validity.valid);
                                           setUpdateAmount(Number(e.target.value));
                                       }}
                                       inputProps={{ inputMode: 'numeric',
                                           pattern: '^([1-9]|[1-9][0-9]|[1-9][0-9][0-9])$',
                                           maxLength: 3,
                                           style: {textAlign: 'center'}}}
                                       autoFocus={true}
                                       size={"small"}
                                       sx={{ fontSize: '26', width: '5rem', }}
                                       placeholder="変更後"
                                       variant="outlined" />
                        </div>

                        <div style={{ display: 'flex', marginTop: '1rem', alignItems: 'center', justifyContent: 'end'}}>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={() => {
                                onUpdateHandler(updateAmount);
                                handleClose();
                            }}
                            >更新</Button>
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
                                    onClick={() => {
                                        setSelectedBook(book);
                                        handleOpen();
                                    }}>蔵書数編集</Button>
                            <ModalBookCount/>
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

export default BookRegister;