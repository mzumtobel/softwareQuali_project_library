package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.SQuLcProjectApp;
import com.mycompany.myapp.domain.SomeThing;
import com.mycompany.myapp.repository.SomeThingRepository;
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
 * Integration tests for the {@link SomeThingResource} REST controller.
 */
@SpringBootTest(classes = SQuLcProjectApp.class)
public class SomeThingResourceIT {

    @Autowired
    private SomeThingRepository someThingRepository;

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

    private MockMvc restSomeThingMockMvc;

    private SomeThing someThing;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SomeThingResource someThingResource = new SomeThingResource(someThingRepository);
        this.restSomeThingMockMvc = MockMvcBuilders.standaloneSetup(someThingResource)
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
    public static SomeThing createEntity(EntityManager em) {
        SomeThing someThing = new SomeThing();
        return someThing;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SomeThing createUpdatedEntity(EntityManager em) {
        SomeThing someThing = new SomeThing();
        return someThing;
    }

    @BeforeEach
    public void initTest() {
        someThing = createEntity(em);
    }

    @Test
    @Transactional
    public void createSomeThing() throws Exception {
        int databaseSizeBeforeCreate = someThingRepository.findAll().size();

        // Create the SomeThing
        restSomeThingMockMvc.perform(post("/api/some-things")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(someThing)))
            .andExpect(status().isCreated());

        // Validate the SomeThing in the database
        List<SomeThing> someThingList = someThingRepository.findAll();
        assertThat(someThingList).hasSize(databaseSizeBeforeCreate + 1);
        SomeThing testSomeThing = someThingList.get(someThingList.size() - 1);
    }

    @Test
    @Transactional
    public void createSomeThingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = someThingRepository.findAll().size();

        // Create the SomeThing with an existing ID
        someThing.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSomeThingMockMvc.perform(post("/api/some-things")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(someThing)))
            .andExpect(status().isBadRequest());

        // Validate the SomeThing in the database
        List<SomeThing> someThingList = someThingRepository.findAll();
        assertThat(someThingList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSomeThings() throws Exception {
        // Initialize the database
        someThingRepository.saveAndFlush(someThing);

        // Get all the someThingList
        restSomeThingMockMvc.perform(get("/api/some-things?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(someThing.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getSomeThing() throws Exception {
        // Initialize the database
        someThingRepository.saveAndFlush(someThing);

        // Get the someThing
        restSomeThingMockMvc.perform(get("/api/some-things/{id}", someThing.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(someThing.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSomeThing() throws Exception {
        // Get the someThing
        restSomeThingMockMvc.perform(get("/api/some-things/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSomeThing() throws Exception {
        // Initialize the database
        someThingRepository.saveAndFlush(someThing);

        int databaseSizeBeforeUpdate = someThingRepository.findAll().size();

        // Update the someThing
        SomeThing updatedSomeThing = someThingRepository.findById(someThing.getId()).get();
        // Disconnect from session so that the updates on updatedSomeThing are not directly saved in db
        em.detach(updatedSomeThing);

        restSomeThingMockMvc.perform(put("/api/some-things")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSomeThing)))
            .andExpect(status().isOk());

        // Validate the SomeThing in the database
        List<SomeThing> someThingList = someThingRepository.findAll();
        assertThat(someThingList).hasSize(databaseSizeBeforeUpdate);
        SomeThing testSomeThing = someThingList.get(someThingList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingSomeThing() throws Exception {
        int databaseSizeBeforeUpdate = someThingRepository.findAll().size();

        // Create the SomeThing

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSomeThingMockMvc.perform(put("/api/some-things")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(someThing)))
            .andExpect(status().isBadRequest());

        // Validate the SomeThing in the database
        List<SomeThing> someThingList = someThingRepository.findAll();
        assertThat(someThingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSomeThing() throws Exception {
        // Initialize the database
        someThingRepository.saveAndFlush(someThing);

        int databaseSizeBeforeDelete = someThingRepository.findAll().size();

        // Delete the someThing
        restSomeThingMockMvc.perform(delete("/api/some-things/{id}", someThing.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SomeThing> someThingList = someThingRepository.findAll();
        assertThat(someThingList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
