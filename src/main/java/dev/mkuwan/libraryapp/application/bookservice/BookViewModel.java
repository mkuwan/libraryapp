package dev.mkuwan.libraryapp.application.bookservice;

import dev.mkuwan.libraryapp.domain.bookmodel.BookModel;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BookViewModel {
    private String bookId;
    private String bookName1;
    private String bookName2;
    private String bookName3;
    private String bookInfo;
    private int amount;
    private int rentedCount;

    public BookViewModel() {}

    public BookViewModel(String bookId,
                         String bookName1, String bookName2, String bookName3,
                         String bookInfo,
                         int amount, int rentedCount) {
        this.bookId = bookId;
        this.bookName1 = bookName1;
        this.bookName2 = bookName2;
        this.bookName3 = bookName3;
        this.bookInfo = bookInfo;
        this.amount = amount;
        this.rentedCount = rentedCount;
    }

    public BookViewModel fromModel(BookModel model){
        bookId = model.getBookId();
        bookName1 = model.getTitle1();
        bookName2 = model.getTitle2();
        bookName3 = model.getTitle3();
        bookInfo = model.getBookInfo();
        amount = model.getAmount();

        return this;
    }
}
