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

    public BookEntity(String bookId,
                      String bookNumber,
                      String ISBN, String ISSN,
                      String titleAndAuthor, String version, String series,
                      String publishInfo, String sizeInfo,
                      Integer amount, Integer rentedCount) {
        this.bookId = bookId;
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


    public BookEntity() {

    }
}
