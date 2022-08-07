package dev.mkuwan.libraryapp.application.api;

import dev.mkuwan.libraryapp.application.bookservice.BookService;
import dev.mkuwan.libraryapp.application.bookservice.BookViewModel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping(path = "/api/v1/book")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }


    @PostMapping(path = "/list")
    public ArrayList<BookViewModel> getBooks(){
        return bookService.getBooks();
    }


}
