
package gerenciador_eventos.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ValidationExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> tratarErrosDeValidacao(
            MethodArgumentNotValidException erro
    ) {
        Map<String, String> erros = new HashMap<>();

        erro.getBindingResult()
                .getFieldErrors()
                .forEach(fieldError -> {
                    String campo = fieldError.getField();
                    String mensagem = fieldError.getDefaultMessage();

                    erros.put(campo, mensagem);
                });

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(erros);
    }
}