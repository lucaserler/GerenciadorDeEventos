package gerenciador_eventos.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import gerenciador_eventos.entity.Administrador;
import gerenciador_eventos.repository.AdministradorRepository;

@Service
public class AdministradorService {

    private final AdministradorRepository administradorRepository;
    private final PasswordEncoder passwordEncoder;

    public AdministradorService(
            AdministradorRepository administradorRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.administradorRepository = administradorRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Administrador cadastrar(Administrador administrador) {

        String email = administrador.getEmail()
                .trim()
                .toLowerCase();

        if (administradorRepository.existsByEmail(email)) {
            throw new IllegalArgumentException(
                    "O email informado já está cadastrado."
            );
        }

        administrador.setEmail(email);

        String senhaCriptografada = passwordEncoder.encode(
                administrador.getSenha()
        );

        administrador.setSenha(senhaCriptografada);

        return administradorRepository.save(administrador);
    }
}