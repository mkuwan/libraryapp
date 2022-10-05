package dev.mkuwan.libraryapp.application.rentalservice;

import dev.mkuwan.libraryapp.domain.bookmodel.BookModel;
import dev.mkuwan.libraryapp.domain.rentalmodel.RentalModel;
import dev.mkuwan.libraryapp.domain.repository.IBookRepository;
import dev.mkuwan.libraryapp.domain.repository.IRentalRepository;
import org.springframework.stereotype.Service;

@Service
public class RentalService {

    private final IRentalRepository rentalRepository;

    public RentalService(IRentalRepository rentalRepository) {
        this.rentalRepository = rentalRepository;
    }

    public RentalModel getRentalModel(String userId){
        return this.rentalRepository.getRentals(userId);
    }

    public void setRentalModel(RentalModel rentalModel){
        this.rentalRepository.save(rentalModel);
    }


    public void rental(RentalModel rentalModel) {
        this.rentalRepository.save(rentalModel);
    }
}
