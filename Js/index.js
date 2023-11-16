async function fetchAPIKey() {
    try {
      const response = await fetch(
        "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys",
        {
          method: "POST",
        }
      );
  
      const apiKey = await response.json();
      console.log(apiKey) // printa ut "nyckeln till API.et"
      return(apiKey.key) //här retunerar den nyckeln som vi sen sparar i variabeln apiKey i fetchAPIData

    } catch (error) {
      console.log(error + " error "); // här vill vi att den fångar upp om det skulle uppstå fel och logga ut det i konsolen 
    }
  }



//här använder vi oss av en callback som ska ge oss all information som vi vill komma åt 
async function fetchAPIData(){
  try {
    const apiKey =  await fetchAPIKey();
    const response = await fetch(
      "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies",
      {
        method: "GET",
        headers: {
          "x-zocom": apiKey
        },
      }
    );

//     // await är ett nyckelord "keyword" som pausar funktionen i väntan på en promise tills den fått ett värde att leverera 
//     //metoden kan bara användas inom en async funktion 
    const data = await response.json();  //här konventerar vi datat till data formatet json med hjälp av metoden jason() och sparar in den i data variabeln
    window.solarisData = data.bodies;     //sedan lägger vi hela  planet-data i vår globala variabel window
    showPlanetContentWhenClicking();
  } catch (error) {
    console.log(error);
  }
}

//här säger vi gå in i html och lokalisera alla element med --> <a>  
 // efter att användare gör ett klick på knappen så ska en pop-up ruta visas med all information om planeterna

function showPlanetContentWhenClicking() {
  document.querySelectorAll("a").forEach((planetEl, index) => {
    planetEl.addEventListener("click", () => {
    const planetsContent = document.getElementById("planetsContent");
      const planet = window.solarisData[index]; //här i ligger all data från API.
      console.log(planet);
      if(planet){ // med hjälp av metoden innerHTML lägger vi till nedanstående information i elementet planetsContent i html dokumentet
        planetsContent.innerHTML = `
        <dialog open>
        <button onclick = closeDialogWhenClickingButton()>Close</button>
        <div class = "content">
        <h2>${planet.name}</h2>
        <p class = "content-desc">desc: ${planet.desc}</p>
        <p>Type: ${planet.type}</p>
        <p>id: ${planet.id}</p>
        <p>latinName: ${planet.latinName}</p>
        <p>moons: ${planet.moons.map(
          (moon) => `<br></br><span>${moon}</span>`
        )}</p>
        <p>orbitalPeriod: ${planet.orbitalPeriod}</p>
        <p>rotation: ${planet.rotation}</p>
        <p>temp: Day ${planet.temp.day} &deg</p>
        <p>temp: Night ${planet.temp.night} &deg</p>
        </div>
        <dialog/> 
        
    `;
planetsContent.appendChild(planetsContent)

}
      
    });
  });
}

//här har vi skapat en funktion med två parametrar ( data och name ) för att loopa index för index genom vår array-lista
      

function findObjectByName(data, name) {
  const result = data.bodies;
  for (let i = 0; i < result.length; i++) {
    if (result[i].name === name) {
      return result[i];
    }
  }
  return null;  
}




function closeDialogWhenClickingButton(){
  //här säger vi gå tillbaka till föregående sida när vi klickar på knappen, main-sidan  "index-document"
    window.location.href = "index.html"
  }     




 fetchAPIData();


