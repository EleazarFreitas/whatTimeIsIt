const clockRunning = setInterval (
    function time () {
        fetch('http://worldtimeapi.org/api/ip/')
            .then(function(response) {
                response.json().then(json => {
                    const realTime = json.datetime;
                    const onlyTime = realTime.slice(11, -13);
                    const hour = onlyTime.slice(0, 2);
                    if (hour < 05 && hour > 18) {
                        document.querySelector("html").classList.add("dark-mode")
                        document.querySelector("h1").innerHTML = `<i class="fa-solid fa-moon"></i>`;
                    }
                    document.querySelector("span").innerText = onlyTime;
                });
            })
            .catch(function(error) {
                console.log(error);
                }
            );
    }, 1000
)
