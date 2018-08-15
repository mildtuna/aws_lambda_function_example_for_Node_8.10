var http = require('http');


const getReceiptHtmlContent = function(_raw_url){

  return  new Promise(function(resolve){
    var receipt_id = _raw_url.split("=")[1];
    
    const options = {
      hostname: 'm.epost.go.kr',
      path: '/ems/mobile.RetrieveMobileRecepitList.parcel?r='+receipt_id,
      headers: { 'User-Agent': 'Mozilla/5.0' }
    };
    http.get(options, function(res) {
    var body = '';
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      resolve(body);
    });
    }).on('error', function(e) {
      resolve(e.message);
    }); 

  }); 
};


exports.handler = async (event) => {
 const html_data = await getReceiptHtmlContent(event.receipt_url);
 //const data = html_data.replace(/\\n/g, '\n');
 return html_data;

};
