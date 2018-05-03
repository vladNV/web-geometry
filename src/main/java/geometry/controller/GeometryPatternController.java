package geometry.controller;

import geometry.domain.GeometryPattern;
import geometry.repository.GeometryPatternRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/figures")
public class GeometryPatternController {

    private final GeometryPatternRepository geometryPatternRepository;

    @Autowired
    public GeometryPatternController(GeometryPatternRepository geometryPatternRepository) {
        this.geometryPatternRepository = geometryPatternRepository;
    }

    @GetMapping()
    public String getAllFigures(Model model) {
        List<GeometryPattern> figures = geometryPatternRepository.findAll();
        model.addAttribute("figures", figures);

        return "figures";
    }

    @GetMapping("/{id}")
    public String getFigureById(@Valid @PathVariable Long id, Model model){
        Optional<GeometryPattern> figure = geometryPatternRepository.findById(id);
        if(figure.isPresent()){
            model.addAttribute("figure", figure);
            return "figures/" + figure.get().getId();
        }
        return "figures";
    }

    @PostMapping()
    public String addConstructedObject(@Valid @RequestBody GeometryPattern geometryPattern, Model model) {
        GeometryPattern createdFigure = geometryPatternRepository.save(geometryPattern);
        model.addAttribute("figure", createdFigure);

        return "figures";
    }

    @DeleteMapping("/{id}")
    public String deleteConstructedObject(@PathVariable(name = "id") Long constructedObjectId, Model model) {
        Optional<GeometryPattern> geometryPattern =
                geometryPatternRepository.findById(constructedObjectId);

        geometryPattern.ifPresent(geometryPatternRepository::delete);

        return "figures";
    }
}
