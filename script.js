document.addEventListener("DOMContentLoaded", () => {
  // --- 1. State Management ---
  const state = {
    title: "Complete Q1 Performance Reviews",
    description: "Gather feedback from team leads and prepare the final performance reports for all junior developers. Ensure all metrics are aligned with company KPIs.",
    priority: "High", // Low, Medium, High
    status: "Pending", // Pending, In Progress, Done
    dueDate: (() => {
      const d = new Date();
      d.setDate(d.getDate() + 3);
      d.setHours(18, 0, 0);
      return d;
    })(),
    isExpanded: false
  };

  // --- 2. DOM Elements ---
  const el = {
    card: document.getElementById("todo-card"),
    viewMode: document.getElementById("view-mode"),
    editMode: document.getElementById("edit-mode"),
    // View Elements
    displayTitle: document.getElementById("display-title"),
    displayDesc: document.getElementById("display-desc"),
    displayPriority: document.getElementById("display-priority"),
    displayStatusBadge: document.getElementById("display-status-badge"),
    priorityIndicator: document.getElementById("priority-indicator"),
    overdueIndicator: document.getElementById("overdue-indicator"),
    statusControl: document.getElementById("status-control"),
    completeToggle: document.getElementById("complete-toggle"),
    dueDateDisplay: document.getElementById("due-date-display"),
    timeRemaining: document.getElementById("time-remaining"),
    collapseContainer: document.getElementById("todo-collapse"),
    expandToggle: document.getElementById("expand-toggle"),
    btnEdit: document.getElementById("btn-edit"),
    // Form Elements
    editTitle: document.getElementById("edit-title"),
    editDesc: document.getElementById("edit-desc"),
    editPriority: document.getElementById("edit-priority"),
    editDate: document.getElementById("edit-date"),
    btnSave: document.getElementById("btn-save"),
    btnCancel: document.getElementById("btn-cancel"),
  };

  let timeInterval;

  // --- 3. Core Logic & Render ---
  function renderView() {
    // Text bindings
    el.displayTitle.textContent = state.title;
    el.displayDesc.textContent = state.description;
    
    // Priority bindings
    el.displayPriority.textContent = state.priority;
    el.displayPriority.className = `badge priority-${state.priority.toLowerCase()}`;
    el.priorityIndicator.className = `priority-indicator ${state.priority.toLowerCase()}`;

    // Status & Checkbox bindings
    el.statusControl.value = state.status;
    el.completeToggle.checked = state.status === "Done";
    el.displayStatusBadge.textContent = state.status;
    
    const statusClassMap = { "Pending": "status-pending", "In Progress": "status-in-progress", "Done": "status-done" };
    el.displayStatusBadge.className = `badge ${statusClassMap[state.status]}`;

    // Card visual state
    el.card.classList.remove("completed", "in-progress");
    if (state.status === "Done") el.card.classList.add("completed");
    else if (state.status === "In Progress") el.card.classList.add("in-progress");

    // Static Date Format
    el.dueDateDisplay.textContent = `Due ${state.dueDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}`;

    updateTimeLogic();
    checkExpandable();
  }

  function updateTimeLogic() {
    if (state.status === "Done") {
      el.timeRemaining.textContent = "Completed";
      el.timeRemaining.classList.remove("text-danger");
      el.overdueIndicator.classList.add("hidden");
      return;
    }

    const now = new Date();
    const diffInMs = state.dueDate - now;
    const isOverdue = diffInMs < 0;
    const absMs = Math.abs(diffInMs);

    const diffInMins = Math.floor(absMs / 60000);
    const diffInHours = Math.floor(diffInMins / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    let timeStr = "";
    if (diffInDays > 0) timeStr = `${diffInDays} day${diffInDays > 1 ? "s" : ""}`;
    else if (diffInHours > 0) timeStr = `${diffInHours} hour${diffInHours > 1 ? "s" : ""}`;
    else timeStr = `${diffInMins} minute${diffInMins !== 1 ? "s" : ""}`;

    if (isOverdue) {
      el.timeRemaining.textContent = `Overdue by ${timeStr}`;
      el.timeRemaining.classList.add("text-danger");
      el.overdueIndicator.classList.remove("hidden");
    } else {
      el.timeRemaining.textContent = `Due in ${timeStr}`;
      el.timeRemaining.classList.remove("text-danger");
      el.overdueIndicator.classList.add("hidden");
    }
  }

  function checkExpandable() {
    // 1. Force the container to be collapsed momentarily to accurately measure overflow
    el.collapseContainer.classList.add("collapsed");
    const isOverflowing = el.displayDesc.scrollHeight > el.collapseContainer.clientHeight;

    // 2. Apply correct text and visual state based on actual needs
    if (state.isExpanded && isOverflowing) {
      el.collapseContainer.classList.remove("collapsed");
      el.expandToggle.textContent = "Read Less";
      el.expandToggle.setAttribute("aria-expanded", "true");
    } else {
      // If it's not expanded, OR if the text is too short to need expanding anyway
      el.collapseContainer.classList.add("collapsed");
      el.expandToggle.textContent = "Read More";
      el.expandToggle.setAttribute("aria-expanded", "false");
      state.isExpanded = false; // reset state defensively if text was edited to be short
    }

    // 3. Show or hide the toggle button based ONLY on if text is long enough to overflow
    if (isOverflowing) {
      el.expandToggle.classList.remove("hidden");
    } else {
      el.expandToggle.classList.add("hidden");
    }
  }

  function toggleEditMode(showEdit) {
    if (showEdit) {
      // Populate Form
      el.editTitle.value = state.title;
      el.editDesc.value = state.description;
      el.editPriority.value = state.priority;
      
      // Format Date for datetime-local input
      const tzoffset = state.dueDate.getTimezoneOffset() * 60000;
      const localISOTime = (new Date(state.dueDate - tzoffset)).toISOString().slice(0, 16);
      el.editDate.value = localISOTime;

      el.viewMode.classList.add("hidden");
      el.editMode.classList.remove("hidden");
      el.editTitle.focus();
    } else {
      el.viewMode.classList.remove("hidden");
      el.editMode.classList.add("hidden");
      el.btnEdit.focus(); // Return focus for a11y
    }
  }

  // --- 4. Event Listeners ---
  
  // Status Syncing
  el.statusControl.addEventListener("change", (e) => {
    state.status = e.target.value;
    renderView();
  });

  el.completeToggle.addEventListener("change", (e) => {
    if (e.target.checked) {
      state.status = "Done";
    } else {
      state.status = state.status === "Done" ? "Pending" : state.status;
    }
    renderView();
  });

  // Expand / Collapse
  el.expandToggle.addEventListener("click", () => {
    state.isExpanded = !state.isExpanded;
    checkExpandable();
  });

  // Edit Mode Flow
  el.btnEdit.addEventListener("click", () => toggleEditMode(true));

  el.btnCancel.addEventListener("click", () => toggleEditMode(false));

  el.editMode.addEventListener("submit", (e) => {
    e.preventDefault();
    state.title = el.editTitle.value;
    state.description = el.editDesc.value;
    state.priority = el.editPriority.value;
    state.dueDate = new Date(el.editDate.value);
    
    toggleEditMode(false);
    renderView();
  });

  // Initialize
  renderView();
  timeInterval = setInterval(updateTimeLogic, 30000); // Update every 30s
});