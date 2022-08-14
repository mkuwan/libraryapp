
import {
    Pagination,
    Paper,
    styled,
    Table, TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {useState} from "react";
import {BookViewModel} from "../../context/SearchBookContext";


const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.success.dark,
        color: theme.palette.common.white,
        fontSize: 16
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    }
}));

export const BookList = () => {

    const [page, setPage] = useState(1);
    const [bookList, setBookList] = useState<BookViewModel[]>([]);

    return(
        <div style={{textAlign: "center"}}>
            図書リストページ開発開始

            <TableContainer component={Paper}>
                <Table
                       aria-label={'book list table'}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>書籍・著者</StyledTableCell>
                            <StyledTableCell>出版情報</StyledTableCell>
                            <StyledTableCell>サイズ等</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookList.map((item, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell component={'th'} scope={'row'}>
                                    {item.titleAuthor}
                                </StyledTableCell>
                                <StyledTableCell align={"left"}>
                                    {item.publishInfo}
                                </StyledTableCell>
                                <StyledTableCell align={"left"}>
                                    {item.sizeInfo}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Pagination count={100}
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


    )
}

export default BookList;