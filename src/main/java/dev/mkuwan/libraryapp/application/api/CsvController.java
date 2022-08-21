package dev.mkuwan.libraryapp.application.api;

import dev.mkuwan.libraryapp.application.csv.CsvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping(path = "api/v1//csv")
public class CsvController {

    private final CsvService csvService;

    @Autowired
    public CsvController(CsvService csvService) {
        this.csvService = csvService;
    }

    @PostMapping(path = "/import")
    public ResponseEntity<String> uploadFile(@RequestParam("file")MultipartFile file) throws Exception {
        csvService.CheckCsvFormat(file);
        var data = csvService.ReadCsvFile(file);
        csvService.SaveBookCsvData(data);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}