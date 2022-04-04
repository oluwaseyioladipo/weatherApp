let noWeatherData = true
const app = document.querySelector(".app-container")
const country = document.querySelector(".country")
const temperature = document.querySelector(".temperature")
const condition = document.querySelector(".condition")
const form = document.getElementById("location")
const cityInput = document.querySelector(".city-input")
const warning = document.querySelector(".warning-message")
const weatherContainer = document.getElementById("card-container")
const emptyCard = document.querySelector(".empty-card")



let myCards = []



form.addEventListener("submit", function(e) {
    e.preventDefault()
    
    if(cityInput.value.length === 0){
        alert("Please type in a city name")
    }
    else{
        city = cityInput.value
        fetchWeatherData(city)
        cityInput.value = ""
        
    }
    
})


const API_KEY = "1d955e55868c74893504192367fd32e3"


function fetchWeatherData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        formatWeatherData(data)
    })
    .catch(() => {
        warning.textContent = "Please search for a valid city";
    })
    warning.textContent = ""
    form.reset()
    cityInput.focus()
  
}

function formatWeatherData(data){
    let temp = data.main.temp
    let description = data.weather[0].description
    let name = data.name
    let cardItem = {}
    cardItem = {
        id: new Date().getTime(),
        name: name,
        temp: temp,
        weather: description
    }
    myCards.push(cardItem)
    localStorage.setItem("cardArr", JSON.stringify(myCards))
    renderWeatherData()
}

function renderWeatherData(){
    let data = localStorage.getItem("cardArr")
    if (data == null){
        noWeatherData = true
        errMsg = `
        <span>
            No weather cards yet. <a href = "#">Click here</a> to search.
        </span>
        `
        console.log(errMsg)
        return emptyCard.innerHTML = errMsg

    

    }else if(JSON.parse(data).length){
        noWeatherData = false
        myCards = JSON.parse(data)
        console.log("This is the Card Array: "+ myCards)
        let weatherItems = ""
        for (let i=0; i<myCards.length; i++) {
        
            weatherItems += 
            `<div class="card">
                <span class="delCard" onClick="deleteCard(${myCards[i]['id']})">
                    <i class="fa-solid fa-xmark"></i>
                </span>
                <span class="country">
                ${myCards[i]["name"]}
                </span>
        
                <span class="temperature">
                ${myCards[i]["temp"]}<sup>°C</sup>
                </span>
        
                <span class="condition">
                ${myCards[i]["weather"]}
                </span>
            </div>`
    
            weatherContainer.innerHTML = weatherItems
    
            
        }
    
       
    }else{}
    
} 
    
 

// function deleteCard(id){
//     let index = myCards.findIndex(card => card.id === id)
//     console.log(index)
//     let data = JSON.parse(localStorage.getItem("cardArr"))
//     var removeIndex = data.map(function(item) { return item.id; }).indexOf(index)
//     data.splice(removeIndex, 1);
//     localStorage.setItem("cardArr", JSON.stringify(data))
//     renderWeatherData()
// }

function deleteCard(id){
    let index = myCards.findIndex(card => card.id === id)
    let data = JSON.parse(localStorage.getItem("cardArr"))
    data.splice(index,1)
    localStorage.setItem("cardArr", JSON.stringify(data))
    
    renderWeatherData()
}
renderWeatherData()
   



   


    


