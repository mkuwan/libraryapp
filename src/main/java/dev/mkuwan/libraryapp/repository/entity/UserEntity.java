package dev.mkuwan.libraryapp.repository.entity;

import lombok.Data;

import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.Set;

@Data
public class UserEntity {
    @Id
    private String userId;

    private String userName;

    @ManyToMany(cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
    private Set<RentalEntity> rentalEntities;
}
