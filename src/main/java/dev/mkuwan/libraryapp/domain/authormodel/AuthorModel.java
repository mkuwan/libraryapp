package dev.mkuwan.libraryapp.domain.authormodel;

public record AuthorModel(String authorId, String authorName) {
    public AuthorModel(String authorId, String authorName){
        if(authorName.isEmpty())
            throw new IllegalArgumentException("著者名は必須です");

        this.authorId = authorId;
        this.authorName = authorName;
    }
}
