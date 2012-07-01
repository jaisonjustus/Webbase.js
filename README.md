Webbase.js
==========

Webbase.js is a data manager library, which provide the concept of creating tables in the storage method provided by the browser.

example
-------

* Webbase.Storage.create(table_name, data); Method to create a table.
	eg:
	Webbase.Storage.create('student',{
		id : 'number',
		name : 'string',
		marks : 'number'
	});