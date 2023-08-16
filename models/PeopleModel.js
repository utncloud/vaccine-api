'use strict';

var _ = require('underscore');
var util = require('../util/util');
var jsonFile = './data/people.json';

let techsData = JSON.parse(util.readFile(jsonFile));

exports.get_all = function(re, res){
    return techsData;
};

exports.get_by_id = function(id, res){
    var filtered = techsData.filter (c=> c.personId == id);
    return filtered;
};

exports.create = function(re, res){
    var code=200;
    var message= '';
    var data=null;
    var list = this.get_by_id(re.personId);
    if (list.length > 0){
        message = 'Duplicate data is not allowed. The person is already stored. Try to insert another one.';
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
    var list = this.get_by_id(re.personId);
    if (list.length > 0){
        techsData = techsData.filter((el) => {
            return el.personId !== list[0].personId;
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

exports.remove = function(id, res){
    var code=200;
    var message= 'Information was removed properly.';
    var data = null;
    var list = this.get_by_id(id);
    if (list.length > 0){
        techsData = techsData.filter((el) => {
            return el.personId !== list[0].personId;
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