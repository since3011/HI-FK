/**
 * ==========================================
 * 포트폴리오 웹사이트 메인 컨트롤러 (main.js)
 * ==========================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- DOM 요소 참조 ---
  const bgContainer = document.getElementById("background-images-container");
  const titlesList = document.getElementById("scroll-titles-list");
  const scrollView = document.getElementById("main-scroll-view");
  const siteLogo = document.getElementById("site-logo");

  // 상태 관리 변수
  let currentActiveSlug = "";
  let isScrolling = false;
  let isImagesHidden = false; // 이미지 숨김 여부 플래그
  const projectImgStates = {}; // 각 프로젝트의 이미지 슬라이드 상태 저장

  // --- 1. 초기 렌더링 (데이터 바인딩) ---
  function initSite() {
    // A. 사이트 로고 설정
    if (siteLogo) {
      siteLogo.textContent = siteData.settings.logoText;
    }
    
    // B. 프로젝트 리스트 및 배경 이미지 생성
    bgContainer.innerHTML = "";
    titlesList.innerHTML = "";
    
    siteData.projects.forEach((proj, idx) => {
      // 프로젝트별 이미지 목록 구성 (proj.images가 있으면 사용, 없으면 image + detailMedia)
      const projectImages = proj.images || [proj.image, ...(proj.detailMedia || [])];
      const uniqueImages = Array.from(new Set(projectImages)).filter(Boolean);
      
      projectImgStates[proj.slug] = {
        images: uniqueImages,
        currentIndex: 0
      };

      // 배경 이미지 생성
      const bgItem = document.createElement("div");
      bgItem.id = `bg-img-${proj.slug}`;
      bgItem.className = "bg-image-item";
      
      // 여러 미디어(이미지/영상)들을 다 렌더링
      bgItem.innerHTML = uniqueImages.map((mediaUrl, imgIdx) => {
        const activeClass = imgIdx === 0 ? "sub-active" : "";
        const isVideo = mediaUrl.match(/\.(mp4|webm|mov|ogg|m4v)$/i);
        if (isVideo) {
          return `<video src="${mediaUrl}" autoplay loop muted playsinline class="${activeClass}"></video>`;
        } else {
          return `<img src="${mediaUrl}" alt="${proj.title}" class="${activeClass}" loading="lazy">`;
        }
      }).join("");
      bgContainer.appendChild(bgItem);

      // 타이틀 목록 생성
      const titleLink = document.createElement("a");
      titleLink.href = `#project-${proj.slug}`;
      titleLink.className = "scroll-title-link";
      titleLink.setAttribute("data-slug", proj.slug);
      titleLink.setAttribute("data-index", idx);
      titleLink.innerHTML = `<span class="scroll-title-text">${proj.title}</span>`;
      
      // 타이틀 클릭 시 -> 중앙으로 스크롤
      titleLink.addEventListener("click", (e) => {
        e.preventDefault();
        titleLink.scrollIntoView({ behavior: "smooth", block: "center" });
      });

      titlesList.appendChild(titleLink);
    });

    // 화면 로딩 후 첫 번째 타이틀 활성화
    setTimeout(updateActiveTitle, 100);
  }

  // --- 2. 스크롤 인터랙션 핵심 로직 (중앙 검정색 및 크기 조절) ---
  function updateActiveTitle() {
    const titleLinks = document.querySelectorAll(".scroll-title-link");
    const viewportCenter = window.innerHeight / 2;
    
    let closestLink = null;
    let minDistance = Infinity;

    titleLinks.forEach(link => {
      const rect = link.getBoundingClientRect();
      const linkCenter = rect.top + rect.height / 2;
      const distance = Math.abs(linkCenter - viewportCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestLink = link;
      }
    });

    // 가장 화면 중앙에 가까운 타이틀 활성화
    if (closestLink) {
      const activeSlug = closestLink.getAttribute("data-slug");
      const activeIndex = parseInt(closestLink.getAttribute("data-index"), 10);
      
      if (currentActiveSlug !== activeSlug) {
        currentActiveSlug = activeSlug;

        // 모든 타이틀 비활성화 후 활성화 처리
        titleLinks.forEach(link => link.classList.remove("is-active"));
        closestLink.classList.add("is-active");

        // 상단 로고 텍스트를 활성화된 프로젝트의 logoText 또는 기본 로고명으로 교체
        const activeProj = siteData.projects.find(p => p.slug === activeSlug);
        if (siteLogo) {
          if (activeProj && activeProj.logoText) {
            siteLogo.textContent = activeProj.logoText;
          } else {
            siteLogo.textContent = siteData.settings.logoText;
          }
        }

        // 활성 프로젝트에 해당하는 배경 이미지 노출 (이미지가 숨겨지지 않은 경우만)
        const bgItems = document.querySelectorAll(".bg-image-item");
        bgItems.forEach(item => item.classList.remove("is-active"));
        if (!isImagesHidden) {
          const activeBg = document.getElementById(`bg-img-${activeSlug}`);
          if (activeBg) {
            activeBg.classList.add("is-active");
            
            // 슬라이드 인덱스 초기화 및 첫 이미지 활성화
            const state = projectImgStates[activeSlug];
            if (state) {
              state.currentIndex = 0;
              const imgElements = activeBg.querySelectorAll("img, video");
              imgElements.forEach((img, imgIdx) => {
                if (imgIdx === 0) {
                  img.classList.add("sub-active");
                } else {
                  img.classList.remove("sub-active");
                }
              });
            }
          }
        }
      }

      // 활성 타이틀보다 위에 위치한 타이틀은 숨기고(opacity: 0), 아래 타이틀은 기본 투명도(0.4) 유지
      titleLinks.forEach((link, idx) => {
        const textEl = link.querySelector(".scroll-title-text");
        if (textEl) {
          if (idx < activeIndex) {
            textEl.style.opacity = "0";
            textEl.style.pointerEvents = "none";
          } else if (idx === activeIndex) {
            textEl.style.opacity = "1";
            textEl.style.pointerEvents = "auto";
          } else {
            textEl.style.opacity = "0.4";
            textEl.style.pointerEvents = "auto";
          }
        }
      });
    }
  }

  // 메인 스크롤 뷰 스크롤 감지
  scrollView.addEventListener("scroll", () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        updateActiveTitle();
        isScrolling = false;
      });
      isScrolling = true;
    }
  });

  // --- 3. 스페이스바 클릭 시 바로 아래 아이템으로 스크롤 ---
  window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      e.preventDefault(); // 기본 스크롤 다운 방지
      
      const activeLink = document.querySelector(".scroll-title-link.is-active");
      if (activeLink) {
        const currentIndex = parseInt(activeLink.getAttribute("data-index"), 10);
        const nextIndex = currentIndex + 1;
        const nextLink = document.querySelector(`.scroll-title-link[data-index="${nextIndex}"]`);
        
        if (nextLink) {
          nextLink.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          // 마지막 아이템인 경우 첫 번째 아이템으로 롤백 (순환구조)
          const firstLink = document.querySelector(`.scroll-title-link[data-index="0"]`);
          if (firstLink) {
            firstLink.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
      }
    }
  });

  // 왼쪽 상단 로고(타이틀) 클릭 시 이미지 표시 여부 토글 (토글 상태 관리)
  if (siteLogo) {
    siteLogo.addEventListener("click", (e) => {
      e.preventDefault();
      isImagesHidden = !isImagesHidden;
      
      const bgItems = document.querySelectorAll(".bg-image-item");
      if (isImagesHidden) {
        // 모든 배경 이미지 숨기기
        bgItems.forEach(item => item.classList.remove("is-active"));
      } else {
        // 현재 활성화된 배경 이미지 다시 보이기
        const activeBg = document.getElementById(`bg-img-${currentActiveSlug}`);
        if (activeBg) {
          activeBg.classList.add("is-active");
        }
      }
    });
  }

  // 화면 우측 영역(사진 영역) 클릭 감지하여 다음 이미지로 전환
  window.addEventListener("click", (e) => {
    // 클릭 좌표가 화면 가로의 우측 50% 영역인지 확인
    if (e.clientX > window.innerWidth / 2) {
      // 이미지가 숨김 상태이거나 활성화된 프로젝트가 없으면 작동 안 함
      if (isImagesHidden || !currentActiveSlug) return;

      const state = projectImgStates[currentActiveSlug];
      if (state && state.images.length > 1) {
        // 현재 활성 이미지의 active 클래스 해제
        const activeBg = document.getElementById(`bg-img-${currentActiveSlug}`);
        if (activeBg) {
          const imgElements = activeBg.querySelectorAll("img, video");
          if (imgElements.length > 0) {
            imgElements[state.currentIndex].classList.remove("sub-active");
            
            // 다음 인덱스로 전환 (순환 구조)
            state.currentIndex = (state.currentIndex + 1) % state.images.length;
            
            // 다음 이미지 활성화
            imgElements[state.currentIndex].classList.add("sub-active");
          }
        }
      }
    }
  });

  // --- 4. 마우스 트레일 효과 (하얀색 선 효과) ---
  const canvas = document.getElementById("trail-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let points = [];
    const maxAge = 15; // 선이 화면에 유지되는 프레임 수 (약 0.25초)
    const lineWidth = 1.6; // 기존 3.3px의 절반 두께 (1.6px)

    // 캔버스 크기를 윈도우 크기에 맞추는 함수 (Retina/고해상도 디스플레이 대응으로 칼 같은 선명함 유지)
    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // 마우스 움직임 감지하여 좌표 저장
    window.addEventListener("mousemove", (e) => {
      points.push({
        x: e.clientX,
        y: e.clientY,
        age: 0
      });
    });

    // 애니메이션 루프
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 점들의 나이 증가 및 소멸 처리
      for (let i = points.length - 1; i >= 0; i--) {
        points[i].age += 1;
        if (points[i].age > maxAge) {
          points.splice(i, 1);
        }
      }

      // 선 그리기 (Flat 100% white solid line)
      if (points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    }
    animate();
  }

  // --- 실행 시작 ---
  initSite();
});
