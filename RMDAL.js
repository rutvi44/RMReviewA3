var RestaurantCustomer = {
    insert: function (objAdd) {
        dbOpen.transaction(function (tx) {
            var sql = "INSERT INTO review(restaurantName, restaurantId, stateId, reviewerEmail, reviewerComments, hasRating, rating1, rating2, rating3)VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";

            var options = [
                objAdd.restaurantName, objAdd.restaurantId, objAdd.stateId, objAdd.reviewerEmail, objAdd.reviewerComments,
                objAdd.hasRating, objAdd.rating1, objAdd.rating2, objAdd.rating3
            ];

            function success() {
                console.info("Success: Data inserted in review table successfully.")
            }

            tx.executeSql(sql, options, success, errorhandler);
        })
    },

    selectAll: function(callback) {
        dbOpen.transaction(function(tx) {

            tx.executeSql("SELECT * FROM state", [], function(tx, result) {
                callback(result.rows);
            }, errorhandler);
        });
    },

    selectAllReview: function(options,callback){
        dbOpen.transaction(function (tx) {
            var sql  = "SELECT * FROM review;";
            tx.executeSql(sql, options, callback, errorhandler);
        });
    },


    select: function(reviewId, callback) {
        dbOpen.transaction(function (tx) {
            var sql = "SELECT * FROM review WHERE id = ?;";
            tx.executeSql(sql, [reviewId], function (tx, result) {
                callback(tx, result);
            }, errorhandler);
        });

    },

    delete: function(reviewId, callback) {
        dbOpen.transaction(function(tx) {
            var sql = "DELETE FROM review WHERE id = ?;";
            tx.executeSql(sql, [reviewId], function(tx, result) {
                callback(tx, result);
            }, errorhandler);
        });
     },

    update: function (objUpdate, id) {
        dbOpen.transaction(function (tx) {
            var sql = "UPDATE review SET restaurantName=?, restaurantId=?, stateId=?, reviewerEmail=?, reviewerComments=?, hasRating=?, rating1=?, rating2=?, rating3=? WHERE id=?;";
            var options = [
                objUpdate.restaurantName, objUpdate.restaurantId, objUpdate.stateId, objUpdate.reviewerEmail, objUpdate.reviewerComments,
                objUpdate.hasRating.toString(), objUpdate.rating1, objUpdate.rating2, objUpdate.rating3, id
            ];

            function successTransaction() {
                console.info("Success: Participant details updated successfully");
                alert('Participant details updated successfully');
            }

            function errorTransaction(tx, error) {
                console.error("Error executing SQL: " + error.message);
            }

            tx.executeSql(sql, options, successTransaction, errorTransaction);
        });
    },

};
