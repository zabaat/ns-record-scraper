# ns-record-scraper
scrapes the records at netsuite schema browser and returns JSON

example output
`
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
`
