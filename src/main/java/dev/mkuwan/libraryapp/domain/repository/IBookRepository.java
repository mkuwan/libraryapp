package dev.mkuwan.libraryapp.domain.repository;

import dev.mkuwan.libraryapp.domain.bookmodel.BookModel;

import java.awt.print.Book;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public interface IBookRepository {

    ArrayList<BookModel> getBooks();
    void registerBook(BookModel bookModel);
    long getBooksCount();

    void save(BookModel bookModel);
}
