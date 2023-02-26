package com.jarmison.varejo.online.api.controller;
import java.util.Objects;

import com.jarmison.varejo.online.api.request.LoginRequest;
import com.jarmison.varejo.online.api.response.LoginResponse;
import com.jarmison.varejo.online.api.security.JwtTokenImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
@RestController
@CrossOrigin
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenImplementation jwtTokenImplementation;
    @Autowired
    private UserDetailsService jwtInMemoryUserDetailsService;
    private final String MSG_USER = "Usuario atual não foi reconhecido na base de dados em memoria";
    private final String MSG_AUTH_USER = "Usuario atual com credenciais invalidas";
    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> gerarToken(@RequestBody LoginRequest authenticationRequest) throws Exception {
        autenticar(authenticationRequest.getEmail(), authenticationRequest.getSenha());

        final UserDetails userDetails = jwtInMemoryUserDetailsService
                .loadUserByUsername(authenticationRequest.getEmail());

        final String token = jwtTokenImplementation.generateToken(userDetails);

        return ResponseEntity.ok(new LoginResponse(token));
    }
    private void autenticar(String email, String senha) throws Exception {
        Objects.requireNonNull(email);
        Objects.requireNonNull(senha);
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, senha));
        } catch (DisabledException e) {
            throw new Exception(MSG_USER, e);
        } catch (BadCredentialsException e) {
            throw new Exception(MSG_AUTH_USER, e);
        }
    }
}
