package gerenciador_eventos.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import gerenciador_eventos.dto.LoginDTO;
import gerenciador_eventos.dto.LoginRespostaDTO;
import gerenciador_eventos.entity.Administrador;
import gerenciador_eventos.repository.AdministradorRepository;

@Service
public class LoginService {

    private final AdministradorRepository administradorRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public LoginService(
            AdministradorRepository administradorRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.administradorRepository = administradorRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginRespostaDTO autenticar(LoginDTO dados) {

        String email = dados.getEmail()
                .trim()
                .toLowerCase();

        Administrador administrador =
                administradorRepository.findByEmail(email)
                        .orElseThrow(() -> new IllegalArgumentException(
                                "Email ou senha inválidos."
                        ));

        boolean senhaValida = passwordEncoder.matches(
                dados.getSenha(),
                administrador.getSenha()
        );

        if (!senhaValida) {
            throw new IllegalArgumentException(
                    "Email ou senha inválidos."
            );
        }

        String token = jwtService.gerarToken(
                administrador.getId(),
                administrador.getEmail()
        );

        return new LoginRespostaDTO(
                token,
                administrador.getId(),
                administrador.getNome(),
                administrador.getEmail()
        );
    }
}
