function getLocalTime () {

    fetch('http://worldtimeapi.org/api/ip/')
    .then(function(response) 
    {
        response.json().then(json => {

            const realTime = json.datetime.slice(0, 19);
            const timezone = json.timezone.split("/");
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
            });
        })

        .catch(function(error) {
            console.log(error);
        }
    );
}

export default getLocalTime;