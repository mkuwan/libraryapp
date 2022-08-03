package dev.mkuwan.libraryapp.repository;

import dev.mkuwan.libraryapp.domain.bookmodel.BookModel;
import dev.mkuwan.libraryapp.domain.repository.IBookRepository;
import dev.mkuwan.libraryapp.repository.entity.BookEntityDTO;
import org.springframework.stereotype.Component;

@Component
public class BookRepositoryImpl implements IBookRepository {

    private final BookRepositoryJpa bookRepositoryJpa;

    public BookRepositoryImpl(BookRepositoryJpa bookRepositoryJpa){
        this.bookRepositoryJpa = bookRepositoryJpa;
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
