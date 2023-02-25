package com.jarmison.varejo.online.api.service;

import com.jarmison.varejo.online.api.events.RecursoCriadoEvent;
import com.jarmison.varejo.online.api.model.Lancamentos;
import com.jarmison.varejo.online.api.model.Perfil;
import com.jarmison.varejo.online.api.model.Usuario;
import com.jarmison.varejo.online.api.repository.PerfilRepository;
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
public class PerfilService {
    @Autowired
    private PerfilRepository perfilRepository;
    @Autowired
    private ApplicationEventPublisher publisher;
    @Transactional
    public ResponseEntity<Perfil> adcionar(Perfil perfil, HttpServletResponse response){
        Perfil save = perfilRepository.save(perfil);
        publisher.publishEvent(new RecursoCriadoEvent(this,response, perfil.getId()));
        return ResponseEntity.status(HttpStatus.CREATED).body(save);
    }
    public ResponseEntity<Perfil>pesquisarPor(Long id){
        Perfil perfil = perfilRepository.findById(id).get();
        return perfil!=null ? ResponseEntity.ok().body(perfil):ResponseEntity.notFound().build();
    }
    public ResponseEntity<?>listarPerfils(){
        List<Perfil> perfils = perfilRepository.findAll();
        return !perfils.isEmpty()?ResponseEntity.ok().body(perfils):ResponseEntity.notFound().build();
    }
    @Transactional
    public Perfil editarPerfil(Long id, Perfil perfil){
        Perfil pesquisarId = perfilRepository.findById(id)
                .orElse(null);
        if (pesquisarId ==null){
            throw new EmptyResultDataAccessException(1);
        }
        BeanUtils.copyProperties(perfil,pesquisarId,"id");
        return perfilRepository.save(pesquisarId);
    }

    @Transactional
    public ResponseEntity<Map<String, Boolean>>remover(Long id){
        Perfil pesquisarPerfil = perfilRepository.findById(id)
                .orElse(null);
        perfilRepository.delete(pesquisarPerfil);
        Map <String,Boolean> response = new HashMap<>();
        response.put("Removido",true);
        return ResponseEntity.ok().body(response);
    }
}
