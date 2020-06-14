const data = require("../tmp/data");
const helper = require("../helpers/ChartHelper");

class Chart {
  constructor() {
    this._helper = helper;
  }

  async getChart(req, res) {
    const data = await this._helper.getDefaultValues();
    res.json({ data })
  }

  async getChartExtrems(req, res) {
    try {
      const defaultData = await this._helper.getDefaultValues();
      const {
        positionMax,
        positionMin,
        minValue,
        maxValue
      } = await this._helper.extremePoints(defaultData, 0, defaultData.length-1);

      const responseData = await this._helper
        .getExtremes(positionMin, positionMax);

      res.json({
        data: responseData,
        minValue,
        maxValue
      })
    } catch (err) {
      console.log(err)
      res.json({
        error: err
      })
    }
  }
}

module.exports = new Chart();