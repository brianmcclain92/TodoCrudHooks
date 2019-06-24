import React from 'react';

export default function TodoListComponent(props) {
    return (
        <div>
            <ul>
                {props.todos.map(item => (
                    <li key={item.id}>
                        {item.id}: {item.name}: {item.isComplete ? "True":"False"} 
                        <button onClick={() => props.deleteTodo(item.id)}>Delete</button>
                        <button onClick={() => props.setForEdit(item)}>Set For Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}