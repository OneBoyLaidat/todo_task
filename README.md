# Todo Item Card

A clean, modern, and fully accessible Todo Task Card component built with semantic HTML5, modern CSS, and vanilla JavaScript. This project was developed as part of the Frontend Wizards Stage 0 assessment, focusing on **testability**, **accessibility**, and **responsive design**.

## 🔗 Project Links
* **Live Demo:** [Click here](https://vercel.com/oneboylaidats-projects/todo-task/GtfTF6MC7RnXrmpZQ7QHYSHB4W3u)
* **Repository:** [Click here](https://github.com/OneBoyLaidat/todo_task)

---

## ✨ Features

### 1. Test-Ready Architecture
The component is built with automated testing in mind. All key elements include specific `data-testid` attributes as required by the grading criteria:
* `test-todo-card` (Root container)
* `test-todo-title` & `test-todo-description`
* `test-todo-priority` & `test-todo-status`
* `test-todo-due-date` & `test-todo-time-remaining`
* `test-todo-complete-toggle`
* `test-todo-tags` (with specific IDs for `work` and `urgent`)

### 2. Accessibility (A11y)
* **Semantic HTML:** Uses `<article>`, `<time>`, `<button>`, and `<label>` to provide meaningful context to screen readers.
* **Keyboard Navigable:** Fully operable via keyboard (Tab to navigate, Space/Enter to toggle and click).
* **Aria Labels:** Enhanced with `aria-label` for icon-only buttons and `aria-live="polite"` for dynamic time updates.
* **Contrast:** High color contrast ratios meeting WCAG AA standards.

### 3. Responsive Design
* **Fluid Layout:** Adapts seamlessly from mobile (320px) to desktop (1200px).
* **Mobile Optimized:** Transitions to a full-width vertical layout on smaller screens to ensure readability.
* **No Layout Shift:** Uses flexible box modeling (Flexbox) to prevent horizontal overflow.

### 4. Dynamic Logic
* **Real-time Clock:** Calculates "Time Remaining" (e.g., "Due in 2 days") dynamically from a fixed date.
* **Interactive State:** Toggling the completion checkbox visually updates the card (strikethrough) and changes the status badge text.

---

## 🛠️ Built With
* **HTML5** (Semantic structure)
* **CSS3** (Custom properties/variables, Flexbox, Media Queries)
* **Vanilla JavaScript** (DOM manipulation and Time logic)

---

## 📂 File Structure
```text
├── index.html   # Semantic structure and metadata
├── style.css    # Responsive styling and design system
├── script.js   # Dynamic time logic and state handling
└── README.md    # Documentation
```

---

## 📝 License
This project is open-source and available under the MIT License.