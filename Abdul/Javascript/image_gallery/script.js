  const gallery = document.getElementById('gallery');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImg');
    const caption = document.getElementById('caption');
    const closeBtn = document.getElementById('closeBtn');
    const thumbnails = document.getElementById('thumbnails');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');

    let currentIndex = 0;
    let slideshowInterval;

    const imagesData = [
      { src: './images/photo-1533371452382-777777.avif', alt: 'Mountain' },
      { src: 'https://picsum.photos/id/1020/400/300', alt: 'Lake' },
      { src: 'https://picsum.photos/id/1025/400/300', alt: 'River' },
      { src: 'https://picsum.photos/id/1035/400/300', alt: 'Forest' },
      { src: 'https://picsum.photos/id/1045/400/300', alt: 'Beach' },
      { src: './images/photo-1753150972975-666.avif', alt: 'City' },
      { src: './images/photo-1664555771059-222222.avif', alt: 'River' },
      { src: './images/photo-1749308887577-999994.avif', alt: 'Forest' },
      { src: './images/photo-1750779940886-edfa100000000.avif', alt: 'Beach' },
      { src: 'https://picsum.photos/id/1055/400/300', alt: 'City' },
    ];

    const likeCounts = new Array(imagesData.length).fill(0);

    function buildGallery() {
      gallery.innerHTML = '';
      imagesData.forEach((img, index) => {
        const card = document.createElement('div');
        card.classList.add('image-card');
        card.innerHTML = `
          <img src="${img.src}" alt="${img.alt}" data-index="${index}" />
          <div class="like-btn" onclick="likeImage(${index})">❤️ <span id="like-${index}">${likeCounts[index]}</span></div>
        `;
        gallery.appendChild(card);
      });
    }

    function likeImage(index) {
      likeCounts[index]++;
      document.getElementById(`like-${index}`).textContent = likeCounts[index];
    }

    function openModal(index) {
      currentIndex = index;
      modalImg.src = imagesData[index].src;
      caption.textContent = imagesData[index].alt;
      modal.style.display = 'flex';
      renderThumbnails();
    }

    function renderThumbnails() {
      thumbnails.innerHTML = '';
      imagesData.forEach((img, idx) => {
        const thumb = document.createElement('img');
        thumb.src = img.src;
        thumb.alt = img.alt;
        if (idx === currentIndex) thumb.classList.add('active');
        thumb.addEventListener('click', () => openModal(idx));
        thumbnails.appendChild(thumb);
      });
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % imagesData.length;
      openModal(currentIndex);
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + imagesData.length) % imagesData.length;
      openModal(currentIndex);
    }

    function toggleFullscreen() {
      if (!document.fullscreenElement) {
        modal.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }

    function startSlideshow() {
      playBtn.style.display = 'none';
      pauseBtn.style.display = 'inline-block';
      slideshowInterval = setInterval(showNext, 1000);
    }

    function pauseSlideshow() {
      playBtn.style.display = 'inline-block';
      pauseBtn.style.display = 'none';
      clearInterval(slideshowInterval);
    }

    function toggleTheme() {
      document.body.classList.toggle('light-mode');
    }

    gallery.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') {
        const index = +e.target.dataset.index;
        openModal(index);
      }
    });

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      modalImg.src = '';
      pauseSlideshow();
    });

    document.addEventListener('keydown', (e) => {
      if (modal.style.display === 'flex') {
        if (e.key === 'Escape') {
          modal.style.display = 'none';
          pauseSlideshow();
        } else if (e.key === 'ArrowRight') {
          showNext();
        } else if (e.key === 'ArrowLeft') {
          showPrev();
        }
      }
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        pauseSlideshow();
      }
    });

    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    playBtn.addEventListener('click', startSlideshow);
    pauseBtn.addEventListener('click', pauseSlideshow);

    buildGallery();