package geometry.controller;

import geometry.domain.GeometryPattern;
import geometry.repository.GeometryPatternRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@Controller
@RequestMapping("/constructor")
public class ConstructorController {

    @GetMapping()
    public String constructorPage() {
        return "constructor";
    }
}
