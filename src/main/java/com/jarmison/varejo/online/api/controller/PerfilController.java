package com.jarmison.varejo.online.api.controller;

import com.jarmison.varejo.online.api.model.Perfil;
import com.jarmison.varejo.online.api.service.PerfilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api-varejo/perfil")
public class PerfilController {
    @Autowired
    private PerfilService perfilService;
    @GetMapping("/{id}")
    public ResponseEntity<Perfil> pesquisarPor(@PathVariable Long id){
        return perfilService.pesquisarPor(id);
    }
    @GetMapping
    public ResponseEntity <?>listarTodos(){
        return perfilService.listarPerfils();
    }
    @PutMapping("/{id}")
    public Perfil editarPerfil(@PathVariable Long id,@RequestBody Perfil perfil){
        return perfilService.editarPerfil(id, perfil);
    }
    @PostMapping("/adcionar")
    public ResponseEntity<Perfil> adcionar(@RequestBody Perfil perfil, HttpServletResponse response){
        return perfilService.adcionar(perfil,response);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> remover(@PathVariable Long id){
        return perfilService.remover(id);
    }
}
