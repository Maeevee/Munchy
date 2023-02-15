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
      });
    });
});