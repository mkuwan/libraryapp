export type BookType = {
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

export default BookType;