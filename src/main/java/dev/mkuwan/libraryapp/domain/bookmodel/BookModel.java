package dev.mkuwan.libraryapp.domain.bookmodel;

import lombok.Getter;

@Getter
public class BookModel {
    /**
     * ID
     */
    private final String BookId;

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

    public BookModel changeAmount(int changed){
        if(changed < 0)
            throw new IllegalArgumentException("蔵書数を0より小さくできません");

        if(changed < this.RentedCount){
            throw new IllegalArgumentException("蔵書数を貸出数より小さくはできません");
        }

        this.Amount = changed;

        return this;
    }

    // TODO: 貸出
    // ルール: 貸出禁止図書は貸出できない
    //        貸出最大数を越えて貸出はできない
    //        貸出中の図書は貸出できない(在庫がない図書は貸出できない)

    // TODO: 図書登録
    // ルール: 既存の図書がある場合は在庫追加となる
    //          既存かどうかは全国図書番号で確認する
    //          全国図書番号が同じでもタイトル・著者が異なる場合は追加しない
    //        既存の図書がない場合は新規登録となる
    // 必須項目: 全国図書番号, タイトル・著者


}
