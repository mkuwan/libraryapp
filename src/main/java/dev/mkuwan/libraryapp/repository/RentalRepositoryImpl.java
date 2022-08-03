package dev.mkuwan.libraryapp.repository;

import dev.mkuwan.libraryapp.domain.rentalmodel.RentalModel;
import dev.mkuwan.libraryapp.domain.repository.IRentalRepository;
import dev.mkuwan.libraryapp.repository.entity.RentalEntityDTO;
import org.springframework.stereotype.Component;


@Component
public class RentalRepositoryImpl implements IRentalRepository {

    private final RentalRepositoryJpa rentalRepository;

    public RentalRepositoryImpl(RentalRepositoryJpa rentalRepository){
        this.rentalRepository = rentalRepository;
    }

    @Override
    public RentalModel findByUserId(String userId) {
        var model = rentalRepository.findRentalEntitiesByUserId(userId);

        return RentalEntityDTO.fromEntity(model);
    }
}
