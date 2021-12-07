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
var sboffset = 3590
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

function startAnimating(fpsa) {
    fpsInterval = 1000 / fpsa;
    then = Date.now();
    startTime = then;
    //console.log(startTime);
    animate();
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

var mods = [false, false, false, false, false];
//autokeys, autoswitch, 4key, true perfect, no long notes

var botslop = 0


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
	moveholds();
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
if (activeLane!=3) {
document.getElementById("blackcoverlane"+activeLane).style.display = "none"
document.getElementById("blackcoverlane"+reverse12(activeLane)).style.display = "inline"
} else {
document.getElementById("blackcoverlane1").style.display = "none"
document.getElementById("blackcoverlane2").style.display = "none"
}
document.getElementById("score").innerHTML = paddy(score, 6) + "<br>" + (isNaN(score2/(notecount*3)) ? "0.00" : (score2/(notecount*3)*100).toFixed(2)) + "%<br>" + getGrade(score2/(notecount*3)*100) + "<br>" + getClearStatus()
document.getElementById("combotext").innerHTML = combo > 0 ? `<b>${combo}</b>` : ""

document.getElementById("judgetrueperfect").style.height = (5*scrollspeed)/timeHarsh + "px";
document.getElementById("judgeperfect").style.height = (5*scrollspeed)/timeHarsh + "px";
document.getElementById("judgegreat").style.height = (15*scrollspeed)/timeHarsh + "px";
document.getElementById("judgegood").style.height = (15*scrollspeed)/timeHarsh + "px";
document.getElementById("judgemiss").style.height = (15*scrollspeed)/timeHarsh + "px";

document.getElementById("trueperfectcount").innerHTML = (mods[3]) ? ("<span style='color:rgb(255,128,0)'>true perfect: </span>" + jg[4]) : ""
document.getElementById("perfectcount").innerHTML = jg[0]
document.getElementById("greatcount").innerHTML = jg[1]
document.getElementById("goodcount").innerHTML = jg[2]
document.getElementById("misscount").innerHTML = jg[3]

document.getElementById("trueperfectth").innerHTML = (10/timeHarsh).toFixed(2) + "ms"
document.getElementById("perfectth").innerHTML = (20/timeHarsh).toFixed(2) + "ms"
document.getElementById("greatth").innerHTML = (50/timeHarsh).toFixed(2) + "ms"
document.getElementById("goodth").innerHTML = (80/timeHarsh).toFixed(2) + "ms"
document.getElementById("missth").innerHTML = (110/timeHarsh).toFixed(2) + "ms"
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
if (oldActive == 3) oldActive = 1
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
		case 5:
		document.getElementById("judgetext").innerHTML = "true perfect :O"
		document.getElementById("judgetext").style.color = "rgba(255, 128, 0, 128)"
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


function movenotes() {
if (document.getElementsByClassName("note").length > 0) {
for (i = 0; i < document.getElementsByClassName("note").length; i++) {
h = document.getElementsByClassName("note")
	h[i].style.top = (parseFloat(h[i].style.top) - (((1000/fps)/8)*scrollspeed)) + "px"
	if((parseFloat(h[i].style.top)-98) <= (-55*scrollspeed)/timeHarsh) {h[i].remove();score-=25;notecount++;combo=0;jd(4);if(calibrating){sboffset=Math.floor(((Date.now()-bostontime)*scrollspeed)-110);document.getElementById("oc").value=sboffset;calibrating=false;}}
	else if((parseFloat(h[i].style.top)) <= (Math.floor(((Math.random() - 0.25) * botslop) + 98)) && (mods[0] || mods[2])) {
		let key = controls[parseInt(h[i].classList[1].charAt(1))-1]
		if ((mods[2] && (h[i].classList[1].charAt(1)=='1' || h[i].classList[1].charAt(1)=='6') || mods[0])) {Mousetrap.trigger(key, 'keydown')}
		if (h[i] != undefined) {setTimeout(()=>{Mousetrap.trigger(key, 'keyup')}, 50)
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

class holdnotes {
	constructor() {
		this.notes = []
	}
}

var holdnotesc = new holdnotes()

class holdnote {
	constructor(lane, beats, id) {
	this.lane = lane
	this.beats = beats
	this.id = id
	this.span = new DOMParser().parseFromString(`<span id="holdnote${id}" class="sn${lane} h${lane} hold snote ${lane<=3 ? 'rednote' : 'bluenote'}" style="border: 2px solid ${lane<=3 ? '#FF0000' : '#0080FF'}; width:50px; height: ${(125*beats*scrollspeed)/((bpma*speedrate)/60)}px; position:absolute; left:${((lane-1)*54)+8}px; top:500px; z-index:7; background-color:${lane<=3 ? '#800000' : '#004080'};"></span>`, "text/html")
	this.beingheld = false
	this.canhold = true
	this.keysjusthit = [false, false, false, false, false, false]
	this.keysholding = [false, false, false, false, false, false]
	this.i = 0
	this.point;
	this.keypoint = 98
	this.gone = false
	this.notesbefore = false
	this.notesbefore2 = false
	this.hitprevent = false
	this.one;
	this.two;
	this.init()
	}
	move() {
		if(!this.beingheld && document.getElementById(`holdnote${this.id}`) != undefined) {
			document.getElementById(`holdnote${this.id}`).style.top = (parseFloat(document.getElementById(`holdnote${this.id}`).style.top) - (((1000/fps)/8)*scrollspeed)) + 'px'
			if (parseFloat(document.getElementById(`holdnote${this.id}`).style.top)-98 <= (-55*scrollspeed)/timeHarsh) {
			this.gone = true	
			document.getElementById(`holdnote${this.id}`).remove()
			score-=25
			notecount++
			combo=0
			jd(4)
			holdnotesc.notes[this.id-1] = undefined
			}
		}
		if (this.beingheld) {
			//console.log('a')
			if (keyspressed.includes(this.lane)) {
			if (parseFloat(document.getElementById(`holdnote${this.id}`).style.height) > 0) {
			document.getElementById(`holdnote${this.id}`).style.height = Math.max(parseFloat(document.getElementById(`holdnote${this.id}`).style.height) - (((1000/fps)/8)*scrollspeed), 0) + 'px'
			} else {
			this.gone = true
			document.getElementById(`holdnote${this.id}`).remove()
			score+=150
			score2+=3
			notecount++
			combo++
			jd(1)
			holdnotesc.notes[this.id-1] = undefined
			}
			} else {
			/*this.canhold = false
			this.beingheld = false*/
			this.point = parseFloat(document.getElementById(`holdnote${this.id}`).style.height)
			this.keypoint = 0
			if (this.point-this.keypoint <= (10*scrollspeed)/timeHarsh && this.point-this.keypoint >= (-10*scrollspeed)/timeHarsh) {score+=150;score2+=3;notecount++;combo++;jd(1);}
			else if (this.point-this.keypoint <= (25*scrollspeed)/timeHarsh && this.point-this.keypoint >= (-25*scrollspeed)/timeHarsh) {score+=100;score2+=2;notecount++;combo++;jd(2);}
			else if (this.point-this.keypoint <= (40*scrollspeed)/timeHarsh && this.point-this.keypoint >= (-40*scrollspeed)/timeHarsh) {score+=50;score2+=1;notecount++;combo++;jd(3);}
			else /*if (this.point-this.keypoint <= (55*scrollspeed)/timeHarsh && this.point-this.keypoint >= (-55*scrollspeed)/timeHarsh)*/ {score-=25;notecount++;combo=0;jd(4);}
			this.gone=true;document.getElementById(`holdnote${this.id}`).remove();holdnotesc.notes[this.id-1] = undefined
			}
		}
	}
	hit(n) {
	this.notesbefore2 = false
	if (document.getElementsByClassName(`sn${n}`).length > 1) {
	for (this.i = 0; this.i < document.getElementsByClassName(`sn${n}`).length; this.i++) {
	//if (document.getElementsByClassName("snote")[i] != undefined && document.getElementById(`holdnote${this.id}`) != undefined) {
	this.one = parseFloat(document.getElementsByClassName(`sn${n}`)[this.i].style.top)
	this.two = parseFloat(document.getElementById(`holdnote${this.id}`).style.top)
	if (this.one < this.two) {this.notesbefore2 = true}
	//console.log(this.one)
	//console.log(this.two)
	//}
	}
	}
	this.notesbefore = this.notesbefore2
	//console.log(this.notesbefore)
		if ((this.canhold && n == this.lane) && !this.notesbefore && !this.hitprevent) {
		//console.log("u press " + n)
		this.point = parseFloat(document.getElementById(`holdnote${this.id}`).style.top)
		this.keypoint = 98
		if (this.point-this.keypoint <= (10*scrollspeed)/timeHarsh && this.point-this.keypoint >= (-10*scrollspeed)/timeHarsh) {score+=150;score2+=3;notecount++;combo++;jd(1);}
		else if (this.point-this.keypoint <= (25*scrollspeed)/timeHarsh && this.point-this.keypoint >= (-25*scrollspeed)/timeHarsh) {score+=100;score2+=2;notecount++;combo++;jd(2);}
		else if (this.point-this.keypoint <= (40*scrollspeed)/timeHarsh && this.point-this.keypoint >= (-40*scrollspeed)/timeHarsh) {score+=50;score2+=1;notecount++;combo++;jd(3);}
		else if (this.point-this.keypoint <= (55*scrollspeed)/timeHarsh && this.point-this.keypoint >= (-55*scrollspeed)/timeHarsh) {score-=25;notecount++;combo=0;jd(4);this.gone=true;document.getElementById(`holdnote${this.id}`).remove();holdnotesc.notes[this.id-1] = undefined}
		if (this.point-this.keypoint <= (55*scrollspeed)/timeHarsh && this.point-this.keypoint >= (-55*scrollspeed)/timeHarsh) {
		this.beingheld = true
		}
		}
	this.hitprevent = false
	}
	unhit(n) {
		if (this.canhold && n == this.lane) {
		//console.log("u unpress " + n)
		}
	}

	init() {
	window.requestAnimationFrame(()=>{
	if(document.getElementById(`holdnote${this.id}`) != undefined) {
	for (this.i = 0; this.i <= 5; this.i++) {
	if (keyspressed.includes(this.i+1) && !this.keysjusthit[this.i] && !this.keysholding[this.i]) {
	this.keysjusthit[this.i] = true;
	//this.hit(this.i+1)
	}
	if (this.keysjusthit[this.i]) {
	this.keysjusthit[this.i] = false
	this.keysholding[this.i] = true
	}
	if (!keyspressed.includes(this.i+1) && this.keysholding[this.i]) {
	this.keysholding[this.i] = false
	this.unhit(this.i+1)
	}
	}
	//this.move()
	this.init()
	}
	})
	}
}


function moveholds() {
if (holdnotesc.notes.length > 0) {
for (i = 0; i < holdnotesc.notes.length; i++) {
if (holdnotesc.notes[i] != undefined) {
if (!holdnotesc.notes[i].gone) {
holdnotesc.notes[i].move()
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
if (holdnotesc.notes.length > 0) {
for (i = 0; i < holdnotesc.notes.length; i++) {
if (holdnotesc.notes[i] != undefined) {
if (!holdnotesc.notes[i].gone) {
holdnotesc.notes[i].hit(n)
}
}
}
}
if (document.getElementsByClassName('note')[0] != undefined) {
if (document.getElementsByClassName(`n${n}`)[0] != undefined) {
let point = parseFloat(document.getElementsByClassName(`n${n}`)[0].style.top)
let keypoint = 98
if ((point-keypoint <= (5*scrollspeed)/timeHarsh && point-keypoint >= (-5*scrollspeed)/timeHarsh) && mods[3]) {score+=165;score2+=3.3;notecount++;combo++;jd(5);}
else if (point-keypoint <= (10*scrollspeed)/timeHarsh && point-keypoint >= (-10*scrollspeed)/timeHarsh) {score+=150;score2+=3;notecount++;combo++;jd(1);}
else if (point-keypoint <= (25*scrollspeed)/timeHarsh && point-keypoint >= (-25*scrollspeed)/timeHarsh) {score+=100;score2+=2;notecount++;combo++;jd(2);}
else if (point-keypoint <= (40*scrollspeed)/timeHarsh && point-keypoint >= (-40*scrollspeed)/timeHarsh) {score+=50;score2+=1;notecount++;combo++;jd(3);}
else if (point-keypoint <= (55*scrollspeed)/timeHarsh && point-keypoint >= (-55*scrollspeed)/timeHarsh) {score-=25;notecount++;combo=0;jd(4);}
if (point-keypoint <= (55*scrollspeed)/timeHarsh && point-keypoint >= (-55*scrollspeed)/timeHarsh) {document.getElementsByClassName(`n${n}`)[0].remove()
/*if (holdnotesc.notes.length > 0) {
for (i = 0; i < holdnotesc.notes.length; i++) {
if (holdnotesc.notes[i] != undefined) {
if (!holdnotesc.notes[i].gone) {
if (holdnotesc.notes[i].lane == n) {holdnotesc.notes[i].hitprevent = true}
break;
}
}
}
}*/
}
//console.log(point-keypoint)
}
}
}

//I CANT FUCKING FIX LONG NOTES ITS BEEN TWO DAYS
/*
function hitHold(n) {
if (document.getElementsByClassName('hold')[0] != undefined) {
if (document.getElementsByClassName(`h${n}`)[0] != undefined) {
if (document.getElementsByClassName(`h${n}`)[0].canhold == undefined) {
let canholdafter = false
let point = parseFloat(document.getElementsByClassName(`h${n}`)[0].style.top)
let keypoint = 98
if (point-keypoint <= (10*scrollspeed)/timeHarsh && point-keypoint >= (-10*scrollspeed)/timeHarsh) {score+=150;score2+=3;notecount++;combo++;jd(1);canholdafter=true;}
else if (point-keypoint <= (25*scrollspeed)/timeHarsh && point-keypoint >= (-25*scrollspeed)/timeHarsh) {score+=100;score2+=2;notecount++;combo++;jd(2);canholdafter=true;}
else if (point-keypoint <= (40*scrollspeed)/timeHarsh && point-keypoint >= (-40*scrollspeed)/timeHarsh) {score+=50;score2+=1;notecount++;combo++;jd(3);canholdafter=true;}
else if (point-keypoint <= (55*scrollspeed)/timeHarsh && point-keypoint >= (-55*scrollspeed)/timeHarsh) {score-=25;notecount++;combo=0;jd(4);document.getElementsByClassName(`h${n}`)[0].remove()}
//if (point-keypoint <= (55*scrollspeed)/timeHarsh && point-keypoint >= (-55*scrollspeed)/timeHarsh) document.getElementsByClassName(`h${n}`)[0].remove()
//console.log(point-keypoint)
if (canholdafter) {
document.getElementsByClassName(`h${n}`)[0].beingheld = true
holdingNotes(document.getElementsByClassName(`h${n}`)[0])
}
}
}
}
hitNote(n)
}

function holdingNotes(a) {
if (a.beingheld) {
window.requestAnimationFrame(()=>{
if (keyspressed.includes(parseInt(a.classList[0].charAt(1)))) {
//console.log(keyspressed)	
if (parseFloat(a.style.height) > 0) {
a.style.height = Math.max((parseFloat(a.style.height) - ((125/fps)*1)), 0) + "px";
holdingNotes(a)
} else {
score+=150;score2+=3;notecount++;combo++;jd(1);
a.remove();
}
} else {
a.beingheld = false
a.canhold = false
}
})
}
}
*/


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
else if (notes[readpos] == undefined) {setTimeout(()=>{audio.pause(); document.getElementById("playblocker").style.display = "none"; chartstart = false; holdnotesc.notes = []}, 3540); clearInterval(inter);}
readpos++;
}, (60/bpm)*1000)
}
}

function summonNote(num) {
bostontime = Date.now();
	switch(num) {
		case 1:
		document.getElementById("redlane1").innerHTML += `<span class='sn1 n1 note snote rednote' style="border: 2px solid #FF0000; width:50px; height:10px; position:absolute; left:8px; top:500px; z-index:7; background-color: #800000;"></span>`
        break;
		case 2:
		document.getElementById("redlane1").innerHTML += `<span class='sn2 n2 note snote rednote' style="border: 2px solid #FF0000; width:50px; height:10px; position:absolute; left:62px; top:500px; z-index:7; background-color: #800000;"></span>`
        break;
		case 3:
		document.getElementById("redlane1").innerHTML += `<span class='sn3 n3 note snote rednote' style="border: 2px solid #FF0000; width:50px; height:10px; position:absolute; left:116px; top:500px; z-index:7; background-color: #800000;"></span>`
        break;
		case 4:
		document.getElementById("redlane1").innerHTML += `<span class='sn4 n4 note snote bluenote' style="border: 2px solid #0080FF; width:50px; height:10px; position:absolute; left:170px; top:500px; z-index:7; background-color: #004080;"></span>`
        break;
		case 5:
		document.getElementById("redlane1").innerHTML += `<span class='sn5 n5 note snote bluenote' style="border: 2px solid #0080FF; width:50px; height:10px; position:absolute; left:224px; top:500px; z-index:7; background-color: #004080;"></span>`
        break;
		case 6:
		document.getElementById("redlane1").innerHTML += `<span class='sn6 n6 note snote bluenote' style="border: 2px solid #0080FF; width:50px; height:10px; position:absolute; left:278px; top:500px; z-index:7; background-color: #004080;"></span>`
        break;
	} 
}

function summonHold(num, beats) {
	/*switch(num) {
		case 1:
		document.getElementById("redlane1").innerHTML += `<span class='h1 hold snote rednote' style="border: 2px solid #FF0000; width:50px; height:` + (125*beats*scrollspeed)/(bpma/60) + `px; position:absolute; left:8px; top:500px; z-index:7; background-color: #800000;"></span>`
        break;
		case 2:
		document.getElementById("redlane1").innerHTML += `<span class='h2 hold snote rednote' style="border: 2px solid #FF0000; width:50px; height:` + (125*beats*scrollspeed)/(bpma/60) + `px; position:absolute; left:62px; top:500px; z-index:7; background-color: #800000;"></span>`
        break;
		case 3:
		document.getElementById("redlane1").innerHTML += `<span class='h3 hold snote rednote' style="border: 2px solid #FF0000; width:50px; height:` + (125*beats*scrollspeed)/(bpma/60) + `px; position:absolute; left:116px; top:500px; z-index:7; background-color: #800000;"></span>`
        break;
		case 4:
		document.getElementById("redlane1").innerHTML += `<span class='h4 hold snote bluenote' style="border: 2px solid #0080FF; width:50px; height:` + (125*beats*scrollspeed)/(bpma/60) + `px; position:absolute; left:170px; top:500px; z-index:7; background-color: #004080;"></span>`
        break;
		case 5:
		document.getElementById("redlane1").innerHTML += `<span class='h5 hold snote bluenote' style="border: 2px solid #0080FF; width:50px; height:` + (125*beats*scrollspeed)/(bpma/60) + `px; position:absolute; left:224px; top:500px; z-index:7; background-color: #004080;"></span>`
        break;
		case 6:
		document.getElementById("redlane1").innerHTML += `<span class='h6 hold snote bluenote' style="border: 2px solid #0080FF; width:50px; height:` + (125*beats*scrollspeed)/(bpma/60) + `px; position:absolute; left:278px; top:500px; z-index:7; background-color: #004080;"></span>`
        break;
	}*/
	//document.getElementById("redlane1").innerHTML += `<span class="h${num} hold snote ${num<=3 ? 'rednote' : 'bluenote'}" style="border: 2px solid ${num<=3 ? '#FF0000' : '#0080FF'}; width:50px; height: ${(125*beats*scrollspeed)/(bpma/60)}px; position:absolute; left:${((num-1)*54)+8}px; top:500px; z-index:7; background-color:${num<=3 ? '#800000' : '#004080'};"></span>`
	holdnotesc.notes.push(new holdnote(num, beats, holdnotesc.notes.length-1))
	document.getElementById("redlane1").innerHTML += holdnotesc.notes[holdnotesc.notes.length-1].span.firstChild.outerHTML
}

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

function setFPS(n) {
stop = true
setTimeout(()=>{
stop = false;
startAnimating(n)
}, 50)
}

//setInterval(movenotes, 1000/60)
setInterval(updateText, 1000/60)
setInterval(getNotes, 1)
setInterval(getHolds, 1)