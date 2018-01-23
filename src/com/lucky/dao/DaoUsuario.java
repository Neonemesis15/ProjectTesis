package com.lucky.dao;

import java.util.List;

import com.lucky.dto.Usuario;

public interface DaoUsuario {
	//Obtener todos los usuarios
	public List<Object[]> usuarioQry();
	//Insertar usuario
	public String usuarioIns(Usuario usuario);
	//Eliminar usuarios
	public String usuarioDel(List<Integer> ids);
	//Retornar usuario por id
	public Object[] usuarioGet(Integer id);
	//Actualizar usuario por id
	public String usuarioUpd(Usuario usuario);
    //Retornar mensaje
	public String getMessage();
	
}
