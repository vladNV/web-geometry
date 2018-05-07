package geometry.controller;

import geometry.domain.Client;
import geometry.domain.GeometryPattern;
import geometry.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

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
    public ModelAndView toRegistrationPage() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(!(auth instanceof AnonymousAuthenticationToken)){
            return new ModelAndView("redirect:/greeting");
        }
        return new ModelAndView("registration");
    }


    @PostMapping
    public String register(@ModelAttribute("client") Client client) {
        client.setRole("ROLE_USER");
        Client registered = registrationService.register(client);
        return registered == null ? "registration" : "login";
    }
}
