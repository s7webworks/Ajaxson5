

$(document).ready(function() {
    // register our function as the "callback" to be triggered by the form's submission event
    $("#form-gif-request").submit(fetchAndDisplayGif); // in other words, when the form is submitted, fetchAndDisplayGif() will be executed
});


/**
 * sends an asynchronous request to Giphy.com aksing for a random GIF using the 
 * user's search term (along with "jackson 5")
 * 
 * upon receiving a response from Giphy, updates the DOM to display the new GIF
 */
function fetchAndDisplayGif(event) {
    
    // This prevents the form submission from doing what it normally does: send a request (which would cause our page to refresh).
    // Because we will be making our own AJAX request, we dont need to send a normal request and we definitely don't want the page to refresh.
    event.preventDefault();
    
    // get the user's input text from the DOM
    var searchQuery = "jackson 5 " + $('#getgif').val(); // TODO should be e.g. "dance"

    // configure a few parameters to attach to our request
        
    var urlGiphy = "http://api.giphy.com/v1/gifs/random";
                urlGiphy += '?' + $.param(
                    {
                        'tag': searchQuery,
                        api_key: "dc6zaTOxFJmzC"
                    }
                );



    // make an ajax request for a random GIF
    $.ajax({
        url: urlGiphy, // TODO where should this request be sent?
        //data: params, // attach those extra parameters onto the request
        success: function(response) {
            // if the response comes back successfully, the code in here will execute.
             $('#gif').attr('src', response.data.image_url);
                        $("#loader").attr("hidden", true);
                        setGifLoadedStatus(true);
            // jQuery passes us the `response` variable, a regular javascript object created from the JSON the server gave us
            console.log("we received a response!");
            console.log(response);
            
            // TODO
            // 1. set the source attribute of our image to the image_url of the GIF
            // 2. hide the feedback message and display the image
        },
        error: function() {
            // if something went wrong, the code in here will execute instead of the success function
            
                        $("#feedback").text("Sorry, could not load GIF. Try again!");
                        $("#loader").attr("hidden", true);
                        setGifLoadedStatus(false);

            // give the user an error message
            $("#feedback").text("Sorry, could not load GIF. Try again!");
            setGifLoadedStatus(false);
        }
    });
    
    // TODO $
        $("#gif").attr("hidden", true);
        $("#loader").attr("hidden", false);
    // give the user a "Loading..." message while they wait
    
}


/**
 * toggles the visibility of UI elements based on whether a GIF is currently loaded.
 * if the GIF is loaded: displays the image and hides the feedback label
 * otherwise: hides the image and displays the feedback label
 */
function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
}