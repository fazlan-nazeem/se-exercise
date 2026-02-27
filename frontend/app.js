// API Base URL - uses relative path since nginx proxies /api to the backend
const API_BASE_URL = '/api';

// State management
let tasks = [];

// DOM Elements
const taskForm = document.getElementById('taskForm');
const editForm = document.getElementById('editForm');
const tasksList = document.getElementById('tasksList');
const loadingIndicator = document.getElementById('loadingIndicator');
const errorMessage = document.getElementById('errorMessage');
const emptyState = document.getElementById('emptyState');
const editModal = document.getElementById('editModal');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    taskForm.addEventListener('submit', handleAddTask);
    editForm.addEventListener('submit', handleEditTask);
}

// Load all tasks
async function loadTasks() {
    try {
        showLoading(true);
        hideError();

        const response = await fetch(`${API_BASE_URL}/tasks`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        tasks = await response.json();
        renderTasks();
        updateStats();
    } catch (error) {
        console.error('Error loading tasks:', error);
        showError('Failed to load tasks. Please check if the API is running.');
    } finally {
        showLoading(false);
    }
}

// Add new task
async function handleAddTask(e) {
    e.preventDefault();

    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDescription').value.trim();

    if (!title) {
        showError('Task title is required');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
                completed: false
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Clear form
        taskForm.reset();

        // Reload tasks
        await loadTasks();

        // Show success (optional)
        console.log('Task added successfully');
    } catch (error) {
        console.error('Error adding task:', error);
        showError('Failed to add task. Please try again.');
    }
}

// Delete task
async function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        await loadTasks();
        console.log('Task deleted successfully');
    } catch (error) {
        console.error('Error deleting task:', error);
        showError('Failed to delete task. Please try again.');
    }
}

// Toggle task completion
async function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
        const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: task.title,
                description: task.description,
                completed: !task.completed
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        await loadTasks();
    } catch (error) {
        console.error('Error updating task:', error);
        showError('Failed to update task. Please try again.');
    }
}

// Open edit modal
function openEditModal(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    document.getElementById('editTaskId').value = task.id;
    document.getElementById('editTaskTitle').value = task.title;
    document.getElementById('editTaskDescription').value = task.description || '';
    document.getElementById('editTaskCompleted').checked = task.completed;

    editModal.style.display = 'flex';
}

// Close edit modal
function closeEditModal() {
    editModal.style.display = 'none';
    editForm.reset();
}

// Handle edit task
async function handleEditTask(e) {
    e.preventDefault();

    const id = document.getElementById('editTaskId').value;
    const title = document.getElementById('editTaskTitle').value.trim();
    const description = document.getElementById('editTaskDescription').value.trim();
    const completed = document.getElementById('editTaskCompleted').checked;

    if (!title) {
        showError('Task title is required');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
                completed
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        closeEditModal();
        await loadTasks();
        console.log('Task updated successfully');
    } catch (error) {
        console.error('Error updating task:', error);
        showError('Failed to update task. Please try again.');
    }
}

// Render tasks to DOM
function renderTasks() {
    tasksList.innerHTML = '';

    if (tasks.length === 0) {
        emptyState.style.display = 'block';
        tasksList.style.display = 'none';
        return;
    }

    emptyState.style.display = 'none';
    tasksList.style.display = 'flex';

    tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        tasksList.appendChild(taskElement);
    });
}

// Create task element
function createTaskElement(task) {
    const div = document.createElement('div');
    div.className = `task-item ${task.completed ? 'completed' : ''}`;

    const createdDate = new Date(task.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    div.innerHTML = `
        <div class="task-content">
            <div class="task-title">
                ${task.completed ? '✓' : '○'} ${escapeHtml(task.title)}
                <span class="status-badge ${task.completed ? 'completed' : 'pending'}">
                    ${task.completed ? 'Completed' : 'Pending'}
                </span>
            </div>
            ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
            <div class="task-meta">
                Created: ${createdDate}
                ${task.updated_at !== task.created_at ? ` • Updated: ${new Date(task.updated_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}` : ''}
            </div>
        </div>
        <div class="task-actions">
            <button class="task-btn complete" onclick="toggleComplete(${task.id})" title="${task.completed ? 'Mark as pending' : 'Mark as complete'}">
                ${task.completed ? '↩️' : '✓'}
            </button>
            <button class="task-btn edit" onclick="openEditModal(${task.id})" title="Edit task">
                ✏️
            </button>
            <button class="task-btn delete" onclick="deleteTask(${task.id})" title="Delete task">
                🗑️
            </button>
        </div>
    `;

    return div;
}

// Update statistics
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('pendingTasks').textContent = pending;
}

// Show/hide loading indicator
function showLoading(show) {
    loadingIndicator.style.display = show ? 'block' : 'none';
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        hideError();
    }, 5000);
}

// Hide error message
function hideError() {
    errorMessage.style.display = 'none';
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Close modal when clicking outside
editModal.addEventListener('click', (e) => {
    if (e.target === editModal) {
        closeEditModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && editModal.style.display === 'flex') {
        closeEditModal();
    }
});
