Webbase.js
==========

Webbase.js is a data manager library, which provide the concept of creating tables in the storage method provided by the browser.

` ---- Incomplete ---- `


Example
-------

* Method to create a table.
 `Webbase.Storage.create(table_name, data, primary_key);`

	
    Webbase.Storage.create('student',{
        id : 'number',
        name : 'string',
        marks : 'number'
    });


* Method to insert data to the table. `Webbase.Storage.insert(table_name, data);`


    Webbase.Storage.insert('student',{
        id : 5225,
        name : "Jaison Justus",
        marks : 53
    });