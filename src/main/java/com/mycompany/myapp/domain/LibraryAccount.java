package com.mycompany.myapp.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A LibraryAccount.
 */
@Entity
@Table(name = "library_account")
public class LibraryAccount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "libraryAccount")
    private Set<LibUser> libUsers = new HashSet<>();

    @OneToMany(mappedBy = "libraryAccount")
    private Set<Book> books = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public LibraryAccount name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<LibUser> getLibUsers() {
        return libUsers;
    }

    public LibraryAccount libUsers(Set<LibUser> libUsers) {
        this.libUsers = libUsers;
        return this;
    }

    public LibraryAccount addLibUser(LibUser libUser) {
        this.libUsers.add(libUser);
        libUser.setLibraryAccount(this);
        return this;
    }

    public LibraryAccount removeLibUser(LibUser libUser) {
        this.libUsers.remove(libUser);
        libUser.setLibraryAccount(null);
        return this;
    }

    public void setLibUsers(Set<LibUser> libUsers) {
        this.libUsers = libUsers;
    }

    public Set<Book> getBooks() {
        return books;
    }

    public LibraryAccount books(Set<Book> books) {
        this.books = books;
        return this;
    }

    public LibraryAccount addBook(Book book) {
        this.books.add(book);
        book.setLibraryAccount(this);
        return this;
    }

    public LibraryAccount removeBook(Book book) {
        this.books.remove(book);
        book.setLibraryAccount(null);
        return this;
    }

    public void setBooks(Set<Book> books) {
        this.books = books;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LibraryAccount)) {
            return false;
        }
        return id != null && id.equals(((LibraryAccount) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "LibraryAccount{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
