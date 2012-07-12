Webbase.js
==========

Webbase.js is a data manager library for javascript web applications, which provide the concept of creating 
tables in the storage method (localStorage) provided by the browser. its just like mimicing the database to the browser.
Basic operations that webbase support are <b>" insert, delete, update, select, select..where and join. "</b>

* Method to create a table. table name and data is madatory,  primary key which is not mandatory.<br/><br/>
	<b> Syntax </b>
 	```Javascript
	Webbase.Storage.create(table_name, data, primary_key);
	```

	<b> Example </b>
    ```Javascript
    Webbase.Storage.create('student',{
        id : 'number',
        name : 'string',
        marks : 'number'
    },'id');
    ```


* Method to insert data to the table. `Webbase.Storage.insert(table_name, data);`

	```Javascript
    Webbase.Storage.insert('student',{
        id : 5225,
        name : "Jaison Justus",
        marks : 53
    });
    ```