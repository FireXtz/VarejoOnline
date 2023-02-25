package com.jarmison.varejo.online.api.service;

import com.jarmison.varejo.online.api.events.RecursoCriadoEvent;
import com.jarmison.varejo.online.api.model.Usuario;
import com.jarmison.varejo.online.api.repository.UsuarioRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity <?>listarUsuarios(){
        List<Usuario> usuarios = usuarioRepository.findAll();
        return ResponseEntity.ok().body(usuarios);
    }
    @Transactional
    public Usuario editarUsuario(Long id,Usuario usuario){
        Usuario pesquisarId = usuarioRepository.findById(id)
                .orElse(null);
        if (pesquisarId ==null){
            throw new EmptyResultDataAccessException(1);
        }
        BeanUtils.copyProperties(usuario,pesquisarId,"id");
        return usuarioRepository.save(pesquisarId);
    }

    @Transactional
    public ResponseEntity<Map<String, Boolean>>remover(Long id){
        Usuario pesquisarUsuario = usuarioRepository.findById(id)
                .orElse(null);
        usuarioRepository.delete(pesquisarUsuario);
        Map <String,Boolean> response = new HashMap<>();
        response.put("Removido",true);
        return ResponseEntity.ok().body(response);
    }
}
