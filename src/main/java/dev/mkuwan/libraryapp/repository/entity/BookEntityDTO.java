package dev.mkuwan.libraryapp.repository.entity;

import dev.mkuwan.libraryapp.domain.bookmodel.BookModel;
import org.jetbrains.annotations.Contract;
import org.jetbrains.annotations.NotNull;

public class BookEntityDTO {

    public static BookEntity fromModel(@NotNull BookModel model){
        return BookEntity.builder()
                .bookId(model.getBookId())
                .bookNumber(model.getBookNumber())
                .isbn(model.getISBN())
                .issn(model.getISSN())
                .titleAuthor(model.getTitleAndAuthor())
                .version(model.getVersion())
                .series(model.getSeries())
                .publishInfo(model.getPublishInfo())
                .sizeInfo(model.getSizeInfo())
                .amount(model.getAmount())
                .rentedCount(model.getRentedCount())
                .build();
    }

    @Contract("_ -> new")
    public static @NotNull BookModel fromEntity(@NotNull BookEntity entity){
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
                entity.getRentedCount()
        );
    }

}
