package geometry.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/constructor")
public class ConstructorController {

    @GetMapping()
    public String constructorPage() {
        return "constructor";
    }
}
