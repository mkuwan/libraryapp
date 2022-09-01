package dev.mkuwan.libraryapp.repository;

import dev.mkuwan.libraryapp.domain.bookmodel.BookModel;
import dev.mkuwan.libraryapp.domain.rentalmodel.RentalModel;
import dev.mkuwan.libraryapp.domain.repository.IBookRepository;
import dev.mkuwan.libraryapp.repository.entity.BookEntity;
import dev.mkuwan.libraryapp.repository.entity.BookEntityDTO;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class BookRepositoryImpl implements IBookRepository {

    private final BookRepositoryJpa bookRepositoryJpa;

    public BookRepositoryImpl(BookRepositoryJpa bookRepositoryJpa){
        this.bookRepositoryJpa = bookRepositoryJpa;
    }

    @Override
    public ArrayList<BookModel> getBooks() {
        var books = bookRepositoryJpa.findAll();
        return returnBookModels(books);
    }

    @Override
    public ArrayList<BookModel> getBooks(String bookTitleAndAuthor) {
        var books = bookRepositoryJpa.findBookEntitiesByTitleAuthorContaining(bookTitleAndAuthor);
        return returnBookModels(books);
    }

    @Override
    public ArrayList<BookModel> getBooksPageable(String bookTitleAndAuthor, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        var books = bookRepositoryJpa
                .findBookEntitiesByTitleAuthorContaining(bookTitleAndAuthor, pageable);
        return returnBookModels(books);
    }

    @Override
    public ArrayList<BookModel> getBooksOrderedPageable(String bookTitleAndAuthor, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("titleAuthor"));
        var books = bookRepositoryJpa
                .findBookEntitiesByTitleAuthorContaining(bookTitleAndAuthor, pageable);
        return returnBookModels(books);
    }

    private @NotNull ArrayList<BookModel> returnBookModels(@NotNull List<BookEntity> books) {
        var bookModels = new ArrayList<BookModel>();
        books.forEach(x -> bookModels.add(new BookModel(x.getBookId(),
                x.getBookNumber(),
                x.getIsbn(),
                x.getIssn(),
                x.getTitleAuthor(),
                x.getVersion(),
                x.getSeries(),
                x.getPublishInfo(),
                x.getSizeInfo(),
                x.getAmount(),
                x.getRentedCount())));

        return bookModels;
    }

    @Override
    public void registerBook(BookModel bookModel) {
        var entity = BookEntityDTO.fromModel(bookModel);

        bookRepositoryJpa.save(entity);
    }

    @Override
    public void registerAll(List<BookModel> bookModels) {
        List<BookEntity> entities = new ArrayList<>();
        bookModels.forEach(x -> entities.add(BookEntityDTO.fromModel(x)));

        bookRepositoryJpa.saveAll(entities);
    }

    @Override
    public long getBooksCount() {
        return bookRepositoryJpa.count();
    }



}
