
document.getElementById('time-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const years = parseInt(document.getElementById('years').value);
    const dream = document.getElementById('dream').value;

    document.getElementById('dream-display').textContent = `OBJETIVO: ${dream}`;
    createDashboard(years);

    document.getElementById('time-form').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
});

function createDashboard(years) {
    const weeks = years * 52;

    for (let i = 1; i <= weeks; i++) {
        const goalBox = document.createElement('div');
        goalBox.classList.add('goal-box');
        goalBox.textContent = i;

        if (i !== 1) {
            goalBox.classList.add('disabled'); // Desactivar semanas posteriores
        }

        goalBox.addEventListener('click', () => openModal(i, goalBox));
        document.getElementById('goal-boxes').appendChild(goalBox);
    }
}

function openModal(week, goalBox) {
    if (goalBox.classList.contains('disabled')) {
        return;
    }

    const modal = document.getElementById('modal');
    const goalText = document.getElementById('goal-text');
    const confirmGoalButton = document.getElementById('confirm-goal');
    const completeGoalButton = document.getElementById('complete-goal');
    const uncompleteGoalButton = document.getElementById('uncomplete-goal');
    const closeModalButton = document.querySelector('.modal-content .close-btn');

    // Configura el modal según el estado actual de la meta
    if (goalBox.classList.contains('completed') || goalBox.classList.contains('uncompleted')) {
        goalText.value = goalBox.getAttribute('data-goal') || '';
        goalText.setAttribute('readonly', true);
        confirmGoalButton.style.display = 'none';
    } else {
        goalText.value = goalBox.getAttribute('data-goal') || '';
        goalText.removeAttribute('readonly');
        confirmGoalButton.style.display = 'block';
    }

    // Configura los botones del modal
    confirmGoalButton.onclick = () => {
        const goal = goalText.value.trim();
        if (goal) {
            goalBox.setAttribute('data-goal', goal);
            goalBox.classList.add('pending'); // Marca la meta como pendiente
            goalBox.classList.remove('completed', 'uncompleted');
            modal.style.display = 'none';
            // No actualizamos la barra de progreso aquí
        }
    };

    completeGoalButton.onclick = () => {
        if (goalBox.classList.contains('pending') || goalBox.classList.contains('uncompleted'))  {
                goalBox.classList.remove('pending');
                goalBox.classList.remove('uncompleted');
                goalBox.classList.add('completed');
                enableNextWeek(week);
                updateProgressBar();
                modal.style.display = 'none';
        }
    };

    uncompleteGoalButton.onclick = () => {
        if (goalBox.classList.contains('pending') || goalBox.classList.contains('completed'))   {
                goalBox.classList.remove('pending');
                goalBox.classList.remove('completed');
                goalBox.classList.add('uncompleted');
                enableNextWeek(week);
                updateProgressBar();
                modal.style.display = 'none';
        }
    };

    // Cerrar el modal cuando se hace clic en el botón de cerrar
    closeModalButton.onclick = () => {
        modal.style.display = 'none';
    };

    // Muestra el modal
    modal.style.display = 'flex';
}

function enableNextWeek(currentWeek) {
    const nextWeekBox = document.querySelector(`.goal-box:nth-child(${currentWeek + 1})`);
    if (nextWeekBox && (document.querySelector(`.goal-box:nth-child(${currentWeek})`).classList.contains('completed') || 
                        document.querySelector(`.goal-box:nth-child(${currentWeek})`).classList.contains('uncompleted'))) {
        nextWeekBox.classList.remove('disabled');
        animateNextWeek(nextWeekBox); // Animar la siguiente semana desbloqueada
    }
}

function animateNextWeek(box) {
    if (!box.classList.contains('completed') && !box.classList.contains('uncompleted') && !box.classList.contains('disabled')) {
        box.classList.add('blinking');
        // Detener el parpadeo cuando se confirme
        box.addEventListener('click', () => {
            box.classList.remove('blinking');
        }, { once: true });
    }
}

function updateProgressBar() {
    const totalWeeks = document.querySelectorAll('.goal-box').length;
    const completedWeeks = document.querySelectorAll('.goal-box.completed').length;
    const uncompletedWeeks = document.querySelectorAll('.goal-box.uncompleted').length;
    const pendingWeeks = document.querySelectorAll('.goal-box.pending').length;

    const totalMarked = completedWeeks + uncompletedWeeks + pendingWeeks;
    const barWidth = totalMarked / totalWeeks * 100;

    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = barWidth + '%';

    const completionRate = totalMarked ? (completedWeeks / totalMarked) * 100 : 0;

    // Ajustar el color de la barra de progreso
    if (completionRate >= 75) {
        progressBar.style.backgroundColor = '#4caf50'; // Verde
    } else if (completionRate >= 25) {
        progressBar.style.backgroundColor = '#fbc02d'; // Amarillo
    } else {
        progressBar.style.backgroundColor = '#f44336'; // Rojo
    }

    // Actualizar el color de las metas
    document.querySelectorAll('.goal-box.pending').forEach(box => {
        box.style.backgroundColor = ''; // Sin color para metas pendientes
    });
    document.querySelectorAll('.goal-box.completed').forEach(box => {
        box.style.backgroundColor = '#4caf50'; // Verde para metas completadas
    });
    document.querySelectorAll('.goal-box.uncompleted').forEach(box => {
        box.style.backgroundColor = '#f44336'; // Rojo para metas no completadas
    });
}

// Estilo para los botones
const completeGoalButton = document.getElementById('complete-goal');
const uncompleteGoalButton = document.getElementById('uncomplete-goal');

completeGoalButton.style.backgroundColor = '#4caf50'; // Verde
uncompleteGoalButton.style.backgroundColor = '#f44336'; // Rojo


function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('collapsed');
}
