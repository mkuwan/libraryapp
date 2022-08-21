package dev.mkuwan.libraryapp.repository.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Rental")
public class RentalEntity {
    @Id
    private String rentalId;

    private String userId;
    private String BookId;
    private LocalDate StartDate;
    private LocalDate EndData;
}

