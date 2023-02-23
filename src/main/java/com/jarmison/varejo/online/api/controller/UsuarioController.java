package com.jarmison.varejo.online.api.controller;

import com.jarmison.varejo.online.api.model.Usuario;
import com.jarmison.varejo.online.api.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api-varejo/usuario")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;
    @GetMapping("/{id}")
    public ResponseEntity<Usuario>pesquisarPor(@PathVariable Long id){
        return usuarioService.pesquisarPor(id);
    }
    @PostMapping("/adcionar")
    public ResponseEntity<Usuario> adcionar(@RequestBody Usuario usuario, HttpServletResponse response){
        return usuarioService.adcionar(usuario,response);
    }
}
