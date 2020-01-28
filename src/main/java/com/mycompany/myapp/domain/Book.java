package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.mycompany.myapp.domain.enumeration.Genre;

/**
 * A Book.
 */
@Entity
@Table(name = "book")
public class Book implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "isbn")
    private String isbn;

    @Column(name = "author_token")
    private String authorToken;

    @Enumerated(EnumType.STRING)
    @Column(name = "genre")
    private Genre genre;

    @Column(name = "year")
    private String year;

    @Column(name = "rented")
    private Boolean rented;

    @ManyToMany
    @JoinTable(name = "book_author",
               joinColumns = @JoinColumn(name = "book_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "author_id", referencedColumnName = "id"))
    private Set<Author> authors = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("books")
    private LibraryAccount libraryAccount;

    @ManyToOne
    @JsonIgnoreProperties("books")
    private RentingList rentingList;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Book title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getIsbn() {
        return isbn;
    }

    public Book isbn(String isbn) {
        this.isbn = isbn;
        return this;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getAuthorToken() {
        return authorToken;
    }

    public Book authorToken(String authorToken) {
        this.authorToken = authorToken;
        return this;
    }

    public void setAuthorToken(String authorToken) {
        this.authorToken = authorToken;
    }

    public Genre getGenre() {
        return genre;
    }

    public Book genre(Genre genre) {
        this.genre = genre;
        return this;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public String getYear() {
        return year;
    }

    public Book year(String year) {
        this.year = year;
        return this;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public Boolean isRented() {
        return rented;
    }

    public Book rented(Boolean rented) {
        this.rented = rented;
        return this;
    }

    public void setRented(Boolean rented) {
        this.rented = rented;
    }

    public Set<Author> getAuthors() {
        return authors;
    }

    public Book authors(Set<Author> authors) {
        this.authors = authors;
        return this;
    }

    public Book addAuthor(Author author) {
        this.authors.add(author);
        author.getBooks().add(this);
        return this;
    }

    public Book removeAuthor(Author author) {
        this.authors.remove(author);
        author.getBooks().remove(this);
        return this;
    }

    public void setAuthors(Set<Author> authors) {
        this.authors = authors;
    }

    public LibraryAccount getLibraryAccount() {
        return libraryAccount;
    }

    public Book libraryAccount(LibraryAccount libraryAccount) {
        this.libraryAccount = libraryAccount;
        return this;
    }

    public void setLibraryAccount(LibraryAccount libraryAccount) {
        this.libraryAccount = libraryAccount;
    }

    public RentingList getRentingList() {
        return rentingList;
    }

    public Book rentingList(RentingList rentingList) {
        this.rentingList = rentingList;
        return this;
    }

    public void setRentingList(RentingList rentingList) {
        this.rentingList = rentingList;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Book)) {
            return false;
        }
        return id != null && id.equals(((Book) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Book{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", isbn='" + getIsbn() + "'" +
            ", authorToken='" + getAuthorToken() + "'" +
            ", genre='" + getGenre() + "'" +
            ", year='" + getYear() + "'" +
            ", rented='" + isRented() + "'" +
            "}";
    }
}
