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
    private String titleAuthor;

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

    public BookEntity(String bookId,
                      String bookNumber,
                      String isbn, String issn,
                      String titleAuthor, String version, String series,
                      String publishInfo, String sizeInfo,
                      Integer amount, Integer rentedCount) {
        this.bookId = bookId;
        this.bookNumber = bookNumber;
        this.isbn = isbn;
        this.issn = issn;
        this.titleAuthor = titleAuthor;
        this.version = version;
        this.series = series;
        this.publishInfo = publishInfo;
        this.sizeInfo = sizeInfo;
        this.amount = amount;
        this.rentedCount = rentedCount;
    }


    public BookEntity() {

    }
}
