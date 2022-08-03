package dev.mkuwan.libraryapp.repository.entity;


import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
@Data
public class RentalEntity {
    @Id
    private String rentalId;

    private String userId;
    private String BookId;
    private LocalDate StartDate;
    private LocalDate EndData;
}
