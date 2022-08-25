import {BookImage} from "../../components/BookImage";
import {Card, Container, Grid} from "@mui/material";
import {useState} from "react";

type BookType = {

    isbn: string;
}

const demoData: BookType = {

    isbn:'978-4-296-10883-1'
}
// 978-4-77-419039-6
// 978-4-01-094982-5

export const BookInfo = () => {
    const [bookInfo, setBookInfo] = useState<BookType>(demoData);

    // setBookInfo(demoData);

    return(
        <Container maxWidth={false} sx={{ mt: '1rem'}}>
            <Card>
                <Grid container={true} spacing={1}>
                    <Grid item width={150} height={200}>
                        {bookInfo ? (
                            <BookImage  isbn={bookInfo?.isbn}/>
                        ): (
                            <></>
                        )}
                    </Grid>
                    <Grid>

                    </Grid>
                </Grid>
                <div>

                </div>
            </Card>
        </Container>

    )
}

export default BookInfo;