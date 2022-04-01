var keyspressed = [];
var controls = ["a", "s", "d", "j", "k", "l", "c", "n"]
let bostontime;
var scrollspeed = 1;
var speedrate = 1;
var activeLane = 1;
var score = 0;
var score2 = 0;
var notecount = 0;
var combo = 0;
var oldActive = 1;
var jg = [0, 0, 0, 0, 0]
var chartstart = false;
var purpletimes = []
var notetimes = []
var holdtimes = []
var sboffset = 3000
var calibrating = false;
var bpma = 60
const times = [];
let fps;
var storage;
var chordstorage = [];
var stop = false;
var frameCount = 0;
var fps2, fpsInterval, startTime, now, then, elapsed;
var timeHarsh = 1;
var songAudios = [new Audio('audio/tutorial_i_made_while_my_parents_were_asleep.mp3'), new Audio('audio/Boo_NES.mp3')]
startAnimating(60);
var soundaa = [new Audio('audio/sfx/sfx.wav'), new Audio('audio/sfx/sfx_2.wav')]

var colors = ['#FF0000', '#0080FF', '#A000FF']


var notes = []

var currentjg = 0


var mods = [false, false, false, false, false];
//autokeys, autoswitch, 4key, true perfect, no long notes


var showjudge = false


var botslop = 0

class note {
constructor(lane) {
this.lane = lane;
this.time = Date.now();
this.timeleft = 3000;
this.id = notes.length;
this.dead = false
this.init();
}
init() {
window.requestAnimationFrame(() => {
this.timeleft = (this.time+3000) - Date.now();
if (this.timeleft <= -220/timeHarsh) {currentjg=4;score-=25;notecount++;combo=0;jg[3]++;notes[this.id]=undefined;this.dead=true;if(calibrating){sboffset=Date.now()-ostrichostrich;document.getElementById("oc").value=sboffset}}
if(!this.dead) this.init();
})
}
hit() {
if(!this.dead) {
//console.log(this.timeleft)
if (this.timeleft <= 20/timeHarsh && this.timeleft >= -20/timeHarsh && mods[3]) {currentjg=5;score+=165;score2+=3.3;notecount++;combo++;jg[4]++}
else if (this.timeleft <= 40/timeHarsh && this.timeleft >= -40/timeHarsh) {currentjg=1;score+=150;score2+=3;notecount++;combo++;jg[0]++}
else if (this.timeleft <= 100/timeHarsh && this.timeleft >= -100/timeHarsh) {currentjg=2;score+=100;score2+=2;notecount++;combo++;jg[1]++}
else if (this.timeleft <= 160/timeHarsh && this.timeleft >= -160/timeHarsh) {currentjg=3;score+=50;score2+=1;notecount++;combo++;jg[2]++}
else if (this.timeleft <= 220/timeHarsh && this.tieleft >= -220/timeHarsh) {currentjg=4;score-=25;notecount++;combo=0;jg[3]++}
if (this.timeleft <= 220/timeHarsh && this.timeleft >= -220/timeHarsh) {notes[this.id]=undefined;this.dead=true}
}
}
}

function timetoposition(time) {
//547
return -(((time-3000))/5.484460694698354)
}

function startAnimating(fpsa) {
    fpsInterval = 1000 / fpsa;
    then = Date.now();
    startTime = then;
    //console.log(startTime);
    animate();
}

var c = {
rect: (color, x, y, width, height) => {
var canvas = document.getElementById("gameCanvas")
var ctx = canvas.getContext("2d");
ctx.fillStyle = color
if(color.length>7) ctx.globalAlpha = Number("0x" + color.split(7)[1])
ctx.fillRect(x, y, width, height)
ctx.globalAlpha = 1
},

clear: () => {
var canvas = document.getElementById("gameCanvas")
var ctx = canvas.getContext("2d");
ctx.clearRect(0, 0, canvas.width, canvas.height)
},

text: (text, color, x, y, font="monospace", size="20px", align="left", stroke=false) => {
var canvas = document.getElementById("gameCanvas")
var ctx = canvas.getContext("2d");
ctx.font = size + " " + font
ctx.fillStyle = color
ctx.textAlign = align
if(color.length>7 && color.includes("#")) ctx.globalAlpha = Number("0x" + color.split(7)[1])
if(!stroke) {ctx.fillText(text, x, y)}
else {ctx.strokeText(text, x, y)}
ctx.globalAlpha = 1
}
}

function getColor(lane, a=true) {
if (activeLane != 3) {
if(keyspressed.includes(lane)&&a) {return (lane<4 ? shadeColor(colors[0], -37) : shadeColor(colors[1], -37))}
else {return (lane<4 ? shadeColor(colors[0], -49.5) : shadeColor(colors[1], -49.5))}
} else {
if(keyspressed.includes(lane)&&a) {return shadeColor(colors[2], -37)}
else {return shadeColor(colors[2], -49.5)}
}
}

