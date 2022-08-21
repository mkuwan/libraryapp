package dev.mkuwan.libraryapp.application.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

public class ImageUtil {

    /**
     * データの圧縮してから返す
     * @param data
     * @return
     */
    public static byte[] CompressImage(byte[] data){
        Deflater deflater = new Deflater();
        deflater.setLevel(Deflater.BEST_COMPRESSION);
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] temp = new byte[4 * 1024];

        try {
            while (!deflater.finished()){
                int size = deflater.deflate(temp);
                outputStream.write(temp, 0, size);
            }
            outputStream.close();

        } catch (IOException e) {
            System.out.println(e.getMessage());

        } catch (Exception e){
            System.out.println(e.getMessage());
        }

        return outputStream.toByteArray();
    }

    /**
     * 解凍して戻す
     * @param data
     * @return
     */
    public static byte[] DeCompressImage(byte[] data){
        Inflater inflater = new Inflater();
        inflater.setInput(data);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] temp = new byte[4 * 1024];

        try {
            while (!inflater.finished()){
                int count = inflater.inflate(temp);
                outputStream.write(temp, 0, count);
            }

            outputStream.close();

        } catch (DataFormatException e) {
            System.out.println(e.getMessage());

        } catch (IOException e) {
            System.out.println(e.getMessage());

        }

        return outputStream.toByteArray();
    }
}
