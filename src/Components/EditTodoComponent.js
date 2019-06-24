import React from 'react';

export default function EditTodoComponent(props) {
    return (
        <div>
            <label>id:</label>
            <label>{props.todo.id?props.todo.id:"Nothing"}</label>
            <label>Name:</label>
            <input type="text" name="name" value={props.todo.name} onChange={props.handleInputChange} />
            <label>isCompleted:</label>
            <input type="checkbox" name="isCompleted" checked={props.todo.isComplete} onChange={props.handleChangeCheck} />
            <button onClick={props.edit}>Edit Todo</button>
        </div>
    )
}