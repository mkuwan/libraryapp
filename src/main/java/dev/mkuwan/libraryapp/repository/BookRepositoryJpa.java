package dev.mkuwan.libraryapp.repository;

import dev.mkuwan.libraryapp.repository.entity.BookEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepositoryJpa extends JpaRepository<BookEntity, String> {
}
