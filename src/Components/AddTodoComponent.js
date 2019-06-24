import React from 'react';

export default function AddTodoComponent(props) {
    return (
        <div>
            <label>Name</label>
            <input type="text" name="name" value={props.todoName} onChange={props.handleInputChange} />
            <label>isCompleted</label>
            <input type="checkbox" name="isCompleted" checked={props.todoCompleted} onChange={props.handleChangeCheck} />
            <button onClick={props.add}>Add New Todo</button>
        </div>
    )
}