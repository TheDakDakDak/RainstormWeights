document.querySelector('#startWorkoutButton').addEventListener('click', workoutMenu);
document.querySelector('#close').addEventListener('click', closeWindow);
document.querySelector('#close2').addEventListener('click', closeWindow2);
document.querySelector('#calendar').addEventListener('click', calendarMenu);
document.querySelector('#calendarButton').addEventListener('click', dateSelect);

function workoutMenu() {
	document.querySelector('.modal').style.display = 'flex';
}

function closeWindow() {
	document.querySelector('.modal').style.display = 'none';
}

function closeWindow2() {
	document.querySelector('.modal2').style.display = 'none';
}

function calendarMenu() {
	document.querySelector('.modal2').style.display = 'flex';
}

function dateSelect() {
	let year1 = document.querySelector('#yearSelect').value;
	let month1 = document.querySelector('#monthSelect').value;
	let day1 = document.querySelector('#daySelect').value;
	
	if(window.innerWidth >= 501) {
		let date1 = `${month1} ${day1}, ${year1}`;
		document.querySelector('#today').innerText = date1;
	}
	else {
		year1 = year1.slice(-2);
		month1 = month1.slice(0, 3);
		let date1 = `${month1} ${day1}, ${year1}`;
		document.querySelector('#today').innerText = date1;
	}
	
	document.querySelector('.modal2').style.display = 'none';
}