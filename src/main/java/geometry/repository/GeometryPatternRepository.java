package geometry.repository;

import geometry.domain.GeometryPattern;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeometryPatternRepository  extends JpaRepository<GeometryPattern, Long> {

}
