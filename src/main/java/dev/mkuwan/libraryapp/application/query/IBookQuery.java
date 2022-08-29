package dev.mkuwan.libraryapp.application.query;

import dev.mkuwan.libraryapp.repository.entity.BookEntity;

import java.util.List;
import java.util.Optional;

public interface IBookQuery {
    Optional<BookEntity> getBook(String bookId);
    List<BookEntity> getBooks();

    List<BookEntity> getBooks(String bookTitleAndAuthor);

    List<BookEntity> getBooksForAdmin(String bookTitleAuthorIsbn);

    List<BookEntity> getBooksForAdminPageable(String bookTitleAuthorIsbn, int page, int size);

    List<BookEntity> getBooksPageable(String bookTitleAndAuthor, int page, int size);

    List<BookEntity> getBooksOrderedPageable(String bookTitleAndAuthor, int page, int size);

    int getSearchedBooksCount(String titleAuthor);

    int getSearchAdminBooksCount(String titleAuthorIsbn);
}
