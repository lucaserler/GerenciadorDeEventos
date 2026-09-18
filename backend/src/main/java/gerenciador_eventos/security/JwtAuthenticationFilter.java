package gerenciador_eventos.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import gerenciador_eventos.service.JwtService;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    public JwtAuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String cabecalho =
                request.getHeader("Authorization");

        if (cabecalho == null
                || !cabecalho.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }

        String token = cabecalho.substring(7);

        if (jwtService.tokenValido(token)
                && SecurityContextHolder
                        .getContext()
                        .getAuthentication() == null) {

            String email = jwtService.extrairEmail(token);

            UsernamePasswordAuthenticationToken autenticacao =
                    new UsernamePasswordAuthenticationToken(
                            email,
                            null,
                            java.util.Collections.emptyList()
                    );

            autenticacao.setDetails(
                    new WebAuthenticationDetailsSource()
                            .buildDetails(request)
            );

            SecurityContextHolder
                    .getContext()
                    .setAuthentication(autenticacao);
        }

        filterChain.doFilter(request, response);
    }
}