package dev.mkuwan.libraryapp.application.rentalservice;

import org.springframework.stereotype.Component;

@Component
public interface IRentalService {
    RentalViewModel getRental(String userId);
}