function refreshHitters() {
c.clear()	

c.text(combo, "#80808080", 1366/2, 634*0.42, "monospace", "50px", "center")
if (currentjg!=0) {eval(jd(currentjg))}


//borders
c.rect((activeLane!=3 ? colors[0] : colors[2]), 575-54, 667-114, 54, 94)
c.rect((activeLane!=3 ? colors[0] : colors[2]), 629-54, 667-114, 54, 94)
c.rect((activeLane!=3 ? colors[0] : colors[2]), 683-54, 667-114, 54, 94)
c.rect((activeLane!=3 ? colors[1] : colors[2]), 737-54, 667-114, 54, 94)
c.rect((activeLane!=3 ? colors[1] : colors[2]), 791-54, 667-114, 54, 94)
c.rect((activeLane!=3 ? colors[1] : colors[2]), 845-54, 667-114, 54, 94)
//console.log(keyspressed.includes(6))
//fills
c.rect(getColor(1), 577-54, 667-112, 50, 90)
c.rect(getColor(2), 631-54, 667-112, 50, 90)
c.rect(getColor(3), 685-54, 667-112, 50, 90)
c.rect(getColor(4), 739-54, 667-112, 50, 90)
c.rect(getColor(5), 793-54, 667-112, 50, 90)
c.rect(getColor(6), 847-54, 667-112, 50, 90)

//notes
let baa = 0
if (notes.length > 0) {
for (baa = 0; baa < notes.length; baa++) {
if (notes[baa] != undefined) {
c.rect((activeLane!=3 ? (notes[baa].lane < 4 ? colors[0] : colors[1]) : colors[2]), 521 + ((notes[baa].lane-1)*54), timetoposition(notes[baa].timeleft)-2, 54, 14)
c.rect(getColor(notes[baa].lane, false), 523 + ((notes[baa].lane-1)*54), timetoposition(notes[baa].timeleft), 50, 10)
}
}
}

//showjudge
if (showjudge) {
c.rect('#FF800080', 575-54, 667-124, 324, 10)
c.rect('#FFFF0080', 575-54, 667-134, 324, 10)
c.rect('#14961480', 575-54, 667-164, 324, 30)
c.rect('#0080FF80', 575-54, 667-194, 324, 30)
c.rect('#FF000080', 575-54, 667-224, 324, 30)
}

//judges
if(jg[0] != 0 || jg[1] != 0 || jg[2] != 0 || jg[3] != 0 || jg[4] != 0) {
ostrich=0
if(mods[3] || jg[4]>=1) {
c.rect("#FF800080", 0, 0, (jg[4] / (jg[0] + jg[1] + jg[2] + jg[3] + jg[4]))*300, 22)
c.text(jg[4], "#FFA020", 3, 16, "monospace", "16px", "left", false)
} else {ostrich=22}
c.rect("#FFFF0080", 0, 22-ostrich, (jg[0] / (jg[0] + jg[1] + jg[2] + jg[3] + jg[4]))*300, 22)
c.text(jg[0], "#FFFF00", 3, 38-ostrich, "monospace", "16px", "left", false)
c.rect("#14961480", 0, 44-ostrich, (jg[1] / (jg[0] + jg[1] + jg[2] + jg[3] + jg[4]))*300, 22)
c.text(jg[1], "#479C47", 3, 60-ostrich, "monospace", "16px", "left", false)
c.rect("#0080FF80", 0, 66-ostrich, (jg[2] / (jg[0] + jg[1] + jg[2] + jg[3] + jg[4]))*300, 22)
c.text(jg[2], "#0080FF", 3, 82-ostrich, "monospace", "16px", "left", false)
c.rect("#FF000080", 0, 88-ostrich, (jg[3] / (jg[0] + jg[1] + jg[2] + jg[3] + jg[4]))*300, 22)
c.text(jg[3], "#FF0000", 3, 104-ostrich, "monospace", "16px", "left", false)
}

//blackcover
if (activeLane != 3) c.rect("#00000055", (activeLane == 1 ? 1366/2 : (1366/2)-162), 0, 324/2, 1000)
}

function animate() {

    // stop
    if (stop) {
        return;
    }

    // request another frame

    requestAnimationFrame(animate);

    // calc elapsed time since last loop

    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval) {

        // Get ready for next frame by setting then=now, but...
        // Also, adjust for fpsInterval not being multiple of 16.67
        then = now - (elapsed % fpsInterval);

        // draw stuff here
        refreshLoop();

        // TESTING...Report #seconds since start and achieved fps.
        var sinceStart = now - startTime;
        /*var currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100;
        $results.text("Elapsed time= " + Math.round(sinceStart / 1000 * 100) / 100 + " secs @ " + currentFps + " fps.");*/

    }
}


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
	getPurple();
	//getNotes();
    //refreshLoop();
  });
}

refreshLoop();

function getClearStatus() {
	if(jg[0] == 0 && jg[1] == 0 && jg[2] == 0 && jg[3] == 0 && jg[4] == 0) return ""
	if((jg[0] == 0 && jg[1] == 0 && jg[2] == 0 && jg[3] == 0) && mods[3]) return "<span style='color:var(--trueperfect)'>TPFC</span>"
	if(jg[1] == 0 && jg[2] == 0 && jg[3] == 0) return "<span style='color:var(--perfect)'>PFC</span>"
	if(jg[2] == 0 && jg[3] == 0) return "<span style='color:var(--great)'>GFC</span>"
	if(jg[3] == 0) return "<span style='color:var(--good)'>FC</span>"
	return ""
}

