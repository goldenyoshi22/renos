var keyspressed = [];
var controls = ["a", "s", "d", "j", "k", "l", "c", "n"]
Mousetrap.bind(controls[0], function() {if (!keyspressed.includes(1) && (activeLane == 1 || activeLane == 3)) {hitNote(1); document.getElementById("redkey1").style.backgroundColor = (activeLane == 3 ? "#6300A0" : "#A00000"); keyspressed.push(1);}}, 'keydown');
Mousetrap.bind(controls[0], function() {document.getElementById("redkey1").style.backgroundColor = (activeLane == 3 ? "#500080" : "#800000"); keyspressed.splice(keyspressed.indexOf(1), 1)}, 'keyup');
Mousetrap.bind(controls[1], function() {if (!keyspressed.includes(2) && (activeLane == 1 || activeLane == 3)) {hitNote(2); document.getElementById("redkey2").style.backgroundColor = (activeLane == 3 ? "#6300A0" : "#A00000"); keyspressed.push(2);}}, 'keydown');
Mousetrap.bind(controls[1], function() {document.getElementById("redkey2").style.backgroundColor = (activeLane == 3 ? "#500080" : "#800000"); keyspressed.splice(keyspressed.indexOf(2), 1)}, 'keyup');
Mousetrap.bind(controls[2], function() {if (!keyspressed.includes(3) && (activeLane == 1 || activeLane == 3)) {hitNote(3); document.getElementById("redkey3").style.backgroundColor = (activeLane == 3 ? "#6300A0" : "#A00000"); keyspressed.push(3);}}, 'keydown');
Mousetrap.bind(controls[2], function() {document.getElementById("redkey3").style.backgroundColor = (activeLane == 3 ? "#500080" : "#800000"); keyspressed.splice(keyspressed.indexOf(3), 1)}, 'keyup');
Mousetrap.bind(controls[3], function() {if (!keyspressed.includes(4) && (activeLane == 2 || activeLane == 3)) {hitNote(4); document.getElementById("bluekey1").style.backgroundColor = (activeLane == 3 ? "#6300A0" : "#0050A0"); keyspressed.push(4);}}, 'keydown');
Mousetrap.bind(controls[3], function() {document.getElementById("bluekey1").style.backgroundColor = (activeLane == 3 ? "#500080" : "#004080"); keyspressed.splice(keyspressed.indexOf(4), 1)}, 'keyup');
Mousetrap.bind(controls[4], function() {if (!keyspressed.includes(5) && (activeLane == 2 || activeLane == 3)) {hitNote(5); document.getElementById("bluekey2").style.backgroundColor = (activeLane == 3 ? "#6300A0" : "#0050A0"); keyspressed.push(5);}}, 'keydown');
Mousetrap.bind(controls[4], function() {document.getElementById("bluekey2").style.backgroundColor = (activeLane == 3 ? "#500080" : "#004080"); keyspressed.splice(keyspressed.indexOf(5), 1)}, 'keyup');
Mousetrap.bind(controls[5], function() {if (!keyspressed.includes(6) && (activeLane == 2 || activeLane == 3)) {hitNote(6); document.getElementById("bluekey3").style.backgroundColor = (activeLane == 3 ? "#6300A0" : "#0050A0"); keyspressed.push(6);}}, 'keydown');
Mousetrap.bind(controls[5], function() {document.getElementById("bluekey3").style.backgroundColor = (activeLane == 3 ? "#500080" : "#004080"); keyspressed.splice(keyspressed.indexOf(6), 1)}, 'keyup');
Mousetrap.bind(controls[6], function() {if (activeLane != 1 && activeLane != 3) {activeLane = 1}}, "keydown")
Mousetrap.bind(controls[7], function() {if (activeLane != 2 && activeLane != 3) {activeLane = 2}}, "keydown")
let bostontime;
var scrollspeed = 1;
var speedrate = 1;
var activeLane = 1;
var score = 0;
var score2 = 0;
var notecount = 0;
var combo = 0;
var oldActive = 1;
var jg = [0, 0, 0, 0]
var chartstart = false;
var purpletimes = []
var notetimes = []
const times = [];
let fps;

