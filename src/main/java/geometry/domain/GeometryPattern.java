package geometry.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@EqualsAndHashCode(of = "id")
@ToString(of = {"id","title","createdDate"})
@Table(name = "geometry_pattern")
public class GeometryPattern {

    private final static int MAX_UTF8_MB4_VARCHAR_LENGTH = 15382;

    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Getter @Setter
    @Column(length = MAX_UTF8_MB4_VARCHAR_LENGTH)
    private String jsonValue;

    @Getter @Setter
    @Column
    private LocalDateTime createdDate;

    @Getter @Setter
    @Column
    private String title;

    @Getter @Setter
    @Column
    private String description;

    @Getter @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;
}
