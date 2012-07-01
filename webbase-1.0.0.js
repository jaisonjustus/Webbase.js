/**
 * Webbase.js;
 * @version : 1.0.0;
 * @author : jaison.justus;
 * Webbase is a storage library for javascript. webbase provide the user to create
 * tables in the storage method provided by the Browser and can retrive the details
 * with respect to search criteria's;
 *
 * @package : Webbase;
 */
var Webbase = {
    Version : '1.0.0',
    Browser : window,
    StorageMode : ''
};

/**
 * Exception Class to handle error in webbase;
 * @package : Webbase;
 * @module : Exception;
 * @version : 1.0.0;
 * @return : Object;
 */
var Exception = Webbase.Exception = (function()    {
	var Exception = function()	{
		var code = (arguments.length >= 1) ? arguments[0] : 'COM01';
		
		this.error = {
			COM01 : "UNKNOW ERROR.",
			STR01 : "STORAGE MODE NOT FOUND.",
			STR02 : "TABLE ALREADY EXIST'S.",
            STR03 : "TABLE NOT FOUND.",
            STR04 : "INCORRECT FIELD NAME OR DATA TYPE.",
            
            CRT01 : "TABLE NOT SELECTED!!"
		};
		
		/**
		 * This method return the error message;
		 * @access : public; 
		 * @return : string;
		 */
		this.message = function()	{
			return this.error[code];
		};
	};
	
	return Exception;
}());

/**
 * StorageMethod maintain the different storage methods name;
 */
Webbase.StorageMethod = {
    localStorage : 'localStorage'
};

/**
 * Data Structure to keep table details like name and data type of each fields;
 */
Webbase.TableDesc = [];

/**
 * Data Structure to keep the search criteria details like selected fields, source table
 * and the criteria;
 */
Webbase.CriteriaStruct = {
    select : [],
    from : '',
    where : ''
};

/**
 * WebbaseUtility provide the bundle of utilities used for support the webbase
 * functionalities;
 * @package : WebbaseUtility;
 * @version : 1.0.0;
 */
var WebbaseUtility = {
    JSON:JSON
};

/**
 * ObjectExt module extends the object properties and functionalities like inheritance etc;
 * @module : ObjectExt;
 * @package : Webbase;
 * @version : 1.0.0;
 * @return Object;
 */

var ObjectExt = WebbaseUtility.ObjectExt = (function()	{

	/**
	 * ObjectExt Constructor;
	 */
	var ObjectExt = function()	{
	};

	/**
	 * This method provide inheritance to the object supplied; this method inherit the 
	 * public methods from the Parent class to the Child class. this also provide
	 * multiple inheritance, in which the method ambiguity is solved by the overriding
	 * the last inherited class's method;
	 * @access : public;
	 * @method : inherit;
	 * @param : Object Parent;
	 * @param : Object Child;
	 * @return : Object;
	 */
	ObjectExt.prototype.inherit = function(Parent, Child)	{
		var TempObj = function(){}, MultipleInheritanceTempObj = function(){};

        MultipleInheritanceTempObj.prototype = Child.prototype;        
		TempObj.prototype = Parent.prototype;
		
        for(var key in MultipleInheritanceTempObj.prototype)	{
            TempObj.prototype[key] = MultipleInheritanceTempObj.prototype[key];	
        }
		MultipleInheritanceTempObj = null;
		Child.prototype = new TempObj();
		
		if(Child.uber === undefined)	{
			Child.uber = Parent.prototype;
		}else	{
            for(var key in Parent.prototype)	{
    			Child.uber[key] = Parent.prototype[key];
    		}
		}
		Child.prototype.constructor = Child;
		
		return Child;
	};
	
	return new ObjectExt();

})();

/**
 * This module manage the storage mode. this module provide support for selecting
 * the storage medium like localstorage, globalstorage etc;
 * @module : StrorageManager;
 * @package : Webbase;
 * @version : 1.0.0;
 * @return : Object;
 */