var mods = [false, false];
//auto


function switchTab(tab) {
  Array.from(document.getElementsByClassName("tabs")).forEach(e => {e.style.display = "none"});
  document.getElementById(tab).style.display = "block";
}
switchTab('songs')

function paddy(num, padlen, padchar) {
	if (num < 10**padlen) {
    var pad_char = typeof padchar !== 'undefined' ? padchar : '0';
    var pad = new Array(1 + padlen).join(pad_char);
    return (pad + num).slice(-pad.length);
	} else {
	return num
	}
}

function refreshLoop() {
  window.requestAnimationFrame(() => {
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift();
    }
    times.push(now);
    fps = times.length;
	document.getElementById("fps").innerHTML = `${fps} FPS`
	movenotes();
	getPurple();
	getNotes();
    refreshLoop();
  });
}

refreshLoop();

function getGrade(acc) {
	if(acc == 100) return "<span style='color:hsl(60, 100%, 50%)'>SS</span>"
	if(acc >= 99 && acc < 100) return "<span style='color:hsl(70, 100%, 50%)'>S+</span>"
	if(acc >= 96 && acc < 99) return "<span style='color:hsl(80, 100%, 50%)'>S</span>"
	if(acc >= 95 && acc < 96) return "<span style='color:hsl(90, 100%, 50%)'>S-</span>"
	if(acc >= 94 && acc < 95) return "<span style='color:hsl(105, 100%, 50%)'>A+</span>"
	if(acc >= 91 && acc < 94) return "<span style='color:hsl(123, 100%, 50%)'>A</span>"
	if(acc >= 90 && acc < 91) return "<span style='color:hsl(142, 100%, 50%)'>A-</span>"
	if(acc >= 88 && acc < 90) return "<span style='color:hsl(169, 100%, 50%)'>B+</span>"
	if(acc >= 82 && acc < 88) return "<span style='color:hsl(180, 100%, 50%)'>B</span>"
	if(acc >= 80 && acc < 82) return "<span style='color:hsl(200, 100%, 50%)'>B-</span>"
	if(acc >= 78 && acc < 80) return "<span style='color:hsl(222, 100%, 50%)'>C+</span>"
	if(acc >= 72 && acc < 78) return "<span style='color:hsl(250, 100%, 50%)'>C</span>"
	if(acc >= 70 && acc < 72) return "<span style='color:hsl(288, 100%, 50%)'>C-</span>"
	if(acc >= 68 && acc < 70) return "<span style='color:hsl(314, 100%, 50%)'>D+</span>"
	if(acc >= 62 && acc < 68) return "<span style='color:hsl(342, 100%, 50%)'>D</span>"
	if(acc >= 60 && acc < 62) return "<span style='color:hsl(0, 100%, 50%)'>D-</span>"
	if(acc >= 58 && acc < 60) return "<span style='color:hsl(0, 100%, 45%)'>F+</span>"
	if(acc >= 52 && acc < 58) return "<span style='color:hsl(0, 100%, 40%)'>F</span>"
	if(acc >= 0 && acc < 52) return "<span style='color:hsl(0, 100%, 35%)'>F-</span>"
	if(isNaN(acc)) return ""
}

