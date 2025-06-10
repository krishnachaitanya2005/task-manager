import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
	const [tasks, setTasks] = useState([]);
	const [form, setForm] = useState({ title: "", description: "" });
	const [editingId, setEditingId] = useState(null);

	const fetchTasks = async () => {
		const res = await axios.get("http://localhost:5000/api/tasks");
		setTasks(res.data);
	};

	const createOrUpdateTask = async () => {
		if (editingId) {
			await axios.put(
				`https://task-manager-gjss.onrender.com/api/tasks/${editingId}`,
				form
			);
			setEditingId(null);
		} else {
			await axios.post(
				"https://task-manager-gjss.onrender.com/api/tasks",
				form
			);
		}
		setForm({ title: "", description: "" });
		fetchTasks();
	};

	const deleteTask = async (id) => {
		await axios.delete(
			`https://task-manager-gjss.onrender.com/api/tasks/${id}`
		);
		fetchTasks();
	};

	const startEdit = (task) => {
		setEditingId(task._id);
		setForm({ title: task.title, description: task.description });
	};

	useEffect(() => {
		fetchTasks();
	}, []);

	return (
		<div className="container">
			<div className="task-manager">
				<h1 className="title">Task Manager</h1>
				<div className="form">
					<input
						type="text"
						placeholder="Title"
						value={form.title}
						onChange={(e) => setForm({ ...form, title: e.target.value })}
					/>
					<textarea
						placeholder="Description"
						value={form.description}
						onChange={(e) => setForm({ ...form, description: e.target.value })}
					/>
					<button onClick={createOrUpdateTask}>
						{editingId ? "Update Task" : "Add Task"}
					</button>
				</div>

				<ul className="task-list">
					{tasks.map((task) => (
						<li className="task-item" key={task._id}>
							<div className="task-text">
								<strong>{task.title}</strong>
								<p>{task.description}</p>
							</div>
							<div className="task-actions">
								<button className="edit" onClick={() => startEdit(task)}>
									Edit
								</button>
								<button className="delete" onClick={() => deleteTask(task._id)}>
									Delete
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default App;
