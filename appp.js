let noWeatherData = true
const app = document.querySelector(".app-container")
// const country = document.querySelector(".country")
// const temperature = document.querySelector(".temperature")
// const condition = document.querySelector(".condition")
const form = document.getElementById("location")
const cityInput = document.querySelector(".city-input")
const warning = document.querySelector(".warning-message")
const weatherContainer = document.getElementById("card-container")
const errMsg = document.querySelector(".empty-card")


let myCards = []



form.addEventListener("submit", function(e) {
    e.preventDefault()

    // Getting the input value
    let input = cityInput.value;
    
    // if(cityInput.value.length === 0){
    // Here, if the input has a length, then it is positive
    // Else, it is negative. So when the input is empty,
    // I'm using negation ! to change it to true, so the block of code runs.
    if(!input){
        alert("Please type in a city name")
    }
    else{
        // city = cityInput.value
        // fetchWeatherData(city)
        fetchWeatherData(input)
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
    // cityInput.focus()
  
}

function formatWeatherData(data){
    // let temp = data.main.temp
    // let description = data.weather[0].description
    // let name = data.name
    let cardItem = {
        id: new Date().getTime(),
        name: data.name,
        temp: data.main.temp,
        weather: data.weather[0].description
    }
    myCards.push(cardItem)
    localStorage.setItem("cardArr", JSON.stringify(myCards))
    renderWeatherData()
}

function renderWeatherData () {
    // Getting the data from LocalStorage
    let data = localStorage.getItem('cardArr')
    // Checking to see if the cardArr item is in the DB
    if(data != null) {
        // Parsing the data, through Json, to get a workable
        let parseData = JSON.parse(data)
        // Checking if the parsed data has element, if yes, render the page, else show an error message.
        if (parseData.length) {
            // Declaring an emtpy weatherItem array.
            let weatherItems = "";
            // Looping through the parsedData, and rendering them...
            for(var i = 0; i < parseData.length; i++) {
                weatherItems += `
                    <div class="card">
                        <span class="delCard" onClick="deleteCard(${parseData[i]['id']})">
                            <i class="fa-solid fa-xmark"></i>
                        </span>
                        <span class="country">
                        ${parseData[i]["name"]}
                        </span>
                
                        <span class="temperature">
                        ${parseData[i]["temp"]}<sup>°C</sup>
                        </span>
                
                        <span class="condition">
                        ${parseData[i]["weather"]}
                        </span>
                    </div>
                `
            }
            // Rendering the weatherItems in the weatherContainer
            weatherContainer.innerHTML = weatherItems
            // Clearing the weatherItems, so we won't have item in the variable
            weatherItems = ''
        }else{
            // Showing the blank message if user has no city searched for before
            errMsg.innerHTML = 'No weather cards yet. <a href = "#">Click here</a> to search.'
            
        }
    }
    
}

// function renderWeatherData(){
//     let data = localStorage.getItem("cardArr")
//     if (data == null){
//         noWeatherData = true
//         errMsg = `
//         <span>
//             No weather cards yet. <a href = "#">Click here</a> to search.
//         </span>
//         `
//         // console.log(errMsg)
//         return emptyCard.innerHTML = errMsg

    

//     }else if(JSON.parse(data).length){
//         noWeatherData = false
//         myCards = JSON.parse(data)
//         console.log("This is the Card Array: "+ myCards)
//         let weatherItems = ""
//         for (let i=0; i<myCards.length; i++) {
        
//             weatherItems += 
//             `<div class="card">
//                 <span class="delCard" onClick="deleteCard(${myCards[i]['id']})">
//                     <i class="fa-solid fa-xmark"></i>
//                 </span>
//                 <span class="country">
//                 ${myCards[i]["name"]}
//                 </span>
        
//                 <span class="temperature">
//                 ${myCards[i]["temp"]}<sup>°C</sup>
//                 </span>
        
//                 <span class="condition">
//                 ${myCards[i]["weather"]}
//                 </span>
//             </div>`
    
//             weatherContainer.innerHTML = weatherItems
    
            
//         }
    
       
//     }else{}
    
// } 
    
 

// function deleteCard(id){
//     let index = myCards.findIndex(card => card.id === id)
//     console.log(index)
//     let data = JSON.parse(localStorage.getItem("cardArr"))
//     var removeIndex = data.map(function(item) { return item.id; }).indexOf(index)
//     data.splice(removeIndex, 1);
//     localStorage.setItem("cardArr", JSON.stringify(data))
//     renderWeatherData()
// }

// function deleteCard(id){
//     // You are fetching the Id from the myCards array, and not from the localStorage
//     let index = myCards.findIndex(card => card.id === id)
//     let data = JSON.parse(localStorage.getItem("cardArr"))
//     data.splice(index,1)
//     localStorage.setItem("cardArr", JSON.stringify(data))
    
//     renderWeatherData()
// }
function deleteCard(id){
    let data = JSON.parse(localStorage.getItem("cardArr"))
    let index = data.findIndex(card => card.id === id)
    data.splice(index,1)
    localStorage.setItem("cardArr", JSON.stringify(data))
    renderWeatherData()
}
renderWeatherData()