var StorageManager = Webbase.StorageManager = (function()   {
	
    /**
     * Private Methods wrapper for StorageManager Module;
	 * @version : 1.0.0;
	 * @return : object;
	 */
	var Private = {
		checkLocalStorage : function(){}
	};
	
	/**
	 * Method to check storage method;
	 * @method : checkStorageMethod;
	 * @access : private;
	 * @return : boolean;
	 */
	Private.checkStorageMethod = function()	{
		var storage;
		try{
			storage = Webbase.StorageMethod.localStorage;
			return (storage in Webbase.Browser && Webbase.Browser[storage]);
		}catch(err)	{
			return false;
		}
	}
    
	/**
	 * Storage manager Constructor;
	 */
	var StorageManager = function()	{
	};
	
	/**
	 * Method to identify storage method and set the storage mode;
	 * @method : identifyStorage;
	 * @access : public;
	 * @throws : Webbase.Exception;
	 * @return : boolean;
	 */
	StorageManager.prototype.identifyStorage = function()	{
		try	{
			if(Private.checkStorageMethod())	{
				Webbase.StorageMode = Private.checkStorageMethod();
				return true;
			}else	{
				throw new Webbase.Exception('STR01');
			}
		}catch(err)	{
			console.log(err.message());
			return false;
		}
	};
	
	return StorageManager;
})();

/**
 * This module take part in saving the data to the selected storage mode; This module
 * take part in creating and maintaining data;
 * @module : DataManager;
 * @package : Webbase;
 * @version : 1.0.0;
 * @return : Object;
 */
