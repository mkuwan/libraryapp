package dev.mkuwan.libraryapp;

import dev.mkuwan.libraryapp.domain.bookmodel.BookModel;
import dev.mkuwan.libraryapp.domain.repository.IBookRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.UUID;


@Component
public class LibraryCommandLineRunner implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(LibraryCommandLineRunner.class);

    private final IBookRepository bookRepository;

    public LibraryCommandLineRunner(IBookRepository bookRepository){
        this.bookRepository = bookRepository;
    }

    /**
     * サンプル用の書籍データです
     * @param args
     * @throws Exception
     */
    @Override
    public void run(String... args) throws Exception {

//        if(getBooks() > 0)
//            return;
//
//        ArrayList<BookModel> bookModels = new ArrayList<>();
//        for (int i = 0; i < 100; i++) {
//            var book = new BookModel(UUID.randomUUID().toString(),
//                    ((Integer)(1000 + i)).toString(),
//                    "978-4-00-061477-" + i,
//                    ((Integer)(2000 + i)).toString(),
//                    "本と著者" + (i + 1),
//                    (i + 1) + "版",
//                    "シリーズ" + (i + 1),
//                    "出版",
//                    "大きさ",
//                    i + 1,
//                    i);
//
//            bookModels.add(book);
//        }
//
//        bookRepository.registerAll(bookModels);
    }

    private long getBooks(){
        return bookRepository.getBooksCount();
    }
}
