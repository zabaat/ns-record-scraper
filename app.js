"use strict";

let _ = require('lodash');
let async = require('async');
let util = require('util');
let scraperjs = require('scraperjs');

let urls = [
	'customer','salesorder','serviceitem','assemblybuild','assemblyitem','item','cashsale','entity','estimate','invoice','itemfulfillment','itemgroup','itemrevision','inventorydetail','inventoryitem','noninventoryitem','opportunity','serviceitem','noninventoryitem','workorder'
]

let finalObj = []

let scrapeAndTake = (url,name,cb)=>{
	console.log('started scrape',url,name)
	let scraperPromise = scraperjs.StaticScraper.create(url)
	scraperPromise
	    .scrape(function($) {
	        return $("tr td,h2").map(function() {
	            return {t:$(this).text(),tag:$(this)[0].name};
	        }).get();
	    })
	    .then(function(table) {
	        console.log(table.length)
	        // _.map(table,o=>console.log(o))
	        let index = _.findIndex(table,(o)=> o.t=="Search Columns")
	        let index2 = _.findIndex(table,(o)=> o.tag=="h2",index+1)
	        // console.log("search table start",index,"end of table",index2)
	        let theArray = _.slice(table,index+1,index2)
	        // console.log("the tasty bits",theArray)
	        theArray = _.reduce(theArray,(a,ele)=>{
	        	// console.log("reduce",a,a.length)
	        	let temp = _.last(a)
	        	// console.log(temp)
	        	if(temp.id == null)
	        		temp.id = ele.t
	        	else if(temp.type ==null)
	        		temp.type = ele.t
	        	else if(temp.desc == null){
	        		temp.desc = ele.t
	        		a.push({id:null,type:null,desc:null})
	        	}
	        	return a
	        },[{id:null,type:null,desc:null}])
	        theArray = _.initial(theArray)
	        // console.log("reduce finished!")
	        cb(null,theArray)
	    })
	}

async.eachLimit(urls,1,(url,callback)=>{
	// console.log("async on url",url)
	// let name = _.last(url.split("/")).split(".")[0]
	let name = url
	url = 'https://system.netsuite.com/help/helpcenter/en_US/srbrowser/Browser2015_2/script/record/' + name +'.html'
	scrapeAndTake(url,name,(err,data)=>{
		// console.log("back from scrape")
		finalObj.push({name:name,fields:data})
		callback()
	})
},(err)=>{
	console.log("THE FINAL DATA!",JSON.stringify(finalObj,null,2))
})