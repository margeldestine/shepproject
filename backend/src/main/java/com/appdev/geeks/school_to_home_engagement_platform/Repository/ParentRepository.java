package com.appdev.geeks.school_to_home_engagement_platform.Repository;

import com.appdev.geeks.school_to_home_engagement_platform.Entity.ParentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ParentRepository extends JpaRepository<ParentEntity, Long> {
    Optional<ParentEntity> findByEmail(String email);
}