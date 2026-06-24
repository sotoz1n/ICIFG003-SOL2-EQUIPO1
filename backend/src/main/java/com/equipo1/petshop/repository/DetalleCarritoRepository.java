package com.equipo1.petshop.repository;

import com.equipo1.petshop.entity.DetalleCarrito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetalleCarritoRepository extends JpaRepository<DetalleCarrito, Integer> {
}