function isvalid_AddForm() {
    // Validation rules and error messages for the "Add a Review" form
    $('#frmAdd').validate({
        rules: {
            txtRestaurantName: {
                required: true,
                minlength: 2,
                maxlength: 20
            },
            txtBuisnessId: {
                required: true,
                minlength: 2,
                maxlength: 5
            },
            txtEmail: {
                required: true,
                email:true
            },
            txtFoodQuality1: {
                number: true,
                min: 0,
                max: 5
            },
            txtService1: {
                number: true,
                min: 0,
                max: 5
            },
            txtValue1: {
                number: true,
                min: 0,
                max: 5
            }
        },
        messages: {
            txtRestaurantName: {
                required: "Restaurant Name is required",
                minlength: "Restaurant Name must be at least 2 characters long",
                maxlength: "Restaurant Name cannot exceed 20 characters"
            },
            txtBuisnessId: {
                required: "Business ID is required",
                minlength: "Business ID must be at least 2 characters long",
                maxlength: "Business ID cannot exceed 5 characters"
            },
            txtEmail: {
                required: "Reviewer Email is required",
                email: "Please enter a valid email address",
            },
            txtFoodQuality1: {
                number: "Please enter a valid number for Food Quality",
                min: "Food Quality must be between 0 and 5",
                max: "Food Quality must be between 0 and 5"
            },
            txtService1: {
                number: "Please enter a valid number for Service",
                min: "Service must be between 0 and 5",
                max: "Service must be between 0 and 5"
            },
            txtValue1: {
                number: "Please enter a valid number for Value",
                min: "Value must be between 0 and 5",
                max: "Value must be between 0 and 5"
            }
        }
    });
    return $("#frmAdd").valid();
}

function isvalid_ModifyForm() {
    // Validation rules and the error messages for the "Modify Reviews" form
    $('#frmModify').validate({
        rules: {
            txtRestaurant: {
                required: true,
                minlength: 2,
                maxlength: 20
            },
            txtBuisId: {
                required: true,
                minlength: 2,
                maxlength: 5
            },
            txtemail2: {
                required: true,
                email: true
            },
            txtFoodQuality2: {
                number: true,
                min: 0,
                max: 5
            },
            txtService2: {
                number: true,
                min: 0,
                max: 5
            },
            txtValue2: {
                number: true,
                min: 0,
                max: 5
            }
        },
        messages: {
            txtRestaurant: {
                required: "Restaurant Name is required",
                minlength: "Restaurant Name must be at least 2 characters long",
                maxlength: "Restaurant Name cannot exceed 20 characters"
            },
            txtBuisId: {
                required: "Business ID is required",
                minlength: "Business ID must be at least 2 characters long",
                maxlength: "Business ID cannot exceed 5 characters"
            },
            txtemail2: {
                required: "Reviewer Email is required",
                email: "Please enter a valid email address",
            },
            txtFoodQuality2: {
                number: "Please enter a valid number for Food Quality",
                min: "Food Quality must be between 0 and 5",
                max: "Food Quality must be between 0 and 5"
            },
            txtService2: {
                number: "Please enter a valid number for Service",
                min: "Service must be between 0 and 5",
                max: "Service must be between 0 and 5"
            },
            txtValue2: {
                number: "Please enter a valid number for Value",
                min: "Value must be between 0 and 5",
                max: "Value must be between 0 and 5"
            }
        }
    });
    return $("#frmModify").valid();
}
function calCulation_Add(quality, service, value) {
    quality = parseFloat(quality) || 0;
    service = parseFloat(service) || 0;
    value = parseFloat(value) || 0; // Corrected the variable here
    return ((quality + service + value) * 100 / 15).toFixed(2);
}

function calCulation_Modify(quality2, service2, value2) {
    quality2 = parseFloat(quality2) || 0;
    service2 = parseFloat(service2) || 0;
    value2 = parseFloat(value2) || 0; // Corrected the variable here
    return ((quality2 + service2 + value2) * 100 / 15).toFixed(2);
}
