package dev.mkuwan.libraryapp.application.api;

import dev.mkuwan.libraryapp.application.bookservice.RentalBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1/rent")
public class RentalController {

    @PostMapping(path = "/user")
    @ResponseBody
    public ResponseEntity<String> checkUser(@RequestBody String userCode){


        return ResponseEntity.ok()
                .body("制限ありません。優秀会員です");
    }

    @PostMapping(path = "/book")
    public ResponseEntity<String> rentBook(@RequestBody RentalBody request){

        return ResponseEntity.ok()
                .body(request.getBookId() + request.getUserCode());
    }
}
