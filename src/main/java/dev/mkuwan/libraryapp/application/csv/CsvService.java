package dev.mkuwan.libraryapp.application.csv;

import dev.mkuwan.libraryapp.domain.bookmodel.BookModel;
import dev.mkuwan.libraryapp.domain.repository.ICsvRepository;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.InvalidDataAccessResourceUsageException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.awt.geom.IllegalPathStateException;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.IllegalFormatConversionException;
import java.util.List;

@Service
public class CsvService {

    private final ICsvRepository csvRepository;

    @Autowired
    public CsvService(ICsvRepository csvRepository) {
        this.csvRepository = csvRepository;
    }

    /**
     * アップロードされたファイルがCSVであること
     * ヘッダーが一致することを確認します
     * @param file
     */
    public void CheckCsvFormat(MultipartFile file) throws Exception {
        if(!file.getContentType().equals("text/csv"))
            throw new Exception(file.getContentType() + "はcsvファイルではありません");
    }

    /**
     * マルチパートファイル(csv)からデータを読み込みます
     *  org.apache.commons.csv　を使用しているのでPOM.xmlにDependencyを追加しています
     * @param file
     * @return
     * @throws IOException
     */
    public List<BookCsvViewModel> ReadCsvFile(MultipartFile file) throws IOException {
        var reader = new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8);

//        CSVParser parser = new CSVParser(reader, CSVFormat.DEFAULT.withHeader().builder().build());
        var parser = CSVParser.parse(reader, CSVFormat.DEFAULT);

        List<BookCsvViewModel> bookCsvViewModels = new ArrayList<>();
        boolean isFirst = true;
        for (CSVRecord record : parser.getRecords()) {
            if(isFirst){
                isFirst = false;
                continue;
            }
            BookCsvViewModel csvViewModel = new BookCsvViewModel(
                    record.get(CsvHeader.BOOK_NUMBER.ordinal()),
                    record.get(CsvHeader.ISBN.ordinal()),
                    record.get(CsvHeader.ISSN.ordinal()),
                    record.get(CsvHeader.TITLE_AUTHOR.ordinal()),
                    record.get(CsvHeader.VERSION.ordinal()),
                    record.get(CsvHeader.SERIES.ordinal()),
                    record.get(CsvHeader.PUBLISH_INFO.ordinal()),
                    record.get(CsvHeader.SIZE_INFO.ordinal())
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
    public void SaveBookCsvData(List<BookCsvViewModel> csvViewModels){
        ArrayList<BookModel> bookModels = new ArrayList<>();
        csvViewModels.forEach(x -> {
            bookModels.add(x.fromViewModel());
        });
        csvRepository.SaveBooksFromCsv(bookModels);

//        try {
//            csvViewModels.forEach(x -> {
//                System.out.println(x.getTitleAndAuthor());
//                csvRepository.SaveBook(x.fromViewModel());
//            });
//        }
//        catch (Exception e) {
//            System.out.println("エラーが起きた (T.T) " + e.getMessage());
//        }
    }
}