function updateText() {
document.getElementById("srtext").innerHTML = speedrate.toFixed(2) + "x"
document.getElementById("sstext").innerHTML = scrollspeed.toFixed(2) + "x"
if (activeLane!=3) {
document.getElementById("blackcoverlane"+activeLane).style.display = "none"
document.getElementById("blackcoverlane"+reverse12(activeLane)).style.display = "inline"
} else {
document.getElementById("blackcoverlane1").style.display = "none"
document.getElementById("blackcoverlane2").style.display = "none"
}
document.getElementById("score").innerHTML = paddy(score, 6) + "<br>" + (isNaN(score2/(notecount*3)) ? "0.00" : (score2/(notecount*3)*100).toFixed(2)) + "%<br>" + getGrade(score2/(notecount*3)*100)
document.getElementById("combotext").innerHTML = combo > 0 ? `<b>${combo}</b>` : ""

document.getElementById("judgeperfect").style.height = 10*scrollspeed + "px";
document.getElementById("judgegreat").style.height = 15*scrollspeed + "px";
document.getElementById("judgegood").style.height = 15*scrollspeed + "px";
document.getElementById("judgemiss").style.height = 15*scrollspeed + "px";

document.getElementById("perfectcount").innerHTML = jg[0]
document.getElementById("greatcount").innerHTML = jg[1]
document.getElementById("goodcount").innerHTML = jg[2]
document.getElementById("misscount").innerHTML = jg[3]
}

function switchPurple(n) {
	if (n) {
oldActive = activeLane
activeLane = 3
document.getElementById("redkey1").style.borderColor = "#A000FF"
document.getElementById("redkey2").style.borderColor = "#A000FF"
document.getElementById("redkey3").style.borderColor = "#A000FF"
document.getElementById("bluekey1").style.borderColor = "#A000FF"
document.getElementById("bluekey2").style.borderColor = "#A000FF"
document.getElementById("bluekey3").style.borderColor = "#A000FF"
document.getElementById("redkey1").style.backgroundColor = "#500080"
document.getElementById("redkey2").style.backgroundColor = "#500080"
document.getElementById("redkey3").style.backgroundColor = "#500080"
document.getElementById("bluekey1").style.backgroundColor = "#500080"
document.getElementById("bluekey2").style.backgroundColor = "#500080"
document.getElementById("bluekey3").style.backgroundColor = "#500080"
	} else {
activeLane = oldActive
document.getElementById("redkey1").style.borderColor = "#FF0000"
document.getElementById("redkey2").style.borderColor = "#FF0000"
document.getElementById("redkey3").style.borderColor = "#FF0000"
document.getElementById("bluekey1").style.borderColor = "#0080FF"
document.getElementById("bluekey2").style.borderColor = "#0080FF"
document.getElementById("bluekey3").style.borderColor = "#0080FF"
document.getElementById("redkey1").style.backgroundColor = "#800000"
document.getElementById("redkey2").style.backgroundColor = "#800000"
document.getElementById("redkey3").style.backgroundColor = "#800000"
document.getElementById("bluekey1").style.backgroundColor = "#004080"
document.getElementById("bluekey2").style.backgroundColor = "#004080"
document.getElementById("bluekey3").style.backgroundColor = "#004080"
	}
}

function getPurple() {
	if (chartstart != false) {
		if (purpletimes.length != 0) {
			if (Date.now() - (chartstart+(3590/scrollspeed)) >= purpletimes[0][1]) {
				switchPurple(purpletimes[0][0]);
				purpletimes.splice(0, 1)
			}
		}
	}
}

function getNotes() {
	if (chartstart != false) {
		if (notetimes.length != 0) {
			if (Date.now() - chartstart >= notetimes[0][1]) {
				summonNote(notetimes[0][0]);
				notetimes.splice(0, 1)
			}
		}
	}
}

function jd(n) {
	switch(n) {
		case 1:
		document.getElementById("judgetext").innerHTML = "perfect :D"
		document.getElementById("judgetext").style.color = "rgba(255, 255, 0, 128)"
		break;
		case 2:
		document.getElementById("judgetext").innerHTML = "great :)"
		document.getElementById("judgetext").style.color = "rgba(20, 150, 20, 128)"
		break;
		case 3:
		document.getElementById("judgetext").innerHTML = "good"
		document.getElementById("judgetext").style.color = "rgba(0, 128, 255, 128)"
		break;
		case 4:
		document.getElementById("judgetext").innerHTML = "miss..."
		document.getElementById("judgetext").style.color = "rgba(255, 0, 0, 128)"
		break;
	}
	jg[n-1]++;
}

