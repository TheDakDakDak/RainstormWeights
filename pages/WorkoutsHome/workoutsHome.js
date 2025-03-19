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
	let dateInput = document.querySelector('#dateData').value;
	let [year1, month1, day1] = dateInput.split("-");
	
	switch (month1) {
        case "01": month1 = "Jan"; break;
        case "02": month1 = "Feb"; break;
        case "03": month1 = "Mar"; break;
        case "04": month1 = "Apr"; break;
        case "05": month1 = "May"; break;
        case "06": month1 = "Jun"; break;
        case "07": month1 = "Jul"; break;
        case "08": month1 = "Aug"; break;
        case "09": month1 = "Sep"; break;
        case "10": month1 = "Oct"; break;
        case "11": month1 = "Nov"; break;
        case "12": month1 = "Dec"; break;
    }
	document.querySelector('#today').innerText = `${month1} ${day1}, ${year1}`;
	
	
	document.querySelector('.modal2').style.display = 'none';
}