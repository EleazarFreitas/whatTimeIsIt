fetch('http://worldtimeapi.org/api/ip/')
.then(function(response) {
        response.json().then(json => {
            const realTime = json.datetime.slice(0, 19);
            const timezone = json.timezone.split("/");
            const city = timezone[timezone.length -1];
            const date = new Date(realTime);
            const clockRunning = setInterval(
                function time () {
                    const hours = date.getHours();
                    const mins = date.getMinutes();
                    const secs = date.getSeconds();
                    const fullTime = `${hours} : ${mins} : ${secs}`
                    date.setSeconds(secs + 1);
                    document.querySelector("span").innerText = fullTime;
                    document.querySelector("p").innerText = city;
                }, 1000
                )
            });
        })
        .catch(function(error) {
            console.log(error);
        }
    );
