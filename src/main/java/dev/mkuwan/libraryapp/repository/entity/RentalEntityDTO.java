package dev.mkuwan.libraryapp.repository.entity;

import dev.mkuwan.libraryapp.domain.rentalmodel.RentalModel;
import dev.mkuwan.libraryapp.domain.rentalmodel.valueobject.RentalInfoObject;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public class RentalEntityDTO {

    public static RentalModel fromEntity(Set<RentalEntity> entities) {
        Set<RentalInfoObject> rentalInfoObjects = new HashSet<>();

        var rentalId = entities.stream().findFirst().get().getRentalId();
        var userId = entities.stream().findFirst().get().getUserId();

        RentalModel rentalModel;
        entities.forEach(x -> {
            rentalInfoObjects.add(new RentalInfoObject(
                    x.getBookId(),
                    x.getStartDate(),
                    x.getEndData()
            ));
        });
        return new RentalModel(userId, rentalInfoObjects);
    }


    public static RentalEntity toEntity(RentalModel model) {
        var rentalInfo = model.getRentals().stream().findFirst().get();
        var entity = new RentalEntity();
        entity.setRentalId(UUID.randomUUID().toString());
        entity.setBookId(rentalInfo.BookId());
        entity.setStartDate(rentalInfo.StartDate());
        entity.setEndData(rentalInfo.EndData());
        entity.setUserId(model.getUserId());

        return entity;
    }
}
