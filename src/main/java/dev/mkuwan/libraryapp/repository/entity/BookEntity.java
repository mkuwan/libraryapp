package dev.mkuwan.libraryapp.repository.entity;

import lombok.Builder;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
@Builder
public class BookEntity {
    @Id
    private String bookId;
    private String bookName1;
    private String bookName2;
    private String bookName3;
    private String bookInfo;
    private Integer amount;
    private Integer rentedCount;

    public BookEntity(String bookId,
                      String bookName1, String bookName2, String bookName3,
                      String bookInfo,
                      Integer amount,
                      Integer rentedCount) {
        this.bookId = bookId;
        this.bookName1 = bookName1;
        this.bookName2 = bookName2;
        this.bookName3 = bookName3;
        this.bookInfo = bookInfo;
        this.amount = amount;
        this.rentedCount = rentedCount;
    }

    public BookEntity() {

    }
}
