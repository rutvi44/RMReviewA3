var dbOpen;

function errorhandler(error){
    console.error("SQL error: " + error.message);
}

var RMDB = {
    createDatabase: function (){
        var dbname = "RMReviewDB";
        var version = "1.0";
        var displayName = "Restaurant Review Database";
        var dbsize = 2*1024*1024;
        function dbSuccessCallBack(){
            console.info("Database Created Successfully!!");
            RMDB.createTables();
        }

        dbOpen = openDatabase(dbname,version,displayName,dbsize,dbSuccessCallBack);
    },

    createTables: function() {
        dbOpen.transaction(function(tx) {
            // Create 'state' table

            var sql1 = "CREATE TABLE IF NOT EXISTS state(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "name VARCHAR(20) NOT NULL);"

            var options=[];

            function successCallback1() {
                console.info("Success: state table successfully created");
            }

            tx.executeSql(sql1,options,successCallback1,errorhandler);

            var sql2 = "CREATE TABLE IF NOT EXISTS review(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "restaurantName VARCHAR(30) NOT NULL," +
                "restaurantId VARCHAR(20) NOT NULL," +
                "stateId INTEGER NOT NULL," +
                "reviewerEmail VARCHAR(30)," +
                "reviewerComments TEXT," +
                "hasRating VARCHAR(1)," +
                "rating1 INTEGER," +
                "rating2 INTEGER," +
                "rating3 INTEGER," +
                "FOREIGN KEY(stateId) REFERENCES state(id));"

            var options = [];

            function successCallback2() {
                console.info("Success: review table successfully created");
            }

            tx.executeSql(sql2,options,successCallback2,errorhandler);

            tx.executeSql("DELETE FROM state");
            tx.executeSql("INSERT INTO state (name) VALUES ('Ontario')");
            tx.executeSql("INSERT INTO state (name) VALUES ('British Columbia')");
            tx.executeSql("INSERT INTO state (name) VALUES ('Alberta')");
            tx.executeSql("INSERT INTO state (name) VALUES ('Nova Scotia')");
            tx.executeSql("INSERT INTO state (name) VALUES ('ABC')");
        });
    },

    dropReviewTable: function() {
        dbOpen.transaction(function (tx) {
            // Drop only the 'review' table
            var sql = "DROP TABLE IF EXISTS review";
            var options = [];

            function successCallback() {
                console.info("Success: review table dropped successfully.");
            }

            tx.executeSql(sql, options, successCallback, errorhandler);
        });
    },


    dropStateTable: function() {
        dbOpen.transaction(function(tx) {
            // Drop both 'state' and 'review' tables
            var sql1 = "DROP TABLE IF EXISTS state";
            var options = [] ;

            function successCallback() {
                console.info("Success: state table dropped successfully.");
            }

            tx.executeSql(sql1,options, successCallback, errorhandler);

        });
    },
};
