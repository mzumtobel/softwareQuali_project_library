package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.LibraryAccount;
import com.mycompany.myapp.repository.LibraryAccountRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.LibraryAccount}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LibraryAccountResource {

    private final Logger log = LoggerFactory.getLogger(LibraryAccountResource.class);

    private static final String ENTITY_NAME = "libraryAccount";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LibraryAccountRepository libraryAccountRepository;

    public LibraryAccountResource(LibraryAccountRepository libraryAccountRepository) {
        this.libraryAccountRepository = libraryAccountRepository;
    }

    /**
     * {@code POST  /library-accounts} : Create a new libraryAccount.
     *
     * @param libraryAccount the libraryAccount to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new libraryAccount, or with status {@code 400 (Bad Request)} if the libraryAccount has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/library-accounts")
    public ResponseEntity<LibraryAccount> createLibraryAccount(@RequestBody LibraryAccount libraryAccount) throws URISyntaxException {
        log.debug("REST request to save LibraryAccount : {}", libraryAccount);
        if (libraryAccount.getId() != null) {
            throw new BadRequestAlertException("A new libraryAccount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LibraryAccount result = libraryAccountRepository.save(libraryAccount);
        return ResponseEntity.created(new URI("/api/library-accounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /library-accounts} : Updates an existing libraryAccount.
     *
     * @param libraryAccount the libraryAccount to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated libraryAccount,
     * or with status {@code 400 (Bad Request)} if the libraryAccount is not valid,
     * or with status {@code 500 (Internal Server Error)} if the libraryAccount couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/library-accounts")
    public ResponseEntity<LibraryAccount> updateLibraryAccount(@RequestBody LibraryAccount libraryAccount) throws URISyntaxException {
        log.debug("REST request to update LibraryAccount : {}", libraryAccount);
        if (libraryAccount.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LibraryAccount result = libraryAccountRepository.save(libraryAccount);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, libraryAccount.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /library-accounts} : get all the libraryAccounts.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of libraryAccounts in body.
     */
    @GetMapping("/library-accounts")
    public List<LibraryAccount> getAllLibraryAccounts() {
        log.debug("REST request to get all LibraryAccounts");
        return libraryAccountRepository.findAll();
    }

    /**
     * {@code GET  /library-accounts/:id} : get the "id" libraryAccount.
     *
     * @param id the id of the libraryAccount to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the libraryAccount, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/library-accounts/{id}")
    public ResponseEntity<LibraryAccount> getLibraryAccount(@PathVariable Long id) {
        log.debug("REST request to get LibraryAccount : {}", id);
        Optional<LibraryAccount> libraryAccount = libraryAccountRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(libraryAccount);
    }

    /**
     * {@code DELETE  /library-accounts/:id} : delete the "id" libraryAccount.
     *
     * @param id the id of the libraryAccount to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/library-accounts/{id}")
    public ResponseEntity<Void> deleteLibraryAccount(@PathVariable Long id) {
        log.debug("REST request to delete LibraryAccount : {}", id);
        libraryAccountRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
