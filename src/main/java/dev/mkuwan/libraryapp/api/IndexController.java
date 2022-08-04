package dev.mkuwan.libraryapp.api;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {
    @GetMapping("/**/{path:[^.]*}")
    public String index(@PathVariable String path){
        return "forward:/index.html";
    }
}
