package dev.mkuwan.libraryapp.domain.rentalmodel.valueobject;

import java.time.LocalDate;

public record RentalInfoObject(String BookId, LocalDate StartDate, LocalDate EndData) {

    public RentalInfoObject(String BookId, LocalDate StartDate, LocalDate EndData){
        this.BookId = BookId;

        if(StartDate == null)
            throw new IllegalArgumentException("貸出開始日は必須です");

        if(!StartDate.isEqual(LocalDate.now()))
            throw new IllegalArgumentException("本日以外を貸出開始日にすることはできません");

        this.StartDate = StartDate;

        /**
         * 貸出期間は7日に固定
         */
        // TODO: 定数値をどこに記述するか要検討
        this.EndData = StartDate.plusDays(7);
    }


}
