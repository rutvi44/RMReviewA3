$(document).ready(function () {
    init();
    initDB();
});

function initDB(){
    try {

        RMDB.createDatabase();

        if(dbOpen){
            console.info("Creating table.....");
            RMDB.dropStateTable()
            RMDB.createTables();
        }
        else{
            console.error("Some issued to the database");
        }
    }
    catch (error){
        console.error("Some error occurred while creating or opening a database")
    }
}

function init(){

    // Perform this action when the checkbox for Add Review is clicked
    $("#checkRatings1").click(function () {
        // Check if the element with id "checkRatings1" is checked.
        if ($(this).is(":checked")) {
            // If it is checked, show the element with id "ratingFields1".
            $("#ratingFields1").show();
        } else {
            // If it is not checked, hide the element with id "ratingFields1".
            $("#ratingFields1").hide();
        }
    });
    $("#checkRatings2").click(function () {
        // Check if the element with id "checkRatings1" is checked.
        if ($(this).is(":checked")) {
            // If it is checked, show the element with id "ratingFields1".
            $("#ratingFields2").show();
        } else {
            // If it is not checked, hide the element with id "ratingFields1".
            $("#ratingFields2").hide();
        }
    });

    //Update the textboxes when any rating change for Add form

    $("input[name^='txt']").on('input', function() {
        updateTotalRating1()
    });

    $("input[name^='txt']").on('input', function() {
        updateTotalRating2()
    });

    // Attach a click event handler to the "Save" button
    $("#btnSave").on('click', btn_Save_Click);

    // Attach a click event handler to the "Update" button
    $("#btnUpdate").on('click', btn_Update_Click);
    $("#btnClear").on('click', btn_Clear_CLick);
    loadDefaults();
    $("#btnSaveSettings").on('click', btnSaveDefault_click);
    $("#RMAddReviewPage").on("pageshow" , settingsLoaded);
    $("#RMViewReviewPage").on("pageshow", ViewReviewPage_Show);
    $("#RMModifyReviewPage").on("pageshow", ModifyReviewPage_Show);
    $("#btnDelete").on('click', deleteReview);
    $("#btnCancel").on('click', cancelModification);

}

// Function called when the "Save" button is clicked
function btn_Save_Click(){

    addFormValidation();
}

// Function called when the "Update" button is clicked
function btn_Update_Click(){
    addModifyValidation();
    updateReview();
}

function btn_Clear_CLick(){
    clearDatabase();
}

function btnSaveDefault_click(){
    saveEmailDefault();
}

function settingsLoaded() {
    loadDefaults();
    updateStatesDropdown();
}

function ViewReviewPage_Show(){
    getReviews();
}
function ModifyReviewPage_Show(){
   // console.log("ModifyReviewPage is shown")
    showReviewDetails()
}
