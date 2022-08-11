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

    public ArrayList<BookViewModel> getBooksPageable(String titleAndAuthor, int page, int size){
        var books = bookQuery.getBooksPageable(titleAndAuthor, page, size);
        return returnBookViewModels(books);
    }

    @NotNull
    private ArrayList<BookViewModel> returnBookViewModels(List<BookEntity> books) {
        var viewModels = new ArrayList<BookViewModel>();

        books.forEach(x -> {
            var view = new BookViewModel();
            viewModels.add(view.fromEntity(x));
        });

        viewModels.sort(Comparator.comparing(BookViewModel::getTitleAndAuthor));

        return viewModels;
    }

}
