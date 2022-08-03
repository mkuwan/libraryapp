package dev.mkuwan.libraryapp;

import dev.mkuwan.libraryapp.domain.bookmodel.BookModel;
import dev.mkuwan.libraryapp.domain.repository.IBookRepository;
import dev.mkuwan.libraryapp.domain.repository.IRentalRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

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

        if(getBooks() > 0)
            return;

        for (int i = 0; i < 10; i++) {
            var book = new BookModel(UUID.randomUUID().toString(),
                    "本のタイトル" + (i + 1),
                    "副題" + (i + 1),
                    "第" + (i + 1) + "巻",
                    "本の情報",
                    i + 1);

            bookRepository.save(book);
        }
    }

    private long getBooks(){
        return bookRepository.getBooksCount();
    }
}
