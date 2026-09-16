
package gerenciador_eventos.controller;

import gerenciador_eventos.entity.Event;
import gerenciador_eventos.repository.EventRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/eventos")
public class EventController {

    private final EventRepository eventRepository;

    public EventController(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @GetMapping
    public List<Event> listarEventos() {
        return eventRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> buscarEvento(@PathVariable Long id) {
        return eventRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Event criarEvento(@RequestBody Event evento) {
        return eventRepository.save(evento);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Event> atualizarEvento(
            @PathVariable Long id,
            @RequestBody Event dadosAtualizados) {
        return eventRepository.findById(id)
                .map(eventoExistente -> {

                    eventoExistente.setNome(dadosAtualizados.getNome());
                    eventoExistente.setDescricao(dadosAtualizados.getDescricao());
                    eventoExistente.setData(dadosAtualizados.getData());
                    eventoExistente.setHorario(dadosAtualizados.getHorario());
                    eventoExistente.setLocal(dadosAtualizados.getLocal());

                    Event eventoSalvo = eventRepository.save(eventoExistente);

                    return ResponseEntity.ok(eventoSalvo);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirEvento(@PathVariable Long id) {
        if (!eventRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        eventRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}