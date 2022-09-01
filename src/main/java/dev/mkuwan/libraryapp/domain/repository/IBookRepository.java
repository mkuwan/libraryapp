package dev.mkuwan.libraryapp.domain.repository;

import dev.mkuwan.libraryapp.domain.bookmodel.BookModel;
import dev.mkuwan.libraryapp.domain.rentalmodel.RentalModel;

import java.util.ArrayList;
import java.util.List;

public interface IBookRepository {

    ArrayList<BookModel> getBooks();

    ArrayList<BookModel> getBooks(String bookTitleAndAuthor);

    ArrayList<BookModel> getBooksPageable(String bookTitleAndAuthor, int page, int size);

    ArrayList<BookModel> getBooksOrderedPageable(String bookTitleAndAuthor, int page, int size);

    void registerBook(BookModel bookModel);

    void registerAll(List<BookModel> bookModels);

    long getBooksCount();

}
