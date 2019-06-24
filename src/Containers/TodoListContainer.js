import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoListComponent from '../Components/TodoListComponent';
import AddTodoComponent from '../Components/AddTodoComponent';
import EditTodoComponent from '../Components/EditTodoComponent';


export default function TodoListContainer() {
    const [data, setData] = useState([]);
    const [update, setUpdate] = useState({Event: "Loaded", Streak: 0});
    useEffect(() => {
        axios
            .get("https://localhost:5001/api/todo")
            .then(result => {
                setData(result.data);
                console.log(result.data);
            });
    }, [update]);
    const initialFormState = "";
    const initialCompleted = true;
    const initialEditTodo = {id: null, name: "", isComplete: false};
    const [todoName, setTodoName] = useState(initialFormState);
    const [todoCompleted, setTodoCompleted] = useState(initialCompleted);
    const [editTodo, setEditTodo] = useState(initialEditTodo);

    const handleInputChange = event => {
        const { value } = event.target
        setTodoName(value)
    }
    const handleEditInputChange = event => {
        const {value} = event.target;
        console.log(value);
        setEditTodo({id: editTodo.id, name: value, isComplete: editTodo.isComplete});
    }
    const handleChangeCheck = () => {
        setTodoCompleted(!todoCompleted);
    }
    const handleEditChangeCheck = () => {
        setEditTodo({id: editTodo.id, name: editTodo.name, isComplete: !editTodo.isComplete});
    }
    const add = async () => {
        const obj = {};
        obj['name'] = todoName;
        obj['isComplete'] = todoCompleted;
        console.log(JSON.stringify(obj));
        await axios.post("https://localhost:5001/api/todo", obj, { headers: { "Content-Type": "application/json" } })
            .catch(e => {
                console.log(e);
            });
        setTodoName(initialFormState);
        setTodoCompleted(initialCompleted);
        if (update.Event !== "Added") {
            setUpdate({Event: "Added", Streak: 0});
        } else {
            setUpdate({
                ...update,
                [update.Streak]: update.Streak+1
            });
        }
    }
    const deleteTodo = async (id) => {
        await axios.delete(`https://localhost:5001/api/todo/${id}`)
        if(update.Event !== "Deleted") {
            setUpdate({Event: "Deleted", Streak: 0});
        } else {
            setUpdate({
                ...update,
                [update.Streak]: update.Streak+1
            });
        }
    }
    const edit = async () => {
        await axios.put(`https://localhost:5001/api/todo/${editTodo.id}`, editTodo, {headers: {"Content-Type": "application/json"}})
            .catch(e => {
                console.log(e);
            });
        setEditTodo(initialEditTodo);
        if(update.Event !== "Edited") {
            setUpdate({Event: "Updated", Streak: 0});
        } else {
            setUpdate({
                ...update,
                [update.Streak]: update.Streak+1
            });
        }
    }
    const setForEdit = (todo) => {
        console.log(todo);
        setEditTodo({id: todo.id, name: todo.name, isComplete: todo.isComplete});
    }


    return (<div>
        <TodoListComponent todos={data} deleteTodo={deleteTodo} setForEdit={setForEdit}/>
        <AddTodoComponent add={add} todoCompleted={todoCompleted}
            todoName={todoName} handleInputChange={handleInputChange} handleChangeCheck={handleChangeCheck} />
        <EditTodoComponent
            todo={editTodo} handleInputChange={handleEditInputChange} edit={edit} 
            handleChangeCheck={handleEditChangeCheck}
        />
    </div>);
}