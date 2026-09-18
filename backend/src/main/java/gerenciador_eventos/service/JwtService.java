package gerenciador_eventos.service;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private final SecretKey chaveSecreta;
    private final long tempoExpiracao;

    public JwtService(
            @Value("${jwt.secret}") String segredo,
            @Value("${jwt.expiration}") long tempoExpiracao
    ) {

        this.chaveSecreta = Keys.hmacShaKeyFor(
                segredo.getBytes(StandardCharsets.UTF_8)
        );

        this.tempoExpiracao = tempoExpiracao;
    }

    public String gerarToken(
            Long administradorId,
            String email
    ) {

        Date agora = new Date();

        Date expiracao = new Date(
                agora.getTime() + tempoExpiracao
        );

        return Jwts.builder()
                .subject(email)
                .claim("administradorId", administradorId)
                .issuedAt(agora)
                .expiration(expiracao)
                .signWith(chaveSecreta)
                .compact();
    }

    public Claims extrairClaims(String token) {

        return Jwts.parser()
                .verifyWith(chaveSecreta)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String extrairEmail(String token) {

        return extrairClaims(token)
                .getSubject();
    }

    public boolean tokenValido(String token) {

        try {
            extrairClaims(token);

            return true;

        } catch (Exception erro) {
            return false;
        }
    }
}