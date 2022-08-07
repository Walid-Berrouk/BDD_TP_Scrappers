"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var puppeteer = require('puppeteer');

var reader = require('xlsx');

var excel = require('excel4node');

var frToEn = {
  "janvier": "january",
  "février": "february",
  "mars": "march",
  "avril": "april",
  "mai": "may",
  "juin": "june",
  "juillet": "july",
  "août": "august",
  "septembre": "september",
  "octobre": "october",
  "novembre": "november",
  "décembre": "december"
};

function getDate(input) {
  var date = input.split(" ");
  var day = date[0];
  var month = frToEn[date[1].toLowerCase()];
  var year = date[2];
  var dateValid = new Date("".concat(day, " ").concat(month, " ").concat(year));
  return dateValid.getDate() + '/' + dateValid.getMonth() + '/' + dateValid.getFullYear();
}

function personnelScraper(url) {
  var workbook, browser, page, hrefs, arrayTmp, Tmp, clubsDetails, indexGlobal, _ref, _ref2, test, testTxt, testRawTxt, _ref3, _ref4, name, txt, rawTxt, worksheet, elementsDetails, _loop, index;

  return regeneratorRuntime.async(function personnelScraper$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // Create a new instance of a Workbook class
          workbook = new excel.Workbook(); // Opem puppeteer browser

          _context2.next = 3;
          return regeneratorRuntime.awrap(puppeteer.launch());

        case 3:
          browser = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(browser.newPage());

        case 6:
          page = _context2.sent;
          _context2.next = 9;
          return regeneratorRuntime.awrap(page["goto"](url));

        case 9:
          _context2.next = 11;
          return regeneratorRuntime.awrap(page.evaluate(function () {
            return Array.from(document.querySelectorAll(".info-results ul li .goals-result a")).map(function (x) {
              return x.getAttribute("href");
            });
          }));

        case 11:
          hrefs = _context2.sent;
          arrayTmp = [];

          for (Tmp = 0; Tmp < hrefs.length; Tmp++) {
            if (hrefs[Tmp].startsWith('/club')) {
              arrayTmp.push(hrefs[Tmp]);
            }
          }

          clubsDetails = arrayTmp;
          console.log(clubsDetails); //! starts single club here

          indexGlobal = 0;

        case 17:
          if (!(indexGlobal < clubsDetails.length)) {
            _context2.next = 63;
            break;
          }

          // Opem puppeteer browser
          console.log("http://lfwa.dz" + clubsDetails[indexGlobal]); // await page.goto(url);

          _context2.next = 21;
          return regeneratorRuntime.awrap(page["goto"]("http://lfwa.dz" + clubsDetails[indexGlobal]));

        case 21:
          _context2.next = 23;
          return regeneratorRuntime.awrap(new Promise(function (r) {
            return setTimeout(r, 3000);
          }));

        case 23:
          _context2.next = 25;
          return regeneratorRuntime.awrap(page.$x('/html/body/div[2]/div[1]/div/div/div[1]/h1'));

        case 25:
          _ref = _context2.sent;
          _ref2 = _slicedToArray(_ref, 1);
          test = _ref2[0];
          _context2.next = 30;
          return regeneratorRuntime.awrap(test.getProperty('textContent'));

        case 30:
          testTxt = _context2.sent;
          _context2.next = 33;
          return regeneratorRuntime.awrap(testTxt.jsonValue());

        case 33:
          testRawTxt = _context2.sent;

          if (!testRawTxt.startsWith('Erreur')) {
            _context2.next = 36;
            break;
          }

          return _context2.abrupt("continue", 60);

        case 36:
          _context2.next = 38;
          return regeneratorRuntime.awrap(page.$x('/html/body/div[2]/div[2]/div/div/div/div[1]/div/div[2]/h1'));

        case 38:
          _ref3 = _context2.sent;
          _ref4 = _slicedToArray(_ref3, 1);
          name = _ref4[0];
          _context2.next = 43;
          return regeneratorRuntime.awrap(name.getProperty('textContent'));

        case 43:
          txt = _context2.sent;
          _context2.next = 46;
          return regeneratorRuntime.awrap(txt.jsonValue());

        case 46:
          rawTxt = _context2.sent;
          // Add Worksheets to the workbook
          worksheet = workbook.addWorksheet(rawTxt.replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", ""));
          _context2.next = 50;
          return regeneratorRuntime.awrap(page.evaluate(function () {
            return Array.from(document.querySelectorAll("#coachs .row .col-xl-4 .item-player .btn")).map(function (x) {
              return x.getAttribute("href");
            });
          }));

        case 50:
          elementsDetails = _context2.sent;

          _loop = function _loop(index) {
            var _ref5, _ref6, name, txt, rawTxt, _ref7, _ref8, age, ageTxt, ageRawTxt, _ref9, _ref10, dateNaissance, dateNaissanceTxt, dateNaissanceRawTxt, dateNaissanceRawTxtValid, _ref11, _ref12, lieuNaissance, lieuNaissanceTxt, lieuNaissanceRawTxt, _ref13, _ref14, wilaya, wilayaTxt, wilayaRawTxt, _ref15, _ref16, category, categoryTxt, categoryRawTxt, table;

            return regeneratorRuntime.async(function _loop$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    // Opem puppeteer browser
                    console.log("http://lfwa.dz" + elementsDetails[index]); // await page.goto(url);

                    _context.next = 3;
                    return regeneratorRuntime.awrap(page["goto"]("http://lfwa.dz" + elementsDetails[index]));

                  case 3:
                    _context.next = 5;
                    return regeneratorRuntime.awrap(new Promise(function (r) {
                      return setTimeout(r, 3000);
                    }));

                  case 5:
                    _context.next = 7;
                    return regeneratorRuntime.awrap(page.$x('/html/body/div[2]/div[2]/section/div/div/div/div[1]/div/div[2]/h4'));

                  case 7:
                    _ref5 = _context.sent;
                    _ref6 = _slicedToArray(_ref5, 1);
                    name = _ref6[0];
                    _context.next = 12;
                    return regeneratorRuntime.awrap(name.getProperty('textContent'));

                  case 12:
                    txt = _context.sent;
                    _context.next = 15;
                    return regeneratorRuntime.awrap(txt.jsonValue());

                  case 15:
                    rawTxt = _context.sent;
                    _context.next = 18;
                    return regeneratorRuntime.awrap(page.$x('/html/body/div[2]/div[2]/section/div/div/div/div[1]/div/div[2]/ul/li[3]/span'));

                  case 18:
                    _ref7 = _context.sent;
                    _ref8 = _slicedToArray(_ref7, 1);
                    age = _ref8[0];
                    _context.next = 23;
                    return regeneratorRuntime.awrap(age.getProperty('textContent'));

                  case 23:
                    ageTxt = _context.sent;
                    _context.next = 26;
                    return regeneratorRuntime.awrap(ageTxt.jsonValue());

                  case 26:
                    ageRawTxt = _context.sent;
                    _context.next = 29;
                    return regeneratorRuntime.awrap(page.$x('/html/body/div[2]/div[2]/section/div/div/div/div[1]/div/div[2]/ul/li[4]/span'));

                  case 29:
                    _ref9 = _context.sent;
                    _ref10 = _slicedToArray(_ref9, 1);
                    dateNaissance = _ref10[0];
                    _context.next = 34;
                    return regeneratorRuntime.awrap(dateNaissance.getProperty('textContent'));

                  case 34:
                    dateNaissanceTxt = _context.sent;
                    _context.next = 37;
                    return regeneratorRuntime.awrap(dateNaissanceTxt.jsonValue());

                  case 37:
                    dateNaissanceRawTxt = _context.sent;
                    dateNaissanceRawTxtValid = getDate(dateNaissanceRawTxt); // Lieu de Naissance

                    _context.next = 41;
                    return regeneratorRuntime.awrap(page.$x('/html/body/div[2]/div[2]/section/div/div/div/div[1]/div/div[2]/ul/li[5]/span'));

                  case 41:
                    _ref11 = _context.sent;
                    _ref12 = _slicedToArray(_ref11, 1);
                    lieuNaissance = _ref12[0];
                    _context.next = 46;
                    return regeneratorRuntime.awrap(lieuNaissance.getProperty('textContent'));

                  case 46:
                    lieuNaissanceTxt = _context.sent;
                    _context.next = 49;
                    return regeneratorRuntime.awrap(lieuNaissanceTxt.jsonValue());

                  case 49:
                    lieuNaissanceRawTxt = _context.sent;
                    _context.next = 52;
                    return regeneratorRuntime.awrap(page.$x('/html/body/div[2]/div[2]/section/div/div/div/div[1]/div/div[2]/ul/li[6]/span'));

                  case 52:
                    _ref13 = _context.sent;
                    _ref14 = _slicedToArray(_ref13, 1);
                    wilaya = _ref14[0];
                    _context.next = 57;
                    return regeneratorRuntime.awrap(wilaya.getProperty('textContent'));

                  case 57:
                    wilayaTxt = _context.sent;
                    _context.next = 60;
                    return regeneratorRuntime.awrap(wilayaTxt.jsonValue());

                  case 60:
                    wilayaRawTxt = _context.sent;
                    _context.next = 63;
                    return regeneratorRuntime.awrap(page.$x('/html/body/div[2]/div[2]/section/div/div/div/div[1]/div/div[2]/ul/li[2]/span'));

                  case 63:
                    _ref15 = _context.sent;
                    _ref16 = _slicedToArray(_ref15, 1);
                    category = _ref16[0];
                    _context.next = 68;
                    return regeneratorRuntime.awrap(category.getProperty('textContent'));

                  case 68:
                    categoryTxt = _context.sent;
                    _context.next = 71;
                    return regeneratorRuntime.awrap(categoryTxt.jsonValue());

                  case 71:
                    categoryRawTxt = _context.sent;
                    table = [];
                    rawTxt.replace("\n", "").split(" ").forEach(function (element) {
                      if (element.length > 2) {
                        table.push(element);
                      }
                    }); // Add Single entreneur into sheet

                    console.log(table, ageRawTxt, dateNaissanceRawTxt, lieuNaissanceRawTxt, wilayaRawTxt, categoryRawTxt); // Nom

                    worksheet.cell(index + 2, 2).string(table[0]); // Prenom

                    worksheet.cell(index + 2, 3).string(table[1]); // Age

                    worksheet.cell(index + 2, 4).string(ageRawTxt); // Date de Naissance

                    worksheet.cell(index + 2, 5).string(dateNaissanceRawTxtValid); // Lieu de Naissance

                    worksheet.cell(index + 2, 6).string(lieuNaissanceRawTxt); // Wilaya

                    worksheet.cell(index + 2, 7).string(wilayaRawTxt); // Category

                    worksheet.cell(index + 2, 8).string(categoryRawTxt); // Fonction

                    if (table.length === 4) {
                      worksheet.cell(index + 2, 9).string(table[2] + " " + table[3]);
                    } else {
                      if (table.length === 5) {
                        worksheet.cell(index + 2, 9).string(table[2] + " " + table[3] + " " + table[4]);
                      } else {
                        worksheet.cell(index + 2, 9).string(table[2]);
                      }
                    }

                  case 83:
                  case "end":
                    return _context.stop();
                }
              }
            });
          };

          index = 0;

        case 53:
          if (!(index < elementsDetails.length)) {
            _context2.next = 59;
            break;
          }

          _context2.next = 56;
          return regeneratorRuntime.awrap(_loop(index));

        case 56:
          index++;
          _context2.next = 53;
          break;

        case 59:
          ; //! finish single club here

        case 60:
          indexGlobal++;
          _context2.next = 17;
          break;

        case 63:
          //! starts clubs here
          // write into sheet
          workbook.write('entraineurs_H3.xlsx');
          browser.close();

        case 65:
        case "end":
          return _context2.stop();
      }
    }
  });
}

personnelScraper('http://lfwa.dz/programme/journee?cat=1&id=1&grp=27&fbclid=IwAR2-MwXOzj9xFDp-9-Kwda2jvWrMr0SBtpqNP3IaN8os3kxIGDosDWgvuRg');