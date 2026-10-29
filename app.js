/* ==========================================================================
   KLIR WEB — Tactile & Realistic Interactive Phone Demo
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initInteractiveMockup();
  initFaqAccordion();
});

function initInteractiveMockup() {
  const cardElement = document.getElementById("mockup-card");
  const bgCardImg = document.getElementById("bg-card-img");
  const completionScreen = document.getElementById("mockup-completed");
  
  const btnDelete = document.getElementById("mockup-btn-delete");
  const btnKeep = document.getElementById("mockup-btn-keep");
  const btnStar = document.getElementById("mockup-btn-star");
  const btnReset = document.getElementById("demo-btn-reset");
  const btnRestartInside = document.getElementById("btn-restart-mockup");

  const stampKeep = document.getElementById("stamp-keep");
  const stampDelete = document.getElementById("stamp-delete");
  const stampStar = document.getElementById("stamp-star");

  const cardTitle = document.getElementById("card-title");
  const cardSize = document.getElementById("card-size");
  const cardCategory = document.getElementById("card-category");
  const cardPhoto = document.getElementById("card-photo");
  const trashCounter = document.getElementById("mockup-trash-count");
  const freedSpaceText = document.getElementById("completed-freed-space");

  if (!cardElement) return;

  // Realistic sample gallery items with rich, fast photo URLs
  const demoItems = [
    {
      title: "Cumpleaños_01.jpg",
      sizeMb: 4.8,
      sizeText: "4.8 MB",
      category: "CÁMARA · RÁFAGA (1/4)",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80",
      isFav: false
    },
    {
      title: "Captura_Transferencia.png",
      sizeMb: 2.1,
      sizeText: "2.1 MB",
      category: "CAPTURAS DE PANTALLA",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop&q=80",
      isFav: false
    },
    {
      title: "Video_WhatsApp_4K.mp4",
      sizeMb: 76.5,
      sizeText: "76.5 MB",
      category: "VIDEOS PESADOS (+50MB)",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80",
      isFav: false
    },
    {
      title: "Foto_Movida_Borrador.jpg",
      sizeMb: 5.2,
      sizeText: "5.2 MB",
      category: "CÁMARA · BORROSA",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80",
      isFav: false
    },
    {
      title: "Atardecer_Favorito.jpg",
      sizeMb: 6.4,
      sizeText: "6.4 MB",
      category: "OCTUBRE · RETRATO",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
      isFav: true
    }
  ];

  let currentIndex = 0;
  let totalDeletedMb = 0;
  let deletedCount = 0;
  let isAnimating = false;

  function renderCurrentCard() {
    if (currentIndex >= demoItems.length) {
      // Show completion screen inside mockup
      if (completionScreen) {
        completionScreen.classList.add("active");
        if (freedSpaceText) {
          freedSpaceText.textContent = `Liberaste ${totalDeletedMb.toFixed(1)} MB descartando ${deletedCount} archivos repetidos o innecesarios.`;
        }
      }
      cardElement.style.display = "none";
      return;
    }

    cardElement.style.display = "flex";
    if (completionScreen) completionScreen.classList.remove("active");

    const item = demoItems[currentIndex];
    const nextItem = demoItems[currentIndex + 1];

    cardTitle.textContent = item.title;
    cardSize.textContent = item.sizeText;
    cardCategory.textContent = item.category;
    cardPhoto.style.backgroundImage = `url('${item.image}')`;

    // Next card in stack preview
    if (bgCardImg) {
      if (nextItem) {
        bgCardImg.style.backgroundImage = `url('${nextItem.image}')`;
        bgCardImg.style.display = "block";
      } else {
        bgCardImg.style.display = "none";
      }
    }
  }

  function swipeCard(direction) {
    if (isAnimating || currentIndex >= demoItems.length) return;
    isAnimating = true;

    const item = demoItems[currentIndex];
    let xOffset = 0;
    let yOffset = 0;
    let rotateDeg = 0;

    if (direction === "left") {
      xOffset = -380;
      rotateDeg = -22;
      stampDelete.style.opacity = "1";
      totalDeletedMb += item.sizeMb;
      deletedCount++;
      trashCounter.textContent = `🗑️ ${deletedCount}`;
    } else if (direction === "right") {
      xOffset = 380;
      rotateDeg = 22;
      stampKeep.style.opacity = "1";
    } else if (direction === "up") {
      yOffset = -380;
      stampStar.style.opacity = "1";
      item.isFav = true;
    }

    cardElement.style.transition = "transform 0.28s ease-out, opacity 0.28s ease-out";
    cardElement.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${rotateDeg}deg)`;
    cardElement.style.opacity = "0";

    setTimeout(() => {
      currentIndex++;
      stampKeep.style.opacity = "0";
      stampDelete.style.opacity = "0";
      if (stampStar) stampStar.style.opacity = "0";

      // Reset card position instantly
      cardElement.style.transition = "none";
      cardElement.style.transform = "translate(0, 0) rotate(0deg) scale(0.95)";
      cardElement.style.opacity = "0";

      renderCurrentCard();

      // Smooth pop-in
      requestAnimationFrame(() => {
        cardElement.style.transition = "transform 0.22s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.2s ease";
        cardElement.style.transform = "translate(0, 0) rotate(0deg) scale(1)";
        cardElement.style.opacity = "1";
        setTimeout(() => {
          isAnimating = false;
        }, 220);
      });
    }, 280);
  }

  function resetDemo() {
    currentIndex = 0;
    totalDeletedMb = 0;
    deletedCount = 0;
    trashCounter.textContent = "🗑️ 0";
    stampKeep.style.opacity = "0";
    stampDelete.style.opacity = "0";
    if (stampStar) stampStar.style.opacity = "0";
    cardElement.style.transition = "none";
    cardElement.style.transform = "translate(0, 0) rotate(0deg)";
    cardElement.style.opacity = "1";
    renderCurrentCard();
  }

  // Button clicks
  if (btnDelete) btnDelete.addEventListener("click", () => swipeCard("left"));
  if (btnKeep) btnKeep.addEventListener("click", () => swipeCard("right"));
  if (btnStar) btnStar.addEventListener("click", () => swipeCard("up"));
  if (btnReset) btnReset.addEventListener("click", resetDemo);
  if (btnRestartInside) btnRestartInside.addEventListener("click", resetDemo);

  // Keyboard navigation for desktop users
  window.addEventListener("keydown", (e) => {
    // Only if mockup is in viewport or active
    const rect = cardElement.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        swipeCard("left");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        swipeCard("right");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        swipeCard("up");
      }
    }
  });

  // Touch and pointer drag gestures
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;
  let isDragging = false;

  cardElement.addEventListener("pointerdown", (e) => {
    if (isAnimating) return;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    cardElement.style.transition = "none";
    cardElement.setPointerCapture(e.pointerId);
  });

  cardElement.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    currentX = e.clientX - startX;
    currentY = e.clientY - startY;
    const rotate = currentX * 0.07;

    cardElement.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotate}deg)`;

    // Visual stamps intensity
    if (currentX > 35) {
      stampKeep.style.opacity = Math.min(1, currentX / 110);
      stampDelete.style.opacity = "0";
      if (stampStar) stampStar.style.opacity = "0";
    } else if (currentX < -35) {
      stampDelete.style.opacity = Math.min(1, Math.abs(currentX) / 110);
      stampKeep.style.opacity = "0";
      if (stampStar) stampStar.style.opacity = "0";
    } else if (currentY < -40 && Math.abs(currentX) < 40) {
      if (stampStar) stampStar.style.opacity = Math.min(1, Math.abs(currentY) / 100);
      stampKeep.style.opacity = "0";
      stampDelete.style.opacity = "0";
    } else {
      stampKeep.style.opacity = "0";
      stampDelete.style.opacity = "0";
      if (stampStar) stampStar.style.opacity = "0";
    }
  });

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;

    if (currentX > 90) {
      swipeCard("right");
    } else if (currentX < -90) {
      swipeCard("left");
    } else if (currentY < -90 && Math.abs(currentX) < 60) {
      swipeCard("up");
    } else {
      cardElement.style.transition = "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.2s ease";
      cardElement.style.transform = "translate(0, 0) rotate(0deg)";
      stampKeep.style.opacity = "0";
      stampDelete.style.opacity = "0";
      if (stampStar) stampStar.style.opacity = "0";
    }
    currentX = 0;
    currentY = 0;
  }

  cardElement.addEventListener("pointerup", endDrag);
  cardElement.addEventListener("pointercancel", endDrag);

  renderCurrentCard();
}

function initFaqAccordion() {
  const faqHeaders = document.querySelectorAll(".faq-header");
  faqHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const card = header.closest(".faq-card");
      if (card) {
        card.classList.toggle("open");
      }
    });
  });
}