function getGrade(acc) {
	if(mods[3]) {
	if((acc == 110) || (getClearStatus() == "<span style='color:var(--trueperfect)'>TPFC</span>")) return "<span style='color:hsl(30, 100%, 50%)'>SSS</span>"
	if(acc >= 108 && acc < 110) return "<span style='color:hsl(40, 100%, 50%)'>SS+</span>"
	if(acc >= 102 && acc < 108) return "<span style='color:hsl(50, 100%, 50%)'>SS</span>"
	if(acc >= 100 && acc < 102) return "<span style='color:hsl(60, 100%, 50%)'>SS-</span>"
	} else {
	if(acc == 100) return "<span style='color:hsl(60, 100%, 50%)'>SS</span>"
	}
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
document.getElementById("thtext").innerHTML = timeHarsh.toFixed(2) + "x"

document.getElementById("trueperfectth").innerHTML = (20/timeHarsh).toFixed(2) + "ms"
document.getElementById("perfectth").innerHTML = (40/timeHarsh).toFixed(2) + "ms"
document.getElementById("greatth").innerHTML = (100/timeHarsh).toFixed(2) + "ms"
document.getElementById("goodth").innerHTML = (160/timeHarsh).toFixed(2) + "ms"
document.getElementById("missth").innerHTML = (220/timeHarsh).toFixed(2) + "ms"
}

