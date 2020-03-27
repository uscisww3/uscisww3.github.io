
$(document).ready(function () {

var page = 1;
document.getElementById("next").onclick = function () { myFunction() };

function myFunction(john) {
    openFullscreen();
    if(page == 1){
    document.getElementById("next").innerHTML = "Continue";
    document.getElementById("next").style.fontSize = "15px";
    document.getElementById("next").style.borderWidth = "5px";
    document.getElementById("bt").style.right = "15px";
    document.getElementById("bt").style.bottom = "15px";
    document.getElementById("bt").style.position = "absolute";
    document.getElementById("tt1").innerHTML = "Level 1";
    document.getElementById("tt2").style.display = "none";
    document.getElementById("intro").style.display = "none";
    document.getElementById("level1").style.display="inline";
    document.getElementById("digit-1").style.display = "inline";
    document.getElementById("l1").style.display = "inline";
    page = 2;
    }else if(page == 2){
        if (document.getElementById("digit-1").value.toUpperCase() == "HAMBURGER"){
            document.getElementById("digit-1").style.backgroundColor = "black";
            document.getElementById("level1").style.display = "none";
            document.getElementById("tt1").innerHTML = "Level 2";
            document.getElementById("l1").style.display = "none";
            document.getElementById("digit-1").value = "";
            document.getElementById("digit-1").style.width = "36ch";
            document.getElementById("digit-1").maxLength = 24;
            document.getElementById("level2").style.display = "inline";
            document.getElementById("rolex").style.display = "inline";
            document.getElementById("l2").style.display = "block";
            page = 3
        }else{
            document.getElementById("digit-1").style.backgroundColor = "red";
        }
    }else if(page == 3){
        if (document.getElementById("digit-1").value.toUpperCase() == "193129212817273019223028"){
            document.getElementById("digit-1").style.backgroundColor = "black";
            document.getElementById("tt1").innerHTML = "Level 3";
            document.getElementById("digit-1").value = "";
            document.getElementById("digit-1").style.width = "7.5ch";
            document.getElementById("digit-1").maxLength = 5;
            document.getElementById("level2").style.display = "none";
            document.getElementById("rolex").style.display = "none";
            document.getElementById("l2").style.display = "none";
            document.getElementById("level3").style.display = "inline";
            page = 4
        } else {
            document.getElementById("digit-1").style.backgroundColor = "red";
        }
    }else if(page == 4){
        if (document.getElementById("digit-1").value.toUpperCase() == "36418") {
            document.getElementById("digit-1").style.backgroundColor = "black";
            document.getElementById("tt1").innerHTML = "Level 4";
            document.getElementById("digit-1").value = "";
            document.getElementById("digit-1").style.width = "7.5ch";
            document.getElementById("digit-1").maxLength = 5;
            document.getElementById("level3").style.display = "none";
            document.getElementById("level4").style.display = "inline";
            page = 5
        } else {
            document.getElementById("digit-1").style.backgroundColor = "red";
        }
    }else if(page == 5){
        if (document.getElementById("digit-1").value.toUpperCase() == "93412") {

            document.getElementById("digit-1").style.backgroundColor = "black";
            document.getElementById("digit-1").value = "";
            window.location.replace("winner.html?seconds=" + document.getElementById("second").innerHTML + "&minutes=" + document.getElementById("minute").innerHTML);
            page = 6
        } else {
            document.getElementById("digit-1").style.backgroundColor = "red";
        }

    }
}
    document.getElementById("close").onclick = function () { myRunction() };

    function myRunction() {
        document.getElementById("rolex").style.display = "none";
    }

    var elem = document.documentElement;
    function openFullscreen() {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    }
});

