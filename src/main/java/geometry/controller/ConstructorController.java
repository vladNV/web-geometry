package geometry.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ConstructorController {

    @GetMapping("/constructor")
    public String constructorPage() {
        return "constructor";
    }

}
