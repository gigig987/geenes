// Namespaced library of functions common across multiple usages
var geenes = geenes || {};

geenes.common = {
    randomElement: function (obj,gene) {
        var array = Object.keys(obj);
        var key =  array[Math.floor(gene * array.length)];
        return obj[key]

       }
};

// Scales from http://modularscale.com/
geenes.typography = {

  typeScales: {
    "15:16 – Minor Second": 1.067,
    "8:9 – Major Second": 1.125,
    "5:6 – Minor Third": 1.2,
    "4:5 – Major Third": 1.25,
    "3:4 – Perfect Fourth": 1.333,
    "1:√2 – Aug. Fourth / Dim. Fifth": 1.414,
    "2:3 – Perfect Fifth": 1.5,
    "5:8 – Minor Sixth": 1.6,
    "1:1.618 – Golden Section": 1.618,
    "3:5 – Major Sixth": 1.667,
    "9:16 – Minor Seventh": 1.778,
    "8:15 – Major Seventh": 1.875,
    "1:2 – Octave": 2,
     },

  baseFontSizes: {
  //  "10px": 10,
  //  "11px": 11,
    "12px": 12,
    "13px": 13,
    "14px": 14,
    "15px": 15,
    "16px": 16,
    "17px": 17,
    "18px": 18,
    "19px": 19,
    "20px": 20,
    },

 baseLineRatios: {
    "1.2": 1.2,
    "1.25": 1.25,
    "1.3": 1.3,
    "1.4": 1.4,
    "1.5": 1.5,
    },

  typeSettings: function(baseFontSize, ratio, baselineRatio){

        var baselineHeights = baseFontSize * baselineRatio;
        var obj = {
                "-2": {
                        "font-size": baseFontSize * (1/Math.pow(ratio,2)).toFixed(3),
                        "line-height": baselineHeights,
                      },
                "-1": {
                        "font-size": baseFontSize * (1/ratio).toFixed(3),
                        "line-height": baselineHeights,
                      },
                "0":  {
                        "font-size": baseFontSize,
                        "line-height": baselineHeights,
                      },
                "1":  {
                        "font-size": baseFontSize * ratio,
                        "line-height": baselineHeights *2,
                      },
                "2":  {
                        "font-size": baseFontSize * (Math.pow(ratio, 2)).toFixed(3),
                        "line-height": baselineHeights *2,
                      },
                "3": {
                        "font-size": baseFontSize * (Math.pow(ratio,3)).toFixed(3),
                        "line-height": baselineHeights *3,
                      },
            };

        return obj; 
    }  

};







