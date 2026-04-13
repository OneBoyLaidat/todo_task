document.addEventListener('DOMContentLoaded', () => {
    // 1. Set a fixed due date (e.g., 3 days from now)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 3);
    dueDate.setHours(18, 0, 0);

    const dueDateDisplay = document.getElementById('due-date-display');
    const timeRemainingDisplay = document.getElementById('time-remaining');
    const completeToggle = document.getElementById('complete-toggle');
    const todoCard = document.getElementById('todo-card');
    const statusText = document.getElementById('status-text');

    // Format the date nicely
    const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    dueDateDisplay.textContent = `Due ${dueDate.toLocaleDateString('en-US', dateOptions)}`;

    // 2. Logic for Time Remaining
    function updateTimeRemaining() {
        const now = new Date();
        const diffInMs = dueDate - now;
        
        if (diffInMs <= 0) {
            timeRemainingDisplay.textContent = "Overdue!";
            return;
        }

        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInDays > 0) {
            timeRemainingDisplay.textContent = `Due in ${diffInDays} day${diffInDays > 1 ? 's' : ''}`;
        } else if (diffInHours > 0) {
            timeRemainingDisplay.textContent = `Due in ${diffInHours} hour${diffInHours > 1 ? 's' : ''}`;
        } else {
            timeRemainingDisplay.textContent = "Due now!";
        }
    }

    // 3. Handle Completion Toggle
    completeToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            todoCard.classList.add('completed');
            statusText.textContent = "Done";
            statusText.className = "badge status-done";
        } else {
            todoCard.classList.remove('completed');
            statusText.textContent = "Pending";
            statusText.className = "badge status-pending";
        }
    });

    // 4. Dummy button actions
    document.querySelectorAll('.icon-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const action = e.target.getAttribute('aria-label');
            if (action.includes('Delete')) {
                alert('Delete action triggered');
            } else {
                console.log('Edit action triggered');
            }
        });
    });

    // Initialize time display
    updateTimeRemaining();
    // Refresh every 60 seconds
    setInterval(updateTimeRemaining, 60000);
});