function movenotes() {
if (document.getElementsByClassName("note").length > 0) {
for (i = 0; i < document.getElementsByClassName("note").length; i++) {
h = document.getElementsByClassName("note")
	h[i].style.top = (parseFloat(h[i].style.top) - (((1000/fps)/8)*scrollspeed)) + "px"
	if((parseFloat(h[i].style.top)-98) <= -55*scrollspeed) {h[i].remove();console.log("miss :(");score-=25;notecount++;combo=0;jd(4);console.log(Date.now() - bostontime)}
	else if((parseFloat(h[i].style.top)) <= 98 && mods[0]) {
		Mousetrap.trigger(controls[parseInt(h[i].classList[0].charAt(1))-1], 'keydown')
		if (h[i] != undefined) {
		Mousetrap.trigger(controls[parseInt(h[i].classList[0].charAt(1))-1], 'keyup')
		}
		}
	if (h[0] != undefined) {
	if(h[0].classList.contains("bluenote") && mods[1] && activeLane != 2) {
		Mousetrap.trigger(controls[7], "keydown")
	}
	else if(h[0].classList.contains("rednote") && mods[1] && activeLane != 1) {
		Mousetrap.trigger(controls[6], "keydown")
	}
	}
}
}
}

function reverse12(n) {
if (n == 1) return 2
else return 1
} 

function hitNote(n) {
if (document.getElementsByClassName(`n${n}`)[0] != undefined) {
let point = parseFloat(document.getElementsByClassName(`n${n}`)[0].style.top)
let keypoint = 98
if (point-keypoint <= 10*scrollspeed && point-keypoint >= -10*scrollspeed) {console.log("perfect :D"); score+=150;score2+=3;notecount++;combo++;jd(1);}
else if (point-keypoint <= 22*scrollspeed && point-keypoint >= -25*scrollspeed) {console.log("great :)"); score+=100;score2+=2;notecount++;combo++;jd(2);}
else if (point-keypoint <= 40*scrollspeed && point-keypoint >= -40*scrollspeed) {console.log("good"); score+=50;score2+=1;notecount++;combo++;jd(3);}
else if (point-keypoint <= 55*scrollspeed && point-keypoint >= -55*scrollspeed) {console.log("miss"); score-=25;notecount++;combo=0;jd(4);}
if (point-keypoint <= 55*scrollspeed && point-keypoint >= -55*scrollspeed) document.getElementsByClassName(`n${n}`)[0].remove()
//console.log(point-keypoint)
}
}

function readChart(bpm, notes, audioname, offset = 0) {
if (typeof notes != 'object') {console.log("sorry, you cannot play this chart because it is not an object")}
else {
document.getElementById("playblocker").style.display = "inline";
score=0
score2=0
notecount=0
jg=[0,0,0,0]
combo=0
bpm = bpm*speedrate
nl = notes.length
chartstart = Date.now()
for(i = 0; i < notes.length; i++) {
	if (typeof notes[i] == "object") {
		if (notes[i].includes("purple")) purpletimes.push([true, (60/bpm)*((i+1)*1000)])
		if (notes[i].includes("notpurple")) purpletimes.push([false, (60/bpm)*((i+1)*1000)])
		if (notes[i].includes(1)) notetimes.push([1, (60/bpm)*((i+1)*1000)])
		if (notes[i].includes(2)) notetimes.push([2, (60/bpm)*((i+1)*1000)])
		if (notes[i].includes(3)) notetimes.push([3, (60/bpm)*((i+1)*1000)])
		if (notes[i].includes(4)) notetimes.push([4, (60/bpm)*((i+1)*1000)])
		if (notes[i].includes(5)) notetimes.push([5, (60/bpm)*((i+1)*1000)])
		if (notes[i].includes(6)) notetimes.push([6, (60/bpm)*((i+1)*1000)])
	} else if (notes[i] >= 1 && notes[i] <= 6) {
		notetimes.push([notes[i], (60/bpm)*((i+1)*1000)])
	}
}
let audio = new Audio("audio/" + audioname);
let readpos = 0;
setTimeout(()=>{audio.play();audio.playbackRate = speedrate}, (3590/scrollspeed)+(offset/scrollspeed))
inter = setInterval(() => {
//if (notes[readpos] >= 1 && notes[readpos] <= 6) summonNote(Math.floor(notes[readpos]))
if (typeof notes[readpos] == "object") {
if (notes[readpos].includes("BPM")) {console.log("bpm changes not supported yet :(")} else {
//if (notes[readpos].includes("purple")) switchPurple(true)
//if (notes[readpos].includes("notpurple")) switchPurple(false)
/*if (notes[readpos].includes(1)) summonNote(1)
if (notes[readpos].includes(2)) summonNote(2)
if (notes[readpos].includes(3)) summonNote(3)
if (notes[readpos].includes(4)) summonNote(4)
if (notes[readpos].includes(5)) summonNote(5)
if (notes[readpos].includes(6)) summonNote(6)*/
}}
else if (notes[readpos] == undefined) {setTimeout(()=>{audio.pause(); document.getElementById("playblocker").style.display = "none"; chartstart = false;}, 3540); clearInterval(inter);}
readpos++;
}, (60/bpm)*1000)
}
}

