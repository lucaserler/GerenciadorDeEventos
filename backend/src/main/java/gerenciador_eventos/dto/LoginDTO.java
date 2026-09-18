package gerenciador_eventos.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class LoginDTO {

    @NotBlank(message = "O email é obrigatório")
    @Email(message = "O email informado é inválido")
    private String email;

    @NotBlank(message = "A senha é obrigatória")
    private String senha;

    public LoginDTO() {
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