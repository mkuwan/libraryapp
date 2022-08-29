package dev.mkuwan.libraryapp.repository.util;

public class HyphenTool {

    public static String RemoveHyphen(String value){
        return value.replaceAll("[\\s\\-]", "");
    }
}
