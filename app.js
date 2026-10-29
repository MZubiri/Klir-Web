/* ==========================================================================
   KLIR WEB — Interactive Client Script
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initInteractiveMockup();
  initFaqAccordion();
});

// --------------------------------------------------------------------------
// Interactive Phone Mockup Card Swiping
// --------------------------------------------------------------------------
function initInteractiveMockup() {
  const cardElement = document.getElementById("mockup-card");
  const btnDelete = document.getElementById("mockup-btn-delete");
  const btnKeep = document.getElementById("mockup-btn-keep");
  const btnStar = document.getElementById("mockup-btn-star");
  
  const stampKeep = document.getElementById("stamp-keep");
  const stampDelete = document.getElementById("stamp-delete");
  
  const cardTitle = document.getElementById("card-title");
  const cardSize = document.getElementById("card-size");
  const cardCategory = document.getElementById("card-category");
  const cardIcon = document.getElementById("card-icon");
  const trashCounter = document.getElementById("mockup-trash-count");
  
  if (!cardElement) return;

  const demoItems = [
    {
      title: "IMG_20261028_01.jpg",
      size: "4.2 MB",
      category: "CÁMARA · RÁFAGA (1/4)",
      icon: "📸",
      isFav: false
    },
    {
      title: "Screenshot_20261025.png",
      size: "1.1 MB",
      category: "CAPTURAS DE PANTALLA",
      icon: "📱",
      isFav: false
    },
    {
      title: "VID_20261014_Party.mp4",
      size: "148.5 MB",
      category: "VIDEOS GRANDES",
      icon: "🎥",
      isFav: false
    },
    {
      title: "PXL_20260905_Blurry.jpg",
      size: "3.8 MB",
      category: "CÁMARA · DUPLICADO",
      icon: "🌄",
      isFav: false
    },
    {
      title: "Portrait_Family_Best.jpg",
      size: "5.4 MB",
      category: "FAVORITAS POTENCIALES",
      icon: "✨",
      isFav: true
    }
  ];

  let currentIndex = 0;
  let deleteCount = 0;
  let isAnimating = false;

  function updateCardUI() {
    if (currentIndex >= demoItems.length) {
      // Completed state inside mockup
      cardTitle.textContent = "¡Galería al día!";
      cardSize.textContent = `${deleteCount} listas para borrar`;
      cardCategory.textContent = "COMPLETADO";
      cardIcon.textContent = "🎉";
      if (btnDelete) btnDelete.disabled = true;
      if (btnKeep) btnKeep.disabled = true;
      if (btnStar) btnStar.disabled = true;
      
      setTimeout(() => {
        // Reset demo automatically after 3.5s
        currentIndex = 0;
        deleteCount = 0;
        trashCounter.textContent = `🗑️ 0`;
        if (btnDelete) btnDelete.disabled = false;
        if (btnKeep) btnKeep.disabled = false;
        if (btnStar) btnStar.disabled = false;
        updateCardUI();
      }, 3500);
      return;
    }

    const item = demoItems[currentIndex];
    cardTitle.textContent = item.title;
    cardSize.textContent = item.size;
    cardCategory.textContent = item.category;
    cardIcon.textContent = item.icon;
  }

  function swipeCard(direction) {
    if (isAnimating || currentIndex >= demoItems.length) return;
    isAnimating = true;

    const isDelete = direction === "left";
    const xOffset = isDelete ? -350 : 350;
    const rotateDeg = isDelete ? -20 : 20;

    if (isDelete) {
      stampDelete.style.opacity = "1";
      deleteCount++;
      trashCounter.textContent = `🗑️ ${deleteCount}`;
    } else {
      stampKeep.style.opacity = "1";
    }

    cardElement.style.transition = "transform 0.28s ease-out, opacity 0.28s ease-out";
    cardElement.style.transform = `translate(${xOffset}px, 20px) rotate(${rotateDeg}deg)`;
    cardElement.style.opacity = "0";

    setTimeout(() => {
      currentIndex++;
      stampKeep.style.opacity = "0";
      stampDelete.style.opacity = "0";
      
      // Reset position instantly
      cardElement.style.transition = "none";
      cardElement.style.transform = "translate(0, 0) rotate(0deg) scale(0.96)";
      cardElement.style.opacity = "0";
      
      updateCardUI();

      // Animate in
      requestAnimationFrame(() => {
        cardElement.style.transition = "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.2s ease";
        cardElement.style.transform = "translate(0, 0) rotate(0deg) scale(1)";
        cardElement.style.opacity = "1";
        setTimeout(() => {
          isAnimating = false;
        }, 220);
      });
    }, 280);
  }

  if (btnDelete) {
    btnDelete.addEventListener("click", () => swipeCard("left"));
  }

  if (btnKeep) {
    btnKeep.addEventListener("click", () => swipeCard("right"));
  }

  if (btnStar) {
    btnStar.addEventListener("click", () => {
      if (currentIndex < demoItems.length) {
        demoItems[currentIndex].isFav = !demoItems[currentIndex].isFav;
        cardCategory.textContent = demoItems[currentIndex].isFav ? "⭐ EN FAVORITAS" : "DESMARCADA";
      }
    });
  }

  // Pointer / Touch Drag Support
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  cardElement.addEventListener("pointerdown", (e) => {
    if (isAnimating) return;
    isDragging = true;
    startX = e.clientX;
    cardElement.style.transition = "none";
  });

  window.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    currentX = e.clientX - startX;
    const rotate = currentX * 0.08;
    cardElement.style.transform = `translate(${currentX}px, 0) rotate(${rotate}deg)`;

    if (currentX > 40) {
      stampKeep.style.opacity = Math.min(1, currentX / 120);
      stampDelete.style.opacity = "0";
    } else if (currentX < -40) {
      stampDelete.style.opacity = Math.min(1, Math.abs(currentX) / 120);
      stampKeep.style.opacity = "0";
    } else {
      stampKeep.style.opacity = "0";
      stampDelete.style.opacity = "0";
    }
  });

  window.addEventListener("pointerup", () => {
    if (!isDragging) return;
    isDragging = false;
    if (currentX > 100) {
      swipeCard("right");
    } else if (currentX < -100) {
      swipeCard("left");
    } else {
      cardElement.style.transition = "transform 0.2s ease, opacity 0.2s ease";
      cardElement.style.transform = "translate(0, 0) rotate(0deg)";
      stampKeep.style.opacity = "0";
      stampDelete.style.opacity = "0";
    }
    currentX = 0;
  });

  updateCardUI();
}

// --------------------------------------------------------------------------
// FAQ Accordion
// --------------------------------------------------------------------------
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