function summonNote(num) {
	bostontime = Date.now()
	switch(num) {
		case 1:
		document.getElementById("redlane1").innerHTML += `<span class='n1 note rednote' style="border: 2px solid #FF0000; width:50px; height:10px; position:absolute; left:8px; top:500px; z-index:7; background-color: #800000;"></span>`
        break;
		case 2:
		document.getElementById("redlane1").innerHTML += `<span class='n2 note rednote' style="border: 2px solid #FF0000; width:50px; height:10px; position:absolute; left:62px; top:500px; z-index:7; background-color: #800000;"></span>`
        break;
		case 3:
		document.getElementById("redlane1").innerHTML += `<span class='n3 note rednote' style="border: 2px solid #FF0000; width:50px; height:10px; position:absolute; left:116px; top:500px; z-index:7; background-color: #800000;"></span>`
        break;
		case 4:
		document.getElementById("redlane1").innerHTML += `<span class='n4 note bluenote' style="border: 2px solid #0080FF; width:50px; height:10px; position:absolute; left:170px; top:500px; z-index:7; background-color: #004080;"></span>`
        break;
		case 5:
		document.getElementById("redlane1").innerHTML += `<span class='n5 note bluenote' style="border: 2px solid #0080FF; width:50px; height:10px; position:absolute; left:224px; top:500px; z-index:7; background-color: #004080;"></span>`
        break;
		case 6:
		document.getElementById("redlane1").innerHTML += `<span class='n6 note bluenote' style="border: 2px solid #0080FF; width:50px; height:10px; position:absolute; left:278px; top:500px; z-index:7; background-color: #004080;"></span>`
        break;
	} 
}

function summonHold(num, length) {
	switch(num) {
	}
}

