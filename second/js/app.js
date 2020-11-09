loadingscreen();

const url = "http://xmlopen.rejseplanen.dk/bin/rest.exe/multiDepartureBoard?id1=851400602&id2=851973402&rttime&format=json&useBus=1";

buildfetch(url);

function buildfetch(url){
    fetch(url)
    .then(res => res.json())
    .then((out) => {
        buildview(out);
    })
    .catch(err => { throw err });
}

function loadingscreen(){
    //main container
    const loadingContainer = document.createElement('div');
    loadingContainer.classList.add('bus-container');

    //loading data
    loadingtext = document.createElement('h2');
    loadingtext.innerText="Loading data";
    loadingContainer.appendChild(loadingtext);
    
    //loading text
    loadingicon = document.createElement('img');
    loadingicon.src="img/loading.svg";
    loadingContainer.appendChild(loadingicon);

    //insætter main til html "post"
    const post = document.getElementById('post');
    post.appendChild(loadingContainer);
}

function buildview(out){
    
    const busContainer = document.createElement('div');
    busContainer.classList.add('bus-container');

    //laver header boxen
    const containerHeader = document.createElement('div');
    containerHeader.classList.add('container-header');

    //laver header billed
    const containerHeaderImg = document.createElement('img');
    containerHeaderImg.src = "test";
    //laver header text
    const containerHeaderText = document.createElement('h2');
    containerHeaderText.innerHTML = "Bus tider";

    //flytter header boxen til mian container
    busContainer.appendChild(containerHeader);

    //flytter header billed og text til header box
    containerHeader.appendChild(containerHeaderImg);
    containerHeader.appendChild(containerHeaderText);

    // laver body boxen
    const containerBody = document.createElement('div');
    containerBody.classList.add('container_body');
    // Looper array
    for(let element of out.MultiDepartureBoard.Departure) {
        // Splitter api dato til et array
        const dateParts = element.date.split('.');
        // Fikser bug med år - sætter 20 foran da det skal være yyyy
        dateParts[2] = 20 + dateParts[2];
        // Splitter api tid til et array
        const timeParts = element.time.split(':');
        // Henter timestamp ud fra api dato format
        const api_time = new Date(dateParts[2], dateParts[1]-1, dateParts[0], timeParts[0], timeParts[1], 0).getTime()/1000;
        // Kontrollerer de to datoer
        //console.log(new Date(currentTime) + "\n" + new Date(api_time*1000));
        // Beregner antal hele minutter
        const minutes = ((api_time - (currentTime/1000))/60).toFixed(0);

        //laver en box til h3'erne 
        const containerContent = document.createElement('div');
        containerContent.classList.add('container-content')

        //laver h3 med line i
        const containerBodyLine = document.createElement('h3');
        containerBodyLine.innerText = element.line;

        //laver h3 med direction i
        const containerBodydirection = document.createElement('h3');
        containerBodydirection.innerText = element.direction;

        //laver h3 med time i
        const containerBodytime = document.createElement('h3');
        containerBodytime.innerText = `${minutes} Min`;

        //flytter alle h3'erne til containerContent
        containerContent.appendChild(containerBodyLine);
        containerContent.appendChild(containerBodydirection);
        containerContent.appendChild(containerBodytime);

        //flytter containerContent med h3 i til body box
        containerBody.appendChild(containerContent);
    
        busContainer.appendChild(containerBody);

        const post = document.getElementById('post');
        post.appendChild(busContainer);
    }
}