document.getElementById("song.boo.insane").innerHTML = "Insane<br>14<br><span style='font-size:17px;'>" + chartnps(901.52, [[1, 3], 0, 2, 0, 1, 0, 0, 0, 1, 0, 2, 0, 3, 0, 0, 0, 6, 0, 5, 0, 4, 0, 0, 0, 4, 0, 5, 0, 6, 0, 0, 0, 3, 0, 2, 0, 1, 0, 0, 0, 3, 0, 0, 0, 1, 0, 3, 2, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, [4, 6], 0, 5, 0, 4, 0, 0, 0, 4, 0, 5, 0, 6, 0, 0, 0, 3, 0, 2, 0, 1, 0, 0, 0, 1, 0, 2, 0, 3, 0, 0, 0, 6, 0, 5, 0, 4, 0, 0, 0, 5, 0, 0, 0, 5, 0, 6, 5, 4, 0, 0, 0, 6, 0, 0, 0, 5, 0, 0, 0, 4, 0, 0, 0, [1, 3], 0, 2, 0, 1, 0, 0, 0, 1, 0, 2, 0, 3, 0, 0, 0, 6, 0, 5, 0, 4, 0, 0, 0, 4, 0, 5, 0, 6, 0, 0, 0, [1, 3], 0, 2, 0, 1, 0, 0, 0, 4, 0, 3, 0, 2, 0, 0, 0, [6, 5], 0, 4, 0, 3, 0, 0, 0, 6, 0, 5, 0, 4, 0, 0, 0, [2, 3], 0, 1, 0, 0, 0, [1, 3], 0, 2, 0, 0, 0, [5, 6], 0, 4, 0, 0, 0, [4, 6], 0, 5, 0, 0, 0, [1, 2], 3, ['purple', 2], 1, [2, 3], 0, 0, 0, 
[1, 4], 0, 1, 0, [2, 6], 0, [3, 6], 0, [4, 5], 0, 1, 0, [2, 6], 0, 5, 0, [3, 4], 0, 0, 0, [1, 6], 0, [3, 6], 2, [1, 4, 5], 0, 0, 0, [1, 6], 0, 5, 0, [2, 4], 0, 0, 0, [1, 6], 0, [2, 6], 0, [4, 5], 0, 2, 0, [1, 6], 0, 5, 0, [3, 4], 0, 0, 0, [1, 5], 2, [3, 5], 0, [4, 5], 0, 0, 0, [1, 5], 2, [3, 5], 0,
4, 0, 1, 0, [2, 5], 0, [3, 5], 0, [4, 5], 0, 2, 0, [3, 5], 0, 5, 0, [3, 4], 0, 0, 0, [2, 5], 0, [3, 5], 2, [1, 4, 5], 0, 0, 0, [1, 5], 0, 5, 0, [3, 4], 0, 0, 0, [3, 5], 0, [2, 5], 0, [4, 5], 0, 2, 0, [1, 5], 0, 5, 0, [2, 4], 0, 0, 0, [1, 6], 2, [3, 6], 0, [4, 5], 0, 0, 0, [1, 6], 2, [3, 5], 0, 
4, 0, 1, 0, [2, 6], 0, [3, 6], 0, [4, 5], 0, 2, 0, [3, 6], 0, 5, 0, [3, 4], 0, 0, 0, [1, 6], 0, [3, 6], 2, [1, 4, 5], 0, 0, 0, [3, 6], 0, 5, 0, [2, 4], 0, 0, 0, [1, 6], 0, [2, 6], 0, [4, 5], 0, 2, 0, [1, 6], 0, 5, 0, [2, 4], 0, 0, 0, [1, 5], 2, [3, 5], 0, [4, 5], 0, 0, 0, [1, 5], 2, [3, 5], 0,
4, 0, 1, 0, [2, 5], 0, [3, 5], 0, [4, 5], 0, 2, 0, [3, 5], 0, 5, 0, [3, 4], 0, 0, 0, [1, 5], 0, [3, 5], 2, [1, 4, 5], 0, 0, 0, [1, 5], 0, 5, 0, [1, 2, 3, 4, 5, 6], 0, 0, 0, 2, 0, 3, 2, [1, 6], 0, [3, 6], 0, 0, 0, [1, 6], 0, [2, 6], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [1, 2, 3, 4, 5, 6], 0, 0, 0,
4, 0, 1, 0, [2, 6], 0, [3, 6], 0, [4, 5], 0, 2, 0, [3, 6], 0, 5, 0, [3, 4], 0, 0, 0, [1, 6], 0, [3, 6], 2, [1, 4, 5], 0, 0, 0, [1, 6], 0, 5, 0, [2, 4], 0, 0, 0, [1, 6], 0, [2, 6], 0, [4, 5], 0, 3, 0, [2, 6], 0, 5, 0, [3, 4], 0, 0, 0, [1, 5], 2, [3, 5], 0, [4, 5], 0, 0, 0, [1, 5], 2, [3, 5], 0,
4, 0, 1, 0, [2, 5], 0, [3, 5], 0, [4, 5], 0, 2, 0, [3, 5], 0, 5, 0, [3, 4], 0, 0, 0, [1, 5], 0, [3, 5], 2, [1, 4, 5], 0, 0, 0, [1, 5], 0, 5, 0, [3, 4], 0, 0, 0, [3, 5], 0, [2, 5], 0, [4, 5], 0, 2, 0, [1, 5], 0, 5, 0, [2, 4], 0, 0, 0, [1, 6], 2, [3, 6], 0, [4, 5], 0, 0, 0, [1, 6], 2, [3, 5], 0,
4, 0, 1, 0, [2, 6], 0, [3, 6], 0, [4, 5], 0, 1, 0, [2, 6], 0, 5, 0, [3, 4], 0, 0, 0, [1, 6], 0, [3, 6], 2, [1, 4, 5], 0, 0, 0, [2, 6], 0, 5, 0, [3, 4], 0, 0, 0, [1, 6], 0, [3, 6], 0, [4, 5], 0, 2, 0, [1, 6], 0, 5, 0, [2, 4], 0, 0, 0, [1, 5], 2, [3, 5], 0, [4, 5], 0, 0, 0, [1, 5], 2, [3, 5], 0,
[3, 4], 0, [2, 4], 0, [1, 4, 6], 0, 4, 0, [3, 5, 6], 0, [2, 4], 0, [1, 5, 6], 0, 0, 0, [3, 4], 0, [2, 5], 0, [1, 4, 6], 0, 4, 0, [3, 5, 6], 0, [2, 4], 0, [1, 5, 6], 0, ['notpurple'], 0, [2, 3], 0, 1, 0, 0, 0, [1, 3], 0, 1, 0, 0, 0, [4, 6], 0, 5, 0, 0, 0, [5, 6], 0, 1, 0, ['purple'], 0, [1, 2], 3, 1, 2, [1, 3], 0, 0, 0, 
[1, 4, 5, 6], 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, ['2h11.5', 6], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ['3h7.5', 6], 0, 0, 0, 0, 0, 2, 1, ['2h7.5', 4, 5], 0, 0, 0, [4, 6], 0, 0, 0, ['1h7.5', 4, 5], 0, 0, 0, [4, 6], 0, 0, 0, ['3h7.5', 4, 5], 0, 0, 0, [4, 6], 0, 0, 0, ['2h7.5', 4, 5], 0, 0, 0, [4, 6], 0, 0, 0,
['1h11.5', 4, 5, 6], 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, ['2h11.5', 6], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ['3h7.5', 6], 0, 0, 0, 0, 0, 1, 2, ['1h7.5', 4, 6], 0, 0, 0, [5, 6], 0, 0, 0, ['2h7.5', 4, 6], 0, 0, 0, [5, 6], 0, 0, 0, ['3h15.5', 4, 6], 0, 0, 0, [5, 6], 0, 0, 0, [4, 6], 0, 0, 0, [5, 6], 0, 0, 0,
['1h11.5', 4, 5, 6], 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, ['2h11.5', 6], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ['3h7.5', 6], 0, 0, 0, 0, 0, 2, 1, ['2h7.5', 4, 5], 0, 0, 0, [4, 6], 0, 0, 0, ['1h7.5', 4, 5], 0, 0, 0, [4, 6], 0, 0, 0, ['3h7.5', 4, 5], 0, 0, 0, [4, 6], 0, 0, 0, ['2h7.5', 4, 5], 0, 0, 0, [4, 6], 0, 0, 0,
['3h7.5', 4, 5, 6], 0, 0, 0, 0, 0, 0, 0, ['1h7.5', 6], 0, 0, 0, 6, 0, 0, 0, ['2h7.5'], 0, 0, 0, 0, 0, 0, 0, ['3h7.5', 6], 0, 0, 0, 0, 0, 0, 0, ['6h15.5', 1], 0, 0, 0, [2, 5], 0, 5, 0, [1, 2, 3], 0, 0, 0, [4, 5], 0, 3, 4, ['3h15.5'], 0, 0, 0, 4, 0, 4, 0, [1, 2, 5], 0, 0, 0, [4, 6], 0, 0, 0,
['1h11.5'], 0, 0, 0, 6, 0, 6, 0, [4, 5], 0, 0, 0, ['2h11.5', 6], 0, 5, 0, 4, 0, 0, 0, ['4h3.5', 6], 0, 6, 0, ['3h3.5', '5h3.5', 1], 0, 0, 0, ['6h3.5', 4], 0, 3, [1, 2, 4], [3, 5], ['2h5.5', '4h29.5'], 0, 6, 0, 6, 0, ['1h7.5', 3, 5], 0, 0, 0, 6, 0, 5, 0, ['3h7.5', 2], 0, 0, 0, 6, 0, 6, 0, ['2h7.5', 1, 5], 0, 0, 0, 6, 0, 5, 0,
['1h11.5'], 0, 0, 0, 6, 0, 6, 0, [4, 5], 0, 0, 0, ['2h11.5', 6], 0, 5, 0, 4, 0, 0, 0, ['6h3.5', 5], 0, 5, 0, ['3h7.5', '5h3.5', 1, 4], 0, 0, 0, ['4h3.5', 6], 0, [1, 5], [2, 6], ['1h7.5', '5h31.5'], 0, 0, 0, 6, 0, 6, 0, [2, '3h7.5', 4], 0, 0, 0, 6, 0, 4, 0, [2, '4h15.5'], 0, 0, 0, 6, 0, 6, 0, [2, 3], 0, 0, 0, 6, 0, 3, 0,
['1h11.5', 2], 0, 0, 0, 6, 0, 6, 0, [4, 5], 0, 0, 0, ['2h11.5', 6], 0, 5, 0, 4, 0, 0, 0, ['4h3.5', 6], 0, 6, 0, ['3h7.5', '5h3.5', 1, 6], 0, 0, 0, ['6h3.5', 4], 0, [1, 4], [2, 5], ['1h7.5', '4h19.5'], 0, 0, 0, 6, 0, 6, 0, ['2h7.5', 3, 5], 0, 0, 0, 6, 0, 5, 0, [1, '3h7.5'], 0, 0, 0, ['6h3.5', 5], 0, 5, 0, ['5h3.5', '2h7.5', 1, 6], 0, 0, 0, ['4h3.5', 6], 0, 5, 0,
['3h7.5', '5h15.5', 1], 0, 0, 0, 6, 0, 6, 0, ['1h7.5', 2, 4], 0, 0, 0, 6, 0, 4, 0, ['2h7.5', '4h7.5', 3], 0, 0, 0, 6, 0, 6, 0, ['3h7.5', '6h1.5', 1, 5], 0, ['5h1.5'], 0, [4, '6h1.5'], 0, [2, '5h1.5'], 0, ['2h23.5', '4h23.5', 1, 6], 0, 0, 0, 6, 0, 6, 0, 5, 0, 0, 0, 6, 0, 0, 0, 5, 0, 0, 0, 6, 0, 6, 0, 6, 0, 0, 0, [1, 6], 0, ['notpurple'],
[1, 3], 0, 2, 0, 1, 0, 0, 0, 1, 0, 2, 0, 3, 0, 0, 0, 6, 0, 5, 0, 4, 0, 0, 0, 4, 0, 5, 0, 6, 0, 0, 0, 3, 0, 2, 0, 1, 0, 0, 0, 3, 0, 0, 0, 1, 0, 3, 2, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, [4, 6], 0, 5, 0, 4, 0, 0, 0, 4, 0, 5, 0, 6, 0, 0, 0, 3, 0, 2, 0, 1, 0, 0, 0, 1, 0, 2, 0, 3, 0, 0, 0, 6, 0, 5, 0, 4, 0, 0, 0, 5, 0, 0, 0, 5, 0, 6, 5, 4, 0, 0, 0, 6, 0, 0, 0, 5, 0, 0, 0, 4, 0, 0, 0, [1, 3], 0, 2, 0, 1, 0, 0, 0, 1, 0, 2, 0, 3, 0, 0, 0, 6, 0, 5, 0, 4, 0, 0, 0, 4, 0, 5, 0, 6, 0, 0, 0, [1, 3], 0, 2, 0, 1, 0, 0, 0, 4, 0, 3, 0, 2, 0, 0, 0, [6, 5], 0, 4, 0, 3, 0, 0, 0, 6, 0, 5, 0, 4, 0, 0, 0, [1, 3], 0, 2, 0, 0, 0, [4, 6], 0, 5, 0, 0, 0, [2, 3], 0, 1, 0, 0, 0, [5, 6], 0, ['purple', 4], 0, 0, 0, [1, 2, 3], 6, 5, 4, [5, 6], 0, 3, 0, 
[1, 4], 0, 1, 0, [2, 6], 0, [3, 6], 0, [4, 5], 0, 1, 0, [2, 6], 0, 5, 0, [3, 4], 0, 0, 0, [1, 6], 0, [3, 6], 2, [1, 4, 5], 0, 0, 0, [1, 6], 0, 5, 0, [2, 4], 0, 0, 0, [1, 6], 0, [2, 6], 0, [4, 5], 0, 2, 0, [1, 6], 0, 5, 0, [3, 4], 0, 0, 0, [1, 5], 2, [3, 5], 0, [4, 5], 0, 0, 0, [1, 5], 2, [3, 5], 0,
4, 0, 1, 0, [2, 5], 0, [3, 5], 0, [4, 5], 0, 2, 0, [3, 5], 0, 5, 0, [3, 4], 0, 0, 0, [2, 5], 0, [3, 5], 2, [1, 4, 5], 0, 0, 0, [1, 5], 0, 5, 0, [3, 4], 0, 0, 0, [3, 5], 0, [2, 5], 0, [4, 5], 0, 2, 0, [1, 5], 0, 5, 0, [2, 4], 0, 0, 0, [1, 6], 2, [3, 6], 0, [4, 5], 0, 0, 0, [1, 6], 2, [3, 5], 0, 
4, 0, 1, 0, [2, 6], 0, [3, 6], 0, [4, 5], 0, 2, 0, [3, 6], 0, 5, 0, [3, 4], 0, 0, 0, [1, 6], 0, [3, 6], 2, [1, 4, 5], 0, 0, 0, [3, 6], 0, 5, 0, [2, 4], 0, 0, 0, [1, 6], 0, [2, 6], 0, [4, 5], 0, 2, 0, [1, 6], 0, 5, 0, [2, 4], 0, 0, 0, [1, 5], 2, [3, 5], 0, [4, 5], 0, 0, 0, [1, 5], 2, [3, 5], 0,
4, 0, 1, 0, [2, 5], 0, [3, 5], 0, [4, 5], 0, 2, 0, [3, 5], 0, 5, 0, [3, 4], 0, 0, 0, [1, 5], 0, [3, 5], 2, [1, 4, 5], 0, 0, 0, [1, 5], 0, 5, 0, [1, 2, 3, 4, 5, 6], 0, 0, 0, 2, 0, 3, 2, [1, 6], 0, [3, 6], 0, 0, 0, [1, 6], 0, [2, 6], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [1, 2, 3, 4, 5, 6], 0, 0, 0,
4, 0, 1, 0, [2, 6], 0, [3, 6], 0, [4, 5], 0, 2, 0, [3, 6], 0, 5, 0, [3, 4], 0, 0, 0, [1, 6], 0, [3, 6], 2, [1, 4, 5], 0, 0, 0, [1, 6], 0, 5, 0, [2, 4], 0, 0, 0, [1, 6], 0, [2, 6], 0, [4, 5], 0, 3, 0, [2, 6], 0, 5, 0, [3, 4], 0, 0, 0, [1, 5], 2, [3, 5], 0, [4, 5], 0, 0, 0, [1, 5], 2, [3, 5], 0,
4, 0, 1, 0, [2, 5], 0, [3, 5], 0, [4, 5], 0, 2, 0, [3, 5], 0, 5, 0, [3, 4], 0, 0, 0, [1, 5], 0, [3, 5], 2, [1, 4, 5], 0, 0, 0, [1, 5], 0, 5, 0, [3, 4], 0, 0, 0, [3, 5], 0, [2, 5], 0, [4, 5], 0, 2, 0, [1, 5], 0, 5, 0, [2, 4], 0, 0, 0, [1, 6], 2, [3, 6], 0, [4, 5], 0, 0, 0, [1, 6], 2, [3, 5], 0,
4, 0, 1, 0, [2, 6], 0, [3, 6], 0, [4, 5], 0, 1, 0, [2, 6], 0, 5, 0, [3, 4], 0, 0, 0, [1, 6], 0, [3, 6], 2, [1, 4, 5], 0, 0, 0, [2, 6], 0, 5, 0, [3, 4], 0, 0, 0, [1, 6], 0, [3, 6], 0, [4, 5], 0, 2, 0, [1, 6], 0, 5, 0, [2, 4], 0, 0, 0, [1, 5], 2, [3, 5], 0, [4, 5], 0, 0, 0, [1, 5], 2, [3, 5], 0,
[3, 4], 0, [2, 4], 0, [1, 4, 6], 0, 4, 0, [3, 5, 6], 0, [2, 4], 0, [1, 5, 6], 0, 0, 0, [3, 4], 0, [2, 5], 0, [1, 4, 6], 0, 4, 0, [3, 5, 6], 0, [2, 4], 0, [1, 5, 6], 0, ['notpurple'], 0, [2, 3], 0, 1, 0, 0, 0, [1, 3], 0, 1, 0, 0, 0, [4, 6], 0, 5, 0, 0, 0, [5, 6], 0, 1, 0, ['purple'], 0, [1, 2], 3, 1, 2, [3, 4, 5, 6], 0, 0, 0]) + "</span>"
document.getElementById("song.timwmpws.beginner").innerHTML = "Beginner<br>1<br><span style='font-size:17px;'>" + chartnps(142, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [1, 3], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ['purple'], 0, 0, 0, 1, 0, 3, 0, 5, 0, ['notpurple'], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ['1h1'], 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) + "</span>"

