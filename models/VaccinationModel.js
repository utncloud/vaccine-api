'use strict';

var _ = require('underscore');
var util = require('../util/util');
var jsonFile = './data/vaccination.json';

let techsData = JSON.parse(util.readFile(jsonFile));

exports.get_all = function(re, res){
    return techsData;
};

exports.get_by_id = function(personId, vaccineId, res){
    var code=200;
    var message= '';
    var filtered = techsData.filter (c=> c.vaccineId == vaccineId && c.personId == personId);
    if (filtered.length <= 0){
        message = "The person does not have the vaccine specified.";
        code = -1;
    }
    return {
        data: filtered,
        responseCode: code,
        message: message
    };
};

exports.create = function(re, res){
    var code=200;
    var message= '';
    var data=null;
    var list = this.get_by_id(re.personId, re.vaccineId);
    if (list.responseCode != -1){
        message = 'Duplicate data is not allowed. The vaccince is already applied to the person. Try to insert another one.';
        code = -1;
    }else{
        techsData.push(re);        
        util.writeFile(JSON.stringify(techsData), jsonFile);
        data = re;
    }
    return {
        data: data,
        responseCode: code,
        message: message
    };
};

exports.update = function(re, res){
    var code=200;
    var message= '';
    var data = null;
    var list = this.get_by_id(re.personId, re.vaccineId);
    if (list.responseCode != -1){
        var temp = techsData.filter((el) => {
            return el.personId === list.data[0].personId && el.vaccineId === list.data[0].vaccineId;
          });
        
        let index = techsData.indexOf(temp[0]);
        if (index > -1) { 
            techsData.splice(index, 1);
        }
 
        techsData.push(re);
        util.writeFile(JSON.stringify(techsData), jsonFile);
        data = re;
    }else{        
        message = 'The information was not found to be updated.';
        code = -1;
    }
    return {
        data: data,
        responseCode: code,
        message: message
    };
};

exports.remove = function(personId, vaccineId, res){
    var code=200;
    var message= 'Information was removed properly.';
    var data = null;
    var list = this.get_by_id(personId, vaccineId);
    if (list.responseCode != -1){
        var temp = techsData.filter((el) => {
            return el.personId === list.data[0].personId && el.vaccineId === list.data[0].vaccineId;
          });
        
        let index = techsData.indexOf(temp[0]);
        if (index > -1) { 
            techsData.splice(index, 1);
        }
        util.writeFile(JSON.stringify(techsData), jsonFile);
        data = list.data[0];
    }else{        
        message = 'The information was not found to be removed.';
        code = -1;
    }
    return {
        data: data,
        responseCode: code,
        message: message
    };
};