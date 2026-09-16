package gerenciador_eventos.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TesteController {

    @GetMapping("/api/teste")
    public String testarApi() {
        return "API do Gerenciador de Eventos funcionando!";
    }
}