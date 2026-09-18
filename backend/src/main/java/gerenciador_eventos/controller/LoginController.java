package gerenciador_eventos.controller;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gerenciador_eventos.dto.LoginDTO;
import gerenciador_eventos.dto.LoginRespostaDTO;
import gerenciador_eventos.service.LoginService;

@RestController
@RequestMapping("/api/login")
public class LoginController {

    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping
    public ResponseEntity<LoginRespostaDTO> login(
            @Valid @RequestBody LoginDTO dados
    ) {

        LoginRespostaDTO resposta =
                loginService.autenticar(dados);

        return ResponseEntity.ok(resposta);
    }
}