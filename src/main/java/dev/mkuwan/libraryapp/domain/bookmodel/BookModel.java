package dev.mkuwan.libraryapp.domain.bookmodel;

import lombok.Getter;

import java.util.Currency;
import java.util.Objects;

@Getter
public class BookModel {
    private String BookId;
    private String Title1;
    private String Title2;
    private String Title3;
    private String BookInfo;
    private Integer Amount;

    public BookModel(String bookId,
                     String title1, String title2, String title3,
                     String bookInfo,
                     Integer amount) {
        BookId = bookId;
        Title1 = title1;
        Title2 = title2;
        Title3 = title3;
        BookInfo = bookInfo;
        Amount = amount;
    }

    public BookModel(String bookId) {
        BookId = bookId;
    }

}
