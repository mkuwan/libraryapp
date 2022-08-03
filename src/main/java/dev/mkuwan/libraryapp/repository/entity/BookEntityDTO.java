package dev.mkuwan.libraryapp.repository.entity;

import dev.mkuwan.libraryapp.domain.bookmodel.BookModel;

public class BookEntityDTO {

    public static BookEntity fromModel(BookModel model){
        var entity = BookEntity.builder()
                .bookId(model.getBookId())
                .bookName1(model.getTitle1())
                .bookName2(model.getTitle2())
                .bookName3(model.getTitle3())
                .bookInfo(model.getBookInfo())
                .amount(model.getAmount())
                .build();
        return entity;
    }

    public static BookModel fromEntity(BookEntity entity){
        return new BookModel(entity.getBookId(),
                entity.getBookName1(),
                entity.getBookName2(),
                entity.getBookName3(),
                entity.getBookInfo(),
                entity.getAmount());
    }

}
