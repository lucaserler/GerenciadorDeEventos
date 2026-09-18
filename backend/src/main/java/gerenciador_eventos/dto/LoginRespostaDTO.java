package gerenciador_eventos.dto;

public class LoginRespostaDTO {

    private String token;
    private Long administradorId;
    private String nome;
    private String email;

    public LoginRespostaDTO() {
    }

    public LoginRespostaDTO(
            String token,
            Long administradorId,
            String nome,
            String email
    ) {
        this.token = token;
        this.administradorId = administradorId;
        this.nome = nome;
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public Long getAdministradorId() {
        return administradorId;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }
}