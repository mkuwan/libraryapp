package dev.mkuwan.libraryapp.domain.bookmodel;

import lombok.Getter;

@Getter
public class BookModel {
    /**
     * ID
     */
    private String BookId;

    /**
     * 全国書誌番号
     */
    private String BookNumber;

    /**
     * ISBN
     */
    private String ISBN;

    /**
     * ISSN
     */
    private String ISSN;

    /**
     * タイトル・著者
     */
    private String TitleAndAuthor;

    /**
     * 版
     */
    private String Version;

    /**
     * シリーズ
     */
    private String Series;

    /**
     * 出版事項
     */
    private String PublishInfo;

    /**
     * 大きさ等
     */
    private String SizeInfo;

    /**
     * 保有数
     */
    private Integer Amount;

    /**
     * 貸出中の数
     */
    private Integer RentedCount;

    public BookModel(String bookId,
                     String bookNumber,
                     String ISBN, String ISSN,
                     String titleAndAuthor, String version, String series,
                     String publishInfo, String sizeInfo,
                     Integer amount, Integer rentedCount) {
        BookId = bookId;
        BookNumber = bookNumber;
        this.ISBN = ISBN;
        this.ISSN = ISSN;
        TitleAndAuthor = titleAndAuthor;
        Version = version;
        Series = series;
        PublishInfo = publishInfo;
        SizeInfo = sizeInfo;
        Amount = amount;
        RentedCount = rentedCount;
    }



    public BookModel(String bookId) {
        BookId = bookId;
    }

}
