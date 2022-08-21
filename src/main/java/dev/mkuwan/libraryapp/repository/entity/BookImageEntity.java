package dev.mkuwan.libraryapp.repository.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * 書籍イメージをDBに保存する場合に使用する
 */
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "BookImage")
public class BookImageEntity {
    @Id
    private String bookImageId;

    private String bookEntityId;

    @Lob
    @Column(length = 1000)
    private byte[] bookImage;
}