function switchPurple(n) {
	if (n) {
oldActive = activeLane
activeLane = 3
	} else {
if (oldActive == 3) oldActive = 1
activeLane = oldActive
	}
}

function getPurple() {
	if (chartstart != false) {
		if (purpletimes.length != 0) {
			if (Date.now() - (chartstart+(sboffset/scrollspeed)) >= purpletimes[0][1]) {
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
				if(typeof notetimes[0][0] == 'object') {
				notetimes[0][0].forEach((i)=>{summonNote(i)})
				} else {
				summonNote(notetimes[0][0]);
				}
				notetimes.splice(0, 1)
			}
		}
	}
}

function getHolds() {
	if (chartstart != false) {
		if (holdtimes.length != 0) {
			if (Date.now() - chartstart >= holdtimes[0][1]) {
				if(!mods[4]) summonHold(holdtimes[0][0][0], holdtimes[0][0][1]);
				else summonNote(holdtimes[0][0][0])
				holdtimes.splice(0, 1)
			}
		}
	}
}

function jd(n) {
	switch(n) {
		case 1:
		return "c.text('perfect :D', '#FFFF00', 1366/2, 634*0.32, 'monospace', '30px', 'center')"
		break;
		case 2:
		return "c.text('great :)', '#149614', 1366/2, 634*0.32, 'monospace', '30px', 'center')"
		break;
		case 3:
		return "c.text('good', '#0080FF', 1366/2, 634*0.32, 'monospace', '30px', 'center')"
		break;
		case 4:
		return "c.text('miss...', '#FF0000', 1366/2, 634*0.32, 'monospace', '30px', 'center')"
		break;
		case 5:
		return "c.text('true perfect :O', '#FF8000', 1366/2, 634*0.32, 'monospace', '30px', 'center')"
		break;
	}
	jg[n-1]++;
}

