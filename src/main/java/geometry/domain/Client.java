package geometry.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@ToString @EqualsAndHashCode(of = "id")
@Entity
@Table(name = "client")
public class Client {

    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Getter @Setter
    @Column
    private String login;

    @Getter @Setter
    @Column
    private String email;

    @Getter @Setter
    @Column
    private String role;

    @Getter @Setter
    @Column
    private String password;

    @Getter @Setter
    @Column
    private Long phone;

    @Getter @Setter
    @OneToMany(mappedBy = "client", fetch = FetchType.LAZY)
    private Set<GeometryPattern> patterns = new HashSet<>();
}
