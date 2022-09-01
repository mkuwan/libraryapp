package dev.mkuwan.libraryapp.application.api;

import dev.mkuwan.libraryapp.application.bookservice.BookService;
import dev.mkuwan.libraryapp.application.bookservice.RentalBody;
import dev.mkuwan.libraryapp.application.rentalservice.RentalService;
import dev.mkuwan.libraryapp.domain.rentalmodel.RentalModel;
import dev.mkuwan.libraryapp.domain.rentalmodel.valueobject.RentalInfoObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

@RestController
@RequestMapping(path = "/api/v1/rent")
public class RentalController {

    private final RentalService rentalService;
    private final BookService bookService;

    public RentalController(RentalService rentalService, BookService bookService) {
        this.rentalService = rentalService;
        this.bookService = bookService;
    }

    @PostMapping(path = "/user")
    @ResponseBody
    public ResponseEntity<String> checkUser(@RequestBody String userCode){


        return ResponseEntity.ok()
                .body("ようこそ会員さん");
    }

    @PostMapping(path = "/book")
    public ResponseEntity<String> rentBook(@RequestBody RentalBody request){
        var start = LocalDate.now();
        var end = LocalDate.now().plusDays(7);
        var formatter = DateTimeFormatter.ofPattern("yy年M月d日(E)", Locale.JAPANESE);

        try {
            // 利用者登録処理ができるまでとりあえず
            var userId = "1234567890"; // userService.getUserIdFromCode(request.userCode);

            // 現在のレンタル状態取得
            var rental = rentalService.getRentalModel(userId);

            if(rental == null)
                rental = new RentalModel(userId, new HashSet<>());

            // レンタル可能か確認
            var newRental = new RentalInfoObject(request.getBookId(), start, end);
            rental.setRental(newRental);

            // 保存　RentalModelを1冊だけの状態にして保存処理をします
            //      ややこしいので、本当は綺麗にした方がいい
            var rentalSet = new HashSet<RentalInfoObject>();
            rentalSet.add(newRental);
            rentalService.rental(new RentalModel(userId, rentalSet));

        } catch (Exception e){
            System.out.println("残念エラーです" + e.getMessage());
        }
        finally {
            return ResponseEntity.ok()
                    .body("貸出期限は" + end.format(formatter) + "です");
        }
    }
}
