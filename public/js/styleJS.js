function displayMap(){
// Cache a reference to the hidden content.
var hiddenContent = $( "div.content" );
// Bind to the Read More link to toggle the
$( ".displayMap" ).mouseover(
    function( event ){
        // Cancel the default event (this isn't a real link).
        event.preventDefault();
        // Check to see if the content is visible.
        if (hiddenContent.is( ":visible" )){
            // Hide it slowly.
            hiddenContent.slideUp( 2000 );
        } else {
            // Show it slowly.
            hiddenContent.slideDown( 4000 );
        }
    }
);
};
