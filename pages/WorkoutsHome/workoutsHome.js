let currentWorkout = {
  date: null,
  workout: []
};

let currentExercise = null;


document.querySelector('#startWorkoutButton').addEventListener('click', workoutMenu);
document.querySelector('#plussignclass').addEventListener('click', workoutMenu);
document.querySelector('#close').addEventListener('click', closeWindow);
document.querySelector('#close2').addEventListener('click', closeWindow2);
document.querySelector('#calendar').addEventListener('click', calendarMenu);
document.querySelector('#calendarButton').addEventListener('click', dateSelect);
document.querySelector('#saveSet').addEventListener('click', () => {
  const reps = document.querySelector('#repsInput').value;
  const weight = document.querySelector('#weightInput').value;

  if (!reps || !weight || !currentExercise) return; //checks to make sure that reps and weight fields have been filled in.

  //Checks whether the selected exercise is already in the list of today's exercises.
  let exerciseEntry = currentWorkout.workout.find(e => e.exercise === currentExercise);

  //If not, add it
  if (!exerciseEntry) {
    exerciseEntry = {
      exercise: currentExercise,
      sets: []
    };
    currentWorkout.workout.push(exerciseEntry);
  }

  // Add the set
  exerciseEntry.sets.push({ reps: Number(reps), weight: Number(weight) });
  let savedWorkouts = JSON.parse(localStorage.getItem('savedWorkouts')) || [];
    // Check if today's workout is already saved
  const existingIndex = savedWorkouts.findIndex(w => w.date === currentWorkout.date);

  if (existingIndex !== -1) {
    savedWorkouts[existingIndex] = currentWorkout;
  } else {
    savedWorkouts.push(currentWorkout);
  }

  localStorage.setItem('savedWorkouts', JSON.stringify(savedWorkouts));

  // Clear inputs for the next set
  document.querySelector('#repsInput').value = '';
  document.querySelector('#weightInput').value = '';

  alert(`Set saved for ${currentExercise}`);
});

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
  currentExercise = exerciseName;
  document.querySelector('#exerciseHeading').textContent = exerciseName;
  document.querySelector('#exerciseSelect').style.display = 'none';
  document.querySelector('#repsForm').style.display = 'block';
}

document.querySelector('#backToExercises').addEventListener('click', () => {
  document.querySelector('#repsForm').style.display = 'none';
  document.querySelector('#exerciseSelect').style.display = 'block';
});

function workoutMenu() {
  const dateText = new Date().toISOString().split("T")[0];
  currentWorkout.date = dateText;

  // load whatever's already saved for today (or start fresh)
  const saved = JSON.parse(localStorage.getItem('savedWorkouts')) || [];
  const todayEntry = saved.find(w => w.date === dateText);
  currentWorkout.workout = todayEntry
    ? JSON.parse(JSON.stringify(todayEntry.workout)) // clone array
    : [];

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

function displayTodaysWorkout() {
  const container = document.getElementById("exerciseSummaryContainer");
  container.innerHTML = ""; // ✅ only clear once

  const workouts = JSON.parse(localStorage.getItem("savedWorkouts")) || [];
  const today = new Date().toISOString().split("T")[0];

  const todaysWorkout = workouts.find(w => w.date === today);
  if (!todaysWorkout) return;

  // ✅ Hide main if workout exists
  const mainElement = document.querySelector("main");
  if (mainElement) mainElement.style.display = "none";

  // ✅ Loop through all exercises and render them
  todaysWorkout.workout.forEach(entry => {
    const box = document.createElement("div");
    box.classList.add("exercise-box");

    const heading = document.createElement("h3");
    heading.textContent = entry.exercise;
    box.appendChild(heading);

	let setCount = 1;
    // Add each set as a paragraph
    entry.sets.forEach(set => {
      const p = document.createElement("p");
      p.textContent = `${setCount}: ${set.weight}lbs, ${set.reps} reps`;
      box.appendChild(p);
	  setCount++
    });

    container.appendChild(box); // ✅ Append this box to the container
  });
}

window.addEventListener("DOMContentLoaded", () => {
  displayTodaysWorkout();
});