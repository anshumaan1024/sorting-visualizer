let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container");
let select_algo = document.getElementById("algo");
let speed = document.getElementById("speed");

let minRange = 1;
let maxRange = 60;
let numofBars = 30;
let speedFactor;
let heightFactor = 7;

let unsorted_array = new Array(numofBars);

speed.addEventListener("change", (e) => {
  speedFactor = e.target.value;
});

let algoToUse = "";

select_algo.addEventListener("change", function () {
  algoToUse = select_algo.value;
});

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray() {
  for (let i = 0; i < numofBars; i++) {
    unsorted_array[i] = randomNum(minRange, maxRange);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  createRandomArray();
  renderBars(unsorted_array);
  speedFactor = speed.value;
});

function renderBars(array) {
  for (let i = 0; i < array.length; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = array[i] * heightFactor + "px";
    bars_container.appendChild(bar);
  }
}

randomize_array.addEventListener("click", function () {
  createRandomArray();
  bars_container.innerHTML = "";
  renderBars(unsorted_array);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort(array) {
  let bars = document.getElementsByClassName("bar");

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        for (let k = 0; k < bars.length; k++) {
          if (k !== j && k !== j + 1) {
            bars[k].style.backgroundColor = "lightblue";
          }
        }

        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        bars[j].style.height = array[j] * heightFactor + "px";
        bars[j].style.backgroundColor = "lightgreen";
        // bars[j].innerText = array[j];

        bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "lightgreen";
        // bars[j+1].innerText = array[j+1];

        await sleep(speedFactor);
      }
    }
    await sleep(speedFactor);
  }

  return array;
}

async function InsertionSort(array) {
  let bars = document.getElementsByClassName("bar");

  for (let i = 1; i < array.length; i++) {
    let temp = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > temp) {
      array[j + 1] = array[j];

      bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
      bars[j + 1].style.backgroundColor = "red";
      //bars[j + 1].innerText = array[j + 1];
      await sleep(speedFactor);

      for (let k = 0; k < bars.length; k++) {
        if (k != j + 1) {
          bars[k].style.backgroundColor = "aqua";
        }
      }
      j--;
    }
    array[j + 1] = temp;
    bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
    bars[j + 1].style.backgroundColor = "lightgreen";
    //bars[j + 1].innerText = array[j + 1];
    await sleep(speedFactor);
  }

  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "aqua";
  }
  return array;
}

// merge sort
async function mergeSort(arr, startIndex = 0) {
  let bars = document.getElementsByClassName("bar");
  if (arr.length < 2) {
    return arr;
  }
  
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  
  await mergeSort(left, startIndex); // Pass the correct startIndex for left
  await mergeSort(right, startIndex + middle); // Pass the correct startIndex for right

  let i = 0;
  let j = 0;
  let k = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      arr[k] = left[i];
      i++;
    } else {
      arr[k] = right[j];
      j++;
    }

    bars[startIndex + k].style.height = arr[k] * heightFactor + "px"; // Update the correct bar
    bars[startIndex + k].style.backgroundColor = "lightgreen";
    
    await sleep(speedFactor);

    k++;
  }

  while (i < left.length) {
    arr[k] = left[i];
    bars[startIndex + k].style.height = arr[k] * heightFactor + "px";
    bars[startIndex + k].style.backgroundColor = "lightgreen";
    await sleep(speedFactor);
    i++;
    k++;
  }

  while (j < right.length) {
    arr[k] = right[j];
    bars[startIndex + k].style.height = arr[k] * heightFactor + "px";
    bars[startIndex + k].style.backgroundColor = "lightgreen";
    await sleep(speedFactor);
    j++;
    k++;
  }

  // Don't reset the colors here, keep the green until the whole array is sorted
  return arr;
}

// Reset bar colors after the entire sort is completed.
async function visualizeSort() {
  let sortedArray = await mergeSort(unsorted_array);
  
  alert("hi");
  // After sorting is complete, set the color to "aqua"
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = "aqua";
  }
}

//

sort_btn.addEventListener("click", function () {
  bubbleSort(unsorted_array);
});

sort_btn.addEventListener("click", function () {
  switch (algoToUse) {
    case "bubble":
      bubbleSort(unsorted_array);
      break;
    case "merge":
      mergeSort(unsorted_array);
      break;
    case "heap":
      HeapSort(unsorted_array);
      break;
    case "insertion":
      InsertionSort(unsorted_array);
      break;
    case "quick":
      quickSort(unsorted_array, 0, unsorted_array.length - 1);
      break;
    default:
      bubbleSort(unsorted_array);
      break;
  }
});
