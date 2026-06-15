# 🎬 Lucas Garrido 스타일 포트폴리오 웹사이트 가이드

이 프로젝트는 [lucasgarrido.com](https://lucasgarrido.com/)에서 영감을 받은 **센터 포커스 타이포그래피 스크롤 기반 포트폴리오**입니다.
사용자가 마우스 스크롤을 내릴 때 화면 정중앙에 위치한 프로젝트 이름만 선명한 검정색으로 커지며, 배경에 해당하는 고유한 크기와 위치의 예술적 이미지 미리보기가 페이드인 됩니다.

---

## 🛠️ 콘텐츠 커스텀 방법 (가장 쉬운 수정)

모든 데이터는 **`projects.js`** 파일 하나로 관리됩니다. 이 파일만 텍스트 에디터로 열어서 수정하면 사이트의 거의 모든 내용이 자동으로 업데이트됩니다.

### 1. 사이트 기본 정보 수정 (`projects.js` 상단)
```javascript
settings: {
  logoText: "LUCAS GARRIDO",         // 상단 및 하단에 표시될 이름/로고
  contactEmail: "info@lucasgarrido.com", // 연락받을 이메일 주소
  instagramUrl: "https://instagram.com/...", // 인스타그램 주소
  vimeoUrl: "https://vimeo.com/..."          // 비메오 주소
}
```

### 2. 자기소개 글 및 프로필 사진 수정 (`projects.js` 중간)
좌측 상단의 `+` 버튼을 클릭했을 때 나타나는 정보입니다.
```javascript
about: {
  text: [
    "여기에 본인의 소개글 첫 번째 문단을 작성하세요.",
    "두 번째 문단도 작성할 수 있습니다."
  ],
  profileImage: "img/profile.jpg", // 프로필 사진 파일 경로
  representation: [
    { role: "에이전시 정보 / 역할", name: "회사 이름", url: "링크 주소" }
  ]
}
```

### 3. 프로젝트 목록 및 배경 이미지 위치 커스텀 (`projects.js` 하단)
각 프로젝트의 이름과 스크롤 시 화면 어디에 이미지가 뜰지(`layout`) 자유롭게 설정할 수 있습니다.
```javascript
projects: [
  {
    slug: "project-slug-name", // 고유 영문 ID (영어 소문자와 대시-만 사용)
    title: "프로젝트 제목",
    category: "COMMISSION / PERSONAL 등 카테고리",
    year: "작업 년도 (예: 2026)",
    image: "img/대표이미지.jpg", // 스크롤 시 배경에 뜨는 이미지 경로
    
    // 🎨 이미지 배치 레이아웃 (반응형 뷰포트 기준 vw/vh 단위 권장)
    layout: {
      width: "30vw",  // 이미지 가로 폭 (화면 가로 너비의 30%)
      left: "15vw",   // 화면 왼쪽에서 떨어진 거리 (화면 가로 너비의 15%)
      top: "20vh"     // 화면 위쪽에서 떨어진 거리 (화면 세로 높이의 20%)
    },
    
    // 🔍 상세 페이지(클릭 시) 들어갈 이미지 목록 (위에서 아래로 세로로 쌓임)
    detailMedia: [
      "img/상세사진1.jpg",
      "img/상세사진2.jpg"
    ]
  }
]
```

---

## 🚀 GitHub Pages를 통한 무료 배포 방법

이 웹사이트는 데이터베이스나 서버 백엔드가 없는 **바닐라 HTML/CSS/JS**로 제작되어 GitHub Pages를 통해 클릭 몇 번만으로 무료 배포할 수 있습니다.

1. 본인의 **GitHub 계정**에 로그인하고 새로운 Repository(저장소)를 생성합니다.
2. 이 폴더의 파일들(`index.html`, `style.css`, `main.js`, `projects.js`, `README.md`, `img/` 폴더)을 생성한 저장소에 업로드(Push)합니다.
3. GitHub 저장소 페이지 우측 상단의 **Settings** 메뉴로 이동합니다.
4. 좌측 메뉴에서 **Pages**를 클릭합니다.
5. **Build and deployment** 섹션의 Source를 `Deploy from a branch`로 설정하고, Branch를 `main` 또는 `master` (`/ (root)`)로 선택한 후 **Save** 버튼을 누릅니다.
6. 1~2분 후 새로고침하면 `https://사용자이름.github.io/저장소이름/` 주소로 웹사이트가 라이브 배포됩니다!
