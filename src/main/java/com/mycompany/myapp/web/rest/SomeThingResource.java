package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.SomeThing;
import com.mycompany.myapp.repository.SomeThingRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.SomeThing}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SomeThingResource {

    private final Logger log = LoggerFactory.getLogger(SomeThingResource.class);

    private static final String ENTITY_NAME = "someThing";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SomeThingRepository someThingRepository;

    public SomeThingResource(SomeThingRepository someThingRepository) {
        this.someThingRepository = someThingRepository;
    }

    /**
     * {@code POST  /some-things} : Create a new someThing.
     *
     * @param someThing the someThing to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new someThing, or with status {@code 400 (Bad Request)} if the someThing has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/some-things")
    public ResponseEntity<SomeThing> createSomeThing(@RequestBody SomeThing someThing) throws URISyntaxException {
        log.debug("REST request to save SomeThing : {}", someThing);
        if (someThing.getId() != null) {
            throw new BadRequestAlertException("A new someThing cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SomeThing result = someThingRepository.save(someThing);
        return ResponseEntity.created(new URI("/api/some-things/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /some-things} : Updates an existing someThing.
     *
     * @param someThing the someThing to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated someThing,
     * or with status {@code 400 (Bad Request)} if the someThing is not valid,
     * or with status {@code 500 (Internal Server Error)} if the someThing couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/some-things")
    public ResponseEntity<SomeThing> updateSomeThing(@RequestBody SomeThing someThing) throws URISyntaxException {
        log.debug("REST request to update SomeThing : {}", someThing);
        if (someThing.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SomeThing result = someThingRepository.save(someThing);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, someThing.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /some-things} : get all the someThings.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of someThings in body.
     */
    @GetMapping("/some-things")
    public List<SomeThing> getAllSomeThings() {
        log.debug("REST request to get all SomeThings");
        return someThingRepository.findAll();
    }

    /**
     * {@code GET  /some-things/:id} : get the "id" someThing.
     *
     * @param id the id of the someThing to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the someThing, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/some-things/{id}")
    public ResponseEntity<SomeThing> getSomeThing(@PathVariable Long id) {
        log.debug("REST request to get SomeThing : {}", id);
        Optional<SomeThing> someThing = someThingRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(someThing);
    }

    /**
     * {@code DELETE  /some-things/:id} : delete the "id" someThing.
     *
     * @param id the id of the someThing to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/some-things/{id}")
    public ResponseEntity<Void> deleteSomeThing(@PathVariable Long id) {
        log.debug("REST request to delete SomeThing : {}", id);
        someThingRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
