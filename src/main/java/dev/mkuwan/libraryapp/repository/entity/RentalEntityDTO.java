package dev.mkuwan.libraryapp.repository.entity;

import dev.mkuwan.libraryapp.domain.rentalmodel.RentalModel;
import dev.mkuwan.libraryapp.domain.rentalmodel.valueobject.RentalInfoObject;

import java.util.HashSet;
import java.util.Set;

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
}
