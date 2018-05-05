package geometry.repository;

import geometry.domain.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

    @Query(value = "select * from users u where login = ?1 and password = ?2", nativeQuery = true)
    Client findByLoginAndPass(String login, String password);

    @Query(value = "select * from client u where login = ?1 limit 1", nativeQuery = true)
    Client findByLogin(String login);
}