function chartnps(bpm, chart) {
let notecount = 0
let beatcount = 0
if (typeof chart != 'object') return 'not object'
else {
cl = chart.length
for(let i=0; i<cl; i++) {
beatcount++
if(typeof chart[i] == 'object') {
cil = chart[i].length
for(let j=0; j<cil; j++) {
if(typeof chart[i][j] == 'number') {
if(chart[i][j] >= 1 && chart[i][j] <= 6) notecount++
}
if(typeof chart[i][j] == 'string') {
if(chart[i][j].includes('h')) notecount+=2;
}
}
}
else {
if(chart[i] >= 1) notecount++
}
}
return ((notecount / beatcount)*(bpm/60)).toFixed(2) + `nps`
}
}

function hitNote(n) {
if (notes.length > 0) {
p = 0
for (p = 0; p < notes.length; p++) {
if (notes[p]!=undefined) {
if(notes[p].lane == n) {notes[p].hit();break;}
}
}
}
}

function reverse12(n) {
if (n == 1) return 2
else return 1
} 

function readChart(bpm, notes, audioname, offset = 0) {
if (typeof notes != 'object') {console.log("sorry, you cannot play this chart because it is not an object")}
else {
document.getElementById("playblocker").style.display = "inline";
switchPurple(false)
bpma=bpm
score=0
score2=0
notecount=0
jg=[0,0,0,0,0]
combo=0
bpm = bpm*speedrate
nl = notes.length
chartstart = Date.now()
storage = []
for(i = 0; i < notes.length; i++) {
	if (typeof notes[i] == "object") {
		//console.log(notes[i][0])
		storage.push(notes[i])
		chordstorage = []
		if (notes[i].includes("purple")) purpletimes.push([true, (60/bpm)*((i+1)*1000)])
		if (notes[i].includes("notpurple")) purpletimes.push([false, (60/bpm)*((i+1)*1000)])
		/*if (notes[i].includes(1)) notetimes.push([1, (60/bpm)*((i+1)*1000)])
		if (notes[i].includes(2)) notetimes.push([2, (60/bpm)*((i+1)*1000)])
		if (notes[i].includes(3)) notetimes.push([3, (60/bpm)*((i+1)*1000)])
		if (notes[i].includes(4)) notetimes.push([4, (60/bpm)*((i+1)*1000)])
		if (notes[i].includes(5)) notetimes.push([5, (60/bpm)*((i+1)*1000)])
		if (notes[i].includes(6)) notetimes.push([6, (60/bpm)*((i+1)*1000)])*/
		if (notes[i].includes(1)) chordstorage.push(1)
		if (notes[i].includes(2)) chordstorage.push(2)
		if (notes[i].includes(3)) chordstorage.push(3)
		if (notes[i].includes(4)) chordstorage.push(4)
		if (notes[i].includes(5)) chordstorage.push(5)
		if (notes[i].includes(6)) chordstorage.push(6)
		if (chordstorage.length>=1) {
		notetimes.push([chordstorage, (60/bpm)*((i+1)*1000)])
		}
		if (notes[i].length >= 1 && typeof notes[i][0] == 'string') {
		if (notes[i][0].includes('h')) {
		holdtimes.push([[parseInt(notes[i][0].charAt(0)), parseFloat(notes[i][0].slice(2))], (60/bpm)*((i+1)*1000)])
		}
		}
	} else if (notes[i] >= 1 && notes[i] <= 6) {
		notetimes.push([notes[i], (60/bpm)*((i+1)*1000)])
	}
}
let audio = new Audio("audio/" + audioname);
let readpos = 0;
setTimeout(()=>{audio.play();audio.playbackRate = speedrate}, (sboffset/scrollspeed)+(offset/scrollspeed))
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
else if (notes[readpos] == undefined) {setTimeout(()=>{audio.pause(); document.getElementById("playblocker").style.display = "none"; chartstart = false; notes = []}, 3000); clearInterval(inter);}
readpos++;
}, (60/bpm)*1000)
}
}

