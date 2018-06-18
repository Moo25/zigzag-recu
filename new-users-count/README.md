# zigzag new users count per hour

> 배포 주소 :

## Stack

Everything in this project is in JavaScript.

### Frontend

- react
- react-router
- CSS Module + Sass

### dependencies(Frontend)

- chart.js, react-chartjs-2 : 차트 라이브러리
- sass-loader, node-sass : Sass 라이브러리
- open-color : 색상 파렛트 라이브러리
- immutable : 불변성 관리 라이브러리 (state 구조가 deep 해져서 사용했습니다)
- moment : 날짜 파싱,조작 라이브러리( 여기서는 주어진 유저데이터의 UTC시간을 파싱하기 위해 사용했습니다)

## 참고 문서, 동영상
- https://www.chartjs.org/
- https://momentjs.com/
- https://facebook.github.io/immutable-js/
- https://medium.com/@vickdayaram/using-chart-js-with-react-324b7fac8ee6 (using chart.js with React)
- stackoverflow, mdn 등등...

- 버그가 하나 있는데 시간 범위를 조절할 때 주어진 데이터 맨 끝 시간대에서는 반대방향으로 버튼을 3번 눌러야 리렌더링이 됩니다. state는 변하는데 리렌더링은 안되서 그거 하나가 흠입니다. 4시간 단위로 시간이 조절되고, 7일 단위로 그래프가 보여집니다.