import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Todo.css';

const Todo = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const email = searchParams.get("email");
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    console.log(email, tasks);
    
    const handleDone = (e, i) => {
        axios.post("http://localhost:5000/markDone", { email, i })
        .then (res => {
            if (res.data == "success"){
                window.location.reload();
            }
        })
        .catch (e => {
            console.log(e);
        });
    };

    const handleUndone = (e, i) => {
        axios.post("http://localhost:5000/markUndone", { email, i })
        .then (res => {
            if (res.data == "success"){
                window.location.reload();
            }
        })
        .catch (e => {
            console.log(e);
        });
    };
    // useEffect(() => {
    //     const form = document.getElementById("todo-form");
    //     const input = document.getElementById("todo-input");
    //     const todoLane = document.getElementById("todo-lane");

    //     form.addEventListener("submit", (e) => {
    //         e.preventDefault();
    //         const value = input.value;

    //         if (!value) return;

    //         const newTask = document.createElement("p");
    //         newTask.classList.add("task");
    //         newTask.setAttribute("draggable", "true");
    //         newTask.innerText = value;

    //         newTask.addEventListener("dragstart", () => {
    //             newTask.classList.add("is-dragging");
    //         });

    //         newTask.addEventListener("dragend", () => {
    //             newTask.classList.remove("is-dragging");
    //         });
    //         const deleteButton = document.createElement("button");
    //         deleteButton.innerHTML = '<FontAwesomeIcon icon={faTrash} />';
    //         deleteButton.addEventListener("click", () => {
    //         newTask.remove();
    //         });

    //         newTask.appendChild(deleteButton);

    //         todoLane.appendChild(newTask);

    //         input.value = "";
    //     });


    //     const draggables = document.querySelectorAll(".task");
    //     const droppables = document.querySelectorAll(".swim-lane");

    //     draggables.forEach((task) => {
    //         task.addEventListener("dragstart", () => {
    //             task.classList.add("is-dragging");
    //         });
    //         task.addEventListener("dragend", () => {
    //             task.classList.remove("is-dragging");
    //         });
    //     });

    //     droppables.forEach((zone) => {
    //         zone.addEventListener("dragover", (e) => {
    //             e.preventDefault();
    //             const bottomTask = insertAboveTask(zone, e.clientY);
    //             const curTask = document.querySelector(".is-dragging");

    //             if (!bottomTask) {
    //                 zone.appendChild(curTask);
    //             } else {
    //                 zone.insertBefore(curTask, bottomTask);
    //             }
    //         });
    //     });

    //     const insertAboveTask = (zone, mouseY) => {
    //         const els = zone.querySelectorAll(".task:not(.is-dragging)");

    //         let closestTask = null;
    //         let closestOffset = Number.NEGATIVE_INFINITY;

    //         els.forEach((task) => {
    //             const { top } = task.getBoundingClientRect();

    //             const offset = mouseY - top;

    //             if (offset < 0 && offset > closestOffset) {
    //                 closestOffset = offset;
    //                 closestTask = task;
    //             }
    //         });

    //         return closestTask;


    //     };
    // }, []);
    useEffect(() => {
        try {
            axios.post("http://localhost:5000/fetchTasks", { email })
            .then(res => {
                // console.log(res.data);
                setTasks(res.data);
            })
            .catch (e => {
                alert("Error fetching tasks");
            });
        }
        catch (e) {
            console.log(e);
        }
    }, []);

    async function addTask(e) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/addTask", { email, title })
            .then (res => {
                if (res.data == "success") {
                    alert("Successfully added the task");
                }
                else {
                    alert("Error inserting the task via todo");
                }
            })
            .catch (e => {
                console.log(e);
            });
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='board'>
            <form id='todo-form'>
                <input type='text' onChange = {(e) => setTitle(e.target.value)} placeholder='New TODO' id='todo-input' />
                <button onClick = {(e) => addTask(e)}>Add</button>
            </form>

            <div className='lanes'>
                <div className='swim-lane' id='todo-lane'>
                    <h3 className='todo-heading'> TODO</h3>
                    {tasks.map(i => {
                        return (
                            i.todo && (
                                <p className='task' draggable='true'>
                                    {i.title} <button onClick={(e) => {handleDone(e, i.title)}}>Done</button>
                                </p>
                            )
                        );
                    })}
                </div>
                {/* <div className='swim-lane'>
                    <h3 className='todo-heading'> DOING</h3>
                    <p className='task' draggable='true'>
                        ML <button onClick={handleDelete}>Delete</button>
                    </p>
                </div> */}
                <div className='swim-lane'>
                    <h3 className='todo-heading'> COMPLETED</h3>
                    {tasks.map(i => {
                        return (
                            i.completed && (
                                <p className='task' draggable='true'>
                                    {i.title} <button onClick={(e) => {handleUndone(e, i.title)}}>Undone</button>
                                </p>
                            )
                        );
                    })}
                    {/* <p className='task' draggable='true'>
                        AI <button onClick={handleDelete}>Delete</button>
                    </p>
                    <p className='task' draggable='true'>
                        Maths <button onClick={handleDelete}>Delete</button>
                    </p> */}
                </div>
            </div>
        </div>
    )
}

export default Todo
