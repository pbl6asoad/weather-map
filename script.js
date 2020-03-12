//import jsonCity from "./newscript.js";
// console.log(jsonCity)

fetch('https://gist.githubusercontent.com/pbl6asoad/cd160e40d30e9ff468488fcb0bf6f0a2/raw/ac7fb6bc4f89143820e5bd440974de08cc0f1b54/by%2520cities')
.then(response => response.json())
.then(commits => {
    let scope = commits;
    let lng;
    let lat;
    let currentCity;
    let cityLon
    let cityLat 
        let url
        let dateArray
        let fullArray = []
        let splitedArray =[]
        let finalArray = []
        let thisCity
    commits[0].regions.forEach(obl => {
        //console.log(obl.name)
        var elementChildrens = document.querySelector("#select1");
    
        // for (var i=0, child; child=elementChildrens[i]; i++) {
        //      child.innerHTML = obl.name;
        // }
        let newOption = document.createElement("option")
        newOption.innerText = obl.name
        elementChildrens.appendChild(newOption)
        // elementChildrens[currentCity].innerHTML = obl.name;
       
    });
    
    document.querySelector("#select1").addEventListener('change', (event) => {
        for (let i = 0; i < 6; i++){
            if (event.target.value == commits[0].regions[i].name){
                
                scope = commits[0].regions[i].cities
                //console.log(scope)
            } else{
                
            }
        }
    
    });
    
    select1.addEventListener("click", changeCities)
    
    function changeCities(){
        document.querySelector("#select1").addEventListener('change', (event) => {
            var node = document.getElementById("select2");
            while (node.getElementsByTagName('option')[1]) {
                node.removeChild(node.lastChild);
            }
            //console.log(scope.length)
            for(let i = 0; i < scope.length; i++){
    
                var elementChildrens = document.querySelector("#select2");
                let newOption = document.createElement("option")
                newOption.innerText = scope[i].name
                elementChildrens.appendChild(newOption)
    
            }
            
            
        
        });
    }
    
    
    
    
    document.querySelector("#select2").addEventListener('change', (event) => { 
        
        currentCity = event.target.value
        thisCity = currentCity;
        for (let i = 0; i < scope.length; i++){
           if (scope[i].name == currentCity){
               cityLat = scope[i].lat.toFixed(2)
               cityLon = scope[i].lng.toFixed(2)
           }
    
        }
        url = "https://api.openweathermap.org/data/2.5/forecast?lat="+cityLat+"&lon="+cityLon+"&appid=6a6b354c505111229d182096d88f328b"
     
        fetch(url)
        .then(response => response.json())
        .then(data => {
            fullArray = []
           for(let i = 0; i<data.list.length; i++){
            dateArray = data.list[i].dt_txt.split(" ")
            let currentTimeWeather = [dateArray[0], dateArray[1], data.list[i].main.temp, data.list[i].main.humidity,  data.list[i].wind.speed, data.list[i].wind.deg ]
            fullArray.push(currentTimeWeather)
            // newOption.innerText = data.list[i].dt_txt
            // elementChildrens.appendChild(newOption)

           }

           let node = document.getElementById("select3");
           while (node.getElementsByTagName('option')[1]) {
              node.removeChild(node.lastChild);
           }
           for(let i = 0; i<fullArray.length; i++){
              if(i == 0 || fullArray[i][0] != fullArray[i-1][0]){
                 var elementChildrens = document.querySelector("#select3");
                 let newOption = document.createElement("option")
                 newOption.innerText = fullArray[i][0]
                 elementChildrens.appendChild(newOption)
              }
              
           }
              console.log(fullArray)
            function qwww(e){ 
            
                console.log(e.target.value)
                let node = document.getElementById("select4");
                while (node.getElementsByTagName('option')[1]) {
                   node.removeChild(node.lastChild);
                }
                finalArray = []
                for( let i = 0; i < fullArray.length; i++){
                   if(e.target.value == fullArray[i][0]){
                       console.log(i)
                       finalArray.push(fullArray[i])
                        var elementChildrens = document.querySelector("#select4");
                        let newOption = document.createElement("option")
                        newOption.innerText = fullArray[i][1]
                        elementChildrens.appendChild(newOption)

                   }

                }

                
           document.querySelector("#select3").removeEventListener('change', qwww)
           
           document.querySelector("#select3").addEventListener('change', qwww)
            }

           document.querySelector("#select3").addEventListener('change', qwww)
        
           
          
           function four(e){ 
            console.log(e.target.value)
            for(let i = 0; i < finalArray.length; i++){
                if (e.target.value == finalArray[i][1]){
                 document.querySelector("#city").innerText = "Город: " + thisCity 

                 document.querySelector("#date").innerText = "Дата: " + finalArray[i][0]
                 
                 document.querySelector("#time").innerText = "Время: " + finalArray[i][1]
                 
                 document.querySelector("#temp").innerText = "Температура: " + (finalArray[i][2] - 273.15).toFixed(1) + "°C"
                 
                 document.querySelector("#hum").innerText = "Влажность: " + finalArray[i][3] + "%"
                 
                 document.querySelector("#speed").innerText = "Скорость ветра: " + finalArray[i][4] + "м/с"
                 
                 document.querySelector("#direction").innerText = "Направление ветра: " + finalArray[i][5] 
                 
                 document.querySelector("#img").src = "mapwind.png"

                 document.querySelector("#arrow").style.transform = "rotate(" + finalArray[i][5] +"deg)"
                 
                 document.querySelector("#arrow").style.display = "inline"


                 

                 
                console.log(finalArray[i])
                }
            }
           
          
            document.querySelector("#select4").removeEventListener('change', four)
            
           document.querySelector("#select4").addEventListener('change', four)
          }


           document.querySelector("#select4").addEventListener('change', four)

           

        });
    })
    

    





})




