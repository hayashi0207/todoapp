import React, {useState, useEffect} from 'react'
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import axios from 'axios'

const DrfApi = () => {

    const [todolist,setTodolist] = useState([])
    const [selectedTodo,setSelectedTodo] = useState([])
    const [editedTodo,setEditedTodo] = useState({id:'',title:'',content:''})
    const [id,setId] =useState('')

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/todolist/',{
            headers: {
                'Authorization': 'Token c1b7a43871127d3e4e9b88768d9bc18180be80a8'
            }
        })
        .then(res => {setTodolist(res.data)})
    },[])

    const getTodo = () =>{
        axios.get(`http://127.0.0.1:8000/api/todolist/${id}/`,{
            headers: {
                'Authorization': 'Token c1b7a43871127d3e4e9b88768d9bc18180be80a8'
            }})
            .then(res => {setSelectedTodo(res.data)
        })
    }
    const newTodo = (todo) =>{

        const data = {
            title: todo.title,
            content: todo.content,
        }

        axios.post('http://127.0.0.1:8000/api/todolist/',data,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token c1b7a43871127d3e4e9b88768d9bc18180be80a8'
            }})
            .then(res => {setTodolist([...todolist,res.data]); setEditedTodo({id:'',title:'',content:''})}
        )
    }
    const editTodo = (todo) =>{

        axios.put(`http://127.0.0.1:8000/api/todolist/${todo.id}/`,todo,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token c1b7a43871127d3e4e9b88768d9bc18180be80a8'
            }})
            .then(res => {setTodolist(todolist.map(todo => (todo.id === editedTodo.id ? res.data : todo)))
                setEditedTodo({id:'',title:'',content:''})
            }
        )
    }

    const deleteTodo = (id) =>{
        axios.delete(`http://127.0.0.1:8000/api/todolist/${id}/`,{
            headers: {
                'Authorization': 'Token c1b7a43871127d3e4e9b88768d9bc18180be80a8'
            }})
            .then(res => {setTodolist(todolist.filter(todo => todo.id !== id)); 
                setSelectedTodo([]);
                if (editedTodo.id === id) {　　　　　　　　　　　/*ここから3行追加*/
                    setEditedTodo({ id: "", title: "" });
                }
            })
    }

    const handleInputChange = () => evt =>{
        const value = evt.target.value;
        const name = evt.target.name;
        setEditedTodo({...editedTodo, [name]:value})
    }

    return (
        <div>
            <ul>
                {
                    todolist.map(todo => <li key = {todo.id}> {todo.id} {todo.title} {todo.content}
                    <button onClick={()=>deleteTodo(todo.id)}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                    <button onClick={()=>setEditedTodo(todo)}>
                        <i className="fas fa-pen"></i>
                    </button>
                    </li>)
                }
            </ul>

            Set id <br/>
            <input type='text' value={id} onChange={evt=>(setId(evt.target.value))}/>
            <br/>
            <button type='button' onClick={()=>getTodo()}>Get todo</button>
            <h3>{selectedTodo.title} {selectedTodo.content}</h3>

            <input type = "text" name="title"
                value = {editedTodo.title}
                onChange = {handleInputChange()}
                placeholder="New title" required/>
            <br/>
            <input type = "text" name="content"
                value = {editedTodo.content}
                onChange = {handleInputChange()}
                placeholder="New content" required/>
            <br/>
            {editedTodo.id ? 
            <button onClick={()=>editTodo(editedTodo)}>Update</button>:
            <button onClick={()=>newTodo(editedTodo)}>Create</button>
            }
        </div>
    )
}

export default DrfApi
