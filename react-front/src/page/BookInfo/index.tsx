import {BookImage} from "../../components/BookImage";
import {
    alpha, AppBar,
    Box, Button,
    Card,
    CardContent, CardMedia,
    Container,
    Grid, InputBase, Pagination,
    Paper,
    Stack, styled,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow, Toolbar,
    Typography
} from "@mui/material";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import SearchIcon from '@mui/icons-material/Search';

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
    amount?: number;
    rentedCount?: number;
}


const demoData: BookType[] = [
    {
    bookId: '123456-abc',
    bookNumber: '984612472',
    isbn:'978-4-296-10883-1',
    issn: '0000111',
    titleAndAuthor: '何かの技術書1 234 56 1231 1564 12154 156789 78945 6 1564 12154 156789 78945 61230 135',
    version: '第2版',
    series: 'シリーズ1',
    publishInfo: '技術評論社',
    sizeInfo: '100p',
    amount: 2,
    rentedCount: 1
    },
    {
        bookId: '123456-efg',
        bookNumber: '984612472',
        isbn:'978-4-77-419039-6',
        issn: '0000111',
        titleAndAuthor: '何かの技術書1 234 56 1231 1564 12154 156789 78945 61230 135',
        version: '第2版',
        series: 'シリーズ1',
        publishInfo: '技術評論社',
        sizeInfo: '100p',
        amount: 2,
        rentedCount: 1
    },
    {
        bookId: '123456-abc',
        bookNumber: '984612472',
        isbn:'978-4-01-094982-5',
        issn: '0000111',
        titleAndAuthor: '何かの技術書1 234 56 1231 1564 12154 156789 78945 61230 135',
        version: '第2版',
        series: 'シリーズ1',
        publishInfo: '技術評論社',
        sizeInfo: '100p',
        amount: 2,
        rentedCount: 1
    },
]
// 978-4-77-419039-6
// 978-4-01-094982-5

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


export const BookInfo = () => {
    const [searchIsbn, setSearchIsbn] = useState('');
    const [searchTitleAuthor, setSearchTitleAuthor] = useState('');
    const [searchType, setSearchType]=useState('');
    const [bookList, setBookList] = useState<BookType[]>(demoData);
    const [page, setPage] = useState(1);

    const SearchBookButton = React.memo(() => {
        return(
            <Button variant={"contained"}
                    onClick={handleSearch}>検索</Button>
        )
    });

    // TODO: 書籍情報取得処理 => setBookInfoへ
    const handleSearch = useCallback(async () =>{

    }, [])



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
                                         onKeyDown={(event) => {
                                             if(event.key==='Enter'){
                                                 alert('検索します')
                                             }
                                         }}
                        />
                    </Search>
                </Toolbar>
            </AppBar>

            {bookList.map((value, index, array) => (
                <Card sx={{ boxShadow: '0 1rem 1rem -1rem hsl(200 50% 20% / 40%)',
                    border: 0.5,
                    marginTop: 0.5,
                    marginBottom: '1rem'}}>
                    <Grid display={"flex"} sx={{ m: 1 }}>
                        <Grid item style={{ width: '150px', marginRight: 0 }}>
                            <BookImage isbn={value?.isbn}/>
                            <div>
                                <Typography justifyContent={"center"} display={"inline"}>蔵書数: </Typography>
                                <Typography display={"inline"}>{value.amount}</Typography>
                            </div>
                            <div>
                                <Typography display={"inline"}>貸出数: </Typography>
                                <Typography display={"inline"}>{value.rentedCount}</Typography>
                            </div>
                            <Button sx={{ mt: 1}} variant={"contained"} >蔵書数編集</Button>
                        </Grid>
                        <Grid item >
                            <Grid item direction={'column'}>
                                <div>
                                    <HeaderText  value={'タイトル・著者'}/>
                                    <ContentText value={value.titleAndAuthor}/>
                                </div>
                                <div>
                                    <HeaderText  value={'ISBN'}/>
                                    <ContentText value={value.isbn}/>
                                </div>
                                <div>
                                    <HeaderText  value={'ISSN'}/>
                                    <ContentText value={value.issn}/>
                                </div>
                                <div>
                                    <HeaderText  value={'版'}/>
                                    <ContentText value={value.version}/>
                                </div>
                                <div>
                                    <HeaderText  value={'シリーズ'}/>
                                    <ContentText value={value.series}/>
                                </div>
                                <div>
                                    <HeaderText  value={'出版情報等'}/>
                                    <ContentText value={value.publishInfo}/>
                                </div>
                                <div>
                                    <HeaderText  value={'サイズなど'}/>
                                    <ContentText value={value.sizeInfo}/>
                                </div>
                            </Grid>

                        </Grid>
                    </Grid>
                </Card>
            ))}

            <div style={{textAlign: "center", marginTop: '1rem'}}>
                <Pagination count={bookList.length}
                            variant={"outlined"}
                            shape={"rounded"}
                            color={"primary"}
                            showFirstButton={true}
                            showLastButton={true}
                            page={page}
                            onChange={(event, page) => setPage(page)}
                            sx={{
                                display: 'inline-block'
                            }}
                />
            </div>
        </Container>

    )
}

export default BookInfo;