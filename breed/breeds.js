const apiRandomDogs = "https://dog.ceo/api/breeds/image/random/42"
const apiAllBreeds = "https://dog.ceo/api/breeds/list/all"
const request1 = new XMLHttpRequest()
const request2 = new XMLHttpRequest()

// 헤더 영역을 만듬
const header = document.getElementById("header")
// 메인 영역을 만듬 
const main = document.getElementById("main")
// 필터링에 필요한 입력을 받을 텍스트칸
const input = document.getElementById("filter-text")
// 필터링에 입력한 텍스트를 검색하는 버튼
const button = document.getElementById("filter-button")
// 텍스트 검색 말고, 셀렉트를 통하여 필터링을 가능하게 하는 셀렉트박스
const select = document.getElementById("filter-select")
// 강아지 사진을 더 불러오기 위한 버튼
const more = document.getElementById("more")
// 맨 위로버튼
const tothetop = document.getElementById("tothetop")

// 해당 배열에 강아지의 사진 요소가 담긴다
const currentDogs = []

function displayDogs(item) {
  const dogImgDiv = document.createElement("div")
  dogImgDiv.classList.add("flex-item")
  dogImgDiv.innerHTML = `<img src=${item}>`+`<br>`+`강아지입니다.`

  dogImgDiv.addEventListener("click",()=>{
    window.open(item)
  })
  main.appendChild(dogImgDiv)
}

window.addEventListener("load", function () {

  // 강아지 사진 뿌리기
  request1.open("GET", apiRandomDogs)
  request1.addEventListener("load", function () {
    const response = JSON.parse(request1.response)
    response.message.forEach(function (item) {
      currentDogs.push(item)
      displayDogs(item)
    });
  })
  request1.send()

  // 견종 텍스트 뿌리기
  request2.open("GET", apiAllBreeds)
  request2.addEventListener("load", function () {
    const response = JSON.parse(request2.response)
    Object.keys(response.message).forEach(function (item) {
      const option = document.createElement("option")
      option.textContent = item
      option.value = item
      select.appendChild(option)
    });
  })
  request2.send()
})

button.addEventListener("click", function () {
  main.innerHTML = ""
  let filteredDogs = currentDogs.filter(function (item) {
    return item.indexOf(input.value) !== -1
  })
  input.value = ""
  filteredDogs.forEach(function (item) {
    displayDogs(item)
  });
})

select.addEventListener("change", function () {
  main.innerHTML = ""
  let filteredDogs = currentDogs.filter(function (item) {
    return item.indexOf(select.value) !== -1
  })

  filteredDogs.forEach(function (item) {
    displayDogs(item)
  });
})

more.addEventListener("click", function () {
  // 강아지 사진 더 불러와서 추가하고 뿌리기
  request1.open("GET", apiRandomDogs)
  request1.addEventListener("load", function () {
    const response = JSON.parse(request1.response)
    response.message.forEach(function (item) {
      currentDogs.push(item)
      displayDogs(item)
    });
  })
  request1.send()
})

tothetop.addEventListener("click", function () {
  window.scrollTo({ top: 0 })
})
