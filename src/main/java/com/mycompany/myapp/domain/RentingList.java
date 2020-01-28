package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A RentingList.
 */
@Entity
@Table(name = "renting_list")
public class RentingList implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "rentingList")
    private Set<Book> books = new HashSet<>();

    @OneToOne(mappedBy = "rentingList")
    @JsonIgnore
    private LibUser libUser;

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

    public RentingList title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public RentingList description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Book> getBooks() {
        return books;
    }

    public RentingList books(Set<Book> books) {
        this.books = books;
        return this;
    }

    public RentingList addBook(Book book) {
        this.books.add(book);
        book.setRentingList(this);
        return this;
    }

    public RentingList removeBook(Book book) {
        this.books.remove(book);
        book.setRentingList(null);
        return this;
    }

    public void setBooks(Set<Book> books) {
        this.books = books;
    }

    public LibUser getLibUser() {
        return libUser;
    }

    public RentingList libUser(LibUser libUser) {
        this.libUser = libUser;
        return this;
    }

    public void setLibUser(LibUser libUser) {
        this.libUser = libUser;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RentingList)) {
            return false;
        }
        return id != null && id.equals(((RentingList) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "RentingList{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
