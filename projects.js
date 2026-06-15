/**
 * ==========================================
 * 나만의 웹사이트 설정 및 프로젝트 데이터 파일 (projects.js)
 * ==========================================
 * 
 * 이 파일에서 웹사이트의 텍스트, SNS 링크, 그리고 각 프로젝트의 정보와 
 * 텍스트 스크롤 시 배경에 나타날 이미지의 위치/크기를 쉽게 수정할 수 있습니다.
 */

const siteData = {
  // 1. 웹사이트 기본 정보 설정
  settings: {
    logoText: "HI FK",       // 좌측 상단 및 중앙 상단에 표시될 로고 텍스트
    contactEmail: "", // 이메일 주소
    instagramUrl: "",
    vimeoUrl: "",
  },

  // 2. 자기소개 (About) 정보 - 메뉴(+)를 열면 노출되는 정보입니다.
  about: {
    text: [
      "This is my personal portfolio website."
    ],
    profileImage: "", // 자기소개 우측 프로필 사진 경로
    representation: []
  },

  // 3. 포트폴리오 프로젝트 목록
  // 아래 항목들의 텍스트(title)를 수정하면 스크롤 리스트의 글씨가 바뀌며,
  // layout 설정을 통해 각 이미지의 크기와 배경상의 위치를 마음대로 배치할 수 있습니다!
  projects: [
    {
      slug: "FICTIVE KIN",
      title: "FICTIVE KIN",
      logoText: "HELLO",
      category: "COMMISSION",
      year: "2024",
      image: "img/Hifk.JPG",
      // 배경 이미지의 레이아웃 설정 (가로폭 width, 왼쪽 위치 left, 위쪽 위치 top)
      layout: {
        width: "26vw",    // 이미지 가로 폭 (화면 가로폭의 26%)
        left: "24vw",     // 왼쪽에서 떨어진 거리 (화면 가로폭의 24%)
        top: "13vh"       // 위쪽에서 떨어진 거리 (화면 세로높이의 13%)
      },
      // 클릭 시 보여줄 상세 이미지 목록
      detailMedia: [
        "img/IMG_6204.JPG",
        "img/IMG_3607.jpg"
      ]
    },
    {
      slug: "nike-x-lego",
      title: "JOANNA CHO",
      logoText: "I'M",
      category: "COMMISSION",
      year: "2024",
      image: "img/IMG_3372.jpg",
      layout: {
        width: "35vw",
        left: "45vw",
        top: "20vh"
      },
      detailMedia: [
        "img/IMG_8378.jpg",
        "img/I-knew-it.jpg"
      ]
    },
    {
      slug: "after-dark",
      title: "JEJU",
      logoText: "I'M FROM",
      category: "PERSONAL",
      year: "2023",
      image: "img/IMG_2755.jpg",
      layout: {
        width: "28vw",
        left: "15vw",
        top: "28vh"
      },
      detailMedia: [
        "img/Jeju Island Extension_Mobile.png.webp",
        "img/IMG_1787.JPG",
        "img/IMG_5367.JPG"
      ]
    },
    {
      slug: "swim",
      title: "DESIGN",
      logoText: "I LOVE",
      category: "COMMISSION",
      year: "2024",
      image: "img/IMG_6679.JPG",
      layout: {
        width: "40vw",
        left: "30vw",
        top: "18vh"
      },
      detailMedia: [
        "img/IMG_9930.JPG",
        "img/IMG_8048.JPG",
        "img/IMG_1815.JPG",
        "img/IMG_1834.JPG",
        "img/IMG_8147.JPG"
      ]
    },
    {
      slug: "velocidade",
      title: "WORK",
      logoText: "JUST",
      category: "MOTION",
      year: "2024",
      image: "img/IMG_1810.JPG",
      layout: {
        width: "25vw",
        left: "12vw",
        top: "22vh"
      },
      detailMedia: [
        "img/IMG_2769.jpg",
        "img/IMG_8364.JPG",
        "img/IMG_9396.jpg",
        "img/IMG_9393.jpg"
      ]
    },
    {
      slug: "in-gravitas",
      title: "RISD",
      logoText: "I GO TO",
      category: "PERSONAL",
      year: "2022",
      image: "img/IMG_0812.jpg",
      layout: {
        width: "36vw",
        left: "50vw",
        top: "26vh"
      },
      detailMedia: [
        "img/paula.jpg",
        "img/Origami Layout-20 copy.jpg",
        "img/BOUT TIME-15 copy.png",
        "img/london eye 12 copy.jpeg",
        "img/DSC00252 copy.JPG",
        "img/IMG_0792.jpg",
        "img/268.jpg"
      ]
    },
    {
      slug: "der-maestro",
      title: "AI",
      logoText: "I'M INTERESTED IN",
      category: "COMMISSION",
      year: "2024",
      image: "img/989844_medieval, M 5 copy.mp4",
      layout: {
        width: "30vw",
        left: "20vw",
        top: "10vh"
      },
      detailMedia: [
        "img/polka 04 (portfolio) copy.mov"
      ]
    },
    {
      slug: "iichliwp",
      title: "@fictivekin",
      logoText: "AND OMG NOW I AM",
      category: "PERSONAL",
      year: "2023",
      image: "img/social.png",
      layout: {
        width: "33vw",
        left: "58vw",
        top: "15vh"
      },
      detailMedia: [
        "img/d71038d43147393c2462965c75c55055.gif"
      ]
    }
  ]
};
