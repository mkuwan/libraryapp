package dev.mkuwan.libraryapp.repository;

import dev.mkuwan.libraryapp.domain.bookmodel.BookModel;
import dev.mkuwan.libraryapp.domain.repository.ICsvRepository;
import dev.mkuwan.libraryapp.repository.BookRepositoryJpa;
import dev.mkuwan.libraryapp.repository.entity.BookEntity;
import dev.mkuwan.libraryapp.repository.entity.BookEntityDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CsvRepositoryImpl implements ICsvRepository {

    private final BookRepositoryJpa bookRepositoryJpa;

    @Autowired
    public CsvRepositoryImpl(BookRepositoryJpa bookRepositoryJpa) {
        this.bookRepositoryJpa = bookRepositoryJpa;
    }

    @Override
    public void SaveBooksFromCsv(ArrayList<BookModel> bookModels) {
        List<BookEntity> entities = new ArrayList<>();
        bookModels.forEach(x -> entities.add(BookEntityDTO.fromModel(x)));

        bookRepositoryJpa.saveAll(entities);
    }

    @Override
    public void SaveBook(BookModel bookModel){
        bookRepositoryJpa.save(BookEntityDTO.fromModel(bookModel));
    }
}
