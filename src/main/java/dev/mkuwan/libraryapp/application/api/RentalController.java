package dev.mkuwan.libraryapp.application.api;

import dev.mkuwan.libraryapp.application.bookservice.BookService;
import dev.mkuwan.libraryapp.application.bookservice.RentalBody;
import dev.mkuwan.libraryapp.application.rentalservice.RentalService;
import dev.mkuwan.libraryapp.domain.rentalmodel.RentalModel;
import dev.mkuwan.libraryapp.domain.rentalmodel.valueobject.RentalInfoObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
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
                .body("制限ありません。優秀会員です");
    }

    @PostMapping(path = "/book")
    public ResponseEntity<String> rentBook(@RequestBody RentalBody request){
        try {
            // 利用者登録処理ができるまでとりあえず
            var userId = "1234567890"; // userService.getUserIdFromCode(request.userCode);

            // 現在のレンタル状態取得
            var rental = rentalService.getRentalModel(userId);

            if(rental == null)
                rental = new RentalModel(userId, new HashSet<>());

            // レンタル可能か確認
            var newRental = new RentalInfoObject(request.getBookId(), LocalDate.now(), LocalDate.now().plusDays(7));
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
                    .body(request.getBookId() + request.getUserCode());
        }
    }
}
