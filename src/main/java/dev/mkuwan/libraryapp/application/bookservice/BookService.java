package dev.mkuwan.libraryapp.application.bookservice;

import dev.mkuwan.libraryapp.domain.repository.IBookRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class BookService implements IBookService{

    private final IBookRepository bookRepository;

    public BookService(IBookRepository bookRepository){
        this.bookRepository = bookRepository;
    }

    @Override
    public ArrayList<BookViewModel> getBooks() {
        var books = bookRepository.getBooks();
        var viewModels = new ArrayList<BookViewModel>();

        books.forEach(x -> {
            var view = new BookViewModel();
            viewModels.add(view.fromModel(x));
        });

        return viewModels;
    }
}