function summonNote(num) {
if(calibrating)ostrichostrich=Date.now()
notes.push(new note(num))
}

function summonHold(num, beats) {
}

Mousetrap.bind(controls[0], function() {if (!keyspressed.includes(1) && (activeLane == 1 || activeLane == 3)) {hitNote(1);keyspressed.push(1);}}, 'keydown');
Mousetrap.bind(controls[0], function() {keyspressed.splice(keyspressed.indexOf(1), 1)}, 'keyup');
Mousetrap.bind(controls[1], function() {if (!keyspressed.includes(2) && (activeLane == 1 || activeLane == 3)) {hitNote(2);keyspressed.push(2);}}, 'keydown');
Mousetrap.bind(controls[1], function() {keyspressed.splice(keyspressed.indexOf(2), 1)}, 'keyup');
Mousetrap.bind(controls[2], function() {if (!keyspressed.includes(3) && (activeLane == 1 || activeLane == 3)) {hitNote(3);keyspressed.push(3);}}, 'keydown');
Mousetrap.bind(controls[2], function() {keyspressed.splice(keyspressed.indexOf(3), 1)}, 'keyup');
Mousetrap.bind(controls[3], function() {if (!keyspressed.includes(4) && (activeLane == 2 || activeLane == 3)) {hitNote(4);keyspressed.push(4);}}, 'keydown');
Mousetrap.bind(controls[3], function() {keyspressed.splice(keyspressed.indexOf(4), 1)}, 'keyup');
Mousetrap.bind(controls[4], function() {if (!keyspressed.includes(5) && (activeLane == 2 || activeLane == 3)) {hitNote(5);keyspressed.push(5);}}, 'keydown');
Mousetrap.bind(controls[4], function() {keyspressed.splice(keyspressed.indexOf(5), 1)}, 'keyup');
Mousetrap.bind(controls[5], function() {if (!keyspressed.includes(6) && (activeLane == 2 || activeLane == 3)) {hitNote(6);keyspressed.push(6);}}, 'keydown');
Mousetrap.bind(controls[5], function() {keyspressed.splice(keyspressed.indexOf(6), 1)}, 'keyup');
Mousetrap.bind(controls[6], function() {if (activeLane != 1 && activeLane != 3) {activeLane = 1}}, "keydown")
Mousetrap.bind(controls[7], function() {if (activeLane != 2 && activeLane != 3) {activeLane = 2}}, "keydown")

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
Mousetrap.bind(controls[0], function() {if (!keyspressed.includes(1) && (activeLane == 1 || activeLane == 3)) {hitNote(1);keyspressed.push(1);}}, 'keydown');
Mousetrap.bind(controls[0], function() {keyspressed.splice(keyspressed.indexOf(1), 1)}, 'keyup');
Mousetrap.bind(controls[1], function() {if (!keyspressed.includes(2) && (activeLane == 1 || activeLane == 3)) {hitNote(2);keyspressed.push(2);}}, 'keydown');
Mousetrap.bind(controls[1], function() {keyspressed.splice(keyspressed.indexOf(2), 1)}, 'keyup');
Mousetrap.bind(controls[2], function() {if (!keyspressed.includes(3) && (activeLane == 1 || activeLane == 3)) {hitNote(3);keyspressed.push(3);}}, 'keydown');
Mousetrap.bind(controls[2], function() {keyspressed.splice(keyspressed.indexOf(3), 1)}, 'keyup');
Mousetrap.bind(controls[3], function() {if (!keyspressed.includes(4) && (activeLane == 2 || activeLane == 3)) {hitNote(4);keyspressed.push(4);}}, 'keydown');
Mousetrap.bind(controls[3], function() {keyspressed.splice(keyspressed.indexOf(4), 1)}, 'keyup');
Mousetrap.bind(controls[4], function() {if (!keyspressed.includes(5) && (activeLane == 2 || activeLane == 3)) {hitNote(5);keyspressed.push(5);}}, 'keydown');
Mousetrap.bind(controls[4], function() {keyspressed.splice(keyspressed.indexOf(5), 1)}, 'keyup');
Mousetrap.bind(controls[5], function() {if (!keyspressed.includes(6) && (activeLane == 2 || activeLane == 3)) {hitNote(6);keyspressed.push(6);}}, 'keydown');
Mousetrap.bind(controls[5], function() {keyspressed.splice(keyspressed.indexOf(6), 1)}, 'keyup');
Mousetrap.bind(controls[6], function() {if (activeLane != 1 && activeLane != 3) {activeLane = 1}}, "keydown")
Mousetrap.bind(controls[7], function() {if (activeLane != 2 && activeLane != 3) {activeLane = 2}}, "keydown")
}
}

