package com.jarmison.varejo.online.api.service;

import com.jarmison.varejo.online.api.events.RecursoCriadoEvent;
import com.jarmison.varejo.online.api.model.Perfil;
import com.jarmison.varejo.online.api.repository.PerfilRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

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
}
