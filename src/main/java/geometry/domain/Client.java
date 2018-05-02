package geometry.domain;

import org.springframework.data.annotation.Id;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "client")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    private String login;

    private String email;

    private String role;

    private String password;

    private Long phone;

    private Set<GeometryPattern> patterns = new HashSet<>();



}
