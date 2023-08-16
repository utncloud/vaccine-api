'use strict';

var _ = require('underscore');
var util = require('../util/util');
var jsonFile = './data/province.json';

let techsData = JSON.parse(util.readFile(jsonFile));

exports.get_all = function(re, res){
    return techsData;
};

exports.get_by_id = function(conId, res){
    var filtered = techsData.filter (c=> c.provinceCode == conId);
    return filtered;
};
