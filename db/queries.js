let pgp = require("pg-promise")();
require("dotenv").config();
let conString = process.env.DATABASE_URL;

let db = pgp(conString);
//creates new bar element including:
// bar - Id(int), bar_name(string), type_of_bar(string), bar_details(string)
// let insertAllBars = (req, res, next) => {
//     db.none('INSERT INTO "Bars" VALUES (bar_id, bar_name, type_of_bar, bar_details);')
//         .then((data) => {
//             console.log('DATA:', data);
//             res.status(200)
//                 .json({
//                     status: 'whoo-hoo',
//                     data: data,
//                     message: 'One Bar Added'
//                 });
//         })
//         .catch((err) => {
//             return next(err);
//         });
// };

let getAllBars = (req, res, next) => {
  db
    .any('SELECT * FROM public."Bars";')
    .then(data => {
      console.log("DATA:", data);
      res.status(200).json({
        status: "Done",
        data: data,
        message: "Yay All the Bars "
      });
    })
    .catch(err => {
      return next(err);
    });
};
// grabs one of the meal elements from the list
// let getOneMeal = (req, res, next) => {
//     let mealId = parseInt(req.params.id);
//     db.one('select * from meals where id = $1', mealId) //.one() selects one from tasks
//         .then((data) => {
//             res.status(200) //200success
//                 .json({
//                     status: 'whoo-hoo',
//                     data: data,
//                     message: 'One Meal Was Grabbed'
//                 });
//         })
//         .catch((err) => {
//             return next(err);
//         });
// };
//enters/adds one full meal item including:
//item name, note, rating, spicy (T/F), cost (float), and timestamp
// let updateMeal = (req, res, next) => { //item, note, rating, spicy, cost, timestamp
//     db.none('update meals set item=$1, note=$1, rating=$1, spicy=$1, cost=$1, timestamp=$1 where id=$1', [req.body.item, parseInt(req.body.note), parseInt(req.body.rating), parseInt(req.body.spicy), parseInt(req.body.cost), parseInt(req.body.timestamp), parseInt(req.params.id)])
//         .then(() => {
//             res.status(200) //200success
//                 .json({
//                     status: 'whoo-hoo',
//                     message: 'Task Updated'
//                 });
//         })
//         .catch((err) => {
//             return next(err);
//         });
// };
//deletes the element from the Bar list
// let deleteBar = (req, res, next) => {
//     let bar_d = parseInt(req.params.id);
//     db.result(DELETE FROM "Bars" WHERE bar_id = " ";)
//         .then((result) => {
//             res.status(200) //200success
//                 .json({
//                     status: 'whoo-hoo',
//                     message: `Removed ${result.rowCount} Bar`
//                 });
//         })
//         .catch((err) => {
//             return next(err);
//         });
// };
//CRUD
module.exports = {
  // createBars: createBars, //CREATE
  getAllBars: getAllBars //READ ALL
  // getOneBar: getOneBar, //READ ONE
  // updateBars: updateBars, //UPDATE
  // deleteBars: deleteBars //DELETE
};
