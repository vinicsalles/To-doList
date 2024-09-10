package org.todo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Todo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idTodo;
	
	@Column
	private String todo;
	
	public Long getIdTodo() {
		return idTodo;
	}

	public void setIdTodo(Long idTodo) {
		this.idTodo = idTodo;
	}

	

	public Todo(String todo) {
		super();
		this.todo = todo;
	}

	public String getTodo() {
		return todo;
	}

	public void setTodo(String todo) {
		this.todo = todo;
	}

	public Todo(Long idTodo, String todo) {
		super();
		this.idTodo = idTodo;
		this.todo = todo;
	}

	public Todo() {
		super();
	}
	
}
