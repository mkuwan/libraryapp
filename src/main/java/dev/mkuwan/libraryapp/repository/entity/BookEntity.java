package dev.mkuwan.libraryapp.repository.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Book")
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
     * ISBN ハイフンなし
     */
    private String isbn_no_hyphen;

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

//    /**
//     * @OneToMany: 1-n の 1側がFKの管理をする
//     *  内部でupdateも走るらしい。パフォーマンス的にはn側管理の方がいいとのこと
//     *  https://zenn.dev/dev_yoon/articles/a6bbef727880a8
//     *  https://zenn.dev/dev_yoon/articles/9b1a46bb95d168
//     */
//    @OneToMany
//    @JoinColumn(name = "bookImageId")
//    private Set<BookImageEntity> bookImageEntities = new HashSet<>();
}
