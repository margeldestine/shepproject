package com.appdev.geeks.school_to_home_engagement_platform.Controller;

import com.appdev.geeks.school_to_home_engagement_platform.Entity.ParentEntity;
import com.appdev.geeks.school_to_home_engagement_platform.Service.ParentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parents")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:3002"})
public class ParentsController {

    private final ParentService parentService;

    public ParentsController(ParentService parentService) {
        this.parentService = parentService;
    }

    // GET /api/parents  or  /api/parents?id=1  -> like professor's demo
    @GetMapping
    public List<ParentEntity> getParents(@RequestParam(value = "id", required = false) Long id) {
        return parentService.getByIdList(id);
    }

    // GET /api/parents/{id}  -> single
    @GetMapping("/{id}")
    public ResponseEntity<ParentEntity> getParent(@PathVariable Long id) {
        return parentService.getOne(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST /api/parents  -> create
    @PostMapping
    public ParentEntity createParent(@RequestBody ParentEntity parent) {
        return parentService.create(parent);
    }

    // PUT /api/parents/{id} -> update
    @PutMapping("/{id}")
    public ResponseEntity<ParentEntity> updateParent(@PathVariable Long id, @RequestBody ParentEntity parent) {
        return parentService.update(id, parent)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETE /api/parents/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParent(@PathVariable Long id) {
        parentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}