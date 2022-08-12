package dev.mkuwan.libraryapp.repository;

import dev.mkuwan.libraryapp.application.query.IBookQuery;
import dev.mkuwan.libraryapp.repository.entity.BookEntity;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BookQueryImpl implements IBookQuery {
    private final BookRepositoryJpa bookRepositoryJpa;

    public BookQueryImpl(BookRepositoryJpa bookRepositoryJpa){
        this.bookRepositoryJpa = bookRepositoryJpa;
    }

    @Override
    public List<BookEntity> getBooks() {
        return bookRepositoryJpa.findAll();
    }

    @Override
    public List<BookEntity> getBooks(String bookTitleAndAuthor) {
        return bookRepositoryJpa.findBookEntitiesByTitleAuthorContaining(bookTitleAndAuthor);
    }

    @Override
    public List<BookEntity> getBooksPageable(String bookTitleAndAuthor, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return bookRepositoryJpa
                .findBookEntitiesByTitleAuthorContaining(bookTitleAndAuthor, pageable);
    }

    @Override
    public List<BookEntity> getBooksOrderedPageable(String bookTitleAndAuthor, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("titleAuthor"));
        return bookRepositoryJpa
                .findBookEntitiesByTitleAuthorContaining(bookTitleAndAuthor, pageable);
    }

    @Override
    public int getSearchedBooksCount(String titleAuthor) {
        return bookRepositoryJpa.findBookEntitiesByTitleAuthorContaining(titleAuthor).size();
    }
}
