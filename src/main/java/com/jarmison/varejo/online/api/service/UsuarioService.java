package com.jarmison.varejo.online.api.service;

import com.jarmison.varejo.online.api.events.RecursoCriadoEvent;
import com.jarmison.varejo.online.api.model.Produto;
import com.jarmison.varejo.online.api.model.Usuario;
import com.jarmison.varejo.online.api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private ApplicationEventPublisher publisher;
    @Transactional
    public ResponseEntity<Usuario> adcionar(Usuario usuario, HttpServletResponse response){
        Usuario save = usuarioRepository.save(usuario);
        publisher.publishEvent(new RecursoCriadoEvent(this,response, usuario.getId()));
        return ResponseEntity.status(HttpStatus.CREATED).body(save);
    }
    public ResponseEntity<Usuario>pesquisarPor(Long id){
        Usuario usuario = usuarioRepository.findById(id).get();
        return usuario!=null ? ResponseEntity.ok().body(usuario):ResponseEntity.notFound().build();
    }
}
