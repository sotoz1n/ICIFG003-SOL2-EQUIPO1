package com.equipo1.petshop.service;

import com.equipo1.petshop.entity.Producto;
import com.equipo1.petshop.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;

    // Inyección de dependencias a través del constructor
    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    // Método para RF02: Catálogo completo
    public List<Producto> obtenerTodos() {
        return productoRepository.findAll();
    }

    // Método para RF03: Filtrado
    public List<Producto> filtrarPorCategoria(String nombreCategoria) {
        // Si buscan "Todos", retornamos el catálogo completo
        if (nombreCategoria.equalsIgnoreCase("Todos")) {
            return productoRepository.findAll();
        }
        return productoRepository.findByCategoriaNombre(nombreCategoria);
    }
}