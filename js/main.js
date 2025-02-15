import UI from './UI.js'
import { format } from 'date-fns'

UI.FORM.addEventListener('submit', startCountdown)

if (localStorage.getItem('targetDate')) {
  UI.FORM_INPUT.value = localStorage.getItem('targetDate')
} // при перезагрузки страницы пользователь будет видеть последнюю дату, загружается из localStorage

let countdownInterval // объявила переменную, в которую будет присваиваться значение каждого счета (интервала). и так же для очищения данных предыдущего счета.

function startCountdown(event) {
  event.preventDefault()

  const dateInput = UI.FORM_INPUT.value.trim()
  console.log('dateInput=', dateInput)

  const day = dateInput[0] + dateInput[1]
  const month = dateInput[2] + dateInput[3]
  const year = dateInput.slice(4)
  const newDate = `${year}-${month}-${day}`
  console.log(newDate)

  if (!dateInput) {
    UI.RESULT.textContent = 'Введите дату'
    console.log('UI.RESULT.textContent=', 222)

    return
  }

  const targetDate = new Date(newDate)
  console.log('targetDate:', targetDate)

  // Сохраняем введенную дату в LocalStorage
  localStorage.setItem('targetDate', dateInput)

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
  const SECONDS_IN_AN_HOUR = 3600
  const SECONDS_IN_A_DAY = 86_400
  const SECONDS_IN_A_YEAR = 31_536_000

  const years = Math.floor(totalSeconds / SECONDS_IN_A_YEAR)
  const days = Math.floor((totalSeconds % SECONDS_IN_A_YEAR) / SECONDS_IN_A_DAY)
  const hours = Math.floor(
    (totalSeconds % SECONDS_IN_A_DAY) / SECONDS_IN_AN_HOUR
  )
  const minutes = Math.floor((totalSeconds % SECONDS_IN_AN_HOUR) / 60)
  const seconds = Math.floor(totalSeconds % 60)

  const formattedTargetDate = format(targetDate, 'yyyy-MM-dd HH:mm:ss')

  UI.RESULT.textContent = `Осталось: ${years} лет, ${days} дней, ${hours} часов, ${minutes} минут и ${seconds} секунд. Целевая дата: ${formattedTargetDate}.`
}

function clearInput() {
  UI.FORM_INPUT.value = ''
}
