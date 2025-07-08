document.querySelector('#startWorkoutButton').addEventListener('click', workoutMenu);
document.querySelector('#close').addEventListener('click', closeWindow);
document.querySelector('#close2').addEventListener('click', closeWindow2);
document.querySelector('#calendar').addEventListener('click', calendarMenu);
document.querySelector('#calendarButton').addEventListener('click', dateSelect);

const exercisesByPart = {
	chest: ["Bench Press", "Incline Bench Press", "Push-ups"],
	legs: ["Squats", "Lunges", "Leg Press"],
	arms: ["Bicep Curls", "Tricep Dips", "Hammer Curls"],
	shoulders: ["Overhead Press", "Lateral Raises", "Front Raises"],
	back: ["Pull-ups", "Deadlifts", "Bent-over Rows"]
};

document.querySelectorAll('.body-part').forEach(item => {
	item.addEventListener('click', () => {
		const part = item.dataset.part;
		showExercises(part);
	});
});

document.querySelector('#backButton').addEventListener('click', () => {
  document.querySelector('#exerciseSelect').style.display = 'none';
  document.querySelector('#bodyPartSelect').style.display = 'block';
});


function showExercises(part) {
  const exerciseList = document.querySelector('#exerciseList');
  exerciseList.innerHTML = "";

  exercisesByPart[part].forEach(exercise => {
    const li = document.createElement('li');
    li.textContent = exercise;
	li.addEventListener('click', () => {
		openRepsForm(exercise);
	});
    exerciseList.appendChild(li);
  });

  document.querySelector('#bodyPartSelect').style.display = 'none';
  document.querySelector('#exerciseSelect').style.display = 'block';
}

function openRepsForm(exerciseName) {
  document.querySelector('#exerciseHeading').textContent = exerciseName;

  document.querySelector('#exerciseSelect').style.display = 'none';
  document.querySelector('#repsForm').style.display = 'block';
}

document.querySelector('#backToExercises').addEventListener('click', () => {
  document.querySelector('#repsForm').style.display = 'none';
  document.querySelector('#exerciseSelect').style.display = 'block';
});

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