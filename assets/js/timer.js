Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}
const countDownDate = new Date().addHours(1.0003).getTime();
//const countDownDate = new Date().addHours(0.002).getTime();

const myfunc = setInterval(() => {
    const currentTime = new Date().getTime();
    const timeLeft = countDownDate - currentTime;
    const hour = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minute = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const second = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("hour").innerHTML = hour < 10 ? "0" + hour.toString() : hour;
    document.getElementById("minute").innerHTML = minute < 10 ? "0" + minute.toString() : minute;
    document.getElementById("second").innerHTML = second < 10 ? "0" + second.toString() : second;
    if (second < 0) {
        document.getElementById("digit-1").style.backgroundColor = "black";
        document.getElementById("digit-1").value = "";
        window.location.replace("loser.html");
        
    }
}, 1000);