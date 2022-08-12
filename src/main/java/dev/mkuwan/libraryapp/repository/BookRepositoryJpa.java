package dev.mkuwan.libraryapp.repository;

import dev.mkuwan.libraryapp.repository.entity.BookEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepositoryJpa extends JpaRepository<BookEntity, String> {

    List<BookEntity> findBookEntitiesByTitleAuthorContaining(String value);

    List<BookEntity> findBookEntitiesByTitleAuthorContaining(String value, Pageable pageable);
}
