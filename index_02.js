var http = require('http');

const getPackageStatusHtml = function(_invoice){

  return  new Promise(function(resolve){

    const options = {
      hostname: 'service.epost.go.kr',
      path: '/trace.RetrieveDomRigiTraceList.comm?sid1='+ _invoice +'&displayHeader=N',
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
      resolve("error");
    });
    
  }); 
};

exports.handler = async (event) => {
    
    const invoice_data = event.invoice_data;
    
    const html_result = await getPackageStatusHtml(invoice_data.invoice);
    if(html_result === "error")
        return "error";
    invoice_data.html = html_result;
    
    return invoice_data;
};
