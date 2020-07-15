function main() {
  // const clientId = "{yourclientid}";
  // const refreshToken = "{yourrefreshtoken}";

  let data = {
    'client_id': clientId,
    'refresh_token': refreshToken,
    'redirect_uri': 'https://login.live.com/oauth20_desktop.srf',
    'grant_type': 'refresh_token'
  };
  
  let params = {
    'method': 'post',
    'contentType': 'application/x-www-form-urlencoded',
    'payload': data,
  };

  let res = UrlFetchApp.fetch('https://login.microsoftonline.com/common/oauth2/v2.0/token', params);
 
  const tokens = JSON.parse(res.getContentText());
  console.log(tokens['access_token']);
  params = {
    headers: { 
      Authorization: `Bearer ${tokens['access_token']}` 
    },
  };

  res = UrlFetchApp.fetch("https://graph.microsoft.com/v1.0/me/drive/root:/Incoming_Candidates.xlsx:/workbook/worksheets/Sheet1/range(address='A1:B4')", params);
  if (res.getResponseCode().toString().startsWith('2')) {
    const json = JSON.parse(res.getContentText());
    let values = json.values;
    SpreadsheetApp.openById('1qAIEhpYHfVLQ1BwOGb4vBe8QJGyeEkcREZxsEJnINaI').getSheetByName('Sheet2').getRange('A1:B4').setValues(values);
  } else {
    console.error()
  }

  const resp = UrlFetchApp.fetch('https://cdn.worldvectorlogo.com/logos/onedrive-1.svg');
  let content = resp.getContent()
  let blob = Utilities.newBlob(content)
  DriveApp.createFile(blob)
  
}
