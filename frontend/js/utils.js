function addHoverToShowScrollbar() {
    var array = [document.getElementById("main-content-frame-bottom-card-" + 1),
    document.getElementById("main-content-frame-bottom-card-" + 2),
    document.getElementById("main-content-frame-bottom-card-" + 3)];

    array.forEach(element => {
        // Add event listeners for mouseenter and mouseleave
        element.addEventListener("mouseenter", function() {
            element.classList.add("main-content-frame-bottom-card-show-scrollbar");
        });
    
        element.addEventListener("mouseleave", function() {
            setTimeout(function() {
                element.classList.remove("main-content-frame-bottom-card-show-scrollbar");
              }, 200);
        }); 
    });
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  } 

addHoverToShowScrollbar();