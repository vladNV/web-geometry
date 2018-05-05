package geometry.service.impl;

import geometry.domain.Client;
import geometry.repository.RegistrationRepository;
import geometry.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RegistrationServiceImpl implements RegistrationService{
    private final RegistrationRepository registrationRepository;

    @Autowired
    public RegistrationServiceImpl(RegistrationRepository registrationRepository){
        this.registrationRepository = registrationRepository;
    }

    public Client register(Client client){
        return registrationRepository.save(client);
    }
}
