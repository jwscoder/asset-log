
// loading spinner
  document.onreadystatechange = function() {
      if (document.readyState !== "complete") {
          document.querySelector("body").style.visibility = "hidden";
          document.querySelector("#loader").style.visibility = "visible";
      } else {
          document.querySelector("#loader").style.display = "none";
          document.querySelector("body").style.visibility = "visible";
      }
  };

  let filterList = document.getElementById("filter")
  let filterBtn = document.getElementById("filterBtn");
  let resetBtn = document.getElementById("resetBtn");

  //Assigns value to button when filter dropdown has been selected
  filterList.addEventListener("change", function(){
    filterBtn.value = filterList.options[filterList.selectedIndex].value;
  });

const assetNumbers = document.querySelectorAll(".assetNumber");
const searchInput = document.getElementById("searchAsset");

searchInput.addEventListener("keyup", function(e){
  let searchInputText = "";
  searchInputText += this.value;
  assetNumbers.forEach(function(number){
    // if the search is not a match and is equal to or more than the length of the number then hide all content
    if(searchInputText != number.innerHTML && searchInputText.length >= 4){
      number.parentNode.classList.add("d-none");
      // if the search is not a match but search is also less than 4 difits long then display all content
    } else if(searchInputText != number.innerHTML && searchInputText.length < 4) {
      number.parentNode.classList.remove("d-none");
      // if the search is a match then display only this matched element
    } else if(searchInputText == number.innerHTML) {
      number.parentNode.classList.remove("d-none");
    }
  });
});

// in case of any issues with search
resetBtn.addEventListener("click", function(){
  assetNumbers.forEach(function(number){
    // displays all content and resets search to an empty string
    number.parentNode.classList.remove("d-none");
    searchInput.value = "";
  });
});
