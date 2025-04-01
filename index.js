document.addEventListener("DOMContentLoaded", main);

const baseURL = "http://localhost:3000/ramens";

function main() {
  displayRamens();
  addSubmitListener();
}

// Fetch all ramen data and display images
function displayRamens() {
  fetch(baseURL)
    .then((response) => response.json())
    .then((ramens) => {
      ramens.forEach((ramen) => {
        const img = document.createElement("img");
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener("click", () => handleClick(ramen));
        document.getElementById("ramen-menu").appendChild(img);
      });
    });
}

// Display ramen details in the detail section
function handleClick(ramen) {
  document.querySelector("#ramen-detail img").src = ramen.image;
  document.querySelector("#ramen-detail img").alt = ramen.name;
  document.querySelector("#ramen-detail h2").textContent = ramen.name;
  document.querySelector("#ramen-detail h3").textContent = ramen.restaurant;
  document.querySelector("#rating-display").textContent = ramen.rating;
  document.querySelector("#comment-display").textContent = ramen.comment;
}

// Add event listener to the new ramen form
function addSubmitListener() {
  const form = document.getElementById("new-ramen");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const newRamen = {
      name: event.target["new-name"].value,
      restaurant: event.target["new-restaurant"].value,
      image: event.target["new-image"].value,
      rating: event.target["new-rating"].value,
      comment: event.target["new-comment"].value,
    };

    // Dynamically add the new ramen to the menu
    const img = document.createElement("img");
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.addEventListener("click", () => handleClick(newRamen));
    document.getElementById("ramen-menu").appendChild(img);

    form.reset(); // Clear form after submission
  });
}
