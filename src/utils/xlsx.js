import * as XLSX from 'xlsx';

const exportExcel = (data, fileName, multipleSheet = false, merge = null) => {
  const stylingCols = (data, ws) => {
    const wscols = [];
    if (data[0]) {
      data[0].forEach((el, i) => {
        if (el === 'No') wscols.push({ wch: 10 });
        else if (
          el === 'Hasil Integrasi' ||
          el === 'Deskripsi' ||
          el === 'Nama'
        )
          wscols.push({ wch: 30 });
        else wscols.push({ wch: 20 });
      });
    }
    return (ws['!cols'] = wscols);
  };

  const stylingRows = (data, ws) => {
    const wsrows = [];
    if (data[0] && data[0].length) {
      data[0].forEach((el, i) => {
        wsrows.push({ hpt: 25 });
      });
      return (ws['!rows'] = wsrows);
    }

    return;
  };

  const createSheet = (data) => XLSX.utils.aoa_to_sheet(data);
  const new_workbook = XLSX.utils.book_new();

  if (multipleSheet) {
    const arrayData = [];
    const arrayWorksheet = [];
    data.map((item) => {
      arrayData.push(item.data);
      arrayWorksheet.push(createSheet(item.data));
    });
    arrayWorksheet.forEach((el, i) => {
      stylingCols(arrayData[i], el);
      stylingRows(arrayData[i], el);

      if (merge) {
        el['!merges'] = merge;
      }
      XLSX.utils.book_append_sheet(new_workbook, el, data[i].sheetName);
    });
  } else {
    const worksheet = createSheet(data);
    stylingCols(data, worksheet);
    stylingRows(data, worksheet);
    if (merge) {
      worksheet['!merges'] = merge;
    }
    XLSX.utils.book_append_sheet(new_workbook, worksheet, `${fileName}`);
  }
  XLSX.writeFile(new_workbook, `${fileName}.xlsx`);

  // XLSX.writeFileAsync(`${fileName}.xlsx`, new_workbook, (err, res) => {
  //   if (err) console.log(err);
  //   console.log(res);
  // });
};

export default exportExcel;

// back up Ilham
// const stylingCols = (data, ws) => {
//   const wscols = [];
//   data[0].forEach((el, i) => {
//     if (el === 'No') wscols.push({ wch: 10 });
//     else if (el === 'Hasil Integrasi') wscols.push({ wch: 30 });
//     else wscols.push({ wch: 20 });
//   });
//   return (ws['!cols'] = wscols);
// };

// const stylingRows = (data, ws) => {
//   const wsrows = [];
//   data[0].forEach((el, i) => {
//     wsrows.push({ hpt: 25 });
//   });
//   return (ws['!rows'] = wsrows);
// };

// const createSheet = (data) => {
//   return XLSX.utils.aoa_to_sheet(data);
// };

// const exportExcel = (data, fileName) => {
//   let new_workbook = XLSX.utils.book_new();
//   let worksheet = createSheet(data);
//   stylingCols(data, worksheet);
//   stylingRows(data, worksheet);
//   XLSX.utils.book_append_sheet(new_workbook, worksheet, `${fileName} Report`);
//   XLSX.writeFile(new_workbook, `${fileName}.xlsx`);
// };

// export default exportExcel;
