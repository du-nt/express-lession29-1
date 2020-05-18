// var db = require("../db");

// module.exports.count = function(req, res, next) {
//   var cookies = req.cookies;
//   var arr = Object.values(cookies);
//   var savedCookies = db.get("cookies").value();

//   if (savedCookies.length) {
//     for (var savedCookie of savedCookies)
//       if (arr.indexOf(savedCookie.value) === -1)
//         db.get("cookies")
//           .remove({ value: savedCookie.value })
//           .write();
//   }

//   for (var key in cookies) {
//     var result = db
//       .get("cookies")
//       .find({ value: cookies[key] })
//       .value();
//     if (result) {
//       db.get("cookies")
//         .find({ value: cookies[key] })
//         .assign({ count: result.count + 1 })
//         .write();
//       console.log(`${cookies[key]} : ${result.count}`);
//     } else {
//       db.get("cookies")
//         .push({ value: cookies[key], count: 1 })
//         .write();
//       console.log(`${cookies[key]} : 1`);
//     }
//   }

//   next();
// };
