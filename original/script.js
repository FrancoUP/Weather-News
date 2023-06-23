const search = document.querySelector(".search-bar");
const cont = document.querySelector(".container");
const searchBtn = document.querySelector(".btn-search");
const list = document.querySelector(".lista");
const box1 = document.querySelector(".box-1");
const box2 = document.querySelector(".box-2");
const box3 = document.querySelector(".box-3");
const box4 = document.querySelector(".box-4");
const box5 = document.querySelector(".box-5");
const box6 = document.querySelector(".box-6");
const box7 = document.querySelector(".box-7");
const box8 = document.querySelector(".box-8");
const box9 = document.querySelector(".box-9");
const box10 = document.querySelector(".box-10");
const box11 = document.querySelector(".box-11");
const img = document.querySelector(".immagine");
const nomi = document.querySelectorAll(".nomiCitta");
const wow = document.querySelectorAll(".w");
const boxBox1 = document.querySelector(".box-box-1");
const boxBox3 = document.querySelector(".box-box-3");
const prev = document.querySelector(".preview");
const im2 = document.querySelector(".im2");
const anchor2 = document.querySelector(".a2");
const im3 = document.querySelector(".im3");
const anchor3 = document.querySelector(".a3");
const im4 = document.querySelector(".im4");
const anchor4 = document.querySelector(".a4");
const im1 = document.querySelector(".im1");
const anchor1 = document.querySelector(".a1");
const tite = document.querySelector(".tite");
const b1 = document.querySelector(".b1");
const b2 = document.querySelector(".b2");
const b3 = document.querySelector(".b3");
const b4 = document.querySelector(".b4");
const cli = document.querySelector(".cli");
let arrCities;

async function fetchCity(luogo = "london"){
  try{
    const cities = await fetch(`https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${luogo}&apiKey=RVVfMjA5ZDA0ODhlODQ4NGNlZWE0YmMzZDQwNTMxOTk5ZGI6OWZhNGVhNzYtMWU4Yy00MWJjLThhMDUtOTRkZjBmY2NkZDEx`);

    // console.log(cities.ok);

    if(!cities.ok) throw new Error("Errore erroino in fetchCity");

    return await cities.json();
  } catch(err) {
    renderError(err.message); 
  }
}

