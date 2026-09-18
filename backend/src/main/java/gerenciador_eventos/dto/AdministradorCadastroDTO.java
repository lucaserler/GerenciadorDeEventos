package gerenciador_eventos.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class AdministradorCadastroDTO {

    @NotBlank(message = "O nome do administrador é obrigatório")
    private String nome;

    @NotBlank(message = "O email do administrador é obrigatório")
    @Email(message = "O email informado é inválido")
    private String email;

    @NotBlank(message = "A senha do administrador é obrigatória")
    private String senha;

    public AdministradorCadastroDTO() {
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
