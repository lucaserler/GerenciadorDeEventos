package gerenciador_eventos.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import gerenciador_eventos.entity.Administrador;

public interface AdministradorRepository
        extends JpaRepository<Administrador, Long> {

    Optional<Administrador> findByEmail(String email);

    boolean existsByEmail(String email);
}
