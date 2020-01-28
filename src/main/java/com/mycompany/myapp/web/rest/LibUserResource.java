package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.LibUser;
import com.mycompany.myapp.repository.LibUserRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.LibUser}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LibUserResource {

    private final Logger log = LoggerFactory.getLogger(LibUserResource.class);

    private static final String ENTITY_NAME = "libUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LibUserRepository libUserRepository;

    public LibUserResource(LibUserRepository libUserRepository) {
        this.libUserRepository = libUserRepository;
    }

    /**
     * {@code POST  /lib-users} : Create a new libUser.
     *
     * @param libUser the libUser to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new libUser, or with status {@code 400 (Bad Request)} if the libUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/lib-users")
    public ResponseEntity<LibUser> createLibUser(@RequestBody LibUser libUser) throws URISyntaxException {
        log.debug("REST request to save LibUser : {}", libUser);
        if (libUser.getId() != null) {
            throw new BadRequestAlertException("A new libUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LibUser result = libUserRepository.save(libUser);
        return ResponseEntity.created(new URI("/api/lib-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /lib-users} : Updates an existing libUser.
     *
     * @param libUser the libUser to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated libUser,
     * or with status {@code 400 (Bad Request)} if the libUser is not valid,
     * or with status {@code 500 (Internal Server Error)} if the libUser couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/lib-users")
    public ResponseEntity<LibUser> updateLibUser(@RequestBody LibUser libUser) throws URISyntaxException {
        log.debug("REST request to update LibUser : {}", libUser);
        if (libUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LibUser result = libUserRepository.save(libUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, libUser.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /lib-users} : get all the libUsers.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of libUsers in body.
     */
    @GetMapping("/lib-users")
    public List<LibUser> getAllLibUsers() {
        log.debug("REST request to get all LibUsers");
        return libUserRepository.findAll();
    }

    /**
     * {@code GET  /lib-users/:id} : get the "id" libUser.
     *
     * @param id the id of the libUser to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the libUser, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/lib-users/{id}")
    public ResponseEntity<LibUser> getLibUser(@PathVariable Long id) {
        log.debug("REST request to get LibUser : {}", id);
        Optional<LibUser> libUser = libUserRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(libUser);
    }

    /**
     * {@code DELETE  /lib-users/:id} : delete the "id" libUser.
     *
     * @param id the id of the libUser to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/lib-users/{id}")
    public ResponseEntity<Void> deleteLibUser(@PathVariable Long id) {
        log.debug("REST request to delete LibUser : {}", id);
        libUserRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