function setControls() {
rc1 = document.getElementById("rc1").value
rc2 = document.getElementById("rc2").value
rc3 = document.getElementById("rc3").value
bc1 = document.getElementById("bc1").value
bc2 = document.getElementById("bc2").value
bc3 = document.getElementById("bc3").value
lsc1 = document.getElementById("lsc1").value
lsc2 = document.getElementById("lsc2").value
if(rc1 == rc2 || rc1 == rc3 || rc1 == bc1 || rc1 == bc2 || rc1 == bc3 || rc1 == lsc1 || rc1 == lsc2 || 
rc2 == rc3 || rc2 == bc1 || rc2 == bc2 || rc2 == bc3 || rc2 == lsc1 || rc2 == lsc2 || 
rc3 == bc1 || rc3 == bc2 || rc3 == bc3 || rc3 == lsc1 || rc3 == lsc2 || 
bc1 == bc2 || bc1 == bc3 || bc1 == lsc1 || bc1 == lsc2 || 
bc2 == bc3 || bc2 == lsc1 || bc2 == lsc2 || 
bc3 == lsc1 || bc3 == lsc2 
|| lsc1 == lsc2) {
	alert("you cannot set these controls... two different controls have the same key!")
} else {
controls[0] = rc1
controls[1] = rc2
controls[2] = rc3
controls[3] = bc1
controls[4] = bc2
controls[5] = bc3
controls[6] = lsc1
controls[7] = lsc2
Mousetrap.reset();
Mousetrap.bind(controls[0], function() {if (!keyspressed.includes(1) && (activeLane == 1 || activeLane == 3)) {hitNote(1); document.getElementById("redkey1").style.backgroundColor = (activeLane == 3 ? "6300A0" : "#A00000"); keyspressed.push(1);}}, 'keydown');
Mousetrap.bind(controls[0], function() {document.getElementById("redkey1").style.backgroundColor = (activeLane == 3 ? "500080" : "#800000"); keyspressed.splice(keyspressed.indexOf(1), 1)}, 'keyup');
Mousetrap.bind(controls[1], function() {if (!keyspressed.includes(2) && (activeLane == 1 || activeLane == 3)) {hitNote(2); document.getElementById("redkey2").style.backgroundColor = (activeLane == 3 ? "6300A0" : "#A00000"); keyspressed.push(2);}}, 'keydown');
Mousetrap.bind(controls[1], function() {document.getElementById("redkey2").style.backgroundColor = (activeLane == 3 ? "500080" : "#800000"); keyspressed.splice(keyspressed.indexOf(2), 1)}, 'keyup');
Mousetrap.bind(controls[2], function() {if (!keyspressed.includes(3) && (activeLane == 1 || activeLane == 3)) {hitNote(3); document.getElementById("redkey3").style.backgroundColor = (activeLane == 3 ? "6300A0" : "#A00000"); keyspressed.push(3);}}, 'keydown');
Mousetrap.bind(controls[2], function() {document.getElementById("redkey3").style.backgroundColor = (activeLane == 3 ? "500080" : "#800000"); keyspressed.splice(keyspressed.indexOf(3), 1)}, 'keyup');
Mousetrap.bind(controls[3], function() {if (!keyspressed.includes(4) && (activeLane == 2 || activeLane == 3)) {hitNote(4); document.getElementById("bluekey1").style.backgroundColor = (activeLane == 3 ? "6300A0" : "#0060A0"); keyspressed.push(4);}}, 'keydown');
Mousetrap.bind(controls[3], function() {document.getElementById("bluekey1").style.backgroundColor = (activeLane == 3 ? "500080" : "#004080"); keyspressed.splice(keyspressed.indexOf(4), 1)}, 'keyup');
Mousetrap.bind(controls[4], function() {if (!keyspressed.includes(5) && (activeLane == 2 || activeLane == 3)) {hitNote(5); document.getElementById("bluekey2").style.backgroundColor = (activeLane == 3 ? "6300A0" : "#0060A0"); keyspressed.push(5);}}, 'keydown');
Mousetrap.bind(controls[4], function() {document.getElementById("bluekey2").style.backgroundColor = (activeLane == 3 ? "500080" : "#004080"); keyspressed.splice(keyspressed.indexOf(5), 1)}, 'keyup');
Mousetrap.bind(controls[5], function() {if (!keyspressed.includes(6) && (activeLane == 2 || activeLane == 3)) {hitNote(6); document.getElementById("bluekey3").style.backgroundColor = (activeLane == 3 ? "6300A0" : "#0060A0"); keyspressed.push(6);}}, 'keydown');
Mousetrap.bind(controls[5], function() {document.getElementById("bluekey3").style.backgroundColor = (activeLane == 3 ? "500080" : "#004080"); keyspressed.splice(keyspressed.indexOf(6), 1)}, 'keyup');
Mousetrap.bind(controls[6], function() {if (activeLane != 1 && activeLane != 3) {activeLane = 1}}, "keydown")
Mousetrap.bind(controls[7], function() {if (activeLane != 2 && activeLane != 3) {activeLane = 2}}, "keydown")
}
}

//setInterval(movenotes, 1000/60)
setInterval(updateText, 1000/60)