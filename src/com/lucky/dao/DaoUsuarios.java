package com.lucky.dao;

import com.lucky.dto.Usuarios;

public interface DaoUsuarios {

    public Usuarios autentica(String usuario, String password);
    
    public String getMessage();
}

