import UI from './UI.js'
import { format } from 'date-fns'

UI.FORM.addEventListener('submit', startCountdown)

let countdownInterval // объявила переменную, в которую будет присваиваться значение каждого счета (интервала). и так же для очищения данных предыдущего счета.

function startCountdown(event) {
  event.preventDefault()

  const dateInput = UI.FORM_INPUT.value.trim()
  console.log('dateInput=', dateInput)

  if (!dateInput) {
    UI.RESULT.textContent = 'Введите дату'
    console.log('UI.RESULT.textContent=', 222)

    return
  }
  const targetDate = new Date(dateInput + 'T00:00:00')
  console.log('targetDate:', targetDate)

  const currentDate = new Date()
  if (isNaN(targetDate.getTime()) || targetDate <= currentDate) {
    UI.RESULT.textContent = 'Введите дату правильно'
    return
  }
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
  updateCountdown(targetDate)

  countdownInterval = setInterval(() => {
    updateCountdown(targetDate)
  }, 1000)

  clearInput()
}

function updateCountdown(targetDate) {
  const currentDate = new Date()
  const timeDifference = targetDate - currentDate

  if (timeDifference <= 0) {
    clearInterval(countdownInterval)
    UI.RESULT.textContent = 'Время вышло!'
    return
  }

  const totalSeconds = Math.floor(timeDifference / 1000)
  const secondsInAnHour = 3600
  const secondsInADay = 86400
  const secondsInAYear = 31536000

  const years = Math.floor(totalSeconds / secondsInAYear)
  const days = Math.floor((totalSeconds % secondsInAYear) / secondsInADay)
  const hours = Math.floor((totalSeconds % secondsInADay) / secondsInAnHour)
  const minutes = Math.floor((totalSeconds % secondsInAnHour) / 60)
  const seconds = Math.floor(totalSeconds % 60)

  const formattedTargetDate = format(targetDate, 'yyyy-MM-dd HH:mm:ss')
  console.log(formattedDate)

  UI.RESULT.textContent = `Осталось: ${years} лет, ${days} дней, ${hours} часов, ${minutes} минут и ${seconds} секунд. Целевая дата: ${formattedTargetDate}.`
}

function clearInput() {
  UI.FORM_INPUT.value = ''
}
