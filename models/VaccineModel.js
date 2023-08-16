'use strict';

var _ = require('underscore');
var util = require('../util/util');
var jsonFile = './data/vaccine.json';

let techsData = JSON.parse(util.readFile(jsonFile));

exports.get_all = function(re, res){
    return techsData;
};

exports.get_by_id = function(id, res){
    var filtered = techsData.filter (c=> c.vaccineId == id);
    return filtered;
};

exports.create = function(re, res){
    var code=200;
    var message= '';
    var data=null;
    var list = this.get_by_id(re.vaccineId);
    if (list.length > 0){
        message = 'Duplicate data is not allowed. The vaccince is already stored. Try to insert another one.';
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
    var list = this.get_by_id(re.vaccineId);
    if (list.length > 0){
        techsData = techsData.filter((el) => {
            return el.vaccineId !== list[0].vaccineId;
          });

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

exports.remove = function(conId, res){
    var code=200;
    var message= 'Information was removed properly.';
    var data = null;
    var list = this.get_by_id(conId);
    if (list.length > 0){
        techsData = techsData.filter((el) => {
            return el.vaccineId !== list[0].vaccineId;
          });
        util.writeFile(JSON.stringify(techsData), jsonFile);
        data = list[0];
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