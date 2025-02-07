import UI from './UI.js'

UI.FORM_BUTTON.addEventListener('click', startCountdown)

let countdownInterval = null

function startCountdown(event) {
  event.preventDefault()

  const dateInput = UI.FORM_INPUT.value
  console.log('dateInput=', dateInput)

  if (!dateInput) {
    UI.RESULT.textContent = 'Введите дату'
    console.log('UI.RESULT.textContent=', 222)

    return
  }
  const targetDate = new Date(dateInput)
  console.log('targetDate:', targetDate)

  const currentDate = new Date()
  if (targetDate <= currentDate) {
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
  setTimeout(() => {
    clearInterval(countdownInterval)
    UI.RESULT.textContent = 'Время истекло'
  }, targetDate - currentDate)

  clearInput()
}

function updateCountdown(targetDate) {
  const currentDate = new Date()
  const timeDifference = targetDate - currentDate

  const totalSeconds = Math.floor(timeDifference / 1000)
  const secondsInAnHour = 3600
  const secondsInADay = 86400
  const secondsInAYear = 31536000

  const years = Math.floor(totalSeconds / secondsInAYear)
  const days = Math.floor((totalSeconds % secondsInAYear) / secondsInADay)
  const hours = Math.floor((totalSeconds % secondsInADay) / secondsInAnHour)
  const minutes = Math.floor((totalSeconds % secondsInAnHour) / 60)
  const seconds = Math.floor(totalSeconds % 60)

  UI.RESULT.textContent = `Осталось: ${years} лет, ${days} дней, ${hours} часов, ${minutes} минут и ${seconds} секунд.`
}

function clearInput() {
  UI.FORM_INPUT.value = ''
}
