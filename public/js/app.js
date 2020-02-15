console.log("Client side JS has loaded succesfully");

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Disables automatic refresh after submit

    const location = search.value;

    fetch(`/forecast?search=${location}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error;
                msg2.textContent = '';
            }
            else {
                msg2.setAttribute('style', 'white-space: pre;');
                msg1.textContent = `${data.location}`;
                msg2.textContent = `It is currently ${data.forecast.currentTemp}˚ and ${data.forecast.summary}\r\n\r\nHigh: ${data.forecast.highTemp}˚ / Low: ${data.forecast.lowTemp}˚  \r\nChance of rain: ${data.forecast.rainChance}%`;
            }
        })
    })
})