function myFunction() {
  let data = {
    'name': 'Courtney Tat',
    'email': 'courtneythetat@gmail.com',
  };
  
  const params = {
    'method': 'POST',
    'contentType': 'application/json',
    'payload': JSON.stringify(data)
  }
  
  let res = UrlFetchApp.fetch('https://script.google.com/macros/s/AKfycbyTSffReC0YmU5MbK7J_AVZBWyCBtAGhaX0KF5qzcJqCis4Iaf3/exec', params)
  // let res = UrlFetchApp.fetch('https://developers.google.com/apps-script/reference/url-fetch');
  // let res = UrlFetchApp.getRequest('https://script.google.com/macros/s/AKfycbyTSffReC0YmU5MbK7J_AVZBWyCBtAGhaX0KF5qzcJqCis4Iaf3/exec', params)
  Logger.log(res);
}

// You can host your Apps Script Website from this project or an entirely separate project
function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate()
  .setTitle('Early Access List')
  .setFaviconUrl('https://www.publicdomainpictures.net/pictures/310000/nahled/purple-circle.png');
}

function doPost(e) {
  let data = e.parameter;
  
  SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1qAIEhpYHfVLQ1BwOGb4vBe8QJGyeEkcREZxsEJnINaI/edit#gid=0')
  .appendRow([data.name, data.email]);
  
  return ContentService.createTextOutput("Post Complete");
}

function includeExternalFile(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
