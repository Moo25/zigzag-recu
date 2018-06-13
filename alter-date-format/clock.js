/*
clock 함수 실행 순서

1. change12HourToSecondAddN :
  input: 12시간제 시간(string), N초(number)
  output: 초단위 시간(number)
  logic: 시간 string을 초(number) 단위로 바꾸고 N(초)를 더해서 반환합니다

2. checkOver24hour :
  input: 초단위 시간(number)
  output: 초단위 시간(number)
  logic: 1번 함수의 리턴 값이 86400(24시간*60분*60초)과 같거나 크면
        값에서 86400을 뺀 새 값을 파라미터로 넣고 이 함수를 다시 실행합니다.
        86400보다 작으면 그 값을 반환합니다.

3. secondTo24HourSystem :
  input: 초단위 시간(number)
  output: 24시간제 시간(string)
  logic: 2번 함수의 리턴값을 24시간제 시간 string으로 바꿔 반환합니다.

0. pipe: 위 3개 함수를 인자로 받는 고차함수 pipe가 있으며 인자 순서대로 실행되면서 다음 함수로 결과값를 넘깁니다.

  const clock = pipe(change12HourToSecondAddN,checkOver24hour,secondTo24HourSystem)

  clock('12Hourtime',N)의 실행순서 :
    change12HourToSecondAddN('시간',N) -> checkOver24Hour(second) -> secondTo24HourSystem(second) -> '24HourTime'
*/

const change12HourToSecondAddN = (timeStr, N) => {
  let AMPM = 0, hour10, hour1, minute10, minute1, second10, second1
  if(timeStr[0] === 'P') { AMPM = 12 * 60 * 60} // 1. PM = 12시간 * 60분 * 60초 단위

  if(timeStr[0] === 'A' && timeStr[3] === '1' && timeStr[4] === '2') { // AM 12 예외조건
    hour10 = 0,
    hour1 = 0
  } else {
    hour10 = timeStr[3] * 10 * 60 * 60 // 2. hour10 = 10시간 * 60분 * 60초 단위
    hour1 = timeStr[4] * 1 * 60 * 60 // 3. hour = 1시간 * 60분 * 60초 단위
  }
  minute10 = timeStr[6] * 10 * 60 // 4. minute10 = 10분 * 60초 단위
  minute1 = timeStr[7] * 1 * 60 // 5. minute1 = 1분 * 60초 단위
  second10 =timeStr[9] * 10 // 6. second10 = 10초 단위
  second1 = timeStr[10] * 1 // 7. second1 = 1초 단위

  return AMPM + hour10 + hour1 + minute10 + minute1 + second10 + second1 + N
}

const checkOver24hour = (secondTime) => {
  if(secondTime / 86400 >= 1) return checkOver24hour(secondTime - 86400) // 86400(24시간)과 같거나 크면 86400을 빼고 재귀
  else return secondTime
}

const secondTo24HourSystem = (secondTime) => {
  let
    second = secondTime % 60
    minute = (secondTime - second) % (60 * 60) / 60
    hour = (secondTime - second - minute*60) / (60*60)

    second1 = second % 10
    second10 = (second - second1) / 10

    minute1 = minute % 10
    minute10 = (minute - minute1) / 10

    hour1 = hour % 10
    hour10 = (hour - hour1) / 10

  return `${hour10}${hour1}:${minute10}${minute1}:${second10}${second1}` // es6 template string을 이용해서 string으로 변환
}

// 위 3개의 함수를 인자로 받는 고차함수입니다. reduce 메소드를 이용해서 배열로 받아온 인자를 순서대로 실행됩니다.
const pipe = (...args) => {
  return args.reduce((first,second) => (x,y) => second(first(x,y)))
}

// clock 함수는 위 3개의 로직을 순서대로 실행합니다.
const clock = pipe(change12HourToSecondAddN,checkOver24hour,secondTo24HourSystem)

//==================== test set =====================

const param1 = 'PM 01:00:00', param2 = 10;
const param3 = 'PM 11:59:59', param4 = 1;
const param5 = 'AM 12:10:00', param6 = 40;
const param7 = 'AM 05:24:03', param8 = 102392;
console.log(clock(param1,param2)) // return '13:00:10' 결과값은 string으로 반환합니다
console.log(clock(param3,param4)) // return '00:00:00'
console.log(clock(param5,param6)) // return '00:10:40'
console.log(clock(param7,param8)) // return '09:50:35'
