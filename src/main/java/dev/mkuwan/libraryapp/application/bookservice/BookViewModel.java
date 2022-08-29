package dev.mkuwan.libraryapp.application.bookservice;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import dev.mkuwan.libraryapp.domain.bookmodel.BookModel;
import dev.mkuwan.libraryapp.repository.entity.BookEntity;
import lombok.Builder;
import lombok.Data;

@JsonSerialize
@Data
@Builder
public class BookViewModel {
    /**
     * ID
     */
    private String bookId;

    /**
     * 全国書誌番号
     */
    private String bookNumber;

    /**
     * ISBN
     */
    private String isbn;

    /**
     * ISSN
     */
    private String issn;

    /**
     * タイトル・著者
     */
    private String titleAndAuthor;

    /**
     * 版
     */
    private String version;

    /**
     * シリーズ
     */
    private String series;

    /**
     * 出版事項
     */
    private String publishInfo;

    /**
     * 大きさ等
     */
    private String sizeInfo;

    /**
     * 保有数
     */
    private Integer amount;

    /**
     * 貸出中の数
     */
    private Integer rentedCount;

    public BookViewModel() {}

    public BookViewModel(String bookId, String bookNumber,
                         String ISBN, String ISSN,
                         String titleAndAuthor, String version, String series,
                         String publishInfo, String sizeInfo,
                         Integer amount, Integer rentedCount) {
        this.bookId = bookId;
        this.bookNumber = bookNumber;
        this.isbn = ISBN;
        this.issn = ISSN;
        this.titleAndAuthor = titleAndAuthor;
        this.version = version;
        this.series = series;
        this.publishInfo = publishInfo;
        this.sizeInfo = sizeInfo;
        this.amount = amount;
        this.rentedCount = rentedCount;
    }

    public BookViewModel fromModel(BookModel model){
        bookId = model.getBookId();
        bookNumber = model.getBookNumber();
        isbn = model.getISBN();
        issn = model.getISSN();
        titleAndAuthor = model.getTitleAndAuthor();
        version = model.getVersion();
        series = model.getSeries();
        publishInfo = model.getPublishInfo();
        sizeInfo = model.getSizeInfo();
        amount = model.getAmount();
        rentedCount = model.getRentedCount();
        return this;
    }

    public BookViewModel fromEntity(BookEntity entity){
        bookId = entity.getBookId();
        bookNumber = entity.getBookNumber();
        isbn = entity.getIsbn();
        issn = entity.getIssn();
        titleAndAuthor = entity.getTitleAuthor();
        version = entity.getVersion();
        series = entity.getSeries();
        publishInfo = entity.getPublishInfo();
        sizeInfo = entity.getSizeInfo();
        amount = entity.getAmount();
        rentedCount = entity.getRentedCount();
        return this;
    }

    public BookModel fromEntityToModel(BookEntity entity){
        return new BookModel(entity.getBookId(),
                entity.getBookNumber(),
                entity.getIsbn(),
                entity.getIssn(),
                entity.getTitleAuthor(),
                entity.getVersion(),
                entity.getSeries(),
                entity.getPublishInfo(),
                entity.getSizeInfo(),
                entity.getAmount(),
                entity.getRentedCount());
    }
}
