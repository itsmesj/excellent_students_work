document.addEventListener("DOMContentLoaded",function(){
  const gallery = document.getElementById('gallery');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const modalDesc = document.getElementById('modalDesc');
  const modalTitle = document.getElementById('modalTitle');
  const closeBtn = document.getElementById('closeBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextbtn = document.getElementById('nextBtn');
  const slideshowBtn = document.getElementById('slideshowBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const searchBox = document.getElementById('searchBox');
  const toggleTheme = document.getElementById('toggleTheme');

  let currentIndex = 0;
  let slideshowInterval;

  const immages = Array.from(gallery.querySelectorAll('img'));

  function openModal(index){
    currentIndex = index;
    const img = immages[index];
    modalImg.src = img.dataset.full ||img.src;
    modalTitle.textContent = img.dataset.title || "";
    modalDesc.textContent = img.dataset.desc ||"";
    downloadBtn.href = img.dataset.full;
    modal.style.display = "flex";
  }
   function closeMOdal(){
    modal.style.display = "none";
    clearInterval(slideshowInterval);
   }

   function showNext(){
    currentIndex = (currentIndex + 1) % immages.length;
    openModal(currentIndex);
   }

   function showPrev(){
    currentIndex = (currentIndex - 1 + immages.length) % immages.length;
    openModal(currentIndex);
   }

   function toggleSlideshow(){
    if(slideshowInterval){
      clearInterval(slideshowInterval);
      slideshowInterval = null;
      slideshowBtn.textContent = 'Slideshow';
    }else{
      slideshowInterval = setInterval(showNext, 2000);
      slideshowBtn.textContent = 'Stop';
    }
   }
   function filterImages(){
    const query = searchBox.value.toLowerCase();
    immages.forEach(img => {
      const tittle = img.dataset.title?.toLowerCase() || "";
      const desc = img.dataset.desc?.toLowerCase()  || "";
      img.style.display = tittle.includes(query) || desc.includes(query) ? 'block' : 'none';
    });
   }
   function toggleThemeMode(){
    document.body.classList.toggle('dark');
    toggleTheme.textContent = document.body.classList.contains('dark') ? 'light Mode' : 'dark Mode';
   }

   immages.forEach((img,index) => {
    img.addEventListener("click",() => openModal(index));
   });
   closeBtn.addEventListener("click", closeMOdal);
   nextBtn.addEventListener("click", showNext);
   prevBtn.addEventListener("click", showPrev);
   slideshowBtn.addEventListener("click", toggleSlideshow);
   searchBox.addEventListener("input", filterImages);
   toggleTheme.addEventListener("click", toggleThemeMode);

   window.addEventListener("click", function(e){
    if(e.target === modal) closeModal();
   });
})



