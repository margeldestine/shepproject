package com.appdev.geeks.school_to_home_engagement_platform.Service;

import com.appdev.geeks.school_to_home_engagement_platform.Entity.ParentEntity;
import com.appdev.geeks.school_to_home_engagement_platform.Repository.ParentRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ParentService {

    private final ParentRepository parentRepository;

    public ParentService(ParentRepository parentRepository) {
        this.parentRepository = parentRepository;
    }

    public List<ParentEntity> getAll() {
        return parentRepository.findAll();
    }

    public List<ParentEntity> getByIdList(Long id) {
        if (id == null) return getAll();
        return parentRepository.findAllById(Collections.singleton(id));
    }

    public Optional<ParentEntity> getOne(Long id) {
        return parentRepository.findById(id);
    }

    public ParentEntity create(ParentEntity parent) {
        return parentRepository.save(parent);
    }

    public Optional<ParentEntity> update(Long id, ParentEntity incoming) {
        return parentRepository.findById(id).map(existing -> {
            existing.setFirstName(incoming.getFirstName());
            existing.setLastName(incoming.getLastName());
            existing.setEmail(incoming.getEmail());
            existing.setPasswordHash(incoming.getPasswordHash());
            existing.setContactNumber(incoming.getContactNumber());
            existing.setCreatedAt(incoming.getCreatedAt());
            return parentRepository.save(existing);
        });
    }

    public void delete(Long id) {
        parentRepository.deleteById(id);
    }
}