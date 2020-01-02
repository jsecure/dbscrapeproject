var cheerio = require("cheerio");
var axios = require("axios");

// First, tell the console what server2.js is doing
console.log("\n******************************************\n" +
            "Grabbing every article headline and link\n" +
            "from the NY Times website:" +
            "\n******************************************\n");

// Making a request via axios for `nytimes.com`'s homepage
axios.get("https://www.nytimes.com/").then(function(response) {

  // Load the body of the HTML into cheerio
  var $ = cheerio.load(response.data);

  // Empty array to save our scraped data
  var articles = [];

  // With cheerio, find each h4-tag with the class "headline-link" and loop through the results
  $(".assetWrapper").each(function(i, element) {
    // In each article section, we grab the headline, URL, and summary

    // Grab the headline of the article
    var head = $(this)
      .find("h2")
      .text()
      .trim();

    // Grab the URL of the article
    var url = $(this)
      .find("a")
      .attr("href");

    // Grab the summary of the article
    var sum = $(this)
      .find("p")
      .text()
      .trim();

    // So long as our headline and sum and url aren't empty or undefined, do the following
    if (head && sum && url) {
      // This section uses regular expressions and the trim function to tidy our headlines and summaries
      // We're removing extra lines, extra spacing, extra tabs, etc.. to increase to typographical cleanliness.
      var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
      var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

      // Initialize an object we will push to the articles array
      var dataToAdd = {
        headline: headNeat,
        summary: sumNeat,
        url: "https://www.nytimes.com" + url
      };

      // Push new article into articles array
      articles.push(dataToAdd);
      console.log(articles)
    }
  });
});