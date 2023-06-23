const search=document.querySelector(".search-bar"),cont=document.querySelector(".container"),searchBtn=document.querySelector(".btn-search"),list=document.querySelector(".lista"),box1=document.querySelector(".box-1"),box2=document.querySelector(".box-2"),box3=document.querySelector(".box-3"),box4=document.querySelector(".box-4"),box5=document.querySelector(".box-5"),box6=document.querySelector(".box-6"),box7=document.querySelector(".box-7"),box8=document.querySelector(".box-8"),box9=document.querySelector(".box-9"),box10=document.querySelector(".box-10"),box11=document.querySelector(".box-11"),img=document.querySelector(".immagine"),nomi=document.querySelectorAll(".nomiCitta"),wow=document.querySelectorAll(".w"),boxBox1=document.querySelector(".box-box-1"),boxBox3=document.querySelector(".box-box-3"),prev=document.querySelector(".preview"),im2=document.querySelector(".im2"),anchor2=document.querySelector(".a2"),im3=document.querySelector(".im3"),anchor3=document.querySelector(".a3"),im4=document.querySelector(".im4"),anchor4=document.querySelector(".a4"),im1=document.querySelector(".im1"),anchor1=document.querySelector(".a1"),tite=document.querySelector(".tite"),b1=document.querySelector(".b1"),b2=document.querySelector(".b2"),b3=document.querySelector(".b3"),b4=document.querySelector(".b4"),cli=document.querySelector(".cli");let arrCities;async function fetchCity(e="london"){try{let t=await fetch(`https://api.myptv.com/geocoding/v1/locations/by-text?searchText=${e}&apiKey=RVVfMjA5ZDA0ODhlODQ4NGNlZWE0YmMzZDQwNTMxOTk5ZGI6OWZhNGVhNzYtMWU4Yy00MWJjLThhMDUtOTRkZjBmY2NkZDEx`);if(!t.ok)throw Error("Errore erroino in fetchCity");return await t.json()}catch(r){renderError(r.message)}}async function fetchWeather(e,t){try{let r=await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${e},${t}?key=T9DALLNFH7FGEDSUE4BE2SRG4`);if(!r.ok)throw Error("Errore erroino in fetchWeather");return await r.json()}catch(i){renderError(i.message)}}async function fetchNews(){try{let e=await fetch("https://gnews.io/api/v4/search?q=example&apikey=23893c2c23ff740369a1fb22362320b9");if(!e.ok)throw Error("Errore erroino in fetchNews");return await e.json()}catch(t){renderError(t.message)}}function intervallo(){let e=new Date,t=`${e.getDate()}`.padStart(2,0),r=`${e.getMonth()+1}`.padStart(2,0),i=e.getFullYear(),o=`${e.getHours()}`.padStart(2,0),n=`${e.getMinutes()}`.padStart(2,0),c=`${e.getSeconds()}`.padStart(2,0);box11.textContent=`${t}-${r}-${i} ${o}:${n}:${c}`}async function daysWeatherBar(e,t){let r=await fetchCity(t);if(!r)throw Error("Errore erroino in fetchCity");let{latitude:i,longitude:o}=r.locations[e].referencePosition,n=await fetchWeather(i,o);if(!n)throw Error("in fetchWeather");n.days.forEach((e,t)=>{let r=`
    <div class="giorno">
      <div class="day${t}"></div>
    </div>
    <div class="icona">
      <img class="icona-img${t}">
    </div>
    <div class="temperatura">
      <div class="min${t}"></div>
      <div class="max${t}" style="font-weight: bold;"></div>
    </div>`;wow[t].insertAdjacentHTML("afterbegin",r);let i=new Date(e.datetime);0===t?document.querySelector(`.day${t}`).textContent="Today":document.querySelector(`.day${t}`).textContent=`${i.toLocaleDateString("en-UK",{weekday:"short"})} ${e.datetime.split("").slice(-2).join("")}`,document.querySelector(`.min${t}`).textContent=`${Math.round((e.tempmin-32)*(5/9))}\xb0`,document.querySelector(`.max${t}`).textContent=`${Math.round((e.tempmax-32)*(5/9))}\xb0`;let o=+`${Math.round((e.temp-32)*(5/9))}`;o>0?e.precipprob>=70?document.querySelector(`.icona-img${t}`).setAttribute("src","icons/i5.png"):e.precipprob>=40?document.querySelector(`.icona-img${t}`).setAttribute("src","icons/i2.png"):document.querySelector(`.icona-img${t}`).setAttribute("src","icons/i1.png"):e.precipprob>=70?document.querySelector(`.icona-img${t}`).setAttribute("src","icons/i6.png"):e.precipprob>=40?document.querySelector(`.icona-img${t}`).setAttribute("src","icons/i7.png"):document.querySelector(`.icona-img${t}`).setAttribute("src","icons/i1.png"),document.querySelector(`.icona-img${t}`).style.width="45px",document.querySelector(`.icona-img${t}`).style.height="45px",document.querySelector(`.min${t}`).style.color="blue",document.querySelector(`.max${t}`).style.color="red"})}async function defaultPosition(){try{let e=await fetchCity();if(!e)throw Error("Errore erroino in fetchCity");let{latitude:t,longitude:r}=e.locations[0].referencePosition,i=await fetchWeather(t,r);if(!i)throw Error("Errore erroino in fetchWeather");let{temp:o}=i.currentConditions;box1.textContent=`${e.locations[0].address.state}, ${e.locations[0].address.countryName}`,box2.textContent=`${e.locations[0].address.city}`,box3.textContent=`${((o-32)*(5/9)).toFixed(1)}\xb0`,box10.textContent=`feelslike ${((i.currentConditions.feelslike-32)*(5/9)).toFixed(1)}\xb0`,box4.textContent=`humidity ${i.currentConditions.humidity}%`,box5.textContent=`wind speed ${(1.609344*i.currentConditions.windspeed).toFixed(1)} km/h`,box6.textContent=`rain fall ${i.currentConditions.precip} ml`,box7.textContent=`cloudcover ${i.currentConditions.cloudcover}%`,box8.textContent=`sunrise ${i.currentConditions.sunrise}`,box9.textContent=`sunset ${i.currentConditions.sunset}`,setInterval(intervallo,10),daysWeatherBar(0,"london"),imgSelection(i)}catch(n){console.log(n.message)}}async function addHTML(){try{let e=await fetchCity(search.value);if(!e)throw Error("Errore erroino in fetchCity");(arrCities=e.locations.map(e=>`${e.formattedAddress}, ${e.address.state}, ${e.address.countryName}`)).forEach((e,t)=>{let r=`<div class="nomiCitta"><div class="tes" placeholder="${t}">${e}</div></div>`;list.insertAdjacentHTML("beforeend",r)})}catch(t){console.log(t.message)}}async function imgSelection(e){boxBox1.style.backgroundColor="rgba(0, 0, 0, 0.2)",boxBox3.style.backgroundColor="rgba(0, 0, 0, 0.2)";let t=+e.currentConditions.sunrise.split("").slice(0,2).join(""),r=+e.currentConditions.sunset.split("").slice(0,2).join(""),i=+e.currentConditions.datetime.split("").slice(0,2).join(""),o=+((e.currentConditions.temp-32)*(5/9));e.currentConditions.cloudcover>70?o>0?i>t&&i<r?cont.style.backgroundImage="url('img/cloudy10.jpg')":cont.style.backgroundImage="url('img/nightRain.jpg')":i>t&&i<r?(cont.style.backgroundImage="url('img/snowingday.jpg')",boxBox1.style.backgroundColor="rgba(0, 0, 0, 0.5)",boxBox3.style.backgroundColor="rgba(0, 0, 0, 0.5)"):cont.style.backgroundImage="url('img/snowingnight.jpg')":e.currentConditions.cloudcover>30?(cont.style.backgroundImage="url('img/partial.jpg')",(i<t||i>r)&&(cont.style.backgroundImage="url('img/night1.jpg')")):(cont.style.backgroundImage="url('img/sky.webp')",(i<t||i>r)&&(cont.style.backgroundImage="url('img/night1.jpg')"))}async function main(e){try{list.classList.remove("hidden");let t=e.target.getAttribute("placeholder"),r=await fetchCity(search.value);if(!r)throw Error("Errore erroino in fetchCity");let{latitude:i,longitude:o}=r.locations[t].referencePosition,n=await fetchWeather(i,o);if(!n)throw Error("in fetchWeather");let{temp:c}=n.currentConditions,s=[...`${r.locations[t].address.state}, ${r.locations[t].address.countryName}`];s.length<22?box1.textContent=s.join(""):(s.length=22,box1.textContent=s.join("")+"...");let a=[...r.locations[t].address.city];a.length<22?box2.textContent=a.join(""):(a.length=22,box2.textContent=a.join("")+"..."),box3.textContent=`${((c-32)*(5/9)).toFixed(1)}\xb0`,box10.textContent=`feelslike ${((n.currentConditions.feelslike-32)*(5/9)).toFixed(1)}\xb0`,box4.textContent=`humidity ${n.currentConditions.humidity}%`,box5.textContent=`wind speed ${(1.609344*n.currentConditions.windspeed).toFixed(1)} km/h`,box6.textContent=`rain fall ${n.currentConditions.precip} ml`,box7.textContent=`cloudcover ${n.currentConditions.cloudcover}%`,box8.textContent=`sunrise ${n.currentConditions.sunrise}`,box9.textContent=`sunset ${n.currentConditions.sunset}`,setInterval(intervallo,10),imgSelection(n),daysWeatherBar(t,search.value),list.innerHTML="",arrCities.length=0,search.value=`${r.locations[t].address.city}, ${r.locations[t].address.state}, ${r.locations[t].address.countryName}`}catch(l){console.log(l.message)}}async function setNews(){try{let e=await fetchNews();if(!e)throw Error("Errore erroino in fetchNews");if(im2.setAttribute("src",`${e.articles[5].image}`),+e.articles[5].title.length>75){let t=e.articles[5].title.split("");t.length=75,anchor2.innerHTML=`${t.join("")}...`}else anchor2.innerHTML=e.articles[5].title;if(anchor2.setAttribute("href",`${e.articles[5].url}`),b2.setAttribute("href",`${e.articles[5].url}`),im1.setAttribute("src",`${e.articles[9].image}`),+e.articles[9].title.length>75){let r=e.articles[9].title.split("");r.length=75,anchor1.innerHTML=`${r.join("")}...`}else anchor1.innerHTML=e.articles[9].title;if(anchor1.setAttribute("href",`${e.articles[9].url}`),b1.setAttribute("href",`${e.articles[9].url}`),im3.setAttribute("src",`${e.articles[2].image}`),+e.articles[2].title.length>75){let i=e.articles[2].title.split("");i.length=75,anchor3.innerHTML=`${i.join("")}...`}else anchor3.innerHTML=e.articles[2].title;if(anchor3.setAttribute("href",`${e.articles[2].url}`),b3.setAttribute("href",`${e.articles[2].url}`),im4.setAttribute("src",`${e.articles[4].image}`),+e.articles[4].title.length>75){let o=e.articles[4].title.split("");o.length=75,anchor4.innerHTML=`${o.join("")}...`}else anchor4.innerHTML=e.articles[4].title;anchor4.setAttribute("href",`${e.articles[4].url}`),b4.setAttribute("href",`${e.articles[4].url}`)}catch(n){renderError(n.message)}}defaultPosition(),search.addEventListener("input",function(){list.innerHTML="",list.classList.remove("hidden")}),list.addEventListener("click",function(e){wow.forEach((e,t)=>{wow[t].innerHTML=""}),main(e)}),search.addEventListener("keypress",function(e){"Enter"===e.key&&(addHTML(search.value),list.classList.add("hidden"))}),cli.addEventListener("click",function(e){let t=e.target.getAttribute("class");"btn-search"===t?(addHTML(search.value),list.classList.add("hidden"),list.innerHTML=""):list.classList.remove("hidden")}),setNews();