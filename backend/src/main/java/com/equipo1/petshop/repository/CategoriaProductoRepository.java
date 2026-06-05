package com.equipo1.petshop.repository;

import com.equipo1.petshop.entity.CategoriaProducto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaProductoRepository extends JpaRepository<CategoriaProducto, Integer> {
    // JpaRepository ya incluye los métodos básicos como findAll(), save(), findById()
}