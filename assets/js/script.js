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
    "&apiKey=6f5b740887744617a3980e15981b89e9";

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
        "/information?&apiKey=6f5b740887744617a3980e15981b89e9";

      $.ajax({
        url: queryUrl2,
        method: "GET",
      }).then(function (response1) {
        console.log(response1);

        console.log(recipeId);
        console.log(typeof recipeId);

        // display data to html

        var recipeUrl = $("<a>");

        recipeUrl.text(response1.sourceUrl);
        recipeUrl.attr("href", response1.sourceUrl);

        //Creating extra wrap element and icon for cards

        var cardDiv = $("<div>");
        var cardBody = $("<div>");
        var recipeImg = $("<img>");
        var cardTextContainer = $("<div>");
        var cardTitle = $("<h3>");
        var cardIconButton = $("<a>");
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
        //Create heart icon
        cardTextContainer.addClass(
          "card-body d-flex flex-row justify-content-between"
        );
        cardIconButton.addClass("iconButton");
        cardIcon.addClass("las la-heart");

        cardIcon.attr("id", response.results[i].id);
        cardIconButton.attr(
          "onClick",
          "addToFavourite(" + response.results[i].id + ")"
        );
      });
    }
  });
}

function addToFavourite(id) {
  console.log("added {} to favourite", id);
  $("#" + id).toggleClass("favourite");
}
