package dev.mkuwan.libraryapp.api;

import dev.mkuwan.libraryapp.application.bookservice.BookViewModel;
import dev.mkuwan.libraryapp.application.bookservice.IBookService;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping(path = "/api/v1/book")
public class BookController {

    private final IBookService bookService;

    public BookController(IBookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping(path = "/list")
    public ArrayList<BookViewModel> getBooks(){
        return bookService.getBooks();
    }


}
