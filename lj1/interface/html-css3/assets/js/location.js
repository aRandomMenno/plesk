
// Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);

// Get the "location" parameter
const locationParam = urlParams.get('location');

// Redirect to the location if the parameter exists
if (locationParam) {
    window.location.href = locationParam;
}