const getYearFooter = function () {
  const footer = document.getElementById("year")
  footer.innerText = new Date().getFullYear()
}
getYearFooter()

const eventsURL = "https://striveschool-api.herokuapp.com/api/agenda"
// SE L'API E' DI TIPO REST SI PUO' USARE LO STESSO URL

const url = location.search
const allParameters = new URLSearchParams(url)
const id = allParameters.get("concertID")

if (id) {
  fetch(eventsURL + "/" + id)
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.status)
      }
    })
    .then((eventDetails) => {
      document.getElementById("name").value = eventDetails.name
      document.getElementById("description").value = eventDetails.description
      document.getElementById("price").value = eventDetails.price
      document.getElementById("time").value = eventDetails.time
    })
    .catch()
}
// PROPRIETA' FORNITE DA BACKENDER
// - name (string). description (string). price(string/number). time (string).

class Concert {
  constructor(_name, _description, _price, _time) {
    this.name = _name
    this.description = _description
    this.price = _price
    this.time = _time
  }
}

const form = document.getElementById("form")
form.addEventListener("submit", (e) => {
  e.preventDefault()

  const nameInput = document.getElementById("name")
  const descriptionInput = document.getElementById("description")
  const priceInput = document.getElementById("price")
  const timeInput = document.getElementById("time")

  const name = nameInput.value
  const description = descriptionInput.value
  const price = priceInput.value
  const time = timeInput.value

  const newEvent = new Concert(name, description, price, time)

  let method
  if (id) {
    method = "PUT"
  } else {
    method = "POST"
  }

  fetch(eventsURL, {
    method: "POST",
    body: JSON.stringify(newEvent),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        alert("salvato corretamente")
        form.reset()
      } else {
        throw new Error(`errore ${res.status}`)
      }
    })
    .catch((err) => {
      console.log("problema", err)
    })
})