async function fetchWeather(lat,long){
  try{
    const london = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${long}?key=T9DALLNFH7FGEDSUE4BE2SRG4`);

    if(!london.ok) throw new Error("Errore erroino in fetchWeather");

    return await london.json();
  } catch(err) {
    renderError(err.message);
  }
}

async function fetchNews(){
  try{
   const fet = await fetch("https://gnews.io/api/v4/search?q=example&apikey=23893c2c23ff740369a1fb22362320b9");
   if(!fet.ok) throw new Error("Errore erroino in fetchNews");

  return await fet.json();
  } catch(err) {
   renderError(err.message);
  }
}

function intervallo(){
  const now =  new Date();
  const day = `${now.getDate()}`.padStart(2, 0);
  const month = `${now.getMonth() + 1}`.padStart(2, 0);
  const year = now.getFullYear();
  const hour = `${now.getHours()}`.padStart(2, 0);
  const min = `${now.getMinutes()}`.padStart(2, 0);
  const sec = `${now.getSeconds()}`.padStart(2, 0);
  box11.textContent =  `${day}-${month}-${year} ${hour}:${min}:${sec}`;
}

async function daysWeatherBar(index, pos){

  const citiesJson = await fetchCity(pos);
  if(!citiesJson) throw new Error("Errore erroino in fetchCity");
  const {latitude, longitude} = citiesJson.locations[index].referencePosition;

  const tempo = await fetchWeather(latitude,longitude);
  if(!tempo) throw new Error("in fetchWeather");

  tempo.days.forEach( (e,i) => {
    const html = `
    <div class="giorno">
      <div class="day${i}"></div>
    </div>
    <div class="icona">
      <img class="icona-img${i}">
    </div>
    <div class="temperatura">
      <div class="min${i}"></div>
      <div class="max${i}" style="font-weight: bold;"></div>
    </div>`;

  wow[i].insertAdjacentHTML("afterbegin", html);

  const d = new Date(e.datetime);

  if(i === 0) document.querySelector(`.day${i}`).textContent = "Today";
  else document.querySelector(`.day${i}`).textContent = `${d.toLocaleDateString('en-UK', { weekday: 'short' })} ${e.datetime.split("").slice(-2).join("")}`;

  document.querySelector(`.min${i}`).textContent = `${Math.round((e.tempmin - 32) * (5 / 9))}°`;
  document.querySelector(`.max${i}`).textContent = `${Math.round((e.tempmax - 32) * (5 / 9))}°`;
  

  const t = +`${Math.round((e.temp - 32) * (5 / 9))}`;
  if(t > 0) {
    if(e.precipprob >= 70) document.querySelector(`.icona-img${i}`).setAttribute("src", "icons/i5.png");
    else if(e.precipprob >= 40) document.querySelector(`.icona-img${i}`).setAttribute("src", "icons/i2.png");
    else document.querySelector(`.icona-img${i}`).setAttribute("src", "icons/i1.png");   
  } else {
    if(e.precipprob >= 70) document.querySelector(`.icona-img${i}`).setAttribute("src", "icons/i6.png");
    else if(e.precipprob >= 40) document.querySelector(`.icona-img${i}`).setAttribute("src", "icons/i7.png");
    else document.querySelector(`.icona-img${i}`).setAttribute("src", "icons/i1.png");
  }
  document.querySelector(`.icona-img${i}`).style.width = "45px";
  document.querySelector(`.icona-img${i}`).style.height = "45px";
  document.querySelector(`.min${i}`).style.color = "blue";
  document.querySelector(`.max${i}`).style.color = "red";
  })
}

async function defaultPosition(){
  try {
    
   const citiesJson = await fetchCity();
   if(!citiesJson) throw new Error("Errore erroino in fetchCity");
   const {latitude, longitude} = citiesJson.locations[0].referencePosition;
   
   const tempo = await fetchWeather(latitude,longitude);
   if(!tempo) throw new Error("Errore erroino in fetchWeather");
   const {temp} = tempo.currentConditions;
    
      box1.textContent = `${citiesJson.locations[0].address.state}, ${citiesJson.locations[0].address.countryName}`;
      box2.textContent = `${citiesJson.locations[0].address.city}`;
      box3.textContent = `${((temp - 32) * (5 / 9)).toFixed(1)}°`;
      box10.textContent = `feelslike ${((tempo.currentConditions.feelslike - 32) * (5 / 9)).toFixed(1)}°`;
      box4.textContent = `humidity ${tempo.currentConditions.humidity}%`;
      box5.textContent = `wind speed ${(tempo.currentConditions.windspeed * 1.609344).toFixed(1)} km/h`;
      box6.textContent = `rain fall ${tempo.currentConditions.precip} ml`;
      box7.textContent = `cloudcover ${tempo.currentConditions.cloudcover}%`;
      box8.textContent = `sunrise ${tempo.currentConditions.sunrise}`;
      box9.textContent = `sunset ${tempo.currentConditions.sunset}`;

      setInterval(intervallo, 10);
      daysWeatherBar(0,"london");


      imgSelection(tempo);
    } catch(err) {
       console.log(err.message);
    }
}

defaultPosition();

async function addHTML() {
  try{
    const citiesJson = await fetchCity(search.value);
    if(!citiesJson) throw new Error("Errore erroino in fetchCity");
    arrCities = citiesJson.locations.map( (e) => `${e.formattedAddress}, ${e.address.state}, ${e.address.countryName}`);
    arrCities.forEach( (e,i) => {
    const html = `<div class="nomiCitta"><div class="tes" placeholder="${i}">${e}</div></div>`;
    list.insertAdjacentHTML("beforeend", html);
  })
  } catch(err){
     console.log(err.message);
  } 
}

async function imgSelection(tem){
  boxBox1.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
  boxBox3.style.backgroundColor = "rgba(0, 0, 0, 0.2)";

  const giorno = +tem.currentConditions.sunrise.split("").slice(0,2).join("");
  const notte = +tem.currentConditions.sunset.split("").slice(0,2).join("");
  const data = +tem.currentConditions.datetime.split("").slice(0,2).join("");
  const temperatura = +((tem.currentConditions.temp - 32) * (5 / 9));

  if(tem.currentConditions.cloudcover > 70){
    
  if(temperatura > 0){
    if(data > giorno && data < notte){
    cont.style.backgroundImage = "url('img/cloudy10.jpg')";
    } else {
    cont.style.backgroundImage = "url('img/nightRain.jpg')"; 
    } 
  } else {
    if(data > giorno && data < notte){
      cont.style.backgroundImage = "url('img/snowingday.jpg')";
      boxBox1.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      boxBox3.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      } else {
      cont.style.backgroundImage = "url('img/snowingnight.jpg')"; 
      }
  }
    
  } else if (tem.currentConditions.cloudcover > 30){
    cont.style.backgroundImage = "url('img/partial.jpg')"; 
    if(data < giorno || data > notte) cont.style.backgroundImage = "url('img/night1.jpg')"; 
  } else {
    cont.style.backgroundImage = "url('img/sky.webp')";
    if(data < giorno || data > notte) cont.style.backgroundImage = "url('img/night1.jpg')"; 
  }
}


async function main(e){
  try{
  
  
  list.classList.remove("hidden");
  const index = e.target.getAttribute("placeholder");

  const citiesJson = await fetchCity(search.value);
  if(!citiesJson) throw new Error("Errore erroino in fetchCity");
  const {latitude, longitude} = citiesJson.locations[index].referencePosition;

  const tempo = await fetchWeather(latitude,longitude);
  if(!tempo) throw new Error("in fetchWeather");
  const {temp} = tempo.currentConditions;

  const country = [...`${citiesJson.locations[index].address.state}, ${citiesJson.locations[index].address.countryName}`];
  if(country.length < 22) {
    box1.textContent = country.join(""); 
  } else {
    country.length = 22;
    box1.textContent = country.join("") + "...";
  }

  const city = [...citiesJson.locations[index].address.city];
  if(city.length < 22) {
    box2.textContent = city.join("");
  } else {
    city.length = 22;
    box2.textContent = city.join("") + "...";
  }
  
  box3.textContent = `${((temp - 32) * (5 / 9)).toFixed(1)}°`;
  box10.textContent = `feelslike ${((tempo.currentConditions.feelslike - 32) * (5 / 9)).toFixed(1)}°`;
  box4.textContent = `humidity ${tempo.currentConditions.humidity}%`;
  box5.textContent = `wind speed ${(tempo.currentConditions.windspeed * 1.609344).toFixed(1)} km/h`;
  box6.textContent = `rain fall ${tempo.currentConditions.precip} ml`;
  box7.textContent = `cloudcover ${tempo.currentConditions.cloudcover}%`;
  box8.textContent = `sunrise ${tempo.currentConditions.sunrise}`;
  box9.textContent = `sunset ${tempo.currentConditions.sunset}`;

  setInterval(intervallo, 10);

  imgSelection(tempo);

  daysWeatherBar(index, search.value);

  list.innerHTML = '';
  arrCities.length = 0;
  search.value = `${citiesJson.locations[index].address.city}, ${citiesJson.locations[index].address.state}, ${citiesJson.locations[index].address.countryName}`;
  } catch(err) {
    console.log(err.message);
  } 
}


search.addEventListener("input", function(){
  list.innerHTML = '';
  list.classList.remove("hidden");
  
});


list.addEventListener("click",function(e) {
   wow.forEach( (_,i) => {
    wow[i].innerHTML = "";
   })
   
   main(e);
});

search.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    addHTML(search.value);
    list.classList.add("hidden");
  }
})


cli.addEventListener("click",function(e){
  const pressed = e.target.getAttribute("class");
  // console.log(pressed);
  // console.log(pressed === "btn-search");
  if(pressed === "btn-search") {
    addHTML(search.value);
    list.classList.add("hidden");
    list.innerHTML = '';
  } else {
    list.classList.remove("hidden");
  }
})

async function setNews(){
  try {
    const news = await fetchNews();
    if(!news) throw new Error("Errore erroino in fetchNews");

    im2.setAttribute("src",`${news.articles[5].image}`);
    if(+news.articles[5].title.length > 75){
      const title = news.articles[5].title.split("");
      title.length = 75;
      anchor2.innerHTML = `${title.join("")}...`;
      // anchor2.style.fontSize = "calc(12px + 0.75vw)";
    } else {
      anchor2.innerHTML = news.articles[5].title;
      // anchor2.style.fontSize = "calc(12px + 0.75vw)";
    }
    anchor2.setAttribute("href",`${news.articles[5].url}`);
    b2.setAttribute("href",`${news.articles[5].url}`);

    im1.setAttribute("src",`${news.articles[9].image}`);
    if(+news.articles[9].title.length > 75){
      const title = news.articles[9].title.split("");
      title.length = 75;
      anchor1.innerHTML = `${title.join("")}...`;
      // anchor1.style.fontSize = "calc(12px + 0.75vw)";
    } else {
      anchor1.innerHTML = news.articles[9].title;
      // anchor1.style.fontSize = "calc(12px + 0.75vw)";
    }
    anchor1.setAttribute("href",`${news.articles[9].url}`);
    b1.setAttribute("href",`${news.articles[9].url}`);

    im3.setAttribute("src",`${news.articles[2].image}`);
    if(+news.articles[2].title.length > 75){
      const title = news.articles[2].title.split("");
      title.length = 75;
      anchor3.innerHTML = `${title.join("")}...`;
      // anchor3.style.fontSize = "calc(12px + 0.75vw)";
    } else {
      anchor3.innerHTML = news.articles[2].title;
      // anchor3.style.fontSize = "calc(12px + 0.75vw)";
    }
    anchor3.setAttribute("href",`${news.articles[2].url}`);
    b3.setAttribute("href",`${news.articles[2].url}`);

    im4.setAttribute("src",`${news.articles[4].image}`);
    if(+news.articles[4].title.length > 75){
      const title = news.articles[4].title.split("");
      title.length = 75;
      anchor4.innerHTML = `${title.join("")}...`;
      // anchor4.style.fontSize = "calc(12px + 0.75vw)";
    } else {
      anchor4.innerHTML = news.articles[4].title;
      // anchor4.style.fontSize = "calc(12px + 0.75vw)";
    }
    anchor4.setAttribute("href",`${news.articles[4].url}`);
    b4.setAttribute("href",`${news.articles[4].url}`);

    // console.log(news.articles);
  } catch(err) {
    renderError(err.message);
  }
}

setNews();


// T9DALLNFH7FGEDSUE4BE2SRG4
// https://www.visualcrossing.com


// RVVfMjA5ZDA0ODhlODQ4NGNlZWE0YmMzZDQwNTMxOTk5ZGI6OWZhNGVhNzYtMWU4Yy00MWJjLThhMDUtOTRkZjBmY2NkZDEx
// https://developer.myptv.com/en/documentation/geocoding-places-api


// https://gnews.io/dashboard
// 23893c2c23ff740369a1fb22362320b9


// OLD CODE

// const search = document.querySelector(".search-bar");
// const cont = document.querySelector(".container");
// const searchBtn = document.querySelector(".btn-search");
// const list = document.querySelector(".lista");
// const box1 = document.querySelector(".box-1");
// const box2 = document.querySelector(".box-2");
// const box3 = document.querySelector(".box-3");
// const box4 = document.querySelector(".box-4");
// const box5 = document.querySelector(".box-5");
// const box6 = document.querySelector(".box-6");
// const box7 = document.querySelector(".box-7");
// const box8 = document.querySelector(".box-8");
// const box9 = document.querySelector(".box-9");
// const box10 = document.querySelector(".box-10");
// const box11 = document.querySelector(".box-11");
// const img = document.querySelector(".immagine");
// const nomi = document.querySelectorAll(".nomiCitta");
// const wow = document.querySelectorAll(".w");
// const boxBox1 = document.querySelector(".box-box-1");
// const boxBox3 = document.querySelector(".box-box-3");
// const prev = document.querySelector(".preview");
// const im2 = document.querySelector(".im2");
// const anchor2 = document.querySelector(".a2");
// const im3 = document.querySelector(".im3");
// const anchor3 = document.querySelector(".a3");
// const im4 = document.querySelector(".im4");
// const anchor4 = document.querySelector(".a4");
// const im1 = document.querySelector(".im1");
// const anchor1 = document.querySelector(".a1");
// const tite = document.querySelector(".tite");
// const b1 = document.querySelector(".b1");
// const b2 = document.querySelector(".b2");
// const b3 = document.querySelector(".b3");
// const b4 = document.querySelector(".b4");
// const cli = document.querySelector(".cli");
// let arrCities;

// async function fetchCity(luogo = "london"){
//   try{
//     const cities = await fetch(`https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${luogo}&apiKey=RVVfMjA5ZDA0ODhlODQ4NGNlZWE0YmMzZDQwNTMxOTk5ZGI6OWZhNGVhNzYtMWU4Yy00MWJjLThhMDUtOTRkZjBmY2NkZDEx`);

//     // console.log(cities.ok);

//     if(!cities.ok) throw new Error("Errore erroino in fetchCity");

//     return await cities.json();
//   } catch(err) {
//     renderError(err.message); 
//   }
// }

// async function fetchWeather(lat,long){
//   try{
//     const london = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${long}?key=T9DALLNFH7FGEDSUE4BE2SRG4`);

//     if(!london.ok) throw new Error("Errore erroino in fetchWeather");

//     return await london.json();
//   } catch(err) {
//     renderError(err.message);
//   }
// }

// async function fetchNews(){
//   try{
//    const fet = await fetch("https://gnews.io/api/v4/search?q=example&apikey=23893c2c23ff740369a1fb22362320b9");
//    if(!fet.ok) throw new Error("Errore erroino in fetchNews");

//   return await fet.json();
//   } catch(err) {
//    renderError(err.message);
//   }
// }

// function intervallo(){
//   const now =  new Date();
//   const day = `${now.getDate()}`.padStart(2, 0);
//   const month = `${now.getMonth() + 1}`.padStart(2, 0);
//   const year = now.getFullYear();
//   const hour = `${now.getHours()}`.padStart(2, 0);
//   const min = `${now.getMinutes()}`.padStart(2, 0);
//   const sec = `${now.getSeconds()}`.padStart(2, 0);
//   box11.textContent =  `${day}-${month}-${year} ${hour}:${min}:${sec}`;
//   }



// async function daysWeatherBar(index, pos){

//   const citiesJson = await fetchCity(pos);
//   if(!citiesJson) throw new Error("Errore erroino in fetchCity");
//   const {latitude, longitude} = citiesJson.locations[index].referencePosition;

//   const tempo = await fetchWeather(latitude,longitude);
//   if(!tempo) throw new Error("in fetchWeather");

//   tempo.days.forEach( (e,i) => {
//     const html = `
//     <div class="giorno">
//       <div class="day${i}"></div>
//     </div>
//     <div class="icona">
//       <img class="icona-img${i}">
//     </div>
//     <div class="temperatura">
//       <div class="min${i}"></div>
//       <div class="max${i}" style="font-weight: bold;"></div>
//     </div>`;

//   wow[i].insertAdjacentHTML("afterbegin", html);

//   const d = new Date(e.datetime);

//   if(i === 0) document.querySelector(`.day${i}`).textContent = "Today";
//   else document.querySelector(`.day${i}`).textContent = `${d.toLocaleDateString('en-UK', { weekday: 'short' })} ${e.datetime.split("").slice(-2).join("")}`;

//   document.querySelector(`.min${i}`).textContent = `${Math.round((e.tempmin - 32) * (5 / 9))}°`;
//   document.querySelector(`.max${i}`).textContent = `${Math.round((e.tempmax - 32) * (5 / 9))}°`;
  

//   const t = +`${Math.round((e.temp - 32) * (5 / 9))}`;
//   if(t > 0) {
//     if(e.precipprob >= 70) document.querySelector(`.icona-img${i}`).setAttribute("src", "icons/i5.png");
//     else if(e.precipprob >= 40) document.querySelector(`.icona-img${i}`).setAttribute("src", "icons/i2.png");
//     else document.querySelector(`.icona-img${i}`).setAttribute("src", "icons/i1.png");   
//   } else {
//     if(e.precipprob >= 70) document.querySelector(`.icona-img${i}`).setAttribute("src", "icons/i6.png");
//     else if(e.precipprob >= 40) document.querySelector(`.icona-img${i}`).setAttribute("src", "icons/i7.png");
//     else document.querySelector(`.icona-img${i}`).setAttribute("src", "icons/i1.png");
//   }
//   document.querySelector(`.icona-img${i}`).style.width = "45px";
//   document.querySelector(`.icona-img${i}`).style.height = "45px";
//   document.querySelector(`.min${i}`).style.color = "blue";
//   document.querySelector(`.max${i}`).style.color = "red";
//   })
// }

// async function defaultPosition(){
//   try {
    
//    const citiesJson = await fetchCity();
//    if(!citiesJson) throw new Error("Errore erroino in fetchCity");
//    const {latitude, longitude} = citiesJson.locations[0].referencePosition;
   
//    const tempo = await fetchWeather(latitude,longitude);
//    if(!tempo) throw new Error("Errore erroino in fetchWeather");
//    const {temp} = tempo.currentConditions;
    
//       box1.textContent = `${citiesJson.locations[0].address.state}, ${citiesJson.locations[0].address.countryName}`;
//       box2.textContent = `${citiesJson.locations[0].address.city}`;
//       box3.textContent = `${((temp - 32) * (5 / 9)).toFixed(1)}°`;
//       box10.textContent = `feelslike ${((tempo.currentConditions.feelslike - 32) * (5 / 9)).toFixed(1)}°`;
//       box4.textContent = `humidity ${tempo.currentConditions.humidity}%`;
//       box5.textContent = `wind speed ${(tempo.currentConditions.windspeed * 1.609344).toFixed(1)} km/h`;
//       box6.textContent = `rain fall ${tempo.currentConditions.precip} ml`;
//       box7.textContent = `cloudcover ${tempo.currentConditions.cloudcover}%`;
//       box8.textContent = `sunrise ${tempo.currentConditions.sunrise}`;
//       box9.textContent = `sunset ${tempo.currentConditions.sunset}`;

//       setInterval(intervallo, 10);
//       daysWeatherBar(0,"london");


//       imgSelection(tempo);
//     } catch(err) {
//        console.log(err.message);
//     }
// }

// defaultPosition();

// async function addHTML() {
//   try{
//     const citiesJson = await fetchCity(search.value);
//     if(!citiesJson) throw new Error("Errore erroino in fetchCity");
//     arrCities = citiesJson.locations.map( (e) => `${e.formattedAddress}, ${e.address.state}, ${e.address.countryName}`);
//     arrCities.forEach( (e,i) => {
//     const html = `<div class="nomiCitta"><div class="tes" placeholder="${i}">${e}</div></div>`;
//     list.insertAdjacentHTML("beforeend", html);
//   })
//   } catch(err){
//      console.log(err.message);
//   } 
// }

// async function imgSelection(tem){
//   boxBox1.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
//   boxBox3.style.backgroundColor = "rgba(0, 0, 0, 0.2)";

//   const giorno = +tem.currentConditions.sunrise.split("").slice(0,2).join("");
//   const notte = +tem.currentConditions.sunset.split("").slice(0,2).join("");
//   const data = +tem.currentConditions.datetime.split("").slice(0,2).join("");
//   const temperatura = +((tem.currentConditions.temp - 32) * (5 / 9));

//   if(tem.currentConditions.cloudcover > 70){
    
//   if(temperatura > 0){
//     if(data > giorno && data < notte){
//     cont.style.backgroundImage = "url('img/cloudy10.jpg')";
//     } else {
//     cont.style.backgroundImage = "url('img/nightRain.jpg')"; 
//     } 
//   } else {
//     if(data > giorno && data < notte){
//       cont.style.backgroundImage = "url('img/snowingday.jpg')";
//       boxBox1.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
//       boxBox3.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
//       } else {
//       cont.style.backgroundImage = "url('img/snowingnight.jpg')"; 
//       }
//   }
    
//   } else if (tem.currentConditions.cloudcover > 30){
//     cont.style.backgroundImage = "url('img/partial.jpg')"; 
//     if(data < giorno || data > notte) cont.style.backgroundImage = "url('img/night1.jpg')"; 
//   } else {
//     cont.style.backgroundImage = "url('img/sky.webp')";
//     if(data < giorno || data > notte) cont.style.backgroundImage = "url('img/night1.jpg')"; 
//   }
// }


// async function main(e){
//   try{
  
  
//   list.classList.remove("hidden");
//   const index = e.target.getAttribute("placeholder");

//   const citiesJson = await fetchCity(search.value);
//   if(!citiesJson) throw new Error("Errore erroino in fetchCity");
//   const {latitude, longitude} = citiesJson.locations[index].referencePosition;

//   const tempo = await fetchWeather(latitude,longitude);
//   if(!tempo) throw new Error("in fetchWeather");
//   const {temp} = tempo.currentConditions;

//   const country = [...`${citiesJson.locations[index].address.state}, ${citiesJson.locations[index].address.countryName}`];
//   if(country.length < 22) {
//     box1.textContent = country.join(""); 
//   } else {
//     country.length = 22;
//     box1.textContent = country.join("") + "...";
//   }

//   const city = [...citiesJson.locations[index].address.city];
//   if(city.length < 22) {
//     box2.textContent = city.join("");
//   } else {
//     city.length = 22;
//     box2.textContent = city.join("") + "...";
//   }
  
//   box3.textContent = `${((temp - 32) * (5 / 9)).toFixed(1)}°`;
//   box10.textContent = `feelslike ${((tempo.currentConditions.feelslike - 32) * (5 / 9)).toFixed(1)}°`;
//   box4.textContent = `humidity ${tempo.currentConditions.humidity}%`;
//   box5.textContent = `wind speed ${(tempo.currentConditions.windspeed * 1.609344).toFixed(1)} km/h`;
//   box6.textContent = `rain fall ${tempo.currentConditions.precip} ml`;
//   box7.textContent = `cloudcover ${tempo.currentConditions.cloudcover}%`;
//   box8.textContent = `sunrise ${tempo.currentConditions.sunrise}`;
//   box9.textContent = `sunset ${tempo.currentConditions.sunset}`;

//   setInterval(intervallo, 10);

//   imgSelection(tempo);

//   daysWeatherBar(index, search.value);

//   list.innerHTML = '';
//   arrCities.length = 0;
//   search.value = `${citiesJson.locations[index].address.city}, ${citiesJson.locations[index].address.state}, ${citiesJson.locations[index].address.countryName}`;
//   } catch(err) {
//     console.log(err.message);
//   } 
// }


// // searchBtn.addEventListener("click", function(e){
// //   console.log(e.target === this);
// //   addHTML(search.value);
// //   list.classList.add("hidden");
// // } );


// search.addEventListener("input", function(){
//   list.innerHTML = '';
//   list.classList.remove("hidden");
  
// });


// list.addEventListener("click",function(e) {
//    wow.forEach( (_,i) => {
//     wow[i].innerHTML = "";
//    })
   
//    main(e);
// });

// search.addEventListener("keypress", function(e) {
//   if (e.key === "Enter") {
//     addHTML(search.value);
//     list.classList.add("hidden");
//   }
// })


// cli.addEventListener("click",function(e){
//   const pressed = e.target.getAttribute("class");
//   // console.log(pressed);
//   // console.log(pressed === "btn-search");
//   if(pressed === "btn-search") {
//     addHTML(search.value);
//     list.classList.add("hidden");
//     list.innerHTML = '';
//   } else {
//     list.classList.remove("hidden");
//   }
// })


// // Fare toggle quando presso con il puntatore del mouse sulla search bar, usare l'if per la serch bar vuota






// async function setNews(){
//   try {
//     const news = await fetchNews();
//     if(!news) throw new Error("Errore erroino in fetchNews");

//     im2.setAttribute("src",`${news.articles[5].image}`);
//     if(+news.articles[5].title.length > 75){
//       const title = news.articles[5].title.split("");
//       title.length = 75;
//       anchor2.innerHTML = `${title.join("")}...`;
//       anchor2.style.fontSize = "calc(12px + 0.75vw)";
//     } else {
//       anchor2.innerHTML = news.articles[5].title;
//       anchor2.style.fontSize = "calc(12px + 0.75vw)";
//     }
//     anchor2.setAttribute("href",`${news.articles[5].url}`);
//     b2.setAttribute("href",`${news.articles[5].url}`);

//     im1.setAttribute("src",`${news.articles[9].image}`);
//     if(+news.articles[9].title.length > 75){
//       const title = news.articles[9].title.split("");
//       title.length = 75;
//       anchor1.innerHTML = `${title.join("")}...`;
//       anchor1.style.fontSize = "calc(12px + 0.75vw)";
//     } else {
//       anchor1.innerHTML = news.articles[9].title;
//       anchor1.style.fontSize = "calc(12px + 0.75vw)";
//     }
//     anchor1.setAttribute("href",`${news.articles[9].url}`);
//     b1.setAttribute("href",`${news.articles[9].url}`);

//     im3.setAttribute("src",`${news.articles[2].image}`);
//     if(+news.articles[2].title.length > 75){
//       const title = news.articles[2].title.split("");
//       title.length = 75;
//       anchor3.innerHTML = `${title.join("")}...`;
//       anchor3.style.fontSize = "calc(12px + 0.75vw)";
//     } else {
//       anchor3.innerHTML = news.articles[2].title;
//       anchor3.style.fontSize = "calc(12px + 0.75vw)";
//     }
//     anchor3.setAttribute("href",`${news.articles[2].url}`);
//     b3.setAttribute("href",`${news.articles[2].url}`);

//     im4.setAttribute("src",`${news.articles[4].image}`);
//     if(+news.articles[4].title.length > 75){
//       const title = news.articles[4].title.split("");
//       title.length = 75;
//       anchor4.innerHTML = `${title.join("")}...`;
//       anchor4.style.fontSize = "calc(12px + 0.75vw)";
//     } else {
//       anchor4.innerHTML = news.articles[4].title;
//       anchor4.style.fontSize = "calc(12px + 0.75vw)";
//     }
//     anchor4.setAttribute("href",`${news.articles[4].url}`);
//     b4.setAttribute("href",`${news.articles[4].url}`);

//     // console.log(news.articles);
//   } catch(err) {
//     renderError(err.message);
//   }
// }

// setNews();


// // T9DALLNFH7FGEDSUE4BE2SRG4
// // https://www.visualcrossing.com


// // RVVfMjA5ZDA0ODhlODQ4NGNlZWE0YmMzZDQwNTMxOTk5ZGI6OWZhNGVhNzYtMWU4Yy00MWJjLThhMDUtOTRkZjBmY2NkZDEx
// // https://developer.myptv.com/en/documentation/geocoding-places-api


// // https://gnews.io/dashboard
// // 23893c2c23ff740369a1fb22362320b9