package dev.mkuwan.libraryapp.application.rentalservice;

import dev.mkuwan.libraryapp.application.bookservice.BookViewModel;

import java.time.LocalDate;

public class RentedBookViewModel {
    private BookViewModel book;
    private LocalDate startDate;
    private LocalDate endData;
}
