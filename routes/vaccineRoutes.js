'use strict';
module.exports = function (app){
    var province = require('../controllers/ProvinceController');
    var vaccine = require('../controllers/VaccineController');
    var people = require('../controllers/PeopleController');

    //province
   app.route('/province')
        .get(province.get_all);

   app.route('/province/:id')
        .get(province.get_by_id);

//Vaccine
   app.route('/vaccine')
        .get(vaccine.get_all);

   app.route('/vaccine/:id')
        .get(vaccine.get_by_id);

   app.route('/vaccine')
        .post(vaccine.create);

   app.route('/vaccine')
        .put(vaccine.update);

   app.route('/vaccine')
        .delete(vaccine.remove);

     //people
     app.route('/people')
          .get(people.get_all);

     app.route('/people/:id')
          .get(people.get_by_id);

     app.route('/people')
          .post(people.create);

     app.route('/people')
          .put(people.update);

     app.route('/people')
          .delete(people.remove);


};