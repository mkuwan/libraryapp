package dev.mkuwan.libraryapp.repository.entity;

import dev.mkuwan.libraryapp.domain.bookmodel.BookModel;

public class BookEntityDTO {

    public static BookEntity fromModel(BookModel model){
        var entity = BookEntity.builder()
                .bookId(model.getBookId())
                .BookNumber(model.getBookNumber())
                .ISBN(model.getISBN())
                .ISSN(model.getISSN())
                .TitleAndAuthor(model.getTitleAndAuthor())
                .Version(model.getVersion())
                .Series(model.getSeries())
                .PublishInfo(model.getPublishInfo())
                .SizeInfo(model.getSizeInfo())
                .Amount(model.getAmount())
                .RentedCount(model.getRentedCount())
                .build();
        return entity;
    }

    public static BookModel fromEntity(BookEntity entity){
        return new BookModel(entity.getBookId(),
                entity.getBookNumber(),
                entity.getISBN(),
                entity.getISSN(),
                entity.getTitleAndAuthor(),
                entity.getVersion(),
                entity.getSeries(),
                entity.getPublishInfo(),
                entity.getSizeInfo(),
                entity.getAmount(),
                entity.getRentedCount()
        );
    }

}
