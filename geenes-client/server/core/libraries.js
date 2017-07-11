var gfont = require('./libraries/google-fonts.js');
// Namespaced library of functions common across multiple usages
var geenes = geenes || {};

geenes.common = {
    randomElement: function (obj, gene) {
        var array = Object.keys(obj);
        var key = array[Math.floor(gene * array.length)];
        return obj[key]

    },



 randomShuffle: function (obj,seed){
var array;
var numbers = [];
        if (obj instanceof Array){
         array = obj;
        console.log('it was an array')    
       
        }else{
        array = Object.keys(obj).map(key => obj[key])
        console.log('it was an object')
        }
        var size = array.length;
		var rng = seed;
		var resp = [];
		var keys = [];

		for(var i=0;i<size;i++) keys.push(i);
		for(var i=0;i<size;i++){
			var r =  Math.floor(seed * ((keys.length-1) - 0 + 1)) + 0;
			var g = keys[r];
			keys.splice(r,1);
			resp.push(array[g]);
		}
		return resp;

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
        "10px": 10,
        "11px": 11,
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

    baseLineM: {
        "1.2": 1.2,
        "1.25": 1.25,
        "1.3": 1.3,
        "1.4": 1.4,
        "1.5": 1.5,
    },

    fontWeights: {
        "100": 100,
        "200": 200,
        "300": 300,
        "400": 400,
        "500": 500,
        "600": 600,
        "700": 700,
        "800": 800,
        "900": 900,

    },

    fontCategories: {
        "0":"sans-serif",
        "1":"serif",
        "2":"display",
        "3":"handwriting",
        "4":"monospace"
    },

    fontFamilyContrast: {
        0:{"numberOfTypefaces":1, "fontFamilyGroup":"sans-serif/serif"},
        1:{"numberOfTypefaces":2, "fontFamilyGroup":"sans-serif/sans-serif"},
        2:{"numberOfTypefaces":2, "fontFamilyGroup":"sans-serif/serif"},
        3:{"numberOfTypefaces":2, "fontFamilyGroup":"serif/sans-serif"},
        4:{"numberOfTypefaces":2, "fontFamilyGroup":"cursive/serif"},
        // 3:{"numberOfTypefaces":2, "fontFamilyGroups":[0,1]},
        // 4:{"numberOfTypefaces":2, "fontFamilyGroups":[0,1,4]},
        // 5:{"numberOfTypefaces":2, "fontFamilyGroups":[0,1,3]},
        // 6:{"numberOfTypefaces":3, "fontFamilyGroups":[0,1,2,5]},
        // 7:{"numberOfTypefaces":3, "fontFamilyGroups":[0,1,3,4]}

    },
    contrastPriorities:{
        0:"Color",
        1:"Typeface",
        2:"Size",
        3:"Cases",
        4: "Style",
        5: "Weight",
        6: "Space",

    },

    typeSettings: function (level, baseFontSize, typeScaleRatio, baselineM, baseFontWeight, contrastIndex,constructorFontFamily) {
        var l = level;
        var bf = baseFontSize;
        var r = typeScaleRatio;
        var bm = baselineM;
        var bfw = baseFontWeight;
        var cx = contrastIndex;
        var cfm = constructorFontFamily;

        var blh = this.getBaselineHeight(bf, bm);
        var fm = this.getFontFamily(cx,cfm);
        var fml = l==0 ? 1 : 0 //return the second element of the font pair which is the body one
         


        //TODO ADD ERRORS HANDLERS

        console.log(fml);
        var obj = {
            "font-size": bf * this.getTypeScale(r, l)+"px",
            "line-height": this.getLineHeight(blh, r, l)+"px",
            "font-weight": bfw,
            "font-family": fm[fml]
        };

        return obj;
    },

    getTypeScale: function (typeScaleRatio, level) {
        var typeScale = Math.pow(typeScaleRatio, level).toFixed(3);
        return typeScale;
    },

    getBaselineHeight: function (baseFontSize, baselineM) {
        return (baseFontSize * baselineM).toFixed(3);
    },

    getLineHeight: function (baselineHeight, typeScaleRatio, level) {

        var lineHeight;
        var r = typeScaleRatio;
        var l = level;
        var typeScale = this.getTypeScale(r, level);

        lineHeight = baselineHeight;
        if (level > 0)
            lineHeight = (baselineHeight * Math.ceil(typeScale)).toFixed(3);
        return lineHeight;
    },

    getFontWeight: function () {
        return
    },

    getFontFamily: function(contrastIndex, constructorFontFamily){
        var fontFamilyContrast = this.getFontFamilyContrast(contrastIndex);
        var numberOfTypefaces = fontFamilyContrast.numberOfTypefaces;

        switch (numberOfTypefaces) {
    case 1:
       return geenes.common.randomElement(this.fontFamilyGroups[fontFamilyContrast.fontFamilyGroup].pairs, constructorFontFamily);
        break;
    case 2:
       return geenes.common.randomElement(this.fontFamilyGroups[fontFamilyContrast.fontFamilyGroup].pairs, constructorFontFamily);
        break;
    case 3:
        return geenes.common.randomElement(this.fontFamilyGroups[fontFamilyContrast.fontFamilyGroup].pairs, constructorFontFamily);
}


    },

    getFontFamilyContrast: function(contrastIndex){
            return geenes.common.randomElement(this.fontFamilyContrast, contrastIndex);
    },

    getGoogleFontSelection: function (category) {
        let fontSelection = gfont.googleFonts.filter(function (font) {
            return font.category == category;
        })
        return fontSelection;
    },

    randomContrastPriority: function(genes){
        let seed = genes;
        //transform object in array
        var contrastPriorities = Object.keys(this.contrastPriorities).map(key => this.contrastPriorities[key])

        //randomise the order based on geenes(seed)
      
        return  geenes.common.randomShuffle(contrastPriorities, seed);
    },



// takes the contrast index and the contrast priority order to return a given percentage of all the possible typescales
// higher the contrast and the priority higher the values of the typescale will be
    sliceTypescales: function(contrastIndex, contrastPriorities, percentage){
            // this determines how heavy the contrast is. 0 to 1. near 0 means that the contrast is low and the style is more flat.
            var ci = contrastIndex;

            //lenght of the shuffled array
            var cp = contrastPriorities.length;

            // variable to define how many other items to pick in the list from the middle point
            // it should be between 0.25 and 1
            // 1 is the entire list, 0.25 is one quarter of the list
            var p = percentage;

            // this define the position of Size in the shuffled array. 
            var i = contrastPriorities.findIndex(function(element){return element == 'Size' } )
            
            // this formula calculate the middle point of the typescales list like so:
            // contrast index * a weight. the weight is maximum 1 or 1 minus a malus dependent on the position of Size in the shuffled array
            var mp = ci * (1 - (1 / cp) * i)
            //variance, meaning the elements to add around the middle point 
            var v =  Math.floor((cp * p) / 2);
            
            //transforming the typescalis list from an object to an array.
            var ts = Object.keys(this.typeScales).map(key => this.typeScales[key])

            //finding the index of this element
            var mpi = ts.indexOf(geenes.common.randomElement(this.typeScales, mp))

            //check that the variance doesn't overflow the first or last item of the list
            var min = mpi-v<0 ? 0 : mpi-v
            var max = mpi+v>ts.length ? ts.length : mpi+v
            //return an array of  a portion of typescales 
            return ts.slice(min, max+1);
    }
}


exports = module.exports = geenes;




