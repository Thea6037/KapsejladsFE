import {postObjectAsJson} from "../module/modulejson.js";
const createButton = document.getElementById('createButton')
const boatTypeField = document.getElementById('field2')
const postSailboatUrl = "http://localhost:8080/newsailboat"
const submitButton = document.getElementById("submitButton")

function showForm() {
    // Display the form when the button is clicked
    document.getElementById("myForm").style.display = "block";
}

function submitForm() {
    // Handle form submission here
    // You can access the values of the fields using document.getElementById
    const value2 = document.getElementById("field2").value;

    // Example: Show an alert with the values
    alert(`Field 2: ${value2}`);

    // You can add more logic to handle the submitted data as needed
    const sailboat = {}
    sailboat.boatType = boatTypeField.value
    postObjectAsJson(postSailboatUrl, sailboat, "POST")

    // Hide the form after submission
    document.getElementById("myForm").style.display = "none";

    location.reload()

}

createButton.addEventListener('click', showForm)
submitButton.addEventListener('click', submitForm)