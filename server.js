// reference : https://scotch.io/tutorials/scraping-the-web-with-node-js

var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res) {
    // Let's scrape
    url = 'http://www.bi.go.id/id/moneter/informasi-kurs/transaksi-bi/Default.aspx';

    request(url, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);

            $('.bi-rate-value').filter(function() {
                var data = $(this);
                var midUsdIdrValue = data.text().trim();

                if (midUsdIdrValue) {
                    res.send(midUsdIdrValue);
                } else {
                    res.send("value Not found");
                }
            });
        } else {
            res.send("Sorry, we cannot scrape the website for this moment: " + url);
        }
    })
})

app.listen('8081');
console.log('Web scrapper run on port 8081, access it on endpoint /scrape method GET');
exports = module.exports = app;