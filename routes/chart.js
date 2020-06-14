const express = require("express");
const router = express.Router();
const chartController = require("../controllers/chartController");

router.get("/", (req, res) => {
  chartController.getChart(req, res);
});

router.get("/extrems", (req, res) => {
  chartController.getChartExtrems(req, res);
});

module.exports = router;
