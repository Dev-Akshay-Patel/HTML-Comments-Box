function doPost(e) {
  try {
    const adminEmail = 'your@email.com'; // this email is used to get you verified in comment section
    const userEmail = e.parameter.email;
    const isAdmin = userEmail && userEmail.toLowerCase() === adminEmail.toLowerCase();
    const topic = e.parameter.topic || 'default';
    const message = e.parameter.message || '';
    const name = e.parameter.name || 'Anonymous';
    
    const settingsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('settings');
    if (settingsSheet) {
      const settingsData = settingsSheet.getDataRange().getValues();
      if (settingsData.length > 1) {
        for (let i = 1; i < settingsData.length; i++) {
          if (settingsData[i][0] === topic) {
            const commentEnabled = settingsData[i][1];
            if (commentEnabled === false || commentEnabled === 'false' || commentEnabled === 'FALSE') {
              return ContentService.createTextOutput(JSON.stringify({ 
                success: false, 
                error: 'Comments are currently disabled for this topic.' 
              })).setMimeType(ContentService.MimeType.JSON);
            }
            break;
          }
        }
      }
    }
    
    if (!message || message.trim().length === 0) {
      return ContentService.createTextOutput(JSON.stringify({ 
        success: false, 
        error: 'Message cannot be empty' 
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    if (message.length > 500) {
      return ContentService.createTextOutput(JSON.stringify({ 
        success: false, 
        error: 'Message exceeds 500 character limit' 
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    if (name.length > 50) {
      return ContentService.createTextOutput(JSON.stringify({ 
        success: false, 
        error: 'Name exceeds maximum length' 
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    if (!/^[a-zA-Z0-9\-_]+$/.test(topic)) {
      return ContentService.createTextOutput(JSON.stringify({ 
        success: false, 
        error: 'Invalid topic format' 
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(topic);
    if (!sheet) {
      sheet = ss.insertSheet(topic);
      sheet.appendRow([
        'timestamp', 'name', 'message', 'topic', 'parentId', 'immediateId',
        'isReply', 'replyToName', 'sortIndex', 'isAdmin'
      ]);
    }

    const timestamp = new Date().toISOString();
    const sortIndex = Date.now();

    sheet.appendRow([
      timestamp,
      name,
      message,
      topic,
      e.parameter.parentId || '',
      e.parameter.immediateId || '',
      e.parameter.isReply === 'true',
      e.parameter.replyToName || '',
      sortIndex,
      isAdmin
    ]);

    return ContentService.createTextOutput(JSON.stringify({ success: true, isAdmin }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const action = e.parameter.action;
    
    if (action === 'checkStatus') {
      const topic = e.parameter.topic || 'default';
      const settingsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('settings');
      
      if (settingsSheet) {
        const settingsData = settingsSheet.getDataRange().getValues();
        if (settingsData.length > 1) {
          for (let i = 1; i < settingsData.length; i++) {
            if (settingsData[i][0] === topic) {
              const commentEnabled = settingsData[i][1];
              return ContentService.createTextOutput(JSON.stringify({
                commentsEnabled: commentEnabled !== false && commentEnabled !== 'false'
              })).setMimeType(ContentService.MimeType.JSON);
            }
          }
        }
      }
      
      return ContentService.createTextOutput(JSON.stringify({ commentsEnabled: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const topic = e.parameter.topic || 'default';
    let sheet = ss.getSheetByName(topic);

    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify([]))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const rows = sheet.getDataRange().getValues();
    if (rows.length < 2) {
      return ContentService.createTextOutput(JSON.stringify([]))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const headers = rows[0];
    const data = rows.slice(1).map(row => {
      const obj = {};
      headers.forEach((header, i) => {
        obj[header] = row[i];
      });
      return obj;
    });

    return ContentService.createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
