package dev.mkuwan.libraryapp.application.csv;

import dev.mkuwan.libraryapp.domain.bookmodel.BookModel;
import dev.mkuwan.libraryapp.domain.repository.ICsvRepository;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
public class CsvService {

    private final ICsvRepository csvRepository;

    @Autowired
    public CsvService(ICsvRepository csvRepository) {
        this.csvRepository = csvRepository;
    }

    /**
     * マルチパートファイル(csv)からデータを読み込みます
     *  org.apache.commons.csv　を使用しているのでPOM.xmlにDependencyを追加しています
     * @param file
     * @return
     * @throws IOException
     */
    public List<BookCsvViewModel> ReadCsvFile(MultipartFile file) throws IOException {
        BufferedReader reader = new BufferedReader(
                new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));

        CSVParser parser = new CSVParser(reader, CSVFormat.DEFAULT);
        
        List<CSVRecord> records = parser.getRecords();

        List<BookCsvViewModel> bookCsvViewModels = new ArrayList<>();
        for (CSVRecord record : records) {
            BookCsvViewModel csvViewModel = new BookCsvViewModel(
                    record.get("全国書誌番号"),
                    record.get("ISBN"),
                    record.get("ISSN"),
                    record.get("タイトル・著者"),
                    record.get("版表示"),
                    record.get("シリーズ"),
                    record.get("出版事項"),
                    record.get("大きさ等")
            );
            bookCsvViewModels.add(csvViewModel);
        }

        return bookCsvViewModels;
    }

    /**
     * csvからViewModelに変換したデータをDBに保存します
     * @param csvViewModels
     */
    @Transactional
    public void SaveBookCsvData(ArrayList<BookCsvViewModel> csvViewModels){
        ArrayList<BookModel> bookModels = new ArrayList<>();
        csvViewModels.forEach(x -> {
            bookModels.add(x.fromViewModel());
        });

        csvRepository.SaveBooksFromCsv(bookModels);
    }
}
