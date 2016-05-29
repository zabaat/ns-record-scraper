# ns-record-scraper
scrapes the records at [netsuite schema browser](https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2015_2/script/record/account.html) and returns JSON


`npm install zabaat-ns-scrape`

```
"use strict";
var scrape = require('zabaat-ns-scrape')

scrape.nsScrape((err,data)=>{
	console.log("back",data)
})

```

example output
```
[
  {
    "name": "serviceitem",
    "fields": [
      {
        "id": "accountingbook",
        "type": "select",
        "desc": "Accounting Book"
      },
      {
        "id": "accountingbookamortization",
        "type": "select",
        "desc": "Accounting Book Amortization Schedule"
      },

      ...

  	]
  }
]
```
