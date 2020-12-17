let linkUnshorter = document.getElementById('lu');
linkUnshorter.addEventListener('click', function(){
    document.getElementById('start-div').style.display = "none";
    document.getElementById('mm-div').style.display = "block";
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector("#exp").addEventListener('click', expandUrl)
});

    let whitelist_https = ["https://bitly.com/", "https://www.rebrandly.com/", "https://short.io/", "https://linklyhq.com/", "https://www.clickmeter.com/", "https://pixelme.me/", "https://www.bl.ink/", "https://cutt.ly/", "https://soo.gd/", "https://tinycc.com/", "https://clkim.com/", "https://tinyurl.com/", "https://t2mio.com/", "https://tiny.ie/", "https://www.shorturl.at/", "https://bit.do/", "https://yourls.org/", "https://adf.ly/", "https://is.gd/"];
    let whitelist_http = ["http://bitly.com/", "http://www.rebrandly.com/", "http://short.io/", "http://linklyhq.com/", "http://www.clickmeter.com/", "http://pixelme.me/", "http://www.bl.ink/", "http://cutt.ly/", "http://soo.gd/", "http://tinycc.com/", "http://clkim.com/", "http://tinyurl.com/", "http://t2mio.com/", "http://tiny.ie/", "http://www.shorturl.at/", "http://bit.do/", "http://yourls.org/", "http://adf.ly/", "http://is.gd/"];
    let whitelist = ["bitly.com/", "www.rebrandly.com/", "short.io/", "linklyhq.com/", "www.clickmeter.com/", "pixelme.me/", "www.bl.ink/", "cutt.ly/", "soo.gd/", "tinycc.com/", "clkim.com/", "tinyurl.com/", "t2mio.com/", "tiny.ie/", "www.shorturl.at/", "bit.do/", "yourls.org/", "adf.ly/", "is.gd/"];
    
    function expandUrl() {
        let link = document.getElementById('inn').value;
        link = validate(link);
        if(link){
            let expanded_url = sendLink(link);
        }else{
            document.getElementById('text').innerHTML = "Invalid Link"
        }
    }

    function validate(link){
        for(let i = 0; i < whitelist_https.length; i++){
            if(link.startsWith(whitelist_https[i])){
                return link;
            }
        }

        for(let i = 0; i < whitelist_http.length; i++){
            if(link.startsWith(whitelist_http[i])){
                return link.substring(0,4)+'s'+link.substring(4);
            }
        }

        for(let i = 0; i < whitelist_http.length; i++){
            if(link.startsWith(whitelist[i])){
                return 'https://'+link;
            }
        }

        return ""
    }

function sendLink(link){
    let data = {link: link};
    fetch('https://softwaretech-backend.herokuapp.com/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    .then(response => 
        response.json()
    )
    .then(json => {
        console.log(json['link']);
        var a = document.createElement('a');
        var resurl = document.getElementById('resurl');
        var linkText = document.createTextNode(json['link']);
        a.appendChild(linkText);
        a.title = json['link'];
        a.href = json['link'];
        a.target="_blank"
        while (resurl.firstChild) {
            resurl.removeChild(resurl.firstChild);
        }
        resurl.appendChild(a);
        return json['link'];
    });
}
