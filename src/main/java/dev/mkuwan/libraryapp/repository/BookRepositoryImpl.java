package dev.mkuwan.libraryapp.repository;

import dev.mkuwan.libraryapp.domain.bookmodel.BookModel;
import dev.mkuwan.libraryapp.domain.repository.IBookRepository;
import dev.mkuwan.libraryapp.repository.entity.BookEntityDTO;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Component
public class BookRepositoryImpl implements IBookRepository {

    private final BookRepositoryJpa bookRepositoryJpa;

    public BookRepositoryImpl(BookRepositoryJpa bookRepositoryJpa){
        this.bookRepositoryJpa = bookRepositoryJpa;
    }

    @Override
    public ArrayList<BookModel> getBooks() {
        var books = bookRepositoryJpa.findAll();
        var bookModels = new ArrayList<BookModel>();
        books.forEach(x -> {
            bookModels.add(new BookModel(x.getBookId(),
                    x.getBookNumber(),
                    x.getISBN(),
                    x.getISSN(),
                    x.getTitleAndAuthor(),
                    x.getVersion(),
                    x.getSeries(),
                    x.getPublishInfo(),
                    x.getSizeInfo(),
                    x.getAmount(),
                    x.getRentedCount()));
        });

        return bookModels;
    }

    @Override
    public void registerBook(BookModel bookModel) {

    }

    @Override
    public long getBooksCount() {
        return bookRepositoryJpa.count();
    }

    @Override
    public void save(BookModel bookModel) {
        var entity = BookEntityDTO.fromModel(bookModel);

        bookRepositoryJpa.save(entity);
    }
}
