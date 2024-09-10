package org.todo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.todo.entity.Todo;
import org.todo.repository.TodoRepository;

@Service
public class TodoService {
	
	@Autowired
	private TodoRepository todoRepository;
	
	public List<Todo> findAll() {
		return todoRepository.findAll();
	}
	
	public Optional<Todo> findById(Long id){
		return todoRepository.findById(id);
	}
	
	public Todo save(Todo todo) {
		return todoRepository.save(todo);
	}
	
	public void deleteById(Long id) {
		todoRepository.deleteById(id);
	}
}
