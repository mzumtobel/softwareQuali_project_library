package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.SomeThing;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SomeThing entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SomeThingRepository extends JpaRepository<SomeThing, Long> {

}
