package dev.mkuwan.libraryapp.application.rentalservice;

import lombok.Data;

import java.util.Set;

@Data
public class RentalViewModel {
    private String UserId;
    private String UserName;
    private Set<RentedBookViewModel> rented;
}
