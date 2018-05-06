package geometry.controller;

import geometry.domain.Client;
import geometry.domain.GeometryPattern;
import geometry.repository.ClientRepository;
import geometry.repository.GeometryPatternRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Controller
@RequestMapping("/geometry_pattern")
public class GeometryPatternController {

    private final GeometryPatternRepository geometryPatternRepository;
    private final ClientRepository clientRepository;

    @Autowired
    public GeometryPatternController(GeometryPatternRepository geometryPatternRepository,
                                     ClientRepository clientRepository) {
        this.geometryPatternRepository = geometryPatternRepository;
        this.clientRepository = clientRepository;
    }

    @ModelAttribute("geometry_pattern")
    public GeometryPattern getGeometryPatternObject() {
        return new GeometryPattern();
    }


    @GetMapping()
    public String getClientFigures(Model model) {
        Client user = clientRepository.findByLogin(setupUserInformation(model));
        Set<GeometryPattern> figures = user.getPatterns();
        model.addAttribute("figures", figures);
        return "geometry_pattern";
    }

    @GetMapping("/{id}")
    public String getFigureById(@Valid @PathVariable Long id, Model model){
        Optional<GeometryPattern> figure = geometryPatternRepository.findById(id);
        Set<GeometryPattern> figures = figure
                .orElseThrow(NullPointerException::new)
                .getClient()
                .getPatterns();
        figure.ifPresent(geometryPattern ->
                model.addAttribute("figure", geometryPattern));
        model.addAttribute("figures", figures);
        return "geometry_pattern";
    }

    @PostMapping()
    public String addConstructedObject(@ModelAttribute("geometry_pattern") GeometryPattern geometryPattern,
                                       Model model) {
        Client client = clientRepository.findByLogin(setupUserInformation(model));
        geometryPattern.setCreatedDate(LocalDateTime.now());
        geometryPattern.setClient(client);
        geometryPatternRepository.save(geometryPattern);
        model.addAttribute("saved", new Object());
        model.addAttribute("figures", client.getPatterns());
        return "geometry_pattern";
    }

    @DeleteMapping("/{id}")
    public String deleteConstructedObject(@PathVariable(name = "id") Long constructedObjectId, Model model) {
        Optional<GeometryPattern> geometryPattern =
                geometryPatternRepository.findById(constructedObjectId);
        geometryPattern.ifPresent(geometryPatternRepository::delete);
        return "geometry_pattern";
    }

    private String setupUserInformation(Model model) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        model.addAttribute("login", user.getUsername());
        return user.getUsername();
    }
}
