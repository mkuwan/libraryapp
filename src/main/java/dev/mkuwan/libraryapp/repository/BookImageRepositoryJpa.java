package dev.mkuwan.libraryapp.repository;

import dev.mkuwan.libraryapp.repository.entity.BookImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookImageRepositoryJpa extends JpaRepository<BookImageEntity, String> {


}
