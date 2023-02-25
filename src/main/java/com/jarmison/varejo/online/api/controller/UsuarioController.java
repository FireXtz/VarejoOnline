package com.jarmison.varejo.online.api.controller;

import com.jarmison.varejo.online.api.model.Usuario;
import com.jarmison.varejo.online.api.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api-varejo/usuario")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;
    @GetMapping("/{id}")
    public ResponseEntity<Usuario>pesquisarPor(@PathVariable Long id){
        return usuarioService.pesquisarPor(id);
    }
    @GetMapping
    public ResponseEntity <?>listarUsuarios(){
        return usuarioService.listarUsuarios();
    }
    @PostMapping("/adcionar")
    public ResponseEntity<Usuario> adcionar(@RequestBody Usuario usuario, HttpServletResponse response){
        return usuarioService.adcionar(usuario,response);
    }
    @PutMapping("/{id}")
    public Usuario editar(@PathVariable Long id,@RequestBody Usuario usuario){
        return usuarioService.editarUsuario(id, usuario);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> remover(@PathVariable Long id){
        return usuarioService.remover(id);
    }
}
