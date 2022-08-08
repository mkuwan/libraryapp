package dev.mkuwan.libraryapp.application.bookservice;

import dev.mkuwan.libraryapp.domain.bookmodel.BookModel;
import dev.mkuwan.libraryapp.domain.repository.IBookRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Set;

@Service
public class BookService {

    private final IBookRepository bookRepository;


    public BookService(IBookRepository bookRepository){
        this.bookRepository = bookRepository;
    }

    public ArrayList<BookViewModel> getBooks() {

        var books = bookRepository.getBooks();
        var viewModels = new ArrayList<BookViewModel>();

        books.forEach(x -> {
            var view = new BookViewModel();
            viewModels.add(view.fromModel(x));
        });

        viewModels.sort(Comparator.comparing(BookViewModel::getBookName1));

        return viewModels;
    }

}
