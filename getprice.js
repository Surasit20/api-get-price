const puppeteer = require('puppeteer');

const getData = async () => {
  const url1 = {
    crv: 'https://chobrod.com/car-honda-cr-v-year-2021',
    city: 'https://chobrod.com/car-honda-city-hatchback-year-2021',
    fortuner: 'https://chobrod.com/car-toyota-fortuner-year-2021',
    corolla: 'https://chobrod.com/car-toyota-corolla-cross-year-2021',
    navara: 'https://chobrod.com/car-nissan-navara-year-2021',
    yaris: 'https://chobrod.com/car-toyota-yaris-year-2021',
    revo: 'https://chobrod.com/car-toyota-hilux-revo-year-2021',
    mux: 'https://chobrod.com/car-isuzu-mu-x-year-2021',
    terra: 'https://chobrod.com/car-nissan-terra-year-2021',
    outlander: 'https://chobrod.com/car-mitsubishi-outlander-year-2021',
    attrage: 'https://chobrod.com/car-mitsubishi-attrage-year-2021',
  };
  const url2 = {
    march:
      'https://www.one2car.com/%E0%B8%A3%E0%B8%96-%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A-%E0%B8%82%E0%B8%B2%E0%B8%A2/nissan/march?page_size=26&min_year=2021&max_year=2021',
    supra:
      'https://www.one2car.com/%E0%B8%A3%E0%B8%96-%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A-%E0%B8%82%E0%B8%B2%E0%B8%A2/toyota/supra',
    jazz: 'https://www.one2car.com/%E0%B8%A3%E0%B8%96-%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A-%E0%B8%82%E0%B8%B2%E0%B8%A2/honda/jazz?page_size=26&min_year=2021&max_year=2021',
    pajero:
      'https://www.one2car.com/%E0%B8%A3%E0%B8%96-%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A-%E0%B8%82%E0%B8%B2%E0%B8%A2/mitsubishi/pajero-sport?min_year=2021&max_year=2021',
    note: 'https://www.one2car.com/%E0%B8%A3%E0%B8%96-%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A-%E0%B8%82%E0%B8%B2%E0%B8%A2/nissan/note?page_size=26&min_year=2021&max_year=2021',
  };
  const url3 = {
    xseries:
      'https://rod.kaidee.com/c11a8678-auto-car-1.9-hi-lander-x-series-z?car_year=2021',
  };
  const url4 = {
    civic:
      'https://www.taladrod.com/w40/icar/compare.aspx?cids=2548208,2536111',
  };

  var dataCarPrice = {};

  for (const [key, value] of Object.entries(url1)) {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(value);

      let dataPrice = await page.evaluate(() => {
        let data = [];
        let elements = document.getElementsByClassName('price');
        for (let element of elements) {
          if (element.textContent === '฿ติดต่อผู้ขาย') {
            continue;
          }
          element.textContent = element.textContent.replace('฿', '');
          element.textContent = element.textContent.replaceAll(',', '');
          data.push(parseInt(element.textContent, 10));
        }
        return data;
      });

      await browser.close();
      //find max min price car two hand
      let min = dataPrice[0];
      let max = dataPrice[0];
      dataPrice.forEach((element) => {
        if (element < min) min = element;
        if (element > max) max = element;
      });
      //console.log(min, max);
      const date = new Date();
      let ob = {
        min: min.toString() || 'ไม่มีข้อมูล',
        max: max.toString() || 'ไม่มีข้อมูล',
        year: date.getFullYear().toString(),
        month: (date.getMonth() + 1).toString(),
      };
      dataCarPrice[key] = ob;
    } catch (e) {
      const date = new Date();
      let ob = {
        min: 'ไม่มีข้อมูล',
        max: 'ไม่มีข้อมูล',
        year: date.getFullYear(),
        month: date.getMonth() + 1,
      };
      dataCarPrice[key] = ob;
    }
  }

  for (const [key, value] of Object.entries(url2)) {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(value);

      let dataPrice = await page.evaluate(() => {
        let data = [];
        let elementsPrice = document.getElementsByClassName(
          'listing__price  delta  weight--bold'
        );
        for (let i = 0; i < elementsPrice.length; i++) {
          if (
            elementsPrice[i].textContent.length > 20 ||
            elementsPrice[i].textContent === 'ติดต่อผู้ขาย'
          ) {
            continue;
          }
          elementsPrice[i].textContent = elementsPrice[
            i
          ].textContent.replaceAll(' ', '');
          elementsPrice[i].textContent = elementsPrice[
            i
          ].textContent.replaceAll(',', '');
          elementsPrice[i].textContent = elementsPrice[
            i
          ].textContent.replaceAll('บาท', '');
          data.push(parseInt(elementsPrice[i].textContent, 10));
        }

        return data;
      });

      await browser.close();
      let min = dataPrice[0];
      let max = dataPrice[0];
      dataPrice.forEach((element) => {
        if (element < min) min = element;
        if (element > max) max = element;
      });
      //console.log(min, max);
      const date = new Date();
      let ob = {
        min: min.toString() || 'ไม่มีข้อมูล',
        max: min.toString() || 'ไม่มีข้อมูล',
        year: date.getFullYear().toString(),
        month: (date.getMonth() + 1).toString(),
      };
      dataCarPrice[key] = ob;
    } catch (error) {
      const date = new Date();
      let ob = {
        min: 'ไม่มีข้อมูล',
        max: 'ไม่มีข้อมูล',
        year: date.getFullYear().toString(),
        month: (date.getMonth() + 1).toString(),
      };
      dataCarPrice[key] = ob;
    }
  }

  for (const [key, value] of Object.entries(url4)) {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(value);

      let dataPrice = await page.evaluate(() => {
        let data = [];
        let elements = document.getElementsByClassName('prcTxt');
        for (let element of elements) {
          element.textContent = element.textContent.replace('฿', '');
          element.textContent = element.textContent.replaceAll(',', '');
          data.push(parseInt(element.textContent, 10));
        }
        return data;
      });

      console.log(dataPrice);
      await browser.close();
      let min = dataPrice[0];
      let max = dataPrice[0];
      dataPrice.forEach((element) => {
        if (element < min && element != undefined) min = element;
        if (element > max && element != undefined) max = element;
      });

      const date = new Date();
      let ob = {
        min: min.toString() || 'ไม่มีข้อมูล',
        max: max.toString() || 'ไม่มีข้อมูล',
        year: date.getFullYear().toString(),
        month: (date.getMonth() + 1).toString(),
      };

      dataCarPrice[key] = ob;
    } catch (err) {
      const date = new Date();
      let ob = {
        min: 'ไม่มีข้อมูล',
        max: 'ไม่มีข้อมูล',
        year: date.getFullYear().toString(),
        month: (date.getMonth() + 1).toString(),
      };

      dataCarPrice[key] = ob;
    }
  }

  console.log(dataCarPrice);

  return dataCarPrice;
};

exports.getData = getData;
