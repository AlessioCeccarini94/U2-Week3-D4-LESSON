const getYearFooter = function () {
  const footer = document.getElementById("year")
  footer.innerText = new Date().getFullYear()
}
getYearFooter()

const eventsURL = "https://striveschool-api.herokuapp.com/api/agenda"

const getEvents = function () {
  fetch(eventsURL)
    .then((res) => {
      console.log("RESPONSE", res)
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(`codice errore: ${res.status}`)
      }
    })
    .then((events) => {
      console.log("array", events)

      const row = document.getElementById("row")

      events.forEach((concert) => {
        row.innerHTML += `
         <div class="col">
            <div class="card" >
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFUIwRRofAKvmJ4DvuI1-QmlVevmH-5jzKNg&s" class="card-img-top h-100" alt="pupo">
            <div class="card-body">
                <h5 class="card-title">${concert.name}</h5>
                <p class="card-text">${concert.description}</p>
                <p class="card-text">${concert.price} €</p>
                <p class="card-text">${concert.time} </p>
            </div>
                <a href="./details.html?concertID=${concert._id}" class="btn btn-primary w-100">Go somewhere</a>
        </div>
    </div>`
      })
    })
    .catch((err) => {
      console.log("ERRORE", err)
    })
}
getEvents()
