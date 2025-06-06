package com.example.ServicoPedidos.service;

import com.example.ServicoPedidos.model.Pedido;
import com.example.ServicoPedidos.repository.PedidoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidoService {

    private final PedidoRepository repository;

    public PedidoService(PedidoRepository repository) {
        this.repository = repository;
    }

    public Pedido criar(Pedido p) {
        return repository.save(p);
    }

    public List<Pedido> listarPorUsuario(Long usuarioId) {
        return repository.findByUsuarioId(usuarioId);
    }
}

