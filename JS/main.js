// Get the json file
async function fetchJSONFile(callback) {
  try {
    const response = await fetch("JS/data.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const jsonData = await response.json();
    callback(jsonData);
  } catch (error) {
    console.error("Error fetching or parsing JSON file:", error);
  }
}

// Fetch the json file and update the DOM
fetchJSONFile((data) => {
  const status = {
    Excellent:
      "You scored higher than 90% of the people who have taken these tests.",
    Great:
      "You scored higher than 65% of the people who have taken these tests.",
    Good: "You scored higher than 50% of the people who have taken these tests.",
    Failed: "You scored lower than 50% Please try again.",
  };
  let totalScore = 0;
  let average = 0;
  const icons = document.querySelectorAll(".summary-icon");
  const categories = document.querySelectorAll(
    `#summary-content h2 > span:last-child`
  );
  for (let i = 0; i < 4; i++) {
    // update category score in the dom
    document.querySelector(
      `#summary-${data[i].category.toLowerCase()} > p > span:first-child`
    ).textContent = data[i].score;
    icons[i].src = data[i].icon;
    categories[i].textContent = data[i].category;
    // calculate total score
    totalScore += data[i].score;
  }
  // update average score
  average = Math.round((totalScore / 400) * 100);
  // update the average score in the dom
  document.querySelector("#result-circel > span:first-child").textContent =
    average;
  // update the result content in the dom
  document.querySelector("#main-component").classList.remove("hidden");
  let state =
    (average >= 90 && "Excellent") ||
    (average >= 65 && "Great") ||
    (average >= 50 && "Good") ||
    "Failed";
  document.querySelector("#result-contnet > h2").textContent = state;
  document.querySelector("#result-contnet > p").textContent = status[state];
});
