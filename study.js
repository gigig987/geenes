
var allFonts = [NSFontManager sharedFontManager];
var availableFontFamilies = allFonts.availableFontFamilies();

var random = Math.random();
log(random);
var typeScales = [1.067,1.125,1.2,1.25,1.333,1.414,1.5,1.6,1.618,1.778,1.875,2];

var scales = {
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
  };

var obj_keys = Object.keys(scales);

randomElement = function (array) {
    return array[Math.floor(random * array.length)]
}

log(randomElement(obj_keys));