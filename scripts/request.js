const DATEOPTIONS = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timezone: 'UTC'
}

document.querySelector('#sendButton').addEventListener('click', async () => {
    let data = document.querySelector('#inputData').value 
    let dataInput = data
    let dataToSend = {data}

    const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
        body: JSON.stringify(dataToSend)
    }

    if(!data || /^\s*$/.test(data)) {
        alert('Пустая строка!')
    } else {
        let response = await fetch('/send', options)
        let data = await response.json()

        let color = data.time > 75 ? '#da3a1a' : data.time > 50 ? '#f27011' : data.time > 25 ? '#f2b01e' : data.time > 5 ? '#f2d31b' : '#86e01e'

        gaugePressure.options.highlights[0].to = `${data.time > 100 ? 100 : data.time}`
        gaugePressure.options.highlights[0].color = color
        gaugePressure.value = data.time
        document.querySelector('#result').innerHTML = `${(data.time) > 75 ? 'Poor' : 'Good'} ${data.time}мс`
        document.querySelector('#result').style.color = color

        let dateLaunch = new Date().toLocaleString("ru", DATEOPTIONS)

        let results = document.querySelector('.wrapper')

        results.insertAdjacentHTML('beforeend', 
        `
        <div class="output-data">
            <div class="date-launch">
                <p>Дата Запуска</p>
                <p id="date">${dateLaunch}</p>
            </div>

            <div class="date-launch">
                <p>Время выполнения</p>
                <p id="time">${data.time + 'мс'}</p>
            </div>

            <div class="date-launch">
                <p>Ввод</p>
                <p id="input">${dataInput}</p>
            </div>

            <div class="date-launch">
                <p>Вывод</p>
                <p id="output">${data.str}</p>
            </div>
        </div>
        `)
    }
})