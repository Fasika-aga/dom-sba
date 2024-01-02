document.addEventListener('DOMContentLoaded', function () {
  const taskForm = document.getElementById('taskForm');
  const taskList = document.getElementById('taskList');

  taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
  
    const title = document.getElementById('title').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;

    if (!title || !dueDate || !priority) {
      alert('Please fill in all fields.');
      return;
    }

    addTask(title, dueDate, priority);
    taskForm.reset();
  });

  function addTask(title, dueDate, priority) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task');

    const taskDetails = document.createElement('div');
    taskDetails.innerHTML = `
      <span>${title}</span>
      <span>${dueDate}</span>
      <span>${priority}</span>
    `;
    taskItem.appendChild(taskDetails);

    const taskActions = document.createElement('div');
    const editButton = createButton('Edit', () => editTask(taskItem));
    const completeButton = createButton('Complete', () => completeTask(taskItem));
    const deleteButton = createButton('Delete', () => deleteTask(taskItem));

    taskActions.appendChild(editButton);
    taskActions.appendChild(completeButton);
    taskActions.appendChild(deleteButton);

    taskItem.appendChild(taskActions);
    taskList.appendChild(taskItem);
  }

  function editTask(taskItem) {
    const taskDetails = taskItem.querySelector('.taskDetails');
    const [title, dueDate, priority] = Array.from(taskDetails.children).map(span => span.innerText);

    const newTitle = prompt('Edit Title:', title);
    const newDueDate = prompt('Edit Due Date:', dueDate);
    const newPriority = prompt('Edit Priority:', priority);

    if (newTitle && newDueDate && newPriority) {
      taskDetails.innerHTML = `
        <span>${newTitle}</span>
        <span>${newDueDate}</span>
        <span>${newPriority}</span>
      `;
    }
  }

  function completeTask(taskItem) {
    taskItem.classList.toggle('completed');
  }

  function deleteTask(taskItem) {
    taskItem.remove();
  }

  function createButton(text, onClick) {
    const button = document.createElement('button');
    button.innerText = text;
    button.addEventListener('click', onClick);
    return button;
  }
});
