package dev.mkuwan.libraryapp.application.bookservice;

import dev.mkuwan.libraryapp.application.query.IBookQuery;
import dev.mkuwan.libraryapp.domain.repository.IBookRepository;
import dev.mkuwan.libraryapp.repository.entity.BookEntity;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class BookService {

    private final IBookRepository bookRepository;
    private final IBookQuery bookQuery;

    public BookService(IBookRepository bookRepository, IBookQuery bookQuery){
        this.bookRepository = bookRepository;
        this.bookQuery = bookQuery;
    }

    public ArrayList<BookViewModel> getBooks() {

        var books = bookQuery.getBooks();
        return returnBookViewModels(books);
    }

    public ArrayList<BookViewModel> getBooks(String titleAndAuthor){
        var books = bookQuery.getBooks(titleAndAuthor);

        return returnBookViewModels(books);
    }

    public int getSearchedBooksCount(String titleAndAuthor){
        return bookQuery.getSearchedBooksCount(titleAndAuthor);
    }

    public ArrayList<BookViewModel> getBooksPageable(String titleAndAuthor, int page, int size){
        var books = bookQuery.getBooksPageable(titleAndAuthor, page, size);
        return returnBookViewModels(books);
    }

    public ArrayList<BookViewModel> getBooksOrderedPageable(String titleAndAuthor, int page, int size){
        var books = bookQuery.getBooksOrderedPageable(titleAndAuthor, page, size);
        return returnBookViewModels(books);
    }

    private @NotNull ArrayList<BookViewModel> returnBookViewModels(@NotNull List<BookEntity> books) {
        var viewModels = new ArrayList<BookViewModel>();

        books.forEach(x -> {
            var view = new BookViewModel();
            viewModels.add(view.fromEntity(x));
        });

//        viewModels.sort(Comparator.comparing(BookViewModel::getTitleAndAuthor, Comparator.nullsLast(Comparator.naturalOrder())));

        return viewModels;
    }

}
