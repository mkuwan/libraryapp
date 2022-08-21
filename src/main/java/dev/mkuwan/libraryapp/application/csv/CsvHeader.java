package dev.mkuwan.libraryapp.application.csv;

public enum CsvHeader {
    BOOK_NUMBER("全国書誌番号"),
    ISBN("ISBN"),
    ISSN("ISSN"),
    TITLE_AUTHOR("タイトル・著者"),
    VERSION("版表示"),
    SERIES("シリーズ"),
    PUBLISH_INFO("出版事項"),
    SIZE_INFO("大きさ等");

    private String valueName;

    private CsvHeader(String value){
        this.valueName = value;
    }

    public String getValueName() {
        return valueName;
    }
}
