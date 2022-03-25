# <발란 개인 과제>

## 프로젝트 소개

- 2022.03.21 ~ 2022.03.25
- 고객이 등록하고 확인할 수 있는 리뷰페이지를 구현합니다.

## 실행 방법

```
npm install

npm start
```

## 배포링크

[Link ] https://wanted-codestates-project-09.netlify.app/

## 기술 스택

- React
- redux-toolkit
- styled-component
- react-router-dom
- react-loading
- uuid
- react-icons
- react-slick
- react-share, react-copy-to-clipboard

<br/>

# 리뷰 리스트 페이지

<img width="200" alt="스크린샷 2022-03-25 오후 8 26 44" src="https://user-images.githubusercontent.com/56882147/160112703-4775a276-d425-46bc-9578-0aeb14be2423.png">
<img width="200" alt="스크린샷 2022-03-25 오후 8 27 01" src="https://user-images.githubusercontent.com/56882147/160112720-d8cb6939-fef9-47ec-9ca5-6f81ae5c75f8.png">

- **리뷰리스트 무한 스크롤**: IntersectionObserver api 사용해서 구현하였습니다. 제일 하단에 div태그를 만들어 태그를 바라보면 state에 10개씩 데이터가 추가 되도록 해주었습니다.
- **top 버튼 스크롤**: 스크롤바가 있는 태그의 ScrollY 구해서 ScrollY가 100을 넘기면 버튼이 생성됩니다.
  버튼을 누르게 되면 ScrollY의 값이 0이 되면서 화면이 최상단으로 이동합니다.
- **정렬(최신순, 리뷰카운트순, 랜덤 정렬)**: redux-toolkit을 활용해서 상태 데이터를 정렬해주었습니다.
- **리뷰 목록 표시 형태 선택(그리드 뷰, 리스트 뷰)**: 그리드뷰 컴포넌트와 리스트 뷰 컴포넌트를 만들어서 탭이 이동할 때마다 컴포넌트를 보여주게 해주었습니다.

# 리뷰 상세 페이지

<img width="200" alt="스크린샷 2022-03-25 오후 8 31 32" src="https://user-images.githubusercontent.com/56882147/160113388-862cfee4-9366-4f6d-90d5-3074fff10487.png">
<img width="200" alt="스크린샷 2022-03-25 오후 8 31 43" src="https://user-images.githubusercontent.com/56882147/160120783-f5523135-58df-4ad6-8b59-9910d274e3bd.png">
<br>

- **리뷰 상세 이미지** : 이미지의 length가 2이상일 경우 react-slick 라이브러리를 활용해 여러장의 이미지가 슬라이드 되도록 구현했습니다.
- **좋아요 기능** : 좋아요를 클릭하게 되면 reudx 상태의 해당 id값을 찾아 likeCnt+1 or likeCnt-1 를 해주었습니다. 클릭이 된 것을 확인 시켜주기 위해 state 객체에 clicked라는 키를 추가해 주었고 clicked의 유무에 따라 아이콘이 달리 보이게 해주었습니다.
- **댓글 기능** : 댓글을 onClick or enter를 했을 시 해당 리뷰의 id와 댓글을 redux slice로 넘겨주어 filter 메소드로 id 값을 찾고, 그 id에 해당하는 객체의 comments의 배열에 받아온 댓글과 아이디가 없는 관계로 uuid를 활용해 랜덤 id를 생성해 push를 해었습니다.
- **링크 공유 기능** : URL 복사는 react-copy-to-clipboard 라이브러리를 사용하였고, 트위터와 페이스북은
  react-share 라이브러리를 사용했습니다.
  카카오 같은 경우는 카카오 디벨로퍼에서 해당 key값을 발급 받아서 공유 기능을 구현하였습니다.

# 리뷰 등록 페이지

<img width="200" alt="스크린샷 2022-03-25 오후 9 10 38" src="https://user-images.githubusercontent.com/56882147/160118544-6bcab9f2-f7f6-4ef7-8e31-b18e1af03b82.png">
<img width="200" alt="스크린샷 2022-03-25 오후 9 11 27" src="https://user-images.githubusercontent.com/56882147/160118551-b3154faf-d380-478e-80fc-afe1b9c16290.png">

- **리뷰 제목, 내용**: 리뷰 제목과 리뷰 내용에는 글자 개수 제한을 주어 해당 글자에 미달 할 경우 경고 메시지와 빨간색 border를 주었으며, validation state 따로 만들어 조건에 만족 할때만 true로 바꿔,등록하기 버튼이 활성화 되도록 유효성 검사를 해주었습니다.
  - **이미지 선택**: 이미지는 최대 4개까지 저장이 가능하고 미리보기 기능을 만들어 어떤 사진이 선택되었는지 확인할 수 있게 해주었습니다.
  - **평점(별점5점 만점)**: hover로 별점의 개수를 확인할 수 있게 해주었고, 클릭 했을 시 마우스가 없더라도 별점의 색이 변경 돼 사용자가 몇점의 별점을 주었는지 확인할 수 있게 해주었습니다.
- **등록** : 리뷰 제목, 내용, 이미지, 평점이 모든 선택되면 등록 버튼이 활성화 되고, 클릭 했을 시 세션 스토리지에 데이터가 추가 되면서 메인 화면으로 이동합니다.

### 어려웠던 점 && 해결 방법

- 리덕스 toolkit을 거의 사용해보지 못해서 상태관리 하기가 많이 어려웠습니다.
  구글링과 공식문서를 통해서 조금씩 알아가면서 기능을 구현하였습니다. 이번에 리덕스 툴킷에 대해 많이 공부를 한 것 같습니다.
- 무한 스크롤을 구현 하였을 시 하단에 태그를 만들고 그것을 바라볼 때마다 useEffect로 데이터를 추가하는 형식으로 작성했는데 useEffect로 인해 메모리 누수 에러가 발생했습니다.
  발생이유은 router 이동 후, 이동 전 컴포넌트에서 state를 바꾸려는 시도가 있을 때 or 비동기 처리 과정일 때 발생한다고 나탑니다.

```
Can’t perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
```

- 어떤 코드에서 발생하는지 살펴보니 무한스크롤에 setTimeout을 걸어두었는데 이게 실행될때 다른 페이지로 이동하거나 클릭하게 되면 발생하는 것 같았습니다.
  구글링을 해서 클린업 함수로 이 문제를 해결할 수 있었습니다.
