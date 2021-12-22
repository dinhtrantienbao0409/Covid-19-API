var express = require("express");
var router = express.Router();
const { ApifyClient } = require("apify-client");

/* GET home page. */
router.get("/", async function (req, res, next) {
  // Initialize the ApifyClient with API token
  const client = new ApifyClient({
    token: "apify_api_q1DfOHos7FDGU2I5swUnx1emcwZFcq4BmBjB",
  });

  // Prepare actor input
  const input = {};

  // Run the actor and wait for it to finish
  const run = await client.actor("dtrungtin/covid-vi").call(input);

  // Fetch and print actor results from the run's dataset (if any)
  console.log("Results from dataset");
  const { items } = await client.dataset(run.defaultDatasetId).listItems();

  const { locations } = items[0];
  res.render("./data_view/data", {
    locations,
    items,
  });
});

module.exports = router;
