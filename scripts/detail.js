const getYearFooter = function () {
  const footer = document.getElementById("year")
  footer.innerText = new Date().getFullYear()
}
getYearFooter()

const url = location.search

const allParameters = new URLSearchParams(url)
const id = allParameters.get("concertID")
console.log(id)

const eventsURL = "https://striveschool-api.herokuapp.com/api/agenda"

const getDetails = function () {
  fetch(eventsURL + "/" + id)
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.status)
      }
    })
    .then((details) => {
      document.getElementById("name").innerText = details.name
      document.getElementById("description").innerText = details.description
      document.getElementById("price").innerText = details.price + " €"
      document.getElementById("time").innerText = details.time
    })
    .catch((err) => {
      console.log(err)
      document.getElementById("name").innerText = err
    })
}
getDetails()

const deleteEvent = function () {
  fetch(eventsURL + "/" + id, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        alert("concerto eliminato")
        location.href = "./index.html"
      } else {
        throw new Error("error")
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
