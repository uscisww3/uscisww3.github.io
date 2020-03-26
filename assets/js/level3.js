$(document).ready(function () {
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
        textbox.addEventListener(event, function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}
    var lv3num = document.getElementsByClassName("lv3num");
    for (var i = 0; i < lv3num.length; i++) {
        setInputFilter(lv3num.item(i), function (value) {
            return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
        });
        lv3num.item(i).oninput = function () { myScript(this) };
    }
    var prev = [];
    var numbs = [];
    function myScript(elem){
        i = elem.id;
        const allTds = document.getElements("div.numbank ul li");
        // console.log(prev[i]);
        // console.log(elem.value);
            if (tdItem(allTds,prev[i]) != undefined){
                var index = numbs.indexOf(prev[i]);
                if (index > -1) {
                    numbs.splice(index, 1);
                }
                if (numbs.includes(prev[i])!=true){
                tdItem(allTds, prev[i]).style.display = "list-item";
                }
            }
        if (tdItem(allTds, elem.value) != undefined) {
            numbs.push(elem.value);
            if (tdItem(allTds, elem.value).style.display != "none"){
            tdItem(allTds, elem.value).style.display = "none";
                
            }
        }
        prev[i] = elem.value;
       // console.log(numbs);
    
    }

    function tdItem(allTds,num){
        return Array.from(allTds).find(td => td.textContent == num);
    }
});

