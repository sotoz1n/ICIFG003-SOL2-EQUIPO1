package com.equipo1.petshop.repository;

import com.equipo1.petshop.entity.Contacto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactoRepository extends JpaRepository<Contacto, Long> {
}
