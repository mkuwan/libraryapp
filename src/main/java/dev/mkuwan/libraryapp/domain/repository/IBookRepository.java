package dev.mkuwan.libraryapp.domain.repository;

import dev.mkuwan.libraryapp.domain.bookmodel.BookModel;

import java.awt.print.Book;

public interface IBookRepository {
    void registerBook(BookModel bookModel);
    long getBooksCount();

    void save(BookModel bookModel);
}
