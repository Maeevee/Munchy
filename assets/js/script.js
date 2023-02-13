/* ------------------------------------------------------------------------------------------------------------
_______________________________________________________________________________________________________________
PLEASE DO NOT UNCOMMENT ANYTHING lines (0-81) IT IS ALL OLD CODE AND NOT REQUIRED -LMB
It is just for reference -LMB
_______________________________________________________________________________________________________________
----------------------------------------------------------------------------------------------------------------*/


// https://rapidapi.com/apininjas/api/recipe-by-api-ninjas/ API for recipies
// https://rapidapi.com/OthmaneDch/api/unsplash-data API for pictures

// Calling API via set variable to test it works. Using prewritten script provided by API creator.  LMB
//can confirm logs results to the console. LMB

// var query = "tomato,+pepper,+chicken,+chilli";
/* var query1 = 'onion';
var query2 = 'pepper';
var query3 = 'squid';
var query4= 'salt';
var query5 = 'goat'; */

/* var queryURL = "https://api.api-ninjas.com/v1/recipe?query=" + query;

$.ajax({
  method: "GET",
  url: "https://api.api-ninjas.com/v1/recipe?query=" + query,
  headers: { "X-Api-Key": "bZu0ZOwBF15SEqwaXPoUXw==n56gNADIHBpQ7qQ8" },
  contentType: "application/json",
  success: function (result) {
    console.log(result);
  },
  error: function ajaxError(jqXHR) {
    console.error("Error: ", jqXHR.responseText);
  },
}); */

// Testing Image API  via set variable to test it works.
// can confirm logs results to console. LMB

/* var imageUrl =
  "https://api.unsplash.com/search/photos?query=" +
  query +
  "&client_id=F91nJPADfVSVs_j2oN1I1jehSaooQhBgWfHLIZC3s68";

$.ajax({
  url: imageUrl,
  method: "GET",
}).then(function (response) {
  console.log(response);
}); */

//testing spoonacular
// can confirm returns results to console and accepts 3-4 ingredients before returning minimal responses LMB

/* var spoonUrl =
  "https://api.spoonacular.com/food/products/search?query=" +
  query  +
  "&apiKey=9c88fb14be5b4d66addb8409a32751dc";

$.ajax({
  url: spoonUrl,
  method: "GET",
}).then(function (response) {
  console.log(response);
}); */

/*
$(document).ready(function () {
    // get user input when the get recipe button clicked
    $('#getRecipeBtn').click(function () {
        const recipe = $('#search-input').val();
        // get recipe
        getRecipe(recipe);
    });
});

//function for fetching recipe api
function getRecipe(recipe){

}
*/

$(".getRecipeBtn").on("click", function (event) {
  event.preventDefault();

  query = $("#search-input").val().trim();

  console.log(query);

  getRecipe();
});

function getRecipe() {
  var queryUrl =
    "https://api.spoonacular.com/recipes/complexSearch?query=" +
    query +
    "&apiKey=10792371edf64bb5a7cade783da745a0";

  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    // display data to html

    for (let i = 0; i < response.results.length; i++) {
      console.log(response.results[i]);

      //Creating extra wrap element and icon for cards

      // var cardDiv = $("<div>");
      // var cardBody = $("<div>");
      // var recipeImg = $("<img>");
      // var cardTitle = $("<h3>");
      // var cardId = $("#response.results[i].id");
      // var cardStyle = $(".cardStyle");

      var cardDiv = $("<div>");
      var cardBody = $("<div>");
      var recipeImg = $("<img>");
      var cardTextContainer = $("<div>");
      var cardTitle = $("<h3>");
      var cardIconButton = $("<a>");
      var cardIcon = $("<i>");
      var cardId = $("#response.results[i].id");
      var cardStyle = $(".cardStyle");
      //--------------------------------------------

      cardTitle.text(response.results[i].title);
      recipeImg.attr("src", response.results[i].image);

      console.log(response.results[i].title);
      console.log(response.results[i].image);

      // cardBody.append(cardTitle);
      // cardBody.append(recipeImg);
      // cardDiv.append(cardBody);
      // $("#cardContainer").append(cardDiv);

      cardBody.append(recipeImg);
      cardBody.append(cardTextContainer);
      cardTextContainer.append(cardTitle);
      cardTextContainer.append(cardIconButton);
      cardIconButton.append(cardIcon);
      cardDiv.append(cardBody);
      $("#cardContainer").append(cardDiv);
      //--------------------------------------------

      // Cards
        
        //Creating cards
        cardDiv.addClass("col");
        cardBody.addClass("card h-100 text-dark bg-light mb-3");
        recipeImg.addClass("card-img-top p-4");
        cardTitle.addClass("card-title m-2");
        //Create heart icon
        cardTextContainer.addClass("card-body d-flex flex-row justify-content-between");
        cardIconButton.addClass("iconButton");
        cardIcon.addClass("las la-heart");

        cardIcon.attr("id", response.results[i].id);
        cardIconButton.attr("onClick", "addToFavourite("+ response.results[i].id +")");

        
    }
  });
}

function addToFavourite(id){
  console.log("added {} to favourite", id)
  $("#" + id).toggleClass("favourite");
}

// get recipe information using id from get recipe
//var recipeUrl = 'https://api.spoonacular.com/recipes/' + recipeID + '/information&apiKey=6f5b740887744617a3980e15981b89e9'

/* comment */
