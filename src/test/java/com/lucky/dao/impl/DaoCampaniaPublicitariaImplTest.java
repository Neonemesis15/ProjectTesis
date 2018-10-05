package test.java.com.lucky.dao.impl;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import static org.mockito.Mockito.when;

import java.util.LinkedList;
import java.util.List;

import main.java.com.lucky.dao.DaoCampaniaPublicitaria;
import main.java.com.lucky.dao.impl.DaoCampaniaPublicitariaImpl;

@RunWith(MockitoJUnitRunner.class)
public class DaoCampaniaPublicitariaImplTest {

	@Mock
	private DaoCampaniaPublicitaria daoCampaniaPublicitaria = new DaoCampaniaPublicitariaImpl();
	
	@Test
	public void campaniaPublicitariaReturnOk() {
		List<Object[]> hi = new LinkedList<>();
		when(daoCampaniaPublicitaria.campaniaPublicitariaQry()).thenReturn(hi);
		daoCampaniaPublicitaria.getMessage();
	}

}
