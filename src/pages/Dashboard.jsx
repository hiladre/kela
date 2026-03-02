import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [events, setEvents] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [showEvents, setShowEvents] = useState(false)
  const [taskName, setTaskName] = useState('')
  const [taskTime, setTaskTime] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('authUser')
    if (!user) {
      navigate('/')
      return
    }
    const saved = localStorage.getItem('tasks')
    if (saved) {
      setTasks(JSON.parse(saved))
    }
    const savedEvents = localStorage.getItem('taskEvents')
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents))
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('authUser')
    navigate('/')
    window.location.reload()
  }

  const openAddTaskDialog = () => {
    setTaskName('')
    setTaskTime('')
    setTaskDescription('')
    setShowDialog(true)
  }

  const closeDialog = () => {
    setShowDialog(false)
  }

  const handleAddTask = (e) => {
    e.preventDefault()
    if (!taskName.trim()) return

    const newTask = {
      id: Date.now(),
      name: taskName.trim(),
      time: taskTime.trim() || 'Not specified',
      description: taskDescription.trim() || 'No description',
      createdAt: new Date().toISOString()
    }

    const updatedTasks = [newTask, ...tasks]
    setTasks(updatedTasks)
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))

    const newEvent = {
      id: Date.now(),
      taskName: newTask.name,
      timestamp: new Date().toISOString()
    }
    const updatedEvents = [newEvent, ...events]
    setEvents(updatedEvents)
    localStorage.setItem('taskEvents', JSON.stringify(updatedEvents))

    closeDialog()
  }

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((t) => t.id !== taskId)
    setTasks(updatedTasks)
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
  }

  const user = localStorage.getItem('authUser')

  return (
    <div className="dashboard" data-testid="dashboard-page">
      <header className="dashboard-header">
        <h1 data-testid="dashboard-title">Task Board</h1>
        <div className="header-actions">
          <span data-testid="user-display" className="user-badge">Hello, {user}</span>
          <button onClick={handleLogout} data-testid="logout-btn" className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <button
          onClick={openAddTaskDialog}
          data-testid="add-task-btn"
          className="add-task-btn"
        >
          + Add Task
        </button>

        <button
          onClick={() => setShowEvents(!showEvents)}
          data-testid="view-events-btn"
          className="view-events-btn"
        >
          View Events
        </button>

        {showEvents && (
          <div className="events-section" data-testid="events-section">
            <h3 data-testid="events-title">Add History</h3>
            {events.length === 0 ? (
              <p className="no-events" data-testid="no-events-message">No tasks added yet.</p>
            ) : (
              <div className="events-list" data-testid="events-list">
                {events.map((event) => (
                  <div key={event.id} className="event-row" data-testid="event-row" data-event-id={event.id}>
                    Task "{event.taskName}" added at {new Date(event.timestamp).toLocaleString('en-US')}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="tasks-list" data-testid="tasks-list">
          {tasks.length === 0 ? (
            <p className="no-tasks" data-testid="no-tasks-message">No tasks. Click "Add Task" to get started.</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="task-item"
                data-testid="task-item"
                data-task-id={task.id}
              >
                <div className="task-main">
                  <div className="task-info">
                    <h3 data-testid="task-name">{task.name}</h3>
                    <span data-testid="task-time" className="task-time">{task.time}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    data-testid="delete-task-btn"
                    data-task-id={task.id}
                    className="delete-task-btn"
                    type="button"
                    title="Delete task"
                  >
                    Delete
                  </button>
                </div>
                <p data-testid="task-description" className="task-description">{task.description}</p>
              </div>
            ))
          )}
        </div>
      </main>

      {showDialog && (
        <div className="dialog-overlay" data-testid="add-task-dialog-overlay" onClick={closeDialog}>
          <div className="dialog" data-testid="add-task-dialog" onClick={(e) => e.stopPropagation()}>
            <h2 data-testid="dialog-title">Add New Task</h2>
            <form onSubmit={handleAddTask}>
              <div className="form-group">
                <label htmlFor="task-name">Task Name</label>
                <input
                  id="task-name"
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder="Enter task name"
                  data-testid="task-name-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="task-time">Task Time</label>
                <input
                  id="task-time"
                  type="text"
                  value={taskTime}
                  onChange={(e) => setTaskTime(e.target.value)}
                  placeholder="e.g. 2:00 PM, tomorrow morning"
                  data-testid="task-time-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="task-description">Task Description</label>
                <textarea
                  id="task-description"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  placeholder="Enter description..."
                  rows={4}
                  data-testid="task-description-input"
                />
              </div>
              <div className="dialog-actions">
                <button type="button" onClick={closeDialog} data-testid="dialog-cancel-btn">
                  Cancel
                </button>
                <button type="submit" data-testid="task-add-btn">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
