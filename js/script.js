let ticking = false;

window.addEventListener('scroll', function () {
    if (!ticking) {
        window.requestAnimationFrame(function () {
            const header = document.querySelector('.header');
            
            // Thêm hoặc xóa lớp khi cuộn
            if (window.scrollY > 50) {
                header.classList.add('scroll-down');
                header.classList.add('shrink');
                header.classList.remove('hidden');
            } else {
                header.classList.remove('scroll-down');
                header.classList.remove('shrink');
            }

            ticking = false;
        });
        ticking = true;
    }
});


/*back to back */
// Hiển thị nút khi cuộn xuống
window.onscroll = function () {
    const button = document.getElementById("backToTop");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  };

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* chuyển ảnh */
let slideIndex = 0;
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  let slideTimer;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = (i === index) ? "block" : "none";
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function changeSlide(n) {
    slideIndex += n;
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    showSlide(slideIndex);
    resetTimer();
  }
  function goToSlide(index) {
    slideIndex = index;
    showSlide(slideIndex);
    resetTimer();
  }
  function autoSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
    slideTimer = setTimeout(autoSlide, 10000);
  }

  function resetTimer() {
    clearTimeout(slideTimer);
    slideTimer = setTimeout(autoSlide, 10000);
  }

  showSlide(slideIndex);
  slideTimer = setTimeout(autoSlide, 10000);


/* active dropdown */
document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop();
  const items = document.querySelectorAll(".dropdown-item");

  items.forEach(item => {
    const linkPage = item.getAttribute("href").split("/").pop();
    if (linkPage === currentPage) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Nếu là trang con của services thì thêm active cho menu cha
  if (currentPage.startsWith("services")) {
    const mainMenu = document.querySelector(".nav-link.dropdown-toggle");
    if (mainMenu) {
      mainMenu.classList.add("active");
    }
  }
});

/* services */

document.addEventListener("DOMContentLoaded", () => {
  const posts = document.querySelector(".posts");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  let cards = document.querySelectorAll(".post-card");
  const visibleCards = 4;
  const moveCards = 2;
  const totalCards = cards.length;
  const cardWidth = cards[0].getBoundingClientRect().width + 20; // đảm bảo có width
  let index = 0;

  // Clone card đầu tiên vào cuối để tạo hiệu ứng tròn
  for (let i = 0; i < visibleCards; i++) {
    const clone = cards[i].cloneNode(true);
    posts.appendChild(clone);
  }

  function updateCarousel() {
    posts.style.transition = 'transform 0.5s ease';
    posts.style.transform = `translateX(-${index * cardWidth}px)`;
    console.log("Moving to index:", index, "=>", -index * cardWidth);
  }

  nextBtn.addEventListener("click", () => {
    index += moveCards;
    updateCarousel();

    if (index >= totalCards) {
      setTimeout(() => {
        posts.style.transition = 'none';
        index = 0;
        posts.style.transform = `translateX(0px)`;

        setTimeout(() => {
          posts.style.transition = 'transform 0.5s ease';
        }, 50);
      }, 500);
    }
  });

  prevBtn.addEventListener("click", () => {
    if (index === 0) {
      posts.style.transition = 'none';
      index = totalCards;
      posts.style.transform = `translateX(-${index * cardWidth}px)`;

      setTimeout(() => {
        posts.style.transition = 'transform 0.5s ease';
        index -= moveCards;
        updateCarousel();
      }, 20);
    } else {
      index -= moveCards;
      updateCarousel();
    }
  });
});

