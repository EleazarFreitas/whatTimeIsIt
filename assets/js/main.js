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

                const options = {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  };

                let fullDate = date.toLocaleString("pt-BR", options);
    
                let hours = date.getHours();
                let mins = date.getMinutes();
                let secs = date.getSeconds();
                
                if (hours < 10) hours = "0" + hours;
                if (mins < 10) mins = "0" + mins;
                if (secs < 10) secs = "0" + secs;

                const fullTime = `${hours}:${mins}<span class="display-6">:${secs}</span>`;
                date.setSeconds(secs + 1);

                const greetings = document.querySelector(".greetings");
                const body = document.querySelector("body");

                if (hours > 4) {
                    body.classList.add("morning");
                    greetings.innerHTML = `<i class="fa-regular fa-sun"></i> BOM DIA!`;
                } 
                if (hours > 11) {
                    body.classList.add("afternoon");
                    greetings.innerHTML = `<i class="fa-regular fa-sun"></i> BOA TARDE!`;
                    document.querySelector(".am-pm").innerHTML = `PM`;
                }
                if (hours > 18) {
                    body.classList.add("night");
                    greetings.innerHTML = `<i class="fa-solid fa-moon"></i> BOA NOITE!`;
                }
                if (hours >= 0 && hours < 5) {
                    body.classList.add("night");
                    greetings.innerHTML = `<i class="fa-solid fa-moon"></i> BOA MADRUGADA!`;
                }

                document.querySelector("h1").innerHTML = fullTime;
                document.querySelector(".date").innerHTML = fullDate;
                document.querySelector(".city").innerHTML = city;

            }, 1000
            )
        });
    })

    .catch(function(error) {
        console.log(error);
    }
);