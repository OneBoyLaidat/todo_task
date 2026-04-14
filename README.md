# Todo Item Card - Stage 1 Update

A clean, modern, and fully accessible Todo Task Card component built with semantic HTML5, modern CSS, and vanilla JavaScript. This project was developed for the HNG Internship 14 Frontend Wizards assessment, evolving from a static Stage 0 display into a **stateful, interactive component**.

## 🔗 Project Links

* **Live Demo:** [See Live Demo](https://todo-task-plum.vercel.app/)
* **Repository:** [Go to repository](https://github.com/OneBoyLaidat/todo_task)

---

## ✨ Features (Stage 1a Enhancements)

### 1. Advanced Test-Ready Architecture
In addition to the Stage 0 IDs, the component now includes all required interactive test attributes:
* `test-todo-edit-form` (The dynamic edit state)
* `test-todo-status-control` (Status transition dropdown)
* `test-todo-priority-indicator` (Visual priority accent)
* `test-todo-expand-toggle` & `test-todo-collapsible-section`
* `test-todo-overdue-indicator` (Dynamic deadline warning)

### 2. State-Driven Interaction
The card now functions as a mini-app with a centralized JavaScript state.
* **Edit Mode:** Clicking the edit button swaps the view for a form. Changes are validated and saved back to the state, or discarded via "Cancel."
* **Status Synchronization:** The checkbox and status dropdown are linked. Marking a task "Done" via the checkbox automatically updates the dropdown and applies a strike-through style.
* **Priority Indicator:** A color-coded left-border accent changes based on the priority level (High, Medium, or Low), providing a second layer of visual hierarchy.

### 3. Smart Time & Overdue Logic
The timer has been upgraded for precision:
* **Granular Messaging:** Instead of just days, it now calculates hours and minutes (e.g., "Due in 3 hours").
* **Overdue States:** If a deadline passes, the card displays an "Overdue" badge and red text logic.
* **Post-Completion:** Once a task is marked "Done," the time logic stops and is replaced by a static "Completed" status.

### 4. Accessibility & UI Fixes
* **ARIA & Focus:** Implemented `aria-expanded` for the collapsible section. Focus is trapped inside the Edit Form and programmatically returned to the Edit button when closed.
* **Collapsible Logic:** Fixed a bug where the "Read More" button would break after the first click. The logic now forces a hidden re-calculation of the text height to ensure the button only shows when text actually overflows.

---

## 🛠️ Changes & Design Decisions (The "Why")

* **Why State Management?** To prevent the UI from getting out of sync. By using a single JavaScript object to track the task, we ensure that changing the status in the dropdown also updates the checkbox and the "Completed" text simultaneously.
* **Why the Collapsible Fix?** In the previous iteration, measuring an expanded container would report it as "not overflowing," causing the toggle to disappear. The new logic measures the text in a collapsed state *before* rendering to ensure the button stays visible as long as the content is long.
* **Why the Priority Accent?** Accessibility guidelines suggest not relying on color alone. The left border accent reinforces the priority level for users who may miss the smaller text badge.

---

## 📂 File Structure

```text
├── index.html   # Updated with Edit Mode forms and collapsible containers
├── style.css    # Responsive styling for form fields and priority indicators
├── script.js    # New: Centralized state logic, time intervals, and focus handling
└── README.md    # Documentation for Stage 1a