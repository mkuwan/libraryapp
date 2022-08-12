package dev.mkuwan.libraryapp.application.query;

import dev.mkuwan.libraryapp.repository.entity.BookEntity;

import java.util.List;

public interface IBookQuery {
    List<BookEntity> getBooks();

    List<BookEntity> getBooks(String bookTitleAndAuthor);

    List<BookEntity> getBooksPageable(String bookTitleAndAuthor, int page, int size);

    List<BookEntity> getBooksOrderedPageable(String bookTitleAndAuthor, int page, int size);

    int getSearchedBooksCount(String titleAuthor);
}
