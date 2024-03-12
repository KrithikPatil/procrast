import React, { useEffect } from 'react';
import './Todo.css';

const Todo = () => {
    const handleDelete = (e) => {
        const taskToDelete = e.target.parentElement;
        taskToDelete.remove();
    };
    useEffect(() => {
        const form = document.getElementById("todo-form");
        const input = document.getElementById("todo-input");
        const todoLane = document.getElementById("todo-lane");

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const value = input.value;

            if (!value) return;

            const newTask = document.createElement("p");
            newTask.classList.add("task");
            newTask.setAttribute("draggable", "true");
            newTask.innerText = value;

            newTask.addEventListener("dragstart", () => {
                newTask.classList.add("is-dragging");
            });

            newTask.addEventListener("dragend", () => {
                newTask.classList.remove("is-dragging");
            });
            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = '<FontAwesomeIcon icon={faTrash} />';
            deleteButton.addEventListener("click", () => {
            newTask.remove();
            });

            newTask.appendChild(deleteButton);

            todoLane.appendChild(newTask);

            input.value = "";
        });


        const draggables = document.querySelectorAll(".task");
        const droppables = document.querySelectorAll(".swim-lane");

        draggables.forEach((task) => {
            task.addEventListener("dragstart", () => {
                task.classList.add("is-dragging");
            });
            task.addEventListener("dragend", () => {
                task.classList.remove("is-dragging");
            });
        });

        droppables.forEach((zone) => {
            zone.addEventListener("dragover", (e) => {
                e.preventDefault();
                const bottomTask = insertAboveTask(zone, e.clientY);
                const curTask = document.querySelector(".is-dragging");

                if (!bottomTask) {
                    zone.appendChild(curTask);
                } else {
                    zone.insertBefore(curTask, bottomTask);
                }
            });
        });

        const insertAboveTask = (zone, mouseY) => {
            const els = zone.querySelectorAll(".task:not(.is-dragging)");

            let closestTask = null;
            let closestOffset = Number.NEGATIVE_INFINITY;

            els.forEach((task) => {
                const { top } = task.getBoundingClientRect();

                const offset = mouseY - top;

                if (offset < 0 && offset > closestOffset) {
                    closestOffset = offset;
                    closestTask = task;
                }
            });

            return closestTask;


        };
    }, []);
    return (
        <div className='board'>
            <form id='todo-form'>
                <input type='text' placeholder='New TODO' id='todo-input' />
                <button type='submit'>Add</button>
            </form>

            <div className='lanes'>
                <div className='swim-lane' id='todo-lane'>
                    <h3 className='todo-heading'> TODO</h3>
                    <p className='task' draggable='true'>
                        ML <button onClick={handleDelete}>Delete</button>
                    </p>
                    <p className='task' draggable='true'>
                        AI <button onClick={handleDelete}>Delete</button>
                    </p>
                    <p className='task' draggable='true'>
                        Maths <button onClick={handleDelete}>Delete</button>
                    </p>
                </div>
                <div className='swim-lane'>
                    <h3 className='todo-heading'> DOING</h3>
                    <p className='task' draggable='true'>
                        ML <button onClick={handleDelete}>Delete</button>
                    </p>
                </div>
                <div className='swim-lane'>
                    <h3 className='todo-heading'> COMPLETED</h3>
                    <p className='task' draggable='true'>
                        AI <button onClick={handleDelete}>Delete</button>
                    </p>
                    <p className='task' draggable='true'>
                        Maths <button onClick={handleDelete}>Delete</button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Todo
