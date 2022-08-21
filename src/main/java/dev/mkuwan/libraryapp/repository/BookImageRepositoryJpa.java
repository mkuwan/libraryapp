package dev.mkuwan.libraryapp.repository;

import dev.mkuwan.libraryapp.repository.entity.BookImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookImageRepositoryJpa extends JpaRepository<BookImageEntity, String> {

    Optional<BookImageEntity> findBookImageEntityByBookEntityId (String bookId);
}
