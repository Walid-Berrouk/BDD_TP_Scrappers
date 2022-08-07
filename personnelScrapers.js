const puppeteer = require('puppeteer');
const reader = require('xlsx');
var excel = require('excel4node');

const frToEn = {
    "janvier":"january",
    "février":"february",
    "mars":"march",
    "avril":"april",
    "mai":"may",
    "juin":"june",
    "juillet":"july",
    "août":"august",
    "septembre":"september",
    "octobre":"october",
    "novembre":"november",
    "décembre":"december"
}

function getDate(input) {
    const date = input.split(" ");
    const day = date[0];
    const month = frToEn[date[1].toLowerCase()];
    const year = date[2];
    const dateValid = new Date(`${day} ${month} ${year}`);
    return dateValid.getDate() + '/' + dateValid.getMonth() + '/' + dateValid.getFullYear()
}


async function personnelScraper(url) {

    // Create a new instance of a Workbook class
    var workbook = new excel.Workbook();

    // Opem puppeteer browser

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    //! starts clubs here
    const hrefs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".info-results ul li .goals-result a")).map(x => x.getAttribute("href"))
    })

    let arrayTmp = [];

    for (let Tmp = 0; Tmp < hrefs.length; Tmp++) {
        if (hrefs[Tmp].startsWith('/club')) {
            arrayTmp.push(hrefs[Tmp])
        }
        
    }

    const clubsDetails = arrayTmp;


    console.log(clubsDetails)

    //! starts single club here
    for (let indexGlobal = 0; indexGlobal < clubsDetails.length; indexGlobal++) {

        // Opem puppeteer browser
        console.log("http://lfwa.dz" + clubsDetails[indexGlobal])

        // await page.goto(url);
        await page.goto("http://lfwa.dz" + clubsDetails[indexGlobal]);

        await new Promise(r => setTimeout(r, 3000));

        

        // Test Title
       const [test] = await page.$x('/html/body/div[2]/div[1]/div/div/div[1]/h1');
       const testTxt = await test.getProperty('textContent');
       const testRawTxt = await testTxt.jsonValue();

        if (testRawTxt.startsWith('Erreur')) {
            continue
        }

       // Clubs Title
       const [name] = await page.$x('/html/body/div[2]/div[2]/div/div/div/div[1]/div/div[2]/h1');
       const txt = await name.getProperty('textContent');
       const rawTxt = await txt.jsonValue();

       // Add Worksheets to the workbook
       var worksheet = workbook.addWorksheet(rawTxt.replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", ""));


       const elementsDetails = await page.evaluate(() => {
           return Array.from(document.querySelectorAll("#coachs .row .col-xl-4 .item-player .btn")).map(x => x.getAttribute("href"))
       })

       for (let index = 0; index < elementsDetails.length ; index++) {


               // Opem puppeteer browser
               console.log("http://lfwa.dz" + elementsDetails[index])

               // await page.goto(url);
               await page.goto("http://lfwa.dz" + elementsDetails[index]);

               await new Promise(r => setTimeout(r, 3000));


               // img link
               // const [el] = await page.$x('IMG_XPATH');
               // const src = await el.getProperty('src');
               // const srcTxt = await src.jsonValue();

               // console.log({srcTxt});

               // Title & Fonction
               const [name] = await page.$x('/html/body/div[2]/div[2]/section/div/div/div/div[1]/div/div[2]/h4');
               const txt = await name.getProperty('textContent');
               const rawTxt = await txt.jsonValue();

               // Age
               const [age] = await page.$x('/html/body/div[2]/div[2]/section/div/div/div/div[1]/div/div[2]/ul/li[3]/span');
               const ageTxt = await age.getProperty('textContent');
               const ageRawTxt = await ageTxt.jsonValue();

               // Date de Naissance
               const [dateNaissance] = await page.$x('/html/body/div[2]/div[2]/section/div/div/div/div[1]/div/div[2]/ul/li[4]/span');
               const dateNaissanceTxt = await dateNaissance.getProperty('textContent');
               const dateNaissanceRawTxt = await dateNaissanceTxt.jsonValue();

               const dateNaissanceRawTxtValid = getDate(dateNaissanceRawTxt);

               // Lieu de Naissance
               const [lieuNaissance] = await page.$x('/html/body/div[2]/div[2]/section/div/div/div/div[1]/div/div[2]/ul/li[5]/span');
               const lieuNaissanceTxt = await lieuNaissance.getProperty('textContent');
               const lieuNaissanceRawTxt = await lieuNaissanceTxt.jsonValue();

               // wilaya
               const [wilaya] = await page.$x('/html/body/div[2]/div[2]/section/div/div/div/div[1]/div/div[2]/ul/li[6]/span');
               const wilayaTxt = await wilaya.getProperty('textContent');
               const wilayaRawTxt = await wilayaTxt.jsonValue();

               // category
               const [category] = await page.$x('/html/body/div[2]/div[2]/section/div/div/div/div[1]/div/div[2]/ul/li[2]/span');
               const categoryTxt = await category.getProperty('textContent');
               const categoryRawTxt = await categoryTxt.jsonValue();

               let table = [];
               rawTxt.replace("\n", "").split(" ").forEach(element => {
                   if (element.length > 2) {
                       table.push(element)
                   }
               })

               // Add Single entreneur into sheet
               console.log(table, ageRawTxt, dateNaissanceRawTxt, lieuNaissanceRawTxt, wilayaRawTxt, categoryRawTxt)

               // Nom
               worksheet.cell(index + 2, 2)
           .string(table[0])

               // Prenom
           worksheet.cell(index + 2, 3)
           .string(table[1])

           // Age
           worksheet.cell(index + 2, 4)
           .string(ageRawTxt)

           // Date de Naissance
           worksheet.cell(index + 2, 5)
           .string(dateNaissanceRawTxtValid)

           // Lieu de Naissance
           worksheet.cell(index + 2, 6)
           .string(lieuNaissanceRawTxt)

           // Wilaya
           worksheet.cell(index + 2, 7)
           .string(wilayaRawTxt)

           // Category
           worksheet.cell(index + 2, 8)
           .string(categoryRawTxt)

           // Fonction
           if (table.length === 4) {
               worksheet.cell(index + 2, 9)
               .string(table[2] + " " + table[3])
           }
           else{
               if (table.length === 5) {
                   worksheet.cell(index + 2, 9)
                   .string(table[2] + " " + table[3] + " " + table[4])
               }
               else {
                   worksheet.cell(index + 2, 9)
                   .string(table[2])
               }
           }
           

       };
       //! finish single club here
    }

    
    //! starts clubs here
    // write into sheet
    workbook.write('entraineurs_H3.xlsx');
    browser.close();
}


personnelScraper('http://lfwa.dz/programme/journee?cat=1&id=1&grp=27&fbclid=IwAR2-MwXOzj9xFDp-9-Kwda2jvWrMr0SBtpqNP3IaN8os3kxIGDosDWgvuRg');



