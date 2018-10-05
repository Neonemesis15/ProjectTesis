package main.java.com.lucky.dao;

import main.java.com.lucky.dto.Usuarios;

public interface DaoUsuarios {

    public Usuarios autentica(String usuario, String password);
    
    public String getMessage();
}

