package dev.mkuwan.libraryapp.repository;

import dev.mkuwan.libraryapp.domain.rentalmodel.RentalModel;
import dev.mkuwan.libraryapp.domain.repository.IRentalRepository;
import dev.mkuwan.libraryapp.repository.entity.RentalEntityDTO;
import org.springframework.stereotype.Component;

import java.util.Optional;


@Component
public class RentalRepositoryImpl implements IRentalRepository {

    private final RentalRepositoryJpa rentalRepository;
    private final BookRepositoryJpa bookRepository;

    public RentalRepositoryImpl(RentalRepositoryJpa rentalRepository, BookRepositoryJpa bookRepositoryJpa){
        this.rentalRepository = rentalRepository;
        this.bookRepository = bookRepositoryJpa;
    }

    @Override
    public RentalModel getRentals(String userId) {
        var model = rentalRepository.findRentalEntitiesByUserId(userId);

        System.out.println("getRentals処理 nullですか?: " + model == null);

        if(model.size() == 0)
            return null;

        return RentalEntityDTO.fromEntity(model);
    }

    @Override
    public void save(RentalModel rentalModel) {
        System.out.println("RentalRepositoryImplの保存処理");
        rentalRepository.save(RentalEntityDTO.toEntity(rentalModel));

        var book = bookRepository.findById(rentalModel.getRentals().stream().findFirst().get().BookId()).get();
        book.setRentedCount(book.getRentedCount() + 1);
        bookRepository.save(book);

    }

}
