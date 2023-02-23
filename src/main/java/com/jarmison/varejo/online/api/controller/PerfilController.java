package com.jarmison.varejo.online.api.controller;

import com.jarmison.varejo.online.api.model.Perfil;
import com.jarmison.varejo.online.api.service.PerfilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api-varejo/perfil")
public class PerfilController {
    @Autowired
    private PerfilService perfilService;
    @GetMapping("/{id}")
    public ResponseEntity<Perfil> pesquisarPor(@PathVariable Long id){
        return perfilService.pesquisarPor(id);
    }
    @PostMapping("/adcionar")
    public ResponseEntity<Perfil> adcionar(@RequestBody Perfil perfil, HttpServletResponse response){
        return perfilService.adcionar(perfil,response);
    }
}
