
// Namespaced library of functions common across multiple usages
var geenes = geenes || {};

geenes.common = {
    randomElement: function (obj, gene) {
        var array = Object.keys(obj);
        var key = array[Math.floor(gene * array.length)];
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

    fontFamilyGroups:{
        "sans-serif/serif":{
            "index":0,"pairs":[ 
                                ["Cabin","Old Standard TT"  ],
                                ["Fjalla One","Average"  ],
                                ["Istok Web","Lora"  ],
                                ["Josefin Sans","Playfair Display"  ],
                                ["Lato","Merriweather"  ],
                                ["Montserrat","Cardo"  ],
                                ["Montserrat","Crimson Text"  ],
                                ["Montserrat","Domine"  ],
                                ["Montserrat","Neuton"  ],
                                ["Montserrat","Playfair Display"  ],
                                ["Muli","Playfair Display"  ],
                                ["Nunito","Alegreya"  ],
                                ["Nunito","Lora"  ],
                                ["Open Sans","Gentium Book Basic"  ],
                                ["Open Sans","Libre Baskerville"  ],
                                ["Open Sans","Lora"  ],
                                ["Open Sans","Playfair Display SC"  ],
                                ["Oswald","Merriweather"  ],
                                ["Oswald","Old Standard TT"  ],
                                ["Oswald","Quattrocento"  ],
                                ["PT Sans","PT Serif"  ],
                                ["Quicksand","EB Garamond"  ],
                                ["Raleway","Merriweather"  ],
                                ["Ubuntu","Lora"  ]
                            ]},
        "serif/sans-serif":{
            "index":1,"pairs":[ 
                                ["Alegreya","Open Sans"  ],
                                ["Alegreya","Source Sans Pro"  ],
                                ["Bitter","Raleway"  ],
                                ["Bree Serif","Open Sans"  ],
                                ["Cantata One","Imprima"  ],
                                ["Cardo","Josefin Sans"  ],
                                ["Crete Round","AbeeZee"  ],
                                ["Josefin Slab","Josefinsans"  ],
                                ["Kreon","Ubuntu"  ],
                                ["Libre Baskerville","Montserrat"  ],
                                ["Libre Baskerville","Open Sans"  ],
                                ["Lora","Source Sans Pro"  ],
                                ["Lustria","Lato"  ],
                                ["Merriweather","Open Sans"  ],
                                ["Merriweather","Source Sans Pro"  ],
                                ["Old Standard TT","Questrial"  ],
                                ["Ovo","Muli"  ],
                                ["Playfair Display","Open Sans"  ],
                                ["PT Serif","Open Sans"  ],
                                ["Quattrocento","Quattrocento Sans"  ],
                                ["Roboto Slab","Open Sans"  ],
                                ["Roboto Slab","Roboto"  ],
                                ["Rokkitt","Roboto"  ],
                                ["Rokkitt","Ubuntu"  ],
                                ["Rufina","Sintony"  ],
                                ["Vollkorn","Exo"  ]
                            ]},
        "sans-serif/sans-serif": {
            "index":2,"pairs":[
                                ["Abel","Ubuntu"  ],
                                ["Amaranth","Titillium Web"  ],
                                ["Didact Gothic","Arimo"  ],
                                ["Dosis","Open Sans"  ],
                                ["Droid Sans","Cabin"  ],
                                ["Fjalla One","Cantarell"  ],
                                ["Francois One","Didact Gothic"  ],
                                ["Francois One","Lato"  ],
                                ["Francois One","Open Sans"  ],
                                ["Hind","Open Sans"  ],
                                ["Montserrat","Hind"  ],
                                ["Montserrat","Istok Web"  ],
                                ["Nunito","Open Sans"  ],
                                ["Open Sans","Nunito"  ],
                                ["Open Sans","Oswald"  ],
                                ["Oswald","Droid Sans"  ],
                                ["Oswald","Open Sans"  ],
                                ["Oxygen","Source Sans Pro"  ],
                                ["Philosopher","Muli"  ],
                                ["PT Sans","Cabin"  ],
                                ["PT Sans","Didact Gothic"  ],
                                ["Raleway","Cabin"  ],
                                ["Raleway","Roboto"  ],
                                ["Roboto","Nunito"  ],
                                ["Signika","Open Sans"  ],
                                ["Ubuntu","Cabin"  ],
                                ["Ubuntu","Didact Gothic"  ],
                                ["Ubuntu","Hind"  ],
                                ["Ubuntu","Source Sans Pro"  ]
                                ]},
        "cursive/sans-serif": {
            "index":3,"pairs":[
                                ["Abril Fatface","Droid Sans"  ],
                                ["Abril Fatface","Josefin Sans"  ],
                                ["Abril Fatface","Lato"  ],
                                ["Amatic SC","Andika"  ],
                                ["Amatic SC","Josefin Sans"  ],
                                ["Bevan","Pontano Sans"  ],
                                ["Flamenco","Asap"  ],
                                ["Lobster","Arimo"  ],
                                ["Lobster","Cabin"  ],
                                ["Medula One","Lato"  ],
                                ["Pacifico","Arimo"  ],
                                ["Patua One","Oswald"  ],
                                ["Rancho","Gudea"  ],
                                ["Shadows","Roboto"  ],
                                ["Squada One","Allerta"  ],
                                ["Stint Ultra","Pontano Sans"  ],
                                ["Yeseva One","Josefin Sans"  ]
                                ]},
        "cursive/serif":{
            "index":4,"pairs":[
                                ["Alfaslab One","Gentium Book"  ],
                                ["Clicker Script","EB Garamond"  ],
                                ["Dancing Script","Ledger"  ],
                                ["Dancing Script","EB Garamond"  ],
                                ["Nixie One","Ledger"  ],
                                ["Patua One","Lora"  ],
                                ["Nixie One","Libre Baskerville"  ],
                                ["Sacramento","Alice"  ],
                                ["Sansita One","Kameron"  ],
                                ["Unica One","Vollkorn"  ],
                                ["Walter Turncoat","Kreon"  ],
                                ["Yeseva One","Crimson Text"  ]
                                ]},
        "serif/serif":{
            "index":5,"pairs":[
                                ["Bree Serif","Lora"  ],
                                ["Playfair Display","Alice"  ],
                                ["Playfair Display","Fauna One"  ],
                                ["Quando","Judson"  ],
                                ["Quattrocento","Fanwood Text"  ],
                                ["Ultra","Slabo 13px"  ]
                                ]}
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
    }

}


exports = module.exports = geenes;




