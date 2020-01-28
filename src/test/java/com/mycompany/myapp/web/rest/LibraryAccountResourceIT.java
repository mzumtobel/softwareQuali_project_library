package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.SQuLcProjectApp;
import com.mycompany.myapp.domain.LibraryAccount;
import com.mycompany.myapp.repository.LibraryAccountRepository;
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
 * Integration tests for the {@link LibraryAccountResource} REST controller.
 */
@SpringBootTest(classes = SQuLcProjectApp.class)
public class LibraryAccountResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private LibraryAccountRepository libraryAccountRepository;

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

    private MockMvc restLibraryAccountMockMvc;

    private LibraryAccount libraryAccount;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LibraryAccountResource libraryAccountResource = new LibraryAccountResource(libraryAccountRepository);
        this.restLibraryAccountMockMvc = MockMvcBuilders.standaloneSetup(libraryAccountResource)
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
    public static LibraryAccount createEntity(EntityManager em) {
        LibraryAccount libraryAccount = new LibraryAccount()
            .name(DEFAULT_NAME);
        return libraryAccount;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LibraryAccount createUpdatedEntity(EntityManager em) {
        LibraryAccount libraryAccount = new LibraryAccount()
            .name(UPDATED_NAME);
        return libraryAccount;
    }

    @BeforeEach
    public void initTest() {
        libraryAccount = createEntity(em);
    }

    @Test
    @Transactional
    public void createLibraryAccount() throws Exception {
        int databaseSizeBeforeCreate = libraryAccountRepository.findAll().size();

        // Create the LibraryAccount
        restLibraryAccountMockMvc.perform(post("/api/library-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(libraryAccount)))
            .andExpect(status().isCreated());

        // Validate the LibraryAccount in the database
        List<LibraryAccount> libraryAccountList = libraryAccountRepository.findAll();
        assertThat(libraryAccountList).hasSize(databaseSizeBeforeCreate + 1);
        LibraryAccount testLibraryAccount = libraryAccountList.get(libraryAccountList.size() - 1);
        assertThat(testLibraryAccount.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createLibraryAccountWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = libraryAccountRepository.findAll().size();

        // Create the LibraryAccount with an existing ID
        libraryAccount.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLibraryAccountMockMvc.perform(post("/api/library-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(libraryAccount)))
            .andExpect(status().isBadRequest());

        // Validate the LibraryAccount in the database
        List<LibraryAccount> libraryAccountList = libraryAccountRepository.findAll();
        assertThat(libraryAccountList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllLibraryAccounts() throws Exception {
        // Initialize the database
        libraryAccountRepository.saveAndFlush(libraryAccount);

        // Get all the libraryAccountList
        restLibraryAccountMockMvc.perform(get("/api/library-accounts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(libraryAccount.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getLibraryAccount() throws Exception {
        // Initialize the database
        libraryAccountRepository.saveAndFlush(libraryAccount);

        // Get the libraryAccount
        restLibraryAccountMockMvc.perform(get("/api/library-accounts/{id}", libraryAccount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(libraryAccount.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingLibraryAccount() throws Exception {
        // Get the libraryAccount
        restLibraryAccountMockMvc.perform(get("/api/library-accounts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLibraryAccount() throws Exception {
        // Initialize the database
        libraryAccountRepository.saveAndFlush(libraryAccount);

        int databaseSizeBeforeUpdate = libraryAccountRepository.findAll().size();

        // Update the libraryAccount
        LibraryAccount updatedLibraryAccount = libraryAccountRepository.findById(libraryAccount.getId()).get();
        // Disconnect from session so that the updates on updatedLibraryAccount are not directly saved in db
        em.detach(updatedLibraryAccount);
        updatedLibraryAccount
            .name(UPDATED_NAME);

        restLibraryAccountMockMvc.perform(put("/api/library-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLibraryAccount)))
            .andExpect(status().isOk());

        // Validate the LibraryAccount in the database
        List<LibraryAccount> libraryAccountList = libraryAccountRepository.findAll();
        assertThat(libraryAccountList).hasSize(databaseSizeBeforeUpdate);
        LibraryAccount testLibraryAccount = libraryAccountList.get(libraryAccountList.size() - 1);
        assertThat(testLibraryAccount.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingLibraryAccount() throws Exception {
        int databaseSizeBeforeUpdate = libraryAccountRepository.findAll().size();

        // Create the LibraryAccount

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLibraryAccountMockMvc.perform(put("/api/library-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(libraryAccount)))
            .andExpect(status().isBadRequest());

        // Validate the LibraryAccount in the database
        List<LibraryAccount> libraryAccountList = libraryAccountRepository.findAll();
        assertThat(libraryAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLibraryAccount() throws Exception {
        // Initialize the database
        libraryAccountRepository.saveAndFlush(libraryAccount);

        int databaseSizeBeforeDelete = libraryAccountRepository.findAll().size();

        // Delete the libraryAccount
        restLibraryAccountMockMvc.perform(delete("/api/library-accounts/{id}", libraryAccount.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LibraryAccount> libraryAccountList = libraryAccountRepository.findAll();
        assertThat(libraryAccountList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
