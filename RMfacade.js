// Function to handle validation and submission of the "Add Review" form
function addFormValidation() {
    // Check if the "Add Review" form is valid using the isvalid_AddForm() function
    if (isvalid_AddForm()) {
        // If the form is valid, log a message indicating its validity
        console.info("Add Form is valid");

        var restaurantName = $("#txtRestaurantName").val();
        var restaurantId = $("#txtBuisnessId").val();
        var stateId = $("#state").val();
        var reviewerEmail = $("#txtEmail").val();
        var reviewerComments = $("#txtComments").val();
        var hasRating= $("#checkRatings1") .prop('checked');
        var rating1 = hasRating ? parseInt($("#txtFoodQuality1").val()):0;
        var rating2 = hasRating ? parseInt($("#txtService1").val()):0;
        var rating3 = hasRating ? parseInt($("#txtValue1").val()):0;

        var objAdd = new EventRestaurant(restaurantName, restaurantId, stateId, reviewerEmail, reviewerComments, hasRating, rating1, rating2, rating3);

        RestaurantCustomer.insert(objAdd);

        // Reset form fields
        $("#txtRestaurantName").val("");
        $("#txtBuisnessId").val("");
        $("#state").val("");
        $("#txtEmail").val("");
        $("#txtComments").val("");
        $("#checkRatings1").prop('checked', false);
        $("#txtFoodQuality1").val("");
        $("#txtService1").val("");
        $("#txtValue1").val("");

        // Hide the ratingFields1 section
        $("#ratingFields1").hide();

    } else {
        // If the form is invalid, log a message indicating its invalidity
        console.info("Add Form is invalid");
    }
}

//Function to handle validation and submission of the "Modify Reviews" form
function addModifyValidation() {
    // Check if the "Modify Reviews" form is valid using the isvalid_ModifyForm() function
    if (isvalid_ModifyForm()) {
        // If the form is valid, log a message indicating its validity
        console.info("Modify Form is valid");
    } else {
        // If the form is invalid, log a message indicating its invalidity
        console.info("Modify Form is invalid");
    }
}

function updateReview() {
    if (isvalid_ModifyForm()) {
        console.info("Modify form is valid");

        var id = localStorage.getItem("selectedRowId");
        var restaurantName = $("#txtRestaurant").val();
        var restaurantId = $("#txtBuisId").val();
        var stateId = $("#selectstate").val();

        if (!stateId) {
            console.error("State ID cannot be null or empty");
            return;
        }

        var reviewerEmail = $("#txtemail2").val();
        var reviewerComments = $("#Comments").val();
        var hasRating = $("#checkRatings2").prop('checked');
        var rating1 = hasRating ? parseInt($("#txtFoodQuality2").val()) : 0;
        var rating2 = hasRating ? parseInt($("#txtService2").val()) : 0;
        var rating3 = hasRating ? parseInt($("#txtValue2").val()) : 0;

        var objUpdate = new EventRestaurant(restaurantName, restaurantId, stateId, reviewerEmail, reviewerComments, hasRating, rating1, rating2, rating3);

        RestaurantCustomer.update(objUpdate, id);

    } else {
        console.info("Modify form is invalid");
    }
}
function updateTotalRating1() {
    var quality = ($("#txtFoodQuality1").val());
    var service = ($("#txtService1").val());
    var value = ($("#txtValue1").val());
    var averageRating = calCulation_Add(quality, service, value);
    $("#rangeratings1").val(averageRating);
}
function updateTotalRating2() {
    var quality2 = ($("#txtFoodQuality2").val());
    var service2 = ($("#txtService2").val());
    var value2 = ($("#txtValue2").val());
    var averageRating2 = calCulation_Modify(quality2, service2, value2);
    $("#rangeratings2").val(averageRating2);
}

function clearDatabase(){
    var result = confirm("Really want to clear database?")
    if(result){
        try {
            RMDB.dropStateTable();
            RMDB.dropReviewTable();
            alert("Database cleared");
        }catch (e){
            alert(e);
        }
    }
}

function saveEmailDefault(){
    var defaultEmail = $("#txtDefaultReviewerEmail").val();
    localStorage.setItem("DefaultEmail", defaultEmail);
    console.log("Setting default email is loaded");
}

function loadDefaults() {
    $("#txtEmail").val(localStorage.getItem ("DefaultEmail"));
}

function updateStatesDropdown() {
    RestaurantCustomer.selectAll(function(rows) {
        $("#state").empty();
        for (var i = 0; i < rows.length; i++) {
            var state = rows.item(i);
            $("#state").append('<option value="' + state.id + '">' + state.name + '</option>');
        }
        $("#state").val("ON");
        $("#state").selectmenu("refresh");
    });
}