function setColors() {
rcol = document.getElementById("rcol").value
bcol = document.getElementById("bcol").value
pcol = document.getElementById("pcol").value
if ((rcol.length == 4 || rcol.length == 7) &&
(bcol.length == 4 || pcol.length == 7) &&
(bcol.length == 4 || pcol.length == 7)) {
colors[0] = rcol
colors[1] = bcol
colors[2] = pcol
} else {alert('error: your color\'s number after the hex is not 3 digits nor 6 digits long.')}
}

function setFPS(n) {
stop = true
setTimeout(()=>{
stop = false;
startAnimating(n)
}, 50)
}

function switchbostons(arr) {
document.getElementById('rc1').innerHTML = arr[0]
document.getElementById('rc2').innerHTML = arr[1]
document.getElementById('rc3').innerHTML = arr[2]
document.getElementById('bc1').innerHTML = arr[3]
document.getElementById('bc2').innerHTML = arr[4]
document.getElementById('bc3').innerHTML = arr[5]
document.getElementById('lsc1').innerHTML = arr[6]
document.getElementById('lsc2').innerHTML = arr[7]
}

//setInterval(movenotes, 1000/60)
setInterval(updateText, 1000/60)
setInterval(getNotes, 1)
setInterval(getHolds, 1)
setInterval(refreshHitters, 1000/60)