package com.equipo1.petshop.controller;

import com.equipo1.petshop.entity.Producto;
import com.equipo1.petshop.service.ProductoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:4200") // ¡Clave para conectar con Angular!
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    // GET: http://localhost:8080/api/productos (RF02 - Catálogo general)
    @GetMapping
    public List<Producto> listarProductos() {
        return productoService.obtenerTodos();
    }

    // GET: http://localhost:8080/api/productos/categoria/Perros (RF03 - Filtrado)
    @GetMapping("/categoria/{nombre}")
    public List<Producto> listarPorCategoria(@PathVariable String nombre) {
        return productoService.filtrarPorCategoria(nombre);
    }
}