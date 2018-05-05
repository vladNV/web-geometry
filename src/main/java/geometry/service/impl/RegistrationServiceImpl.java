package geometry.service.impl;

import geometry.domain.Client;
import geometry.repository.RegistrationRepository;
import geometry.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class RegistrationServiceImpl implements RegistrationService{
    private final RegistrationRepository registrationRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public RegistrationServiceImpl(RegistrationRepository registrationRepository){
        this.registrationRepository = registrationRepository;
    }

    public Client register(Client client){
        client.setPassword(passwordEncoder.encode(client.getPassword()));
        return registrationRepository.save(client);
    }
}