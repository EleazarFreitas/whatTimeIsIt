import drawingFourTimezones from "./drawingFourTimezones.js";
const fourTimezones = drawingFourTimezones();

async function getRandomTimeAroundTheWorld () {

    let fourTimezonesIndex = 0;
    let fourTimezonesArray = [];

    for(let i = 0; i < fourTimezones.length; i++) {
        
        let randomTimezone = await fetch('http://worldtimeapi.org/api/timezone/' + fourTimezones[fourTimezonesIndex])
        .then(response => response.json())
        .then(json => {

            let getTimezone = [
                json.timezone.split("/"),
                json.datetime.slice(0, 19)
            ];
            fourTimezonesArray.push(getTimezone);
        })
        fourTimezonesIndex++;
    }

    const realTime = fourTimezonesArray[1][1];
    const timezone = fourTimezonesArray[1][0];
    const city = timezone[timezone.length -1].replace("_", " ");
    const date = new Date(realTime);

    const clockRunning = setInterval(

        function time () {

            let hours = date.getHours();
            let mins = date.getMinutes();
            let secs = date.getSeconds();
            
            if (hours < 10) hours = "0" + hours;
            if (mins < 10) mins = "0" + mins;
            if (secs < 10) secs = "0" + secs;

            const fullTime = `${hours} : ${mins} : ${secs}`
            date.setSeconds(secs + 1);

            if (hours < 5 || hours > 18) {
                document.querySelector("html").classList.add("dark-mode");
                document.querySelector("h1").innerHTML = `<i class="fa-solid fa-moon"></i>`;
            }

            document.querySelector("span").innerText = fullTime;
            document.querySelector("p").innerHTML = city;

        }, 1000
    )
}

export default getRandomTimeAroundTheWorld;