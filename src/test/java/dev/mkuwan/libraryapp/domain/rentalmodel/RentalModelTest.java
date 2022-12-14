package dev.mkuwan.libraryapp.domain.rentalmodel;

import dev.mkuwan.libraryapp.domain.rentalmodel.valueobject.RentalInfoObject;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicBoolean;

/**
 * AAA: Arrange, Act, Assertions
 * behavior: Given, When, Then
 */
@SpringBootTest
public class RentalModelTest {
    RentalModel rentalModel;

    @BeforeEach
    void setUp(){
        Set<RentalInfoObject> rentals = new HashSet<>();
        var today = LocalDate.now();
        var limitDay = today.plusDays(7);
        for (int i = 0; i < 3; i++) {
            rentals.add(new RentalInfoObject(UUID.randomUUID().toString(), today, limitDay));
        }
        rentalModel = new RentalModel("user001", rentals);
    }

    @AfterEach
    void tearDown(){

    }

    @Test
    void 本を2冊借りる(){
        // Arrange : 3冊追加で借りる
        Set<RentalInfoObject> rentals = new HashSet<>();
        var today = LocalDate.now();
        var limitDay = today.plusDays(7);
        for (int i = 0; i < 2; i++) {
            rentals.add(new RentalInfoObject(UUID.randomUUID().toString(), today, limitDay));
//            rentalModel.setRental(new RentalInfoObject(UUID.randomUUID().toString(), today, limitDay));
        }

        // Act
        rentals.forEach(x -> {
            rentalModel.setRental(x);
        });

        // Assertions
//        Assertions.assertThat(rentals.stream().count()).isEqualTo(2);
        Assertions.assertThat(rentalModel.getRentals().stream().count()).isEqualTo(5);
    }

    @Test
    void 最大貸出数をオーバーして借りようとしたら怒られる(){
        // Arrange : 3冊追加で借りる
        Set<RentalInfoObject> rentals = new HashSet<>();
        var today = LocalDate.now();
        var limitDay = today.plusDays(7);
        for (int i = 0; i < 3; i++) {
            rentals.add(new RentalInfoObject(UUID.randomUUID().toString(), today, limitDay));
        }

        // Act, Assertions
        Assertions.assertThatIllegalArgumentException()
                .isThrownBy(() -> {
                    rentals.forEach(x -> {
                        rentalModel.setRental(x);
                    });
                })
                .withMessage("貸出数の上限となっています");
    }

    @Test
    void 同じ本を借りたら怒られる(){
        // Arrange
        var today = LocalDate.now();
        var limitDay = today.plusDays(7);
        RentalInfoObject rental = new RentalInfoObject(UUID.randomUUID().toString(), today, limitDay);

        // Act
        // 1冊目
        rentalModel.setRental(rental);

        // Assertion
        Assertions.assertThatIllegalArgumentException()
                .isThrownBy(() -> {
                    rentalModel.setRental(rental);
                })
                .withMessage("貸出中の書籍に同じ書籍があるため貸出できません");
    }

    @Test
    void 延滞した本があると借りられない(){
        // Arrange: setupは使用しないです
        Set<RentalInfoObject> rentals = new HashSet<>();
        var today = LocalDate.now();
        // 1日オーバーしてる
        var limitDay = today.minusDays(2);
        for (int i = 0; i < 1; i++) {
            rentals.add(new RentalInfoObject(UUID.randomUUID().toString(), today, limitDay));
        }
        RentalModel overRental = new RentalModel("user001", rentals);

        // Act
        var testToday = LocalDate.now();
        var testLimitDay = today.plusDays(7);
        RentalInfoObject rental = new RentalInfoObject(UUID.randomUUID().toString(), testToday, testLimitDay);

        // Assertion
        Assertions.assertThat(limitDay).isBefore(today);

        AtomicBoolean isCheck = new AtomicBoolean(false);
        if(rental.EndData().isAfter(rental.StartDate()))
            isCheck.set(true);
        Assertions.assertThat(isCheck.get()).isTrue();

        Assertions.assertThatIllegalArgumentException()
            .isThrownBy(() -> {
                overRental.setRental(rental);
            })
            .withMessage("貸出中の書籍に延滞があるため貸出できません");
    }
}
