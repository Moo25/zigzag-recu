const isAccessAvailable = (targetTime, test) => {
  let nowTime
  test ? nowTime = new Date(test) : nowTime = new Date() // 테스트케이스를 위해서 test파라미터를 timeString으로 삽입했습니다. x가 없으면 일반 케이스로 사용됩니다.
  const week = ['일','월','화','수','목','금','토']
  const nowDay = nowTime.getDay()
  const nowHour = nowTime.getHours()
  const nowMinute = nowTime.getMinutes()
  let weekDayorEnd // 평일 or 평일
  nowDay === 0 || nowDay === 6 ? weekDayorEnd = '주말' : weekDayorEnd = '평일'

  const dayFormat = /(주말|평일|[가-힣]요일|[가-힣])/g // 요일 형식 정규식('주말','평일','일요일'~'토요일','일'~'토' 형태꼴)
  const timeFormat = /([01]?[0-9]|2[0-3]):[0-5][0-9]/g // 시간 형식 정규식 ('0:00' 혹은 '00:00'~'23:59' 형태꼴)
  let a = targetTime.match(dayFormat) // 요일 정보가 담긴 array
  let b = targetTime.match(timeFormat) // ['09:00', '18:00', '09:00', '13:00'] 같이 홀수-짝수 인덱스 요소 1쌍이 시작-끝 시간 정보

  for(let i = 0; i< a.length; i++){
    if((a[i] === weekDayorEnd || (a[i])[0] === week[nowDay]) && // 해당요일이 타겟시간과 일치하거나 주말or평일 인 것과 일치한다.
      ((parseInt(b[i*2].split(':')[0]) < nowHour) || (parseInt(b[i*2].split(':')[0]) === nowHour && (parseInt(b[i*2].split(':')[1])) <= nowMinute)) && // 시작시간이 타겟시간보다 작거나 같다
      ((parseInt(b[i*2+1].split(':')[0]) > nowHour) || (parseInt(b[i*2+1].split(':')[0]) === nowHour && (parseInt(b[i*2+1].split(':')[1])) > nowMinute)) // 끝시간이 타겟시간보다 작다
    ) return true
  }
  return false
}



// testcase:  파라미터1. 제한 시간범위 text, 파라미터2. 테스트할 특정 시간 text입니다.
console.log('지금 시간?: ',isAccessAvailable('평일 09:00~21:00, 주말 09:00~21:00')) // 일반 사용 케이스(지금 시간 기준)

console.log('1번 case: ',isAccessAvailable('월요일 09:00~10:00, 금요일 11:00~12:00, 일요일 13:40~13:50','June 15, 2018 11:10:01')) //6월 15일 금요일 11시 10분 00초 // true
console.log('2번 case: ',isAccessAvailable('월 10:00~12:00, 화 09:00~21:40','June 19, 2018 21:30:01')) //6월 19일 화요일 21시 30분 01초 // true

console.log('3번 case: ',isAccessAvailable('평일 09:00~20:54, 주말 10:00~21:40','June 16, 2018 09:59:59')) //6월 16일 토요일 09시 59분 59초 // false
console.log('4번 case: ',isAccessAvailable('평일 09:00~20:54, 주말 10:00~21:40','June 16, 2018 21:30:01')) //6월 16일 토요일 10시 00분 01초 // true


// - 이런 함수가 필요한 상황에 대해서 생각해봐주세요.
// 매 분마다 이 함수가 돌면서 true를 리턴하면 원하는 코드가 자동으로 서버로 CI가 되도록 하는 로직을 짤 수도 있을 것이고
// 지그재그 서비스 입장에서라면 특정 시간대에 보여주고 싶은 상품을 사이트 상단에 올려준다던가 하는 상황이 있을 겁니다

// 요일 - 시간 비교 반복문 로직
// a[0] - b[0],b[1] 월요일 - 09:00,18:00
// a[1] - b[2],b[3] 화요일 - 10:00,20:00
// a[2] - b[4],b[5] 평일 - 12:00, 23:00
// ...a[n] - b[n*2],b[n*2 +1] 요일 - 시작시간, 끝시간
