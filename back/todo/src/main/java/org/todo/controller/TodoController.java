package org.todo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.todo.entity.Todo;
import org.todo.service.TodoService;

@RestController
@RequestMapping("/todo")
@CrossOrigin(origins = "http://localhost:5173") 
public class TodoController {
	
	@Autowired
	private TodoService todoService;
	
	@GetMapping
	public ResponseEntity<List<Todo>> listar(){
		return ResponseEntity.ok(todoService.findAll());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Todo> getById(@PathVariable Long id){
		Optional<Todo> todo = todoService.findById(id);
		if(todo.isPresent()) {
			return ResponseEntity.ok(todo.get());
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
		
	@PostMapping
	public Todo createTodo(@RequestBody Todo todo) {
		return todoService.save(todo);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @RequestBody Todo todoBody){
		Optional<Todo> todo = todoService.findById(id);
		if(todo.isPresent()){
			Todo updatedTodo = todo.get();
			 updatedTodo.setTodo(todoBody.getTodo());
	         todoService.save(updatedTodo);
	         return ResponseEntity.ok(updatedTodo);
		}else {
			ResponseEntity.notFound().build();
		}
		return null;
	}
	
	@DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        Optional<Todo> todo = todoService.findById(id);
        if (todo.isPresent()) {
            todoService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
