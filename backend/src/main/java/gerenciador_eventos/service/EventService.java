
package gerenciador_eventos.service;

import gerenciador_eventos.entity.Administrador;
import gerenciador_eventos.entity.Event;
import gerenciador_eventos.repository.AdministradorRepository;
import gerenciador_eventos.repository.EventRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final AdministradorRepository administradorRepository;

    public EventService(
            EventRepository eventRepository,
            AdministradorRepository administradorRepository
    ) {
        this.eventRepository = eventRepository;
        this.administradorRepository = administradorRepository;
    }

    public List<Event> listarEventos() {
        return eventRepository.findAll();
    }

    public Optional<Event> buscarEvento(Long id) {
        return eventRepository.findById(id);
    }

    public Event criarEvento(
            Event evento,
            String emailAdministrador
    ) {

        Administrador administrador =
                administradorRepository.findByEmail(emailAdministrador)
                        .orElseThrow(() -> new IllegalArgumentException(
                                "Administrador autenticado não encontrado."
                        ));

        evento.setAdministrador(administrador);

        return eventRepository.save(evento);
    }

    public Optional<Event> atualizarEvento(
            Long id,
            Event dadosAtualizados
    ) {
        return eventRepository.findById(id)
                .map(eventoExistente -> {

                    eventoExistente.setNome(
                            dadosAtualizados.getNome()
                    );

                    eventoExistente.setDescricao(
                            dadosAtualizados.getDescricao()
                    );

                    eventoExistente.setData(
                            dadosAtualizados.getData()
                    );

                    eventoExistente.setHorario(
                            dadosAtualizados.getHorario()
                    );

                    eventoExistente.setLocal(
                            dadosAtualizados.getLocal()
                    );

                    return eventRepository.save(eventoExistente);
                });
    }

    public boolean excluirEvento(Long id) {
        if (!eventRepository.existsById(id)) {
            return false;
        }

        eventRepository.deleteById(id);

        return true;
    }

    public List<Event> listarEventosPorAdministrador(
        String emailAdministrador
) {

    Administrador administrador =
            administradorRepository.findByEmail(emailAdministrador)
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Administrador autenticado não encontrado."
                    ));

    return eventRepository.findByAdministrador(administrador);
}

}