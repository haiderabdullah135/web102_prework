/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {


    // loop over each item in the data

    for (let i = 0; i < games.length; i++) {
        // Create a new div element for each game
        const gameCard = document.createElement("div");

        // Add the class "game-card" to the div's class list
        gameCard.classList.add("game-card");

        // Set the inner HTML using a template literal to display game information
        gameCard.innerHTML = `
            
            <img src="${games[i].img}" alt="${games[i].name}" class="game-img" />
            <h3>${games[i].name}</h3>
            <p> ${games[i].description}</p>
            <p>Pledged: ${games[i].pledged}</p>
            <p>Goal: ${games[i].goal}</p>
        `;

        // Append the game card to the games-container
        gamesContainer.appendChild(gameCard);
    }
  
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

addGamesToPage(GAMES_JSON)


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((sum, game) => sum + game.backers, 0);
    
    

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalPledged = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalPledged.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length;
gamesCard.innerHTML = `${totalGames}`

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
   deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const filterUnfundedOnly = GAMES_JSON.filter ( (GAMES_JSON) => 
         GAMES_JSON.pledged < GAMES_JSON.goal
    );

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(filterUnfundedOnly)

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const filterFundedOnly = GAMES_JSON.filter ( (GAMES_JSON) => 
         GAMES_JSON.pledged >= GAMES_JSON.goal
    );

    // use the function we previously created to add funded games to the DOM
    addGamesToPage(filterFundedOnly)
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON)
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly)
fundedBtn.addEventListener("click", filterFundedOnly)
allBtn.addEventListener("click", showAllGames)

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

// create a string that explains the number of unfunded games using the ternary operator
const totalRaised = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);
const totalGames1 = GAMES_JSON.length;
const unfundedGamesCount = unfundedGames.length;

const explanationString = `A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} game${totalGames !== 1 ? 's' : ''}. Currently, ${unfundedGamesCount} game${unfundedGamesCount !== 1 ? 's' : ''} remain unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
const unfundedGamesElement = document.createElement("p");
unfundedGamesElement.textContent = explanationString;
descriptionContainer.appendChild(unfundedGamesElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...remainingGames] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement("p");
firstGameElement.textContent = ` ${firstGame.name}`;
firstGameContainer.appendChild(firstGameElement);

// do the same for the runner up item
const secondGameElement = document.createElement("p");
secondGameElement.textContent = ` ${secondGame.name}`;
secondGameContainer.appendChild(secondGameElement);


// BONUS FEATURES
// CHECK OUT THE TWO EXTRA BUTTONS I ADDED 


const randomizeColorsBtn = document.getElementById("randomize-colors-btn");
const resetColorsBtn = document.getElementById("reset-colors-btn");

let colorFlowTimeoutId = null; // Variable to store the timeout ID

// Function to generate a random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to apply random colors to all elements
function applyRandomColors() {
  const elements = document.querySelectorAll("body *");
  elements.forEach(function (element) {
    const randomColor = getRandomColor();
    element.style.transition = "background-color 0.5s"; // Transition duration of 0.5 seconds
    element.style.backgroundColor = randomColor;
  });
}

// Function to continuously change the colors
function flowColors() {
  applyRandomColors();
  colorFlowTimeoutId = setTimeout(flowColors, 1000); // Change color every 1 second
}

// Function to stop color flow
function stopColorFlow() {
  clearTimeout(colorFlowTimeoutId);
  colorFlowTimeoutId = null;
}

// Event listener for the "Randomize Colors" button
randomizeColorsBtn.addEventListener("click", function () {
  stopColorFlow(); // Stop any existing color flow
  flowColors(); // Start the color flow
});

// Event listener for the "Reset Colors" button
resetColorsBtn.addEventListener("click", function () {
  stopColorFlow(); // Stop the color flow if it's running

  const elements = document.querySelectorAll("body *");
  elements.forEach(function (element) {
    element.style.backgroundColor = ""; // Reset the background color to default
  });
});
