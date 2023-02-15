const apiKey = "b5de46c0215a4ae984eacc71b7e57a64";

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
    "&apiKey=" + apiKey;

  let favouriteMap;
  if (getFromStorage('favourite') != null) {
    favouriteMap = new Map(Object.entries(getFromStorage('favourite')));
  }

  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    // display data to html

    for (let i = 0; i < response.results.length; i++) {
      console.log(response.results[i]);

      var recipeId = response.results[i].id;
      var queryUrl2 =
        "https://api.spoonacular.com/recipes/" +
        recipeId +
        "/information?&apiKey=" + apiKey;

      $.ajax({
        url: queryUrl2,
        method: "GET",
      }).then(function (response1) {
        console.log(response1);

        console.log(recipeId);
        console.log(typeof recipeId);

        // display data to html

        var recipeUrl = $("<a>");

        recipeUrl.text("View Recipe");
        recipeUrl.attr({
          "href": response1.sourceUrl,
          "target": "_blank",
          "type": "button"
        });
        

        //Creating extra wrap element and icon for cards

        var cardDiv = $("<div>");
        var cardBody = $("<div>");
        var recipeImg = $("<img>");
        var cardTextContainer = $("<div>");
        var cardTitle = $("<h3>");
        var cardIconButton = $("<div>");
        var cardIcon = $("<i>");

        // var cardStyle = $(".cardStyle");
        //--------------------------------------------

        cardTitle.text(response.results[i].title);
        recipeImg.attr("src", response.results[i].image);

        cardTitle.text(response.results[i].title);
        recipeImg.attr("src", response.results[i].image);

        console.log(response.results[i].title);
        console.log(response.results[i].image);

        // cardBody.append(cardTitle);
        // cardBody.append(recipeImg);
        // cardDiv.append(cardBody);
        // $("#cardContainer").append(cardDiv);

        cardBody.append(recipeImg, cardTextContainer, recipeUrl);
        cardTextContainer.append(cardTitle, cardIconButton);
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

        //recipeUrl
        recipeUrl.addClass("btn btn-primary m-2 viewRecipeBtn mx-3 mb-3");

        //Create heart icon
        cardTextContainer.addClass("card-body d-flex flex-row justify-content-between");
        cardIconButton.addClass("iconButton");
        cardIcon.addClass("las la-heart");

        cardIcon.attr("id", response.results[i].id);
        //cardIconButton.attr("onClick","addToFavourite(" + response.results[i].id + ")");
        if(favouriteMap != null && favouriteMap.get(response.results[i].id.toString()) != null){
          cardIcon.addClass('favourite');
        }
        cardIcon.attr(
          "onClick",
          "addToFavourite(" + response.results[i].id + ")"
        );
      });
    }
  });
}

function addToFavourite(id) {
  console.log("added {} to favourite", id);
  $("#" + id).toggleClass('favourite');
  let temp = getFromStorage('favourite');
  let favouriteMap = new Map();
  if (temp != null) {
    favouriteMap = new Map(Object.entries(temp));
  }
  // check recipe exist in the local storage or not
  if (favouriteMap.get(id.toString()) != null) {
    // remove recipe if exist
    favouriteMap.delete(id.toString());
  } else {
    // add recipe to favourite if not exist
    favouriteMap.set(id, id);
  }

  saveToStorage('favourite', Object.fromEntries(favouriteMap));
}

// function for geting local storage value
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// function for saving local storage value
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
