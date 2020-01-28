package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.RentingList;
import com.mycompany.myapp.repository.RentingListRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.RentingList}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RentingListResource {

    private final Logger log = LoggerFactory.getLogger(RentingListResource.class);

    private static final String ENTITY_NAME = "rentingList";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RentingListRepository rentingListRepository;

    public RentingListResource(RentingListRepository rentingListRepository) {
        this.rentingListRepository = rentingListRepository;
    }

    /**
     * {@code POST  /renting-lists} : Create a new rentingList.
     *
     * @param rentingList the rentingList to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new rentingList, or with status {@code 400 (Bad Request)} if the rentingList has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/renting-lists")
    public ResponseEntity<RentingList> createRentingList(@RequestBody RentingList rentingList) throws URISyntaxException {
        log.debug("REST request to save RentingList : {}", rentingList);
        if (rentingList.getId() != null) {
            throw new BadRequestAlertException("A new rentingList cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RentingList result = rentingListRepository.save(rentingList);
        return ResponseEntity.created(new URI("/api/renting-lists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /renting-lists} : Updates an existing rentingList.
     *
     * @param rentingList the rentingList to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rentingList,
     * or with status {@code 400 (Bad Request)} if the rentingList is not valid,
     * or with status {@code 500 (Internal Server Error)} if the rentingList couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/renting-lists")
    public ResponseEntity<RentingList> updateRentingList(@RequestBody RentingList rentingList) throws URISyntaxException {
        log.debug("REST request to update RentingList : {}", rentingList);
        if (rentingList.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RentingList result = rentingListRepository.save(rentingList);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, rentingList.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /renting-lists} : get all the rentingLists.
     *

     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of rentingLists in body.
     */
    @GetMapping("/renting-lists")
    public List<RentingList> getAllRentingLists(@RequestParam(required = false) String filter) {
        if ("libuser-is-null".equals(filter)) {
            log.debug("REST request to get all RentingLists where libUser is null");
            return StreamSupport
                .stream(rentingListRepository.findAll().spliterator(), false)
                .filter(rentingList -> rentingList.getLibUser() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all RentingLists");
        return rentingListRepository.findAll();
    }

    /**
     * {@code GET  /renting-lists/:id} : get the "id" rentingList.
     *
     * @param id the id of the rentingList to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the rentingList, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/renting-lists/{id}")
    public ResponseEntity<RentingList> getRentingList(@PathVariable Long id) {
        log.debug("REST request to get RentingList : {}", id);
        Optional<RentingList> rentingList = rentingListRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(rentingList);
    }

    /**
     * {@code DELETE  /renting-lists/:id} : delete the "id" rentingList.
     *
     * @param id the id of the rentingList to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/renting-lists/{id}")
    public ResponseEntity<Void> deleteRentingList(@PathVariable Long id) {
        log.debug("REST request to delete RentingList : {}", id);
        rentingListRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
