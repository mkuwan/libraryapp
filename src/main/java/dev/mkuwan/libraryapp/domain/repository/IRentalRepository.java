package dev.mkuwan.libraryapp.domain.repository;

import dev.mkuwan.libraryapp.domain.rentalmodel.RentalModel;
import org.springframework.stereotype.Component;

public interface IRentalRepository {
    RentalModel getRentals(String UserId);

    void save(RentalModel rentalModel);
}
