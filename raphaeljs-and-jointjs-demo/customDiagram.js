(function() {

    var FIELDWIDTH = 5;
    var FIELDHEIGHT = 3;

    Joint.paper("customCanvas");
    var fsa = Joint.dia.fsa
    var erd = Joint.dia.erd

    var s0 = fsa.StartState.create({ position: {x: 50, y: 50} });
    var se = fsa.EndState.create({ position: {x: 450, y: 150} });
    var s1 = fsa.State.create({ position: {x: 120, y: 120}, label: "state 1" });
    var s2 = fsa.State.create({ position: {x: 300, y: 50}, label: "state 2" });

    var entity = erd.Entity.create(
	{rect: {x: 220, y: 70, width: 100, height: 60}, label: "Entity"});
    
    function drawField() {
	for (i=0; i<=FIELDWIDTH; i++) {
	    for (j=0; j<FIELDHEIGHT; j++) {
		var state = fsa.State.create(
		    {position: {x: (i+5)*100, y: (j+1)*100},
		     label: "state " + i.toString()});
		if (previousState) {
		    state.joint(previousState, fsa.arrow).registerForever(all);
		}
		var previousState = state;
	    }
	}
    }
    drawField();

    function drawWord(word) {
	var yPos = 0;
	for (charPos in word.split("")) {
	    yPos++;
	    var charState = fsa.State.create({position: {x: yPos*100, y: 400},
					      label: word.charAt(charPos)});
	    if (previousState) {
		previousState.joint(charState, fsa.arrow).registerForever(all);
	    }
	    var previousState = charState;
	}
    }
    drawWord("something");

    function drawSentence(sentence) {
	var xPos = 0;
	sentence = sentence.split(/[\.]/)
	for (wordPos in sentence) {
	    xPos++;
	    var charState = fsa.State.create({position: {x: xPos*100, y: 500},
					      label: sentence[wordPos]});
	    if (previousState) {
		previousState.joint(charState, fsa.arrow).registerForever(all);
	    }
	    var previousState = charState;
	}
    }
    drawSentence("This is a test.");


    var all = [s0, s1, s2, se];
    s0.joint(s1, fsa.arrow).registerForever(all);
    s1.joint(s2, fsa.arrow).registerForever(all);
    s2.joint(se, fsa.arrow).registerForever(all);


    // Let's test it manually


    // Test 1
    // ------
    //
    // The width of a shape is not adapted to the width of the longest string
    // representation contained within.
    //
    var aggregate = Joint.dia.uml.Class.create({
	rect: {x: 100, y: 100, width: 120, height: 80},
	label: "<<interfacefoooooooooooooooooooooooooooo>>\nAggregate",
	swimlane1OffsetY: 30,
	shadow: true,
	attrs: {
	    //    fill: "90-#000-yellow:1-#fff"
	    fill: "yellow"
	},
	labelAttrs: {
	    'font-weight': 'bold'
	},
	methods: ["+createIterator()"]
    });

    // Test 2
    // ------
    //
    // Change SVG elements
    //
    document.getElementById("greenEllipse").setAttribute("rx", 50);
    console.log(document.getElementById("greenEllipse").attributes);

}());
