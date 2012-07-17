Webbase.js 
==========

Webbase.js <i> (not yet released) </i> is a data manager library for javascript web applications, which provide the concept of creating 
tables in the storage method (localStorage) provided by the browser. its just like mimicing the database to the browser.
Basic operations that webbase support are " insert, delete, update, select, select..where and join. "

* <b>Method to create a table. table name and data is madatory,  primary key which is not mandatory.</b><br/>
    
    ```Javascript
    Webbase.Storage.create(table_name, data, primary_key);
    ```

    ```Javascript
    Webbase.Storage.create('student',{
        id : 'number',
        name : 'string',
        marks : 'number'
    },'id');
    ```


* <b>Method to insert record to the table.</b><br/>

    ```Javascript
    Webbase.Storage.insert(table_name, data);
    ```

    ```Javascript
    Webbase.Storage.insert('student',{
        id : 5225,
        name : "Jaison Justus",
        marks : 53
    });
    ```

* <b>Method to delete record from the table.</b><br/>

    ```Javascript
    Webbase.Storage.from(table_name).where(condition).delete();
    ```

    ```Javascript
    Webbase.Storage.from('student').where('{id} == 5225').delete();
    ```

* <b>Method to update record in the table.</b><br/>

    ```Javascript
    Webbase.Storage.from(table_name).set(data).where(condition).update();
    ```
    
    ```Javascript
    Webbase.Storage.from('student').set({ marks : 69 }).where('{id} == 5225 || {id} == 5222').update();
    ```

* <b>Method to select record from a table.</b><br/>
    
    ```Javascript
    Webbase.Storage.select(fields).from(table_name).where(condition).find();
    ```
    
    ```Javascript
    Webbase.Storage.select('name,marks').from('student').where('{id} == 5222').find();
    ```

* <b>Method to select record by joining Multiple table.</b><br/>
    
    ```Javascript
    Webbase.Storage.select(fields[student_fieldname]).join(tables).where(condition).find();
    ```
    
    ```Javascript
    Webbase.Storage.select('student_name,student_marks,score_english').join('student.score').where('{id} == 5222').find();
    ```