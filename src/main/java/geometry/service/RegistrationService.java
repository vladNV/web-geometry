package geometry.service;

import geometry.domain.Client;
import org.springframework.stereotype.Component;


@Component
public interface RegistrationService {
    Client register(Client client);
}