function getReviews() {
    var options = [];
    RestaurantCustomer.selectAllReview(options, callback);

    function callback(tx, results) {
        var lv = $("#lvAll");console.log("Results: ", results)
        if (results.rows.length > 0) {
            var htmlcode = "";

            for (var i = 0; i < results.rows.length; i++) {
                var row = results.rows.item(i);
                var id = row['id'];
                var restaurantName = row['restaurantName'];
                var reviewerEmail = row['reviewerEmail'];
                var reviewerComments = row['reviewerComments'];
                var hasRatings = row['hasRating'] === 'true';
                var overallRatings = calculateOverallRatings(row);

                htmlcode += `
                <li data-row-id="${id}">
                    <a href="#RMModifyReviewPage">
                        <h2>ID: ${id}</h2>                   
                        <h2>Restaurant Name: ${restaurantName}</h2>
                        <h2>Reviewer Email: ${reviewerEmail}</h2>
                        <h2>Comments: ${reviewerComments}</h2>
                        <h2>Overall Ratings: ${overallRatings}</h2>
                    </a>
                </li>`;
            }

            lv.html(htmlcode).listview("refresh");

            lv.on("click", "li", function() {
                var selectedRowId = $(this).attr("data-row-id");
                localStorage.setItem("selectedRowId", selectedRowId);
            });
        } else {
            lv.html("<li>No review found</li>").listview("refresh");
        }
    }
}

function calculateOverallRatings(row) {
    if (row['hasRating'] === 'true') {
        console.info("ratings")
        var rating1 = parseFloat(row['rating1']);
        var rating2 = parseFloat(row['rating2']);
        var rating3 = parseFloat(row['rating3']);

        if (!isNaN(rating1) && !isNaN(rating2) && !isNaN(rating3)) {
            return calculateOverallRating(rating1, rating2, rating3);
        } else {
            return 'N/A';
        }
    } else {
        return '0';
    }
}

function calculateOverallRating(quality, service, value) {
    console.info("Ratings")
    quality = parseFloat(quality) || 0;
    service = parseFloat(service) || 0;
    value = parseFloat(value) || 0;
    return ((quality + service + value) * 100 / 15).toFixed(2) + '%';
}
function showReviewDetails() {
    // Fetch the ID stored in local storage
    var selectedRowId = localStorage.getItem("selectedRowId");

    // Use the ID as a parameter for the select CRUD operation on the review table
    RestaurantCustomer.select(selectedRowId, function (tx, result) {
        if (result.rows.length > 0) {
            var row = result.rows.item(0);

            // Show values of each field in specific input controls
            $("#txtRestaurant").val(row['restaurantName']);
            $("#txtBuisId").val(row['restaurantId']);
            $("#selectstate").val(row['stateId']).selectmenu("refresh");
            $("#txtemail2").val(row['reviewerEmail']);
            $("#Comments").val(row['reviewerComments']);

            // Show/hide ratings part based on hasRatings value
            if (row['hasRating'] === 'true') {
                $("#checkRatings2").prop('checked', true);
                $("#ratingFields2").show();

                $("#txtFoodQuality2").val(row['rating1']);
                $("#txtService2").val(row['rating2']);
                $("#txtValue2").val(row['rating3']);
                $("#rangeratings2").val(calculateOverallRating(row['rating1'], row['rating2'], row['rating3']));
            } else {
                $("#checkRatings2").prop('checked', false);
                $("#ratingFields2").hide();

                // Set each rating to 0 if the ratings checkbox is unchecked
                $("#txtFoodQuality2").val(0);
                $("#txtService2").val(0);
                $("#txtValue2").val(0);
                $("#rangeratings2").val(0);
            }
        }
    });
}
function cancelModification() {
    // Simulate a click on an anchor tag with href="#RMHomePage"
    var homePageLink = document.createElement('a');
    homePageLink.href = "#RMHomePage";
    homePageLink.click();
}
function deleteReview() {
    // Retrieve the review ID from local storage
    var reviewIdToDelete = localStorage.getItem("selectedRowId");

    // Check if the review ID is valid
    if (reviewIdToDelete) {
        // Call the 'delete' CRUD operation for the 'review' table
        RestaurantCustomer.delete(reviewIdToDelete, function () {
            // Show an alert indicating successful deletion
            alert("Review deleted successfully.");

            // Navigate to 'Reviews' page
            $.mobile.changePage("#RMViewReviewPage");
        });
    } else {
        // Show an alert indicating that the review ID is not available
        alert("Review ID not available. Deletion failed.");
    }
}