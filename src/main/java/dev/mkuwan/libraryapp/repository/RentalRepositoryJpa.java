package dev.mkuwan.libraryapp.repository;

import dev.mkuwan.libraryapp.domain.rentalmodel.RentalModel;
import dev.mkuwan.libraryapp.repository.entity.RentalEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface RentalRepositoryJpa extends JpaRepository<RentalEntity, String> {
    Set<RentalEntity> findRentalEntitiesByUserId(String userId);

}
