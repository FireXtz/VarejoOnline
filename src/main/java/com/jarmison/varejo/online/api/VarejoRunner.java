package com.jarmison.varejo.online.api;

import com.jarmison.varejo.online.api.model.Lancamentos;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@SpringBootApplication
public class VarejoRunner {

	public static void main(String[] args) {
		SpringApplication.run(VarejoRunner.class, args);
		List <Lancamentos> lancamentos = new ArrayList<>();
		System.out.println(lancamentos.stream().collect(Collectors.toList()));
	}

}
