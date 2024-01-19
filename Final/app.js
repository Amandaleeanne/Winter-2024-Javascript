// Sample data for favorites and tasks
const favoriteWebsites = [
    { name: 'Example', icon: '🌐', url: 'https://example.com' },
    // Add more favorites as needed
  ];
  
  const tasks = [
    'Sample Task 1',
    'Sample Task 2',
    // Add more tasks as needed
  ];
  
  // Function to initialize the page
  function initializePage() {
    renderFavorites();
    renderTasks();
  }
  
  // Function to render favorite websites
  function renderFavorites() {
    const favoritesContainer = document.querySelector('.favorites');
    favoritesContainer.innerHTML = '';
  
    favoriteWebsites.forEach((favorite) => {
      const favoriteBox = document.createElement('div');
      favoriteBox.classList.add('favorite-box');
      favoriteBox.innerHTML = `<div>${favorite.icon}</div><div>${favorite.name}</div>`;
      favoriteBox.addEventListener('click', () => window.open(favorite.url, '_blank'));
      favoritesContainer.appendChild(favoriteBox);
    });
  }
  
  // Function to render tasks
  function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
  
    tasks.forEach((task, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = task;
      listItem.addEventListener('click', () => toggleTask(index));
      taskList.appendChild(listItem);
    });
  }
  
  // Function to add a task
  function addTask() {
    const taskInput = document.getElementById('taskInput');
    const newTask = taskInput.value.trim();
  
    if (newTask !== '') {
      tasks.push(newTask);
      taskInput.value = '';
      renderTasks();
    }
  }
  
  // Function to toggle task completion
  function toggleTask(index) {
    tasks[index] = tasks[index].startsWith('✅ ') ? tasks[index].substring(2) : `✅ ${tasks[index]}`;
    renderTasks();
  }
  
  // Initialize the page
  initializePage();
  