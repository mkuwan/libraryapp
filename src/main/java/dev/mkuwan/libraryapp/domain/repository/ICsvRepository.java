package dev.mkuwan.libraryapp.domain.repository;

import dev.mkuwan.libraryapp.domain.bookmodel.BookModel;

import java.util.ArrayList;

public interface ICsvRepository {
    void SaveBooksFromCsv(ArrayList<BookModel> bookModels);
}
