package dev.mkuwan.libraryapp.application.api;

import dev.mkuwan.libraryapp.application.bookservice.BookReturnType;
import dev.mkuwan.libraryapp.application.bookservice.BookService;
import dev.mkuwan.libraryapp.application.bookservice.BookViewModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping(path = "/api/v1/book")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping(path = "/list/all")
    public BookReturnType getBooks(){
        var viewModels = bookService.getBooks();
        var allCount = viewModels.size();

        return new BookReturnType(allCount, viewModels);
    }

    @PostMapping(path = "/list/search")
    public BookReturnType getBooks(@RequestParam(value = "titleAuthor") String titleAuthor){
        var allCount = bookService.getSearchedBooksCount(titleAuthor);
        var viewModels = bookService.getBooks(titleAuthor);

        return new BookReturnType(allCount, viewModels);
    }

    @PostMapping(path = "/list/page")
    public BookReturnType getBooks(@RequestParam(value = "titleAuthor") String titleAuthor,
                                   @RequestParam(value = "page") int page,
                                   @RequestParam(value = "size") int size){
//        return bookService.getBooksPageable(titleAuthor, page - 1, size);
        var allCount = bookService.getSearchedBooksCount(titleAuthor);
        var viewModels = bookService.getBooksOrderedPageable(titleAuthor, page - 1, size);

        return new BookReturnType(allCount, viewModels);
    }

//    @PostMapping(path = "/list/sample")
//    public ResponseEntity<BookViewModel> sampleBooks(){
//
//    }

}
