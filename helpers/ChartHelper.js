const timeSeries = require("../tmp/data");
const deepcopy = require("deepcopy");

class ChartHelper {
  constructor() {
    this._timeSeries = timeSeries;
  }

  getDefaultValues() {
    const data = [];
    for (let i = 0; i < 1000; i++) {
      data.push(this._timeSeries[i]);
    }

    return data;
  }

  getExtremes(min, max) {
    const data = [];
    for(let i = 0; i < 1000; i++) {
      if(i === min || i === max) {
        data.push({
          y: this._timeSeries[i],
          x: i,
          marker: {
            fillColor: "red",
            enabled: true,
            radius: 6
          }
        });
      } else {
        data.push({
          y: this._timeSeries[i],
          x: i
        });
      }
    }
  
    return data;
  }

  quickSort(items, left, right) {
    let index;
    if (items.length > 1) {
      index = this.partition(items, left, right);
      if (left < index - 1) {
        this.quickSort(items, left, index - 1);
      }
      if (index < right) {
        this.quickSort(items, index, right);
      }
    }
    return items;
  }

  swap(items, leftIndex, rightIndex) {
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
  }

  partition(items, left, right) {
    let pivot = items[Math.floor((right + left) / 2)],
      i = left,
      j = right;
    while (i <= j) {
      while (items[i] < pivot) {
        i++;
      }
      while (items[j] > pivot) {
        j--;
      }
      if (i <= j) {
        this.swap(items, i, j);
        i++;
        j--;
      }
    }
    return i;
  }

  extremePoints(items, left, right) {
    const values = this.quickSort(deepcopy(items), left, right);
    const positionMin = items.indexOf(values[0]);
    const positionMax = items.indexOf(values[values.length-1]);
  
    return {
      positionMax,
      positionMin,
      minValue: values[0],
      maxValue: values[values.length-1]
    }
  }
}

module.exports = new ChartHelper();