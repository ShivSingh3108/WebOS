 function updateTime(){
         var currentTime = new Date().toLocaleString();
    var timeText = document.querySelector("#timeElement");
     timeText.innerHTML=currentTime;
    }
    setInterval(updateTime,1000);

async function Weather() {
    const weather=document.getElementById("weather");
    try{
        const position = await new Promise((resolve, reject) => {navigator.geolocation.getCurrentPosition(resolve, reject);});
        const latitude=position.coords.latitude;
        const longitude=position.coords.longitude;
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`);
        if (!response.ok) throw new Error("Weather request failed");
        const data=await response.json();
        const temp= Math.round(data.current.temperature_2m);
        const code=data.current.weather_code;
        const condition={
            0:"CLeAr SKyyy",
            1:"MAinLY CleAR",
            2:"ParTY ClouDY",
            3:"CLouDYYY",
            45:"FoGGGGY",
            48:"FoGgY",
            51:"DRizzY (PELIPER SPOTTINGS)",
            53:"DRizzY (PELIPER SPOTTINGS)",
            55:"HeAvY DRizzle (TOO MANY PELIPER)",
            61:"LiGHt RAin",
            63:"RAIN!!!",
            65:"HeAvy rAin",
            80:"RaIn SHowERS",
            81:"rAiN SHoweRS",
            82:"HeAvy ShoWerS",
            95:"THUnDesT0rm",
            96:"THUnDesT0rm",
            99:"THUnDesT0rm"
        };
        weather.textContent=`${temp}\u00B0C . ${condition[code] || "Current weather"}`;
    
    }catch(error){
        weather.textContent="WEatHer UnAvaIlAble";
        console.error(error);
}
    
}
Weather();
setInterval(Weather, 15*60*1000);


dragElement(document.getElementById("window"));
function dragElement(element) {
    var initialX = 0;
    var initialY = 0;
    var currentX = 0;
    var currentY = 0;
    
    if (document.getElementById(element.id + "header")){


        document.getElementById(element.id + "header").onmousedown= startDragging;
    }else{
        element.onmousedown = startDragging;
    }
    function startDragging(e){
        e = e || window.event;
        e.preventDefault();
        initialX = e.clientX;
        initialY = e.clientY;

        document.onmouseup = stopDragging;
        document.onmousemove = dragElement;

    }
      function dragElement(e){
        e = e || window.event;
        e.preventDefault();

        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;

        element.style.top = (element.offsetTop - currentY)  + "px" ;
        element.style.left = (element.offsetLeft - currentX)  + "px" ;
        element.style.transform="none";
    }
      function stopDragging(){
        document.onmouseup = null;
        document.onmousemove = null;

    }
}

var welcomeScreen = document.querySelector("#window")

function closeWindow(element){
    element.style.display="none"
}

function openWindow(element){
    element.style.display = ""
}

var welcomeScreenClose = document.querySelector("#welcomeclose")

var welcomeScreenOpen = document.querySelector("#welcomeopen")

welcomeScreenClose.addEventListener("click",function(){
    closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click",function(){
    openWindow(welcomeScreen);
});
var selectedIcon = undefined

function selectIcon(element){
   element.classList.add("selected");
   selectedIcon = element
}


function deselectIcon(element){
   element.classList.remove("selected");
   selectedIcon = undefined
}
 function handleIconTap(element) {
    if (element.classList.contains("selected")) {
        deselectIcon(element)
        openWindow(document.getElementById("calendar"))
        mycalendar.render();
        mycalendar.updateSize();
    } 
    else {
        selectIcon(element)
    }
 }
 dragElement(document.getElementById("calendar"));

var calendarScreen = document.querySelector("#calendar")

var calendarScreenClose = document.querySelector("#calendarclose")

calendarScreenClose.addEventListener("click", () =>{ mycalendar.gotoDate(new Date()); mycalendar.changeView('dayGridMonth'); closeWindow(calendarScreen)});

var calendarElement =document.querySelector("#calendarBody")

var mycalendar = new FullCalendar.Calendar(calendarElement, {
       initialView:"dayGridMonth"
})
mycalendar.render()

 function handleNoteIconTap(element) {
    if (element.classList.contains("selected")) {
        deselectIcon(element)
        openWindow(document.getElementById("notes"))
    } 
    else {
        selectIcon(element)
    }
 }

dragElement(document.getElementById("notes"));

var notesScreen = document.querySelector("#notes")

var notesScreenClose = document.querySelector("#noteclose")

notesScreenClose.addEventListener("click", () => closeWindow(notesScreen));


function handleTerminalIconTap(element) {
    if (element.classList.contains("selected")) {
        deselectIcon(element)
        openWindow(document.getElementById("terminal"))
    } 
    else {
        selectIcon(element)
    }
 }

dragElement(document.getElementById("terminal"));

var terminalScreen = document.querySelector("#terminal")

var terminalScreenClose = document.querySelector("#terminalclose")

terminalScreenClose.addEventListener("click", () => closeWindow(terminalScreen));

var terminalInput = document.querySelector("#type")

terminalInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        var command = terminalInput.value.trim();

        if (command.toLowerCase() === "help") {
            document.querySelector("#read").innerHTML += "<br>Available commands: <br>- h̶e̷lp̷ : D̷is̸p̶lays tthis h̷helpp m̶e̷ss̸age.<br>- calendar: O̷p̸ens the... c̶a̷l̸endar w̷i̸n̶d̸ow.<br>- notes: O̶p̷ens the n̷o̸t̸es w̶i̷n̸dow.<br>- glitchtv: O̶p̷ens the G̷l̶i̸t̷c̶h TV w̶i̷n̸dow.<br>- gallery : O̷p̸ens the... gallery w̷i̸n̶d̸ow.<br>- weather: D̶i̷spl̸ays the c̷u̸rr̶Ent weather.<br> - time: D̶i̷spl̸ays the c̷u̸rr̶Ent ti̸m̷e.<br>- contact: displays e̷m̷a̷i̷l̷ and G1tHub.<br>- clear: C̷l̶e̸a̷rszzzzz the t̶e̷r̸minal s̷c̶r̸ee̷n.<br>- about: D̶i̸splays info..... about G̷l̶i̸t̷c̶h O̸S̷.<br>- exit: get 0ut̷t̷..... C̷l̸o̶ses the terminal w̷i̸n̶d̸ow.<br>- f̶i̷x:<br> ";
        } else if (command.toLowerCase() === "clear") {
            document.querySelector("#read").innerHTML =     "";
        
        } else if (command.toLowerCase() === "about") {
            document.querySelector("#read").innerHTML += "<br>S̷t̸o̶p w̷a̸s̶t̸i̷n̶g m̸y t̶i̷m̸e... d̷o̸n̶'̷t y̸o̶u s̷e̸e? This is **THE GLITCH OS !!!!**<br>It has: C̷a̸l̶e̷n̸d̶a̸r, N̷o̸t̶e̷s, T̸e̶r̷m̸i̷n̸a̷l and G̷l̶i̸t̷c̶h.......<br>";
        } 
        else if (command.toLowerCase() === "exit") {
            closeWindow(terminalScreen);
        } 
          else if (command.toLowerCase() === "calendar") {
            openWindow(document.getElementById("calendar"));
        }
          else if (command.toLowerCase() === "notes") {
            openWindow(document.getElementById("notes"));
        }   
         else if (command.toLowerCase() === "glitchtv") {
            openWindow(document.getElementById("video"));
        }   
        else if (command.toLowerCase() === "gallery") {
            openWindow(document.getElementById("gallery"));
        }   
        else if (command.toLowerCase() === "weather") {
            document.querySelector("#read").innerHTML += "<br>"+ document.getElementById("weather").textContent + "<br>";
        }
       else if (command.toLowerCase() === "contact") {
            document.querySelector("#read").innerHTML += "<br>Email:<a href='mailto:singhshiv3108@gmail.com'>singhshiv3108@gmail.com</a>"+"<br>"+"Github:<a href='https://github.com?ShivSingh3108' target='_blank'>ShivSingh3108</a><br>";
        }
        else if (command.toLowerCase() === "time") {
            var currenttime = new Date();
            document.querySelector("#read").innerHTML += "<br>Current time: " + currenttime.toLocaleTimeString() +"<br>";
        }
        else if(command.toLowerCase() === "fix") {
            document.querySelector("#read").innerHTML += "<br>HOW DARE YOU!!!!!!<br>I DON'T WANT YOUR FIXING!!!!!<br> > < <br> ^^^^ <br> sorry: to end red";
            terminalScreen.style.background="red"
        }
        else if(command.toLowerCase() === "sorry"){
               terminalScreen.style.background=""
        }
        
        else{
            document.querySelector("#read").innerHTML = "<br>Unknown command: " + command + "<br>";
        }

        terminalInput.value = "";
    }
});
 function handleVideoIconTap(element) {
    if (element.classList.contains("selected")) {
        deselectIcon(element)
        openWindow(document.getElementById("video"))
    } 
    else {
        selectIcon(element)
    }
 }

dragElement(document.getElementById("video"));

var videoScreen = document.querySelector("#video")

var videoScreenClose = document.querySelector("#vidclose")

videoScreenClose.addEventListener("click", () => {currentvideo=0; player.src=`https://www.youtube.com/embed/${video[currentvideo]}`; closeWindow(videoScreen)});

var vidFullscreenButton = document.querySelector("#vidfullscreen");
vidFullscreenButton.addEventListener("click", function() {
    var videoWindow = document.getElementById("video");
    if (videoWindow.style.width === "70%") {
        videoWindow.style.top = "";
        videoWindow.style.left = "";
        videoWindow.style.width = "";
        videoWindow.style.height = "";
        videoScreen.style.borderRadius = "";
        player.style.width="500px";
        player.style.height="250px";
        other.style.height="";
        next.style.height="";
        next.style.width="";
        prev.style.height="";
        prev.style.width="";
        videoFull=false;
        
    } else {
        videoWindow.style.width = "70%";
        videoWindow.style.height = "90%";
        videoScreen.style.borderRadius = "0";
        player.style.width="93%";
        player.style.height="80%";
        other.style.height="10%";
        next.style.height="100%";
        next.style.width="25%";
        prev.style.height="100%";
        prev.style.width="25%";
        next.style.fontSize="50px";
        prev.style.fontSize="50px";
        prev.style.alignItems="right";
        
        videoFull=true;
        
    }
});


terminalScreenClose.addEventListener("click", function() {
    closeWindow(terminalScreen);
    document.getElementById("read").innerHTML = "";
    document.getElementById("type").value = "";


});

calendarScreenClose.addEventListener("click", function() {
    closeWindow(calendarScreen);
    mycalendar.destroy();
    mycalendar.render();
});



var calendarFullscreenButton = document.querySelector("#Calendarfullscreen");
calendarFullscreenButton.addEventListener("click", function() {
    var calendarWindow = document.getElementById("calendar");
    if (calendarWindow.style.width === "100%") {
        calendarWindow.style.top = "";
        calendarWindow.style.left = "";
        calendarWindow.style.width = "";
        calendarWindow.style.height = "";
        calendarScreen.style.borderRadius = "";
        calendarFull=false;
        mycalendar.updateSize();
    } else {
        calendarWindow.style.width = "100%";
        calendarWindow.style.height = "100%";
        calendarScreen.style.borderRadius = "0";
        calendarFull=true;
        mycalendar.updateSize();
    }
});

var notesFullscreenButton = document.querySelector("#notesfullscreen");
notesFullscreenButton.addEventListener("click", function() {
    var notesWindow = document.getElementById("notes");
    if (notesWindow.style.width === "100%") {
        notesWindow.style.top = "";
        notesWindow.style.left = "";
        notesWindow.style.width = "";
        notesWindow.style.height = "";
        notesScreen.style.borderRadius = "";
    } else {
        notesWindow.style.width = "100%";
        notesWindow.style.height = "100%";
        notesScreen.style.borderRadius = "0";
    }
});
var terminalFullscreenButton = document.querySelector("#terminalfullscreen");
terminalFullscreenButton.addEventListener("click", function() {
    var terminalWindow = document.getElementById("terminal");
    if (terminalWindow.style.width === "100%") {
        terminalWindow.style.top = "";
        terminalWindow.style.left = "";
        terminalWindow.style.width = "";
        terminalWindow.style.height = "";
        terminalScreen.style.borderRadius = "";
    }   else {  
        terminalWindow.style.width = "100%";
        terminalWindow.style.height = "100%";
        terminalScreen.style.borderRadius = "0";
    }
});
var calendarMinimizeButton = document.querySelector("#calendarmin");
calendarMinimizeButton.addEventListener("click", function() {
    var calendarWindow = document.getElementById("calendar");   
    {
        calendarScreen.style.display = "none";
    }
});
var notesMinimizeButton = document.querySelector("#notesmin");
notesMinimizeButton.addEventListener("click", function() {
    var notesWindow = document.getElementById("notes"); 
    {
        notesScreen.style.display = "none";
    }
});
var terminalMinimizeButton = document.querySelector("#terminalmin");
terminalMinimizeButton.addEventListener("click", function() {
    var terminalWindow = document.getElementById("terminal");
    {
        terminalScreen.style.display = "none";
    }
});

var videoMinimizeButton = document.querySelector("#vidmin");
videoMinimizeButton.addEventListener("click",function(){
    var videoWindow = document.getElementById("video");
    {
        videoScreen.style.display = "none";
    }
});

const video=[
    "A4qHcD-hiUo",
    "iTHUUjTA-LI",
    "Upw3UjiSjzA"
];

let currentvideo= 0;

const player= document.getElementById("player");
const prev=document.getElementById("prev");
const next=document.getElementById("next");

function showvideo(index){
    currentvideo=(index + video.length) % video.length;

    player.src=`https://www.youtube.com/embed/${video[currentvideo]}`;
}
  
next.addEventListener("click", () => {showvideo(currentvideo + 1);});
prev.addEventListener("click", () => {showvideo(currentvideo - 1);});

 function handleGalleryIconTap(element) {
    if (element.classList.contains("selected")) {
        deselectIcon(element)
        openWindow(document.getElementById("gallery"))
    } 
    else {
        selectIcon(element)
    }
 }

dragElement(document.getElementById("gallery"));

var galleryScreen = document.querySelector("#gallery")

var galleryScreenClose = document.querySelector("#galleryclose")

galleryScreenClose.addEventListener("click", () => closeWindow(galleryScreen));

var galleryFullscreenButton = document.querySelector("#galleryfullscreen");
galleryFullscreenButton.addEventListener("click", function() {
    var galleryWindow = document.getElementById("gallery");
    if (galleryWindow.style.width === "50%") {
        galleryWindow.style.top = "";
        galleryWindow.style.left = "";
        galleryWindow.style.width = "";
        galleryWindow.style.height = "";
        
        galleryScreen.style.borderRadius = "";
    } else {
        galleryWindow.style.width = "50%";
        galleryWindow.style.height = "100%";
        contain.style.height="100%";
        contain.style.width="100%";
       
        galleryScreen.style.borderRadius = "0";
        
    }
});
var galleryMinimizeButton = document.querySelector("#gallerymin");
galleryMinimizeButton.addEventListener("click", function() {
    var galleryWindow = document.getElementById("gallery");   
    {
        galleryScreen.style.display = "none";
    }
});