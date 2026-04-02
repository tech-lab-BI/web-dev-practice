document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addBtn");
  const clearBtn = document.getElementById("clearBtn");
  const taskInput = document.getElementById("taskInput");
  const deadlineDate = document.getElementById("deadlineDate");
  const deadlineTime = document.getElementById("deadlineTime");
  const taskList = document.getElementById("taskList");
  const completedTable = document.getElementById("completedTable");
  const giveUpTable = document.getElementById("giveUpTable");

  let activeTasks = JSON.parse(localStorage.getItem("activeTasks")) || [];
  let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
  let giveUpTasks = JSON.parse(localStorage.getItem("giveUpTasks")) || [];

  function formatDeadline(date, time) {
    if (!date && !time) return "No deadline";
    return `${date || ""} ${time || ""}`.trim();
  }

  function saveData() {
    localStorage.setItem("activeTasks", JSON.stringify(activeTasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    localStorage.setItem("giveUpTasks", JSON.stringify(giveUpTasks));
  }

  function updateTables() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Completed
    completedTable.innerHTML = "<tr><th>Task</th><th>Deadline</th><th>Date Completed</th></tr>";
    completedTasks.filter(t => new Date(t.dateObj) >= sevenDaysAgo)
      .forEach(t => {
        completedTable.innerHTML += `<tr><td>${t.task}</td><td>${t.deadline}</td><td>${t.dateStr}</td></tr>`;
      });

    // Give Up
    giveUpTable.innerHTML = "<tr><th>Task</th><th>Deadline</th><th>Date Given Up</th></tr>";
    giveUpTasks.filter(t => new Date(t.dateObj) >= sevenDaysAgo)
      .forEach(t => {
        giveUpTable.innerHTML += `<tr><td>${t.task}</td><td>${t.deadline}</td><td>${t.dateStr}</td></tr>`;
      });
  }

  function renderActiveTasks() {
    taskList.innerHTML = "";

    if (activeTasks.length === 0) {
      const li = document.createElement("li");
      li.textContent = "🎉 There are no pending tasks!";
      li.style.textAlign = "center";
      li.style.fontStyle = "italic";
      li.style.opacity = "0.8";
      taskList.appendChild(li);
      return;
    }

    activeTasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="task-text">${task.text} <small>[${task.deadline}]</small></span>
        <div class="task-actions">
          <button class="complete">Complete</button>
          <button class="skip">Skip</button>
          <button class="giveup">Give Up</button>
        </div>
      `;

      li.querySelector(".complete").addEventListener("click", () => {
        const now = new Date();
        completedTasks.push({
          task: task.text,
          deadline: task.deadline,
          dateObj: now.toISOString(),
          dateStr: now.toLocaleString()
        });
        activeTasks.splice(index, 1);
        saveData();
        updateTables();
        renderActiveTasks();
      });

      li.querySelector(".skip").addEventListener("click", () => {
        activeTasks.splice(index, 1);
        saveData();
        renderActiveTasks();
      });

      li.querySelector(".giveup").addEventListener("click", () => {
        const now = new Date();
        giveUpTasks.push({
          task: task.text,
          deadline: task.deadline,
          dateObj: now.toISOString(),
          dateStr: now.toLocaleString()
        });
        activeTasks.splice(index, 1);
        saveData();
        updateTables();
        renderActiveTasks();
      });

      taskList.appendChild(li);
    });
  }

  addBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const deadline = formatDeadline(deadlineDate.value, deadlineTime.value);

    activeTasks.push({ text: taskText, deadline });
    saveData();
    renderActiveTasks();

    taskInput.value = "";
    deadlineDate.value = "";
    deadlineTime.value = "";
  });

  clearBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all tasks and history?")) {
      localStorage.clear();
      activeTasks = [];
      completedTasks = [];
      giveUpTasks = [];
      updateTables();
      renderActiveTasks(); // ✅ ensures "no pending tasks" message shows
    }
  });

  // Initialize
  renderActiveTasks();
  updateTables();
});
