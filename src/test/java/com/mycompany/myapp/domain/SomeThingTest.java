package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class SomeThingTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SomeThing.class);
        SomeThing someThing1 = new SomeThing();
        someThing1.setId(1L);
        SomeThing someThing2 = new SomeThing();
        someThing2.setId(someThing1.getId());
        assertThat(someThing1).isEqualTo(someThing2);
        someThing2.setId(2L);
        assertThat(someThing1).isNotEqualTo(someThing2);
        someThing1.setId(null);
        assertThat(someThing1).isNotEqualTo(someThing2);
    }
}
