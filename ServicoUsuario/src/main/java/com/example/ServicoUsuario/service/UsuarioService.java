package com.example.ServicoUsuario.service;

import com.example.ServicoUsuario.model.Usuario;
import com.example.ServicoUsuario.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import java.util.List; // Importação adicionada

@Service
public class UsuarioService {

    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public Usuario cadastrar(Usuario u) {
        return repository.save(u);
    }

    public Usuario login(String email, String senha) {
        return repository.findByEmailAndSenha(email, senha);
    }

    public List<Usuario> listarTodos() {
        return repository.findAll();
    }
}