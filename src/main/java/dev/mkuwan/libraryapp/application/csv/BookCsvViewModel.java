package dev.mkuwan.libraryapp.application.csv;

import dev.mkuwan.libraryapp.domain.bookmodel.BookModel;

import java.util.ArrayList;
import java.util.UUID;

public class BookCsvViewModel {
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
     * 版表示
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

    public BookCsvViewModel(String bookNumber,
                            String isbn, String issn,
                            String titleAndAuthor, String version, String series,
                            String publishInfo, String sizeInfo) {
        this.bookId = UUID.randomUUID().toString();
        this.bookNumber = bookNumber;
        this.isbn = isbn;
        this.issn = issn;

        if(titleAndAuthor.isBlank())
            throw new IllegalArgumentException("書名・著者名がありません");
        this.titleAndAuthor = titleAndAuthor;

        this.version = version;
        this.series = series;
        this.publishInfo = publishInfo;
        this.sizeInfo = sizeInfo;
    }

    public BookModel fromViewModel(){
        return new BookModel(
                this.bookId,
                this.bookNumber,
                this.isbn,
                this.issn,
                this.titleAndAuthor,
                this.version,
                this.series,
                this.publishInfo,
                this.sizeInfo,
                1,
                0
        );
    }
}
