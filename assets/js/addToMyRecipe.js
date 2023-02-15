$(document).ready(function () {
    let temp = getFromStorage('favourite');
    let favouriteMap = new Map();
    if (temp != null) {
        favouriteMap = new Map(Object.entries(temp));
    }
    favouriteMap.forEach((key)=>{
        var queryUrl2 =
        "https://api.spoonacular.com/recipes/" +
        key +
        "/information?&apiKey=" + apiKey;

      $.ajax({
        url: queryUrl2,
        method: "GET",
      }).then(function (response) {
        console.log(response);
        const title = response.title;
        const image = response.image;
        const sourse = response.sourceUrl;

        var savedUrl = $("<a>");
        var savedDiv = $("<div>");
        var savedBody = $("<div>");
        var savedImg = $("<img>");
        var savedTextContainer = $("<div>");
        var savedTitle = $("<h3>");
        var savedIconButton = $("<div>");
        var savedIcon = $("<i>");

        savedTitle.text(title);
        savedImg.attr("src", image);
        savedUrl.text("View Recipe");
        savedUrl.attr({
          "href": sourse,
          "target": "_blank",
          "type": "button"
        });

        savedBody.append(savedImg, savedTextContainer, savedUrl);
        savedTextContainer.append(savedTitle, savedIconButton);
        savedIconButton.append(savedIcon);
        savedDiv.append(savedBody);
        $("#savedCardContainer").append(savedDiv);

        savedDiv.addClass("col");
        savedBody.addClass("card h-100 text-dark bg-light mb-3");
        savedImg.addClass("card-img-top p-4");
        savedTitle.addClass("card-title m-2");

        savedUrl.addClass("btn btn-primary m-2 viewRecipeBtn mx-3 mb-3");

        savedTextContainer.addClass("card-body d-flex flex-row justify-content-between");
        savedIconButton.addClass("iconButton");
        savedIcon.addClass("savedBtn las la-heart");
      });
    });
});