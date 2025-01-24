document.querySelector('#startNewWorkout').addEventListener('click', workoutMenu);
document.querySelector('#close').addEventListener('click', closeWindow);

function workoutMenu() {
	document.querySelector('.modal').style.display = 'flex';
}

function closeWindow() {
	document.querySelector('.modal').style.display = 'none';
}