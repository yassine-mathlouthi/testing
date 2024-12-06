package com.example.ArtFloow.repository;

import com.example.ArtFloow.entity.Panier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PanierRepository  extends JpaRepository<Panier,Long> {
    Optional<Panier> findBySessionId(String sessionId);
}
