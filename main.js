 function updateTime(){
         var currentTime = new Date().toLocaleString();
    var timeText = document.querySelector("#timeElement");
     timeText.innerHTML=currentTime;
    }
    setInterval(updateTime,1000);


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
    } 
    else {
        selectIcon(element)
    }
 }
 dragElement(document.getElementById("calendar"));

var calendarScreen = document.querySelector("#calendar")

var calendarScreenClose = document.querySelector("#calendarclose")

calendarScreenClose.addEventListener("click", () => closeWindow(calendarScreen));

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
            document.querySelector("#read").innerHTML += "Available commands: <br>- h̶e̷lp̷ : D̷is̸p̶lays tthis h̷helpp m̶e̷ss̸age.<br>- calendar: O̷p̸ens the... c̶a̷l̸endar w̷i̸n̶d̸ow.<br>- notes: O̶p̷ens the n̷o̸t̸es w̶i̷n̸dow.<br>- time: D̶i̷spl̸ays the c̷u̸rr̶Ent ti̸m̷e.<br>- clear: C̷l̶e̸a̷rszzzzz the t̶e̷r̸minal s̷c̶r̸ee̷n.<br>- about: D̶i̸splays info..... about G̷l̶i̸t̷c̶h O̸S̷.<br>- exit: get 0ut̷t̷..... C̷l̸o̶ses the terminal w̷i̸n̶d̸ow.<br>- f̶i̷x:<br> ";
        } else if (command.toLowerCase() === "clear") {
            document.querySelector("#read").innerHTML =     "";
        
        } else if (command.toLowerCase() === "about") {
            document.querySelector("#read").innerHTML += "S̷t̸o̶p w̷a̸s̶t̸i̷n̶g m̸y t̶i̷m̸e... d̷o̸n̶'̷t y̸o̶u s̷e̸e? This is **THE GLITCH OS !!!!**<br>It has: C̷a̸l̶e̷n̸d̶a̸r, N̷o̸t̶e̷s, T̸e̶r̷m̸i̷n̸a̷l and G̷l̶i̸t̷c̶h.......<br>";
        } else if (command.toLowerCase() === "exit") {
            closeWindow(terminalScreen);
        } 
          else if (command.toLowerCase() === "calendar") {
            openWindow(document.getElementById("calendar"));
        }
          else if (command.toLowerCase() === "notes") {
            openWindow(document.getElementById("notes"));
        }   
         else if (command.toLowerCase() === "time") {
            var currenttime = new Date();
            document.querySelector("#read").innerHTML += "Current time: " + currenttime.toLocaleTimeString();
        }
         else if(command.toLowerCase() === "fix") {
            document.querySelector("#read").innerHTML += "HOW DARE YOU!!!!!!<br>I DON'T WANT YOUR FIXING!!!!!<br> > < <br> ^^^^ <br> sorry: to end red";
            terminalScreen.style.background="red"
        }
        else if(command.toLowerCase() === "sorry"){
               terminalScreen.style.background=""
        }
        
        else{
            document.querySelector("#read").innerHTML = "Unknown command: " + command;
        }

        terminalInput.value = "";
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


