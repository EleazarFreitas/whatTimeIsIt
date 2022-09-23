fetch('http://worldtimeapi.org/api/ip/')
.then(function(response) 
{
    response.json().then(json => {
    
        const timezone = json.timezone.split("/");
        const realTime = json.datetime.slice(0, 19);
        const city = timezone[timezone.length -1].replace("_", " ");
        const date = new Date(realTime);

        const clockRunning = setInterval(

            function time () {

                const options = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  };

                let fullDate = `<i class="fa-regular fa-calendar"></i> ` + date.toLocaleString("en-US", options);
    
                let hours = date.getHours();
                let mins = date.getMinutes();
                let secs = date.getSeconds();
                
                if (hours < 10) hours = "0" + hours;
                if (mins < 10) mins = "0" + mins;
                if (secs < 10) secs = "0" + secs;

                const fullTime = `${hours}:${mins}<span class="display-6">:${secs}</span>`;
                date.setSeconds(secs + 1);

                const body = document.querySelector("body");
                const greetings = document.querySelector(".greetings");
                const am_pm = document.querySelector(".am-pm");

                if (hours > 18) {
                    body.classList.add("night");
                    greetings.innerHTML = `<i class="fa-solid fa-moon"></i> GOOD EVENING!`;
                    am_pm.innerHTML = `PM`;
                } else if (hours > 11) {
                    body.classList.add("afternoon");
                    greetings.innerHTML = `<i class="fa-regular fa-sun"></i> GOOD AFTERNOON!`;
                    am_pm.innerHTML = `PM`;
                } else if (hours > 4) {
                    body.classList.add("morning");
                    greetings.innerHTML = `<i class="fa-regular fa-sun"></i> GOOD MORNING!`;
                    am_pm.innerHTML = `AM`;
                } else {
                    body.classList.add("night");
                    greetings.innerHTML = `<i class="fa-solid fa-moon"></i> GOOD EVENING!`;
                    am_pm.innerHTML = `AM`;
                }                

                document.querySelector("h1").innerHTML = fullTime;
                document.querySelector(".date").innerHTML = fullDate;
                document.querySelector(".city").innerHTML = `<i class="fa-solid fa-location-dot"></i> ` + city;

            }, 1000
            )
        });
    })

    .catch(function(error) {
        console.log(error);
    }
);