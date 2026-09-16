package gerenciador_eventos.controller;

import gerenciador_eventos.entity.Event;
import gerenciador_eventos.service.EventService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "http://localhost:5173")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public List<Event> listarEventos() {
        return eventService.listarEventos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> buscarEvento(
            @PathVariable Long id
    ) {
        return eventService.buscarEvento(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Event criarEvento(
            @RequestBody Event evento
    ) {
        return eventService.criarEvento(evento);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Event> atualizarEvento(
            @PathVariable Long id,
            @RequestBody Event dadosAtualizados
    ) {
        return eventService.atualizarEvento(id, dadosAtualizados)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirEvento(
            @PathVariable Long id
    ) {
        boolean excluido = eventService.excluirEvento(id);

        if (!excluido) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}