package com.example.ServicoUsuario.controller;

import com.example.ServicoUsuario.model.Usuario;
import com.example.ServicoUsuario.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @PostMapping("/cadastrar")
    public Usuario cadastrar(@RequestBody Usuario u) {
        return service.cadastrar(u);
    }

    @PostMapping("/login")
    public Usuario login(@RequestBody Usuario u) {
        return service.login(u.getEmail(), u.getSenha());
    }
}

