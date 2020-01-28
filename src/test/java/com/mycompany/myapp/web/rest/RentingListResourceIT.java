package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.SQuLcProjectApp;
import com.mycompany.myapp.domain.RentingList;
import com.mycompany.myapp.repository.RentingListRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RentingListResource} REST controller.
 */
@SpringBootTest(classes = SQuLcProjectApp.class)
public class RentingListResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private RentingListRepository rentingListRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restRentingListMockMvc;

    private RentingList rentingList;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RentingListResource rentingListResource = new RentingListResource(rentingListRepository);
        this.restRentingListMockMvc = MockMvcBuilders.standaloneSetup(rentingListResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RentingList createEntity(EntityManager em) {
        RentingList rentingList = new RentingList()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION);
        return rentingList;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RentingList createUpdatedEntity(EntityManager em) {
        RentingList rentingList = new RentingList()
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION);
        return rentingList;
    }

    @BeforeEach
    public void initTest() {
        rentingList = createEntity(em);
    }

    @Test
    @Transactional
    public void createRentingList() throws Exception {
        int databaseSizeBeforeCreate = rentingListRepository.findAll().size();

        // Create the RentingList
        restRentingListMockMvc.perform(post("/api/renting-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rentingList)))
            .andExpect(status().isCreated());

        // Validate the RentingList in the database
        List<RentingList> rentingListList = rentingListRepository.findAll();
        assertThat(rentingListList).hasSize(databaseSizeBeforeCreate + 1);
        RentingList testRentingList = rentingListList.get(rentingListList.size() - 1);
        assertThat(testRentingList.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testRentingList.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createRentingListWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rentingListRepository.findAll().size();

        // Create the RentingList with an existing ID
        rentingList.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRentingListMockMvc.perform(post("/api/renting-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rentingList)))
            .andExpect(status().isBadRequest());

        // Validate the RentingList in the database
        List<RentingList> rentingListList = rentingListRepository.findAll();
        assertThat(rentingListList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRentingLists() throws Exception {
        // Initialize the database
        rentingListRepository.saveAndFlush(rentingList);

        // Get all the rentingListList
        restRentingListMockMvc.perform(get("/api/renting-lists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rentingList.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getRentingList() throws Exception {
        // Initialize the database
        rentingListRepository.saveAndFlush(rentingList);

        // Get the rentingList
        restRentingListMockMvc.perform(get("/api/renting-lists/{id}", rentingList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rentingList.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    public void getNonExistingRentingList() throws Exception {
        // Get the rentingList
        restRentingListMockMvc.perform(get("/api/renting-lists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRentingList() throws Exception {
        // Initialize the database
        rentingListRepository.saveAndFlush(rentingList);

        int databaseSizeBeforeUpdate = rentingListRepository.findAll().size();

        // Update the rentingList
        RentingList updatedRentingList = rentingListRepository.findById(rentingList.getId()).get();
        // Disconnect from session so that the updates on updatedRentingList are not directly saved in db
        em.detach(updatedRentingList);
        updatedRentingList
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION);

        restRentingListMockMvc.perform(put("/api/renting-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRentingList)))
            .andExpect(status().isOk());

        // Validate the RentingList in the database
        List<RentingList> rentingListList = rentingListRepository.findAll();
        assertThat(rentingListList).hasSize(databaseSizeBeforeUpdate);
        RentingList testRentingList = rentingListList.get(rentingListList.size() - 1);
        assertThat(testRentingList.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testRentingList.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingRentingList() throws Exception {
        int databaseSizeBeforeUpdate = rentingListRepository.findAll().size();

        // Create the RentingList

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRentingListMockMvc.perform(put("/api/renting-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rentingList)))
            .andExpect(status().isBadRequest());

        // Validate the RentingList in the database
        List<RentingList> rentingListList = rentingListRepository.findAll();
        assertThat(rentingListList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRentingList() throws Exception {
        // Initialize the database
        rentingListRepository.saveAndFlush(rentingList);

        int databaseSizeBeforeDelete = rentingListRepository.findAll().size();

        // Delete the rentingList
        restRentingListMockMvc.perform(delete("/api/renting-lists/{id}", rentingList.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RentingList> rentingListList = rentingListRepository.findAll();
        assertThat(rentingListList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
