// FILE: script.js
/*
Documentation: I used https://www.w3schools.com/howto/howto_js_progressbar.asp
to learn how to make a progress bar. I also used https://www.w3schools.com/js/js_htmldom.asp
to learn how to edit the DOM with JS like appending an item / removing an item etc.
*/

// complete the TODO comments

// Get references to page elements
const button = document.getElementById("makeSmoothie");
const outputDiv = document.getElementById("output");
const progressBar = document.getElementById("progress");
const timerTime = 6000;
let progressTimer = null;

// Helper function to display messages on the page
function showMessage(message) {
  const p = document.createElement("p");
  p.textContent = message;
  outputDiv.appendChild(p);
}

// Helper function that returns a Promise that resolves after a delay
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function setProgress(percent) {
  progressBar.style.width = percent + "%";
}

function resetProgress() {
  setProgress(0);
}

function startProgress(totalMs) {
    const start = Date.now();
    
    progressTimer = setInterval(() => {
        const elapsed = Date.now() - start;
        const percent = Math.min(100, (elapsed / totalMs) * 100);
        setProgress(percent);
    }, 50);
    return progressTimer;
}

/* =========================
   PART 1 - PROMISE FUNCTIONS
========================= */

// Step 1: Get ingredients
function getIngredients() {
  // TODO:
  // 1. Show message: "Gathering ingredients..."
  // 2. Wait 2 seconds using wait()
  // 3. Resolve with "Ingredients ready"

  return new Promise((resolve, reject) => {
    showMessage("Gathering ingredients...");
    wait(2000).then(() => {
      resolve("Ingredients ready");
    });
  });
}

// Step 2: Blend smoothie
function blendSmoothie() {
  // TODO:
  // 1. Show message: "Blending smoothie..."
  // 2. Wait 3 seconds
  // 3. Sometimes FAIL (see assignment instructions)
  // 4. Otherwise resolve with "Smoothie blended"

  return new Promise((resolve, reject) => {
    showMessage("Blending smoothie...");
    wait(3000).then(() => {
      const fail = Math.random() < 0.3;
      if (fail) {
        reject("Blending failed. Try again.");
      } else {
        resolve("Smoothie blended");
      }
    });
  });
}

// Step 3: Pour smoothie
function pourSmoothie() {
  // TODO:
  // 1. Show message: "Pouring into cup..."
  // 2. Wait 1 second
  // 3. Resolve with "Smoothie is ready!"

  return new Promise((resolve, reject) => {
    showMessage("Pouring into cup...");
    wait(1000).then(() => {
      resolve("Smoothie is ready!");
    });
  });
}

/* =========================
   PART 2 - PROMISE CHAIN VERSION
========================= */

function makeSmoothieWithPromises() {
  outputDiv.innerHTML = ""; // Clear previous messages
  resetProgress();

  if (progressTimer !== null) {
    clearInterval(progressTimer);
  }

  button.disabled = true;
  progressTimer = startProgress(timerTime);

  // TODO: Chain the steps in order using .then()
  // getIngredients()
  //   .then(...)
  //   .then(...)
  //   .then(...)
  //   .catch(...)
  return getIngredients()
    .then((msg) => {
      showMessage(msg);
      return blendSmoothie();
    })
    .then((msg) => {
      showMessage(msg);
      return pourSmoothie();
    })
    .then((msg) => {
      showMessage(msg);
      setProgress(100);
    })
    .catch((err) => {
      showMessage("ERROR: " + err);
    })
    .finally(() => {
      clearInterval(progressTimer);
      button.disabled = false;
    });
}

/* =========================
   PART 3 - ASYNC/AWAIT VERSION
========================= */

async function makeSmoothieAsync() {
  outputDiv.innerHTML = ""; // Clear previous messages
  resetProgress();

  if (progressTimer !== null) {
    clearInterval(progressTimer);
  }

  button.disabled = true;
  progressTimer = startProgress(timerTime);

  // TODO:
  // Use try/catch
  // await getIngredients()
  // await blendSmoothie()
  // await pourSmoothie()
  // Show final success message
  // Catch and display any errors
  try {
    const msg1 = await getIngredients();
    showMessage(msg1);

    const msg2 = await blendSmoothie();
    showMessage(msg2);

    const msg3 = await pourSmoothie();
    showMessage(msg3);

    setProgress(100);
  } catch (err) {
    showMessage("ERROR: " + err);
  } finally {
    clearInterval(progressTimer);
    button.disabled = false;
  }
}

button.addEventListener("click", makeSmoothieAsync);
// button.addEventListener("click", makeSmoothieWithPromises);