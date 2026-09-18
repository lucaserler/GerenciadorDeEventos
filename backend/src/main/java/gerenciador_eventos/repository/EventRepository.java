package gerenciador_eventos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import gerenciador_eventos.entity.Event;
import gerenciador_eventos.entity.Administrador;

public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByAdministrador(Administrador administrador);

}