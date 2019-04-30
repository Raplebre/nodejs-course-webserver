/* fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
}) */



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#p1')
const msgTwo = document.querySelector('#p2')

// msgOne.textContent = 'From JS'
// msgTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    msgOne.textContent = 'Loading...'
    fetch('/weather?address='+ location).then((response) => {
    response.json().then((data) => {
        if (data.error){
            msgOne.textContent = data.error
            msgTwo.textContent = ''
        }
        else{
            msgOne.textContent = data.local
            msgTwo.textContent = data.forecast
        }
    })
})
})