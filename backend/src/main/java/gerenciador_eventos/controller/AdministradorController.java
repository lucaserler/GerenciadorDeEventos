package gerenciador_eventos.controller;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gerenciador_eventos.dto.AdministradorCadastroDTO;
import gerenciador_eventos.dto.AdministradorRespostaDTO;
import gerenciador_eventos.entity.Administrador;
import gerenciador_eventos.service.AdministradorService;

@RestController
@RequestMapping("/api/administradores")
public class AdministradorController {

    private final AdministradorService administradorService;

    public AdministradorController(
            AdministradorService administradorService
    ) {
        this.administradorService = administradorService;
    }

    @PostMapping
    public ResponseEntity<AdministradorRespostaDTO> cadastrar(
            @Valid @RequestBody AdministradorCadastroDTO dados
    ) {

        Administrador administrador = new Administrador();

        administrador.setNome(dados.getNome());
        administrador.setEmail(dados.getEmail());
        administrador.setSenha(dados.getSenha());

        Administrador administradorSalvo =
                administradorService.cadastrar(administrador);

        AdministradorRespostaDTO resposta =
                new AdministradorRespostaDTO(
                        administradorSalvo.getId(),
                        administradorSalvo.getNome(),
                        administradorSalvo.getEmail()
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(resposta);
    }
}
