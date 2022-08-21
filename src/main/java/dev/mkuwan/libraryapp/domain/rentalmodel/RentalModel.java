package dev.mkuwan.libraryapp.domain.rentalmodel;

import dev.mkuwan.libraryapp.domain.rentalmodel.valueobject.RentalInfoObject;
import lombok.Getter;

import java.time.LocalDate;
import java.util.Set;

@Getter
public class RentalModel {
    private String UserId;
    private Set<RentalInfoObject> Rentals;

    public RentalModel(String userId, Set<RentalInfoObject> rentals) {
        UserId = userId;
        Rentals = rentals;
    }

    public void setRental(RentalInfoObject rental) {
        var rentedCount = Rentals.stream().count();

        var LINE_SEPARATOR = System.getProperty("line.separator");

        /**
         * 貸出最大数　5
         */
        if(rentedCount >= 5)
            throw new IllegalArgumentException("貸出数の上限となっています");

        /**
         * 貸出中のものに延滞本がある場合は貸出できない
         */
        Rentals.forEach(x -> {
            if(x.EndData().isBefore(LocalDate.now()))
                throw new IllegalArgumentException("貸出中の書籍に延滞があるため貸出できません");
        });

        /**
         * すでに貸出中の本が同じ場合は貸出できない
         */
        Rentals.forEach(x -> {
            if(x.BookId() == rental.BookId())
                throw new IllegalArgumentException("貸出中の書籍に同じ書籍があるため貸出できません");
        });

        Rentals.add(rental);
    }
}
