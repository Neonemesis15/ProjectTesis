package main.java.com.lucky.dao;

import java.util.List;

import main.java.com.lucky.dto.Tutoriales;

public interface DaoTutoriales {

    public List<Tutoriales> tutorialesQry();

    public String tutorialesIns(Tutoriales tutoriales);

    public String tutorialesDel(List<Integer> ids);

    public Tutoriales tutorialesGet(Integer idtutorial);

    public String tutorialesUpd(Tutoriales tutoriales);

    public String getMessage();
}

