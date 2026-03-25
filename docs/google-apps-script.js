var SHEET_ID = '1f_b9KGVi1wQ3MELymX00xn4uB8wtwbAVPKg4ILfQlfc';

// ==================== LECTURA (GET) ====================
function doGet(e) {
  var action = e.parameter.action;
  var tab = e.parameter.tab;

  if (action === 'read') {
    return readTab(tab);
  }

  return jsonResponse({ success: false, error: 'Accion no valida' });
}

function readTab(tabName) {
  var sheet = SpreadsheetApp.openById(SHEET_ID);
  var tab = sheet.getSheetByName(tabName);

  if (!tab || tab.getLastRow() < 2) {
    return jsonResponse({ success: true, data: [] });
  }

  var headers = tab.getRange(1, 1, 1, tab.getLastColumn()).getValues()[0];
  var rows = tab.getRange(2, 1, tab.getLastRow() - 1, tab.getLastColumn()).getValues();

  var data = rows.map(function(row) {
    var obj = {};
    headers.forEach(function(header, i) {
      obj[header] = row[i];
    });
    return obj;
  });

  return jsonResponse({ success: true, data: data });
}

// ==================== ESCRITURA (POST) ====================
// La contraseña se configura en Propiedades del script:
//   Menu: Proyecto > Configuracion > Propiedades del script
//   Clave: ADMIN_PASSWORD   Valor: (tu contraseña)

function doPost(e) {
  var body = JSON.parse(e.postData.contents);
  var password = body.password;
  var action = body.action;
  var tabName = body.tab;
  var data = body.data;

  // Validar contraseña de admin desde propiedades del script
  var adminPassword = PropertiesService.getScriptProperties().getProperty('ADMIN_PASSWORD');
  if (!adminPassword || password !== adminPassword) {
    return jsonResponse({ success: false, error: 'Contraseña incorrecta' });
  }

  var sheet = SpreadsheetApp.openById(SHEET_ID);
  var tab = sheet.getSheetByName(tabName);

  // Crear tab si no existe
  if (!tab) {
    tab = sheet.insertSheet(tabName);
  }

  switch (action) {
    case 'add':
      return addRow(tab, data);
    case 'update':
      return updateRow(tab, data);
    case 'delete':
      return deleteRow(tab, data);
    case 'seed':
      return seedTab(tab, data);
    default:
      return jsonResponse({ success: false, error: 'Accion no valida: ' + action });
  }
}

function addRow(tab, data) {
  var headers = ensureHeaders(tab, data);
  var row = headers.map(function(h) { return data[h] !== undefined ? data[h] : ''; });
  tab.appendRow(row);
  return jsonResponse({ success: true, id: data.id });
}

function updateRow(tab, data) {
  if (tab.getLastRow() < 2) {
    return jsonResponse({ success: false, error: 'No hay datos' });
  }

  var headers = tab.getRange(1, 1, 1, tab.getLastColumn()).getValues()[0];
  var allData = tab.getDataRange().getValues();

  for (var i = 1; i < allData.length; i++) {
    if (String(allData[i][0]) === String(data.id)) {
      var row = headers.map(function(h) {
        return data[h] !== undefined ? data[h] : allData[i][headers.indexOf(h)];
      });
      tab.getRange(i + 1, 1, 1, row.length).setValues([row]);
      return jsonResponse({ success: true });
    }
  }

  return jsonResponse({ success: false, error: 'No encontrado: ' + data.id });
}

function deleteRow(tab, data) {
  if (tab.getLastRow() < 2) {
    return jsonResponse({ success: true });
  }

  var allData = tab.getDataRange().getValues();

  for (var i = 1; i < allData.length; i++) {
    if (String(allData[i][0]) === String(data.id)) {
      tab.deleteRow(i + 1);
      return jsonResponse({ success: true });
    }
  }

  return jsonResponse({ success: true });
}

function seedTab(tab, rows) {
  // Limpiar todo el contenido existente
  tab.clear();

  if (!rows || rows.length === 0) {
    return jsonResponse({ success: true });
  }

  // Obtener headers de las keys del primer objeto
  var headers = Object.keys(rows[0]);
  tab.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Escribir filas
  var values = rows.map(function(row) {
    return headers.map(function(h) { return row[h] !== undefined ? row[h] : ''; });
  });

  if (values.length > 0) {
    tab.getRange(2, 1, values.length, headers.length).setValues(values);
  }

  return jsonResponse({ success: true });
}

// ==================== UTILIDADES ====================
function ensureHeaders(tab, data) {
  if (tab.getLastRow() === 0) {
    var headers = Object.keys(data);
    tab.getRange(1, 1, 1, headers.length).setValues([headers]);
    return headers;
  }
  return tab.getRange(1, 1, 1, tab.getLastColumn()).getValues()[0];
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
