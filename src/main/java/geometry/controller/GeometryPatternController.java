package geometry.controller;

import geometry.domain.GeometryPattern;
import geometry.repository.GeometryPatternRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/geometry_pattern")
public class GeometryPatternController {

    private final GeometryPatternRepository geometryPatternRepository;

    @Autowired
    public GeometryPatternController(GeometryPatternRepository geometryPatternRepository) {
        this.geometryPatternRepository = geometryPatternRepository;
    }

    @ModelAttribute("geometry_pattern")
    public GeometryPattern getGeometryPatternObject() {
        return new GeometryPattern();
    }

    @GetMapping()
    public String getAllFigures(Model model) {
        List<GeometryPattern> figures = geometryPatternRepository.findAll();
        model.addAttribute("geometry_patterns", figures);

        return "geometry_pattern";
    }

    @GetMapping("/{id}")
    public String getFigureById(@Valid @PathVariable Long id, Model model){
        Optional<GeometryPattern> figure = geometryPatternRepository.findById(id);
        if(figure.isPresent()){
            model.addAttribute("figure", figure);
            return "geometry_pattern/" + figure.get().getId();
        }
        return "geometry_pattern";
    }

    @PostMapping()
    public String addConstructedObject(@ModelAttribute("geometry_pattern") GeometryPattern geometryPattern, Model model) {
        geometryPattern.setCreatedDate(LocalDateTime.now());
        GeometryPattern createdGeometryPattern = geometryPatternRepository.save(geometryPattern);
        model.addAttribute("geometry_pattern", createdGeometryPattern);
        return "geometry_pattern";
    }

    @DeleteMapping("/{id}")
    public String deleteConstructedObject(@PathVariable(name = "id") Long constructedObjectId, Model model) {
        Optional<GeometryPattern> geometryPattern =
                geometryPatternRepository.findById(constructedObjectId);
        geometryPattern.ifPresent(geometryPatternRepository::delete);
        return "geometry_pattern";
    }
}
