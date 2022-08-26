import {BookImage} from "../../components/BookImage";
import {
    Box, Button,
    Card,
    CardContent, CardMedia,
    Container,
    Grid,
    Paper,
    Stack,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import React, {useCallback, useEffect, useMemo, useState} from "react";

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
// this.bookId = bookId;
// this.bookNumber = bookNumber;
// this.isbn = ISBN;
// this.issn = ISSN;
// this.titleAndAuthor = titleAndAuthor;
// this.version = version;
// this.series = series;
// this.publishInfo = publishInfo;
// this.sizeInfo = sizeInfo;
// this.amount = amount;
// this.rentedCount = rentedCount;

const demoData: BookType = {
    bookId: '123456-abc',
    bookNumber: '984612472',
    isbn:'978-4-296-10883-1',
    issn: '0000111',
    titleAndAuthor: '何かの技術書1 234 56 1231 1564 12154 156789 78945 61230 135',
    version: '第2版',
    series: 'シリーズ1',
    publishInfo: '技術評論社',
    sizeInfo: '100p',
    amount: 2,
    rentedCount: 1

}
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

export const BookInfo = () => {
    const [searchIsbn, setSearchIsbn] = useState('');
    const [searchTitleAuthor, setSearchTitleAuthor] = useState('');
    const [searchType, setSearchType]=useState('');
    const [bookInfo, setBookInfo] = useState<BookType>(demoData);

    const SearchBookButton = React.memo(() => {
        return(
            <Button variant={"contained"} onClick={handleSearch}>検索</Button>
        )
    });

    // TODO: 書籍情報取得処理 => setBookInfoへ
    const handleSearch = useCallback(async () =>{

    }, [])



    return(
        <Container maxWidth={false} sx={{ mt: '1rem'}}>

            <Card sx={{ minHeight: '320px'}}>
                <Grid sx={{ m: 1 }}>
                    <Grid item style={{ width: '150px', position: 'fixed'}}>
                        <BookImage isbn={bookInfo?.isbn}/>
                        <div>
                            <Typography justifyContent={"center"} display={"inline"}>蔵書数: </Typography>
                            <Typography display={"inline"}>{bookInfo.amount}</Typography>
                        </div>
                        <div>
                            <Typography display={"inline"}>貸出数: </Typography>
                            <Typography display={"inline"}>{bookInfo.rentedCount}</Typography>
                        </div>
                        <Button sx={{ mt: 1}} variant={"contained"} >蔵書数編集</Button>
                    </Grid>
                    <Grid item style={{ marginLeft: '150px'}}>
                        <Grid item direction={'column'}>
                            <div>
                                <HeaderText  value={'タイトル・著者'}/>
                                <ContentText value={bookInfo.titleAndAuthor}/>
                            </div>
                            <div>
                                <HeaderText  value={'ISBN'}/>
                                <ContentText value={bookInfo.isbn}/>
                            </div>
                            <div>
                                <HeaderText  value={'ISSN'}/>
                                <ContentText value={bookInfo.issn}/>
                            </div>
                            <div>
                                <HeaderText  value={'版'}/>
                                <ContentText value={bookInfo.version}/>
                            </div>
                            <div>
                                <HeaderText  value={'シリーズ'}/>
                                <ContentText value={bookInfo.series}/>
                            </div>
                            <div>
                                <HeaderText  value={'出版情報等'}/>
                                <ContentText value={bookInfo.publishInfo}/>
                            </div>
                            <div>
                                <HeaderText  value={'サイズなど'}/>
                                <ContentText value={bookInfo.sizeInfo}/>
                            </div>
                        </Grid>

                    </Grid>
                </Grid>
            </Card>
        </Container>

    )
}

export default BookInfo;