var DataManager = Webbase.DataManager = (function()	{

	/**
	 * Private Methods wrapper for DataManager Module;
	 * @version : 1.0.0;
	 * @return : object;
	 */
	var Private = {
		initCreate : function(tableName, desc)  {},
		setTableDetails : function(tableName, desc, primaryKey)	{},
        getTableDetails : function()  {},
        checkTableAlreadyExists : function(tableName)	{},
        createTable : function(tableName)	{},
        initInsert : function(tableName, data)  {},
        dataFieldUnMatch : function(tableDesc,data) {},
        dataTypeUnMatch : function(tableDesc,data)    {},
        insertData : function(tableName, data) {},
        resetCriteriaStruct : function()    {},
        getTableData : function(tableName)  {},
        find : function(data)   {},
        parseAndPrepareCondition : function()   {}
	};
	
	/**
	 * Method to create table and perform all the validations and checking before
	 * saving it to the storage;
	 * @method : create;
	 * @access : private;
	 */
	Private.initCreate = function(tableName,desc)	{
		if(Webbase.StorageMode)	{
			this.getTableDetails();
				if(!this.checkTableAlreadyExists(tableName))	{
					this.setTableDetails(tableName,desc);
					this.createTable(tableName);
				}else	{
					throw new Webbase.Exception('STR02');
				}
		}else	{
			throw new Webbase.Exception('STR01');
		}
	};
	
	/**
	 * Method to save tables details in the storage for future use;
	 * @method : saveTableDetails;
	 * @access : private;
	 */
	Private.setTableDetails = function(tableName, desc, primaryKey)	{
		Webbase.TableDesc.push({
			name : tableName,
			field : desc,
			primaryKey : primaryKey
		});
		Webbase.StorageMode.setItem('Webbase_tbl', WebbaseUtility.JSON.stringify(Webbase.TableDesc));
	};
    
    /**
	 * Method to get table details from the storage space and populate the
	 * Webbase.TableDesc data structure;
	 * @method : saveTableDetails;
	 * @access : private;
	 */
    Private.getTablesDetails = function()  {
		var tableArray = [];
		
		tableArray = WebbaseUtility.JSON.parse(Webbase.StorageMode.getItem('Webbase_tbl'));
		if(tableArray != null)  {
			Webbase.TableDesc = tableArray;
		}else   {
			Webbase.TableDesc = [];
		}        
    };
    
    /**
	 * Method to check the table already defined in the storage;
	 * @method : checkTableAlreadyExists;
	 * @access : private;
     * @return : Object;
	 */
    Private.checkTableAlreadyExists = function(tableName)	{
    	var status = false;
    	
    	for(var i = 0; i < Webbase.TableDesc.length; i++)	{
    		if(Webbase.TableDesc[i].name == tableName)	{
    			status = Webbase.TableDesc[i];
    		}
    	}
    	
    	return status;
    };
	
	/**
	 * Method to create the table in the storage;
	 * @method : createTable;
	 * @access : private;
	 */
	Private.createTable = function(tableName)	{
		Webbase.StorageMode.setItem('Webbase_' + tableName, '[]');
	};
    
    /**
     * Method to check the selected fields are same as in the table description;
     * @method : dataFieldUnMatch;
     * @access : private;
     * @param : object tableDesc;
     * @param : object data;
     * @return : boolean;
     */
    Private.dataFieldUnMatch = function(tableDesc, data)  {
        var status = false;
        
        for(var key in data)    {
            if(!tableDesc.hasOwnProperty(key))  {
                status = true;
                break;
            }
        }
        
        return status;
    };
    
    /**
     * Method to check the data type of the data inserted; 
     * @method : dataTypeUnMatch;
     * @access : private;
     * @param : object tableDesc;
     * @param : object data;
     * @return : boolean;
     */
    Private.dataTypeUnMatch = function(tableDesc, data) {
        var status = false;
        
        for(var key in data)    {
            if(typeof(data[key]) != tableDesc[key].toLowerCase()) {
                status = true;
                break;
            }
        }
        
        return status;
    };
    
    /**
     * Method to retrive all the table data from the local storage;
     * @method : getTableData;
     * @access : private;
     * @param : string tableName;
     * @return : object;
     */
    Private.getTableData = function(tableName)   {
        return WebbaseUtility.JSON.parse(Webbase.StorageMode.getItem('Webbase_' + tableName));
    };
    
    /**
     * Method to save data to the corresponding table in the storage method;
     * @method : insertData;
     * @access : private;
     * @param : string tableName;
     * @param : object data;
     */
    Private.insertData = function(tableName, data)  {
        var tableData = Private.getTableData(tableName);
        tableData.push(data);
        Webbase.StorageMode.setItem('Webbase_' + tableName, WebbaseUtility.JSON.stringify(tableData));
    };
    
    /**
     * Method to initialize the insert functionality;
     * @method : initInsert;
     * @access : private;
     * @param : string tableName;
     * @param : object data;
     */
    Private.initInsert = function(tableName, data) {
        var tableDetails;
        
        if(tableDetails = this.checkTableAlreadyExists(tableName))   {
            if(!this.dataFieldUnMatch(tableDetails.field, data) && !this.dataTypeUnMatch(tableDetails.field, data))  {
                this.insertData(tableName, data);
            }else   {
                throw new Webbase.Exception('STR04');
            }
        }else   {
            throw new Webbase.Exception('STR03');
        }
    };
    
    /**
     * Method to reset the Criteria data structure;
     * @method : resetCriteriaStruct;
     * @access : private;
     */
    Private.resetCriteriaStruct = function()    {
        Webbase.CriteriaStruct = {
            select : [],
            from : '',
            where : ''
        };
    };
    
    /**
     * Method to parse the criteria provided by the user and replace the fields in the query;
     * @method : parseAndPrepareCondition;
     * @access : private;
     * @param : string condition;
     * @param : object tableDesc;
     * @return : string;
     */
    Private.parseAndPrepareCondition = function(condition, tableDesc) {
        var token, totalToken, param;
        
        totalToken = condition.match(/{\w+}/g).length;
        
        for(var i = 0; i < totalToken; i++) {
            token = condition.match(/{\w+}/);
            if(token.length > 0)    {
                param = token[0].replace('{','').replace('}','');
                if(tableDesc.hasOwnProperty(param)) {
                    condition = condition.replace(token[0],'tuple["'+ param +'"]');
                }else   {
                    condition = false;
                    break;
                }
            }
        }
        
        return condition; 
    };
    
    /**
     * Method to retrive data from the storage;
     * @method : dataFieldUnMatch;
     * @access : private;
     * @param : object data;
     * @return : object;
     */
    Private.find = function(data)   {
        var condition = Webbase.CriteriaStruct.where, tuple, resultData = [], subTuple = {}, selectArray;
        condition = this.parseAndPrepareCondition(condition,this.checkTableAlreadyExists(Webbase.CriteriaStruct.from).field);
        for(var i = 0; i < data.length; i++)    {
            tuple = data[i];
            if(eval(condition)) {
                subTuple = {};
                selectArray = Webbase.CriteriaStruct.select;
                if(selectArray[0] != '*')	{
	                for(var j = 0; j < selectArray.length; j++)   {
	                    subTuple[selectArray[j]] = tuple[selectArray[j]]; 
	                }
	                resultData.push(subTuple);
            	}else	{
                	resultData.push(tuple);
                }
            }
        }
        
        return resultData;
    };
	
	/** 
	 * DataManager Constructor;
	 */
	var DataManager = function()	{
	};
	
	/**
	 * Method to create table in the storage;
	 * @access : public;
	 * @method : create;
	 * @param : string tableName;
	 * @param : string desc;
	 */
	DataManager.prototype.create = function(tableName, desc)	{
		try	{
			Private.initCreate(tableName, desc);
		}catch(err)	{
			console.log(err.message());
		}
	};
    
    /**
	 * Method to insert data into table;
	 * @access : public;
	 * @method : insert;
	 * @param : string tableName;
	 * @param : string desc;
	 */
    DataManager.prototype.insert = function(tableName, data)    {
        try {
            Private.initInsert(tableName, data);
        }catch(error)    {
            console.log(error.message());
        }
    };
    
    /**
	 * Method to set select fields to the CriteriaStruct to get data;
	 * @access : public;
	 * @method : select;
	 * @param : string fields;
	 * @return object;
	 */
    DataManager.prototype.select = function(fields) {
        var fields = fields.split(',');
        
        if(fields.length > 0)  {
            Webbase.CriteriaStruct.select = fields;
        }else   {
            Webbase.CriteriaStruct.select = [];
            Webbase.CriteriaStruct.select.push('*');
        }
        
        return this;
    };
    
    /**
	 * Method to set table name to the CriteriaStruct to get data;
	 * @access : public;
	 * @method : from;
	 * @param : string tableName;
	 * @return object;
	 */
    DataManager.prototype.from = function(tableName)    {
        Webbase.CriteriaStruct.from = tableName;
        
        return this;
    };
    
    /**
	 * Method to set search criteria to the CriteriaStruct;
	 * @access : public;
	 * @method : where;
	 * @param : string criteria;
	 * @return object;
	 */
    DataManager.prototype.where = function(criteria) {
        Webbase.CriteriaStruct.where = criteria;
        
        return this;
    };
    
    /**
	 * Method to initiate search over the data set with respect to the CriteriaStruct;
	 * @access : public;
	 * @method : find;
	 * @return object;
	 */
    DataManager.prototype.find = function() {
        try {
            if(Webbase.CriteriaStruct.from.length > 0) {
                if(Webbase.CriteriaStruct.select.length <= 0)   {
                    Webbase.CriteriaStruct.select = ['*'];    
                }
                
                var tableData = Private.getTableData(Webbase.CriteriaStruct.from);
                Private.find(tableData);
                
                Private.resetCriteriaStruct();
            }else   {
                Private.resetCriteriaStruct();
                throw new Webbase.Exception('CRT01');
            }        
        }catch(error)   {
            console.log(error.message());
        }
    };
	
	return DataManager;
})();

/**
 * This module provide create, insert and select methods to store data which is inherited 
 * from DataManager and StorageManager modules;
 * @module : Storage;
 * @package : Webbase;
 * @inherit : DataManager, StorageManager;
 * @version : 1.0.0;
 * @return : Object;
 */
var Storage = Webbase.Storage = (function()	{

	/**
	 * Storage Constructor;
	 */
	var Storage = function()	{
		this.identifyStorage();
	};
	
	/**
	 * Inherting DataManager;
	 */
	Storage = WebbaseUtility.ObjectExt.inherit(DataManager, Storage);

	/**
	 * Inherting StorageManager;
	 */
	Storage = WebbaseUtility.ObjectExt.inherit(StorageManager, Storage);
	
	return new Storage();
})();