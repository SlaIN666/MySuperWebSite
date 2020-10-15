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
        const start = new Date().getTime();

        let response = await fetch('/send', options)
        let data = await response.json()

        const end = new Date().getTime();

        let color = end-start > 100 ? '#ffae00' : '#0dff00'

        gaugePressure.options.highlights[0].to = `${end-start > 100 ? 100 : end-start}`
        gaugePressure.options.highlights[0].color = color
        gaugePressure.value = end-start
        document.querySelector('#result').innerHTML = `${(end-start) > 75 ? 'Poor' : 'Good'} ${end-start}мс`
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
                <p id="time">${end-start + 'мс'}</p>
            </div>

            <div class="date-launch">
                <p>Ввод</p>
                <p id="input">${dataInput}</p>
            </div>

            <div class="date-launch">
                <p>Вывод</p>
                <p id="output">${data}</p>
            </div>
        </div>
        `)
    }
})
