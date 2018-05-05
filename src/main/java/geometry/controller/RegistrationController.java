package geometry.controller;

import geometry.domain.Client;
import geometry.domain.GeometryPattern;
import geometry.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Controller
@RequestMapping("/registration")
public class RegistrationController {

    private final RegistrationService registrationService;

    @Autowired
    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @ModelAttribute("client")
    public Client getClientObject() {
        return new Client();
    }

    @GetMapping
    public String toRegistrationPage() {
        return "registration";
    }


    @PostMapping
    public String register(@ModelAttribute("client") Client client) {
        client.setRole("user");
        Client registered = registrationService.register(client);
        return registered == null ? "registration" : "login";
    }
}
