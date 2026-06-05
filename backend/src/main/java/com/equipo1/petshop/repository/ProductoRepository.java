package com.equipo1.petshop.repository;

import com.equipo1.petshop.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ProductoRepository extends JpaRepository<Producto, Integer> {

    // 1. CONSULTA OBJETAL (JPQL): Filtrar productos por el nombre de su categoría (RF03)
    @Query("SELECT p FROM Producto p WHERE p.categoria.nombreCategoria = :nombreCategoria")
    List<Producto> findByCategoriaNombre(@Param("nombreCategoria") String nombreCategoria);

    // 2. CONSULTA NATIVA (SQL puro): Ejemplo exigido por la rúbrica
    @Query(value = "SELECT * FROM producto WHERE stock > 0", nativeQuery = true)
    List<Producto> findProductosConStockNativo();
}