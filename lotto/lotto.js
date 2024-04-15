// 요소 선택 및 상수 선언
const todaySpan = document.querySelector("#today")
const numbersDiv = document.querySelector('.numbers')
const drawButton = document.querySelector('#draw')
const resetButton = document.querySelector('#reset')
const lottoNumbers = []
const colors = ['orange', 'skyblue', 'red', 'purple', 'green']


function real() {
  const today = new Date() // 오늘 날짜 선언
  let year = today.getFullYear() // 년
  let month = today.getMonth() + 1 // 월 
  let date = today.getDate() // 일
  let hour = today.getHours() // 시
  let minute = today.getMinutes() //분
  let second = today.getSeconds() //초 
  todaySpan.textContent = `${year.toString().padStart(4, "0")}.${month.toString().padStart(2, "0")}.${date.toString().padStart(2, "0")} ${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`

}

real()
setInterval(real, 1000)

// paintNumber 함수
function paintNumber(number) {
  const eachNumDiv = document.createElement('div')
  eachNumDiv.classList.add('eachnum')
  let colorIndex = Math.floor(number / 10)
  eachNumDiv.style.backgroundColor = colors[colorIndex]
  eachNumDiv.textContent = number
  numbersDiv.appendChild(eachNumDiv)
}

// 추첨 버튼 클릭 이벤트 핸들링
drawButton.addEventListener('click',
  function click() {
    while (lottoNumbers.length < 6) {
      // 1부터 45까지, floor는 소수점을 제거함
      let ran = Math.floor(Math.random() * 45) + 1
      if (lottoNumbers.indexOf(ran) === -1) {
        lottoNumbers.push(ran)
        paintNumber(ran)
      }
    }
    if (lottoNumbers.length == 6){
      drawButton.textContent = "재추첨"
      console.log(lottoNumbers)
      lottoNumbers.splice(0,6)

    }
  }
)

// 다시 버튼 클릭 이벤트 핸들링
resetButton.addEventListener('click',
  function () {
    lottoNumbers.splice(0, 6)
    numbersDiv.innerHTML = ""
    console.log(lottoNumbers)
  })
