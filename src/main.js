const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

document.addEventListener('DOMContentLoaded', function () {
  var btnCreate = document.getElementById('btnCreate');
  var btnRead = document.getElementById('btnRead');
  var btnUpdate = document.getElementById('btnUpdate'); // Added Update button
  var btnDelete = document.getElementById('btnDelete');
  var fileName = document.getElementById('fileName');
  var fileContents = document.getElementById('fileContents');
  let pathName = path.join(__dirname, 'Files');

  btnCreate.addEventListener('click', function () {
    let file = path.join(pathName, fileName.value);
    let contents = fileContents.value;

    fs.writeFile(file, contents, function (err) {
      if (err) {
        return console.log(err);
      }
      var txtfile = fileName.value;
      alert(txtfile + " text file was created");
      console.log("The file was created");
    });
  });

  btnRead.addEventListener('click', function () {
    let file = path.join(pathName, fileName.value);

    fs.readFile(file, 'utf-8', function (err, data) {
      if (err) {
        return console.log(err);
      }
      fileContents.value = data;
      console.log("The file was read!");
    });
  });

  btnUpdate.addEventListener('click', function () {
    let file = path.join(pathName, fileName.value);
    let contents = fileContents.value;

    fs.writeFile(file, contents, function (err) {
      if (err) {
        return console.log(err);
      }
      var txtfile = fileName.value;
      alert(txtfile + " text file was updated");
      console.log("The file was updated");
    });
  });

  btnDelete.addEventListener('click', function () {
    let file = path.join(pathName, fileName.value);

    fs.unlink(file, function (err) {
      if (err) {
        return console.log(err);
      }
      fileName.value = "";
      fileContents.value = "";
      console.log("The file was deleted!");
    });
  });
});
