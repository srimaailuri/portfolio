// script.js
const textElement = document.getElementById('animated-text');
const texts = ["developer", "creative person"];
let index = 0;
let charIndex = 0;
let currentText = '';
let isDeleting = false;
const typingSpeed = 100; // Speed of typing
const erasingSpeed = 50;  // Speed of erasing
const newTextDelay = 2000; // Delay between current and next text

function type() {
    if (!isDeleting && charIndex < texts[index].length) {
        currentText += texts[index].charAt(charIndex);
        charIndex++;
        textElement.textContent = currentText;
        setTimeout(type, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
        currentText = texts[index].substring(0, charIndex - 1);
        charIndex--;
        textElement.textContent = currentText;
        setTimeout(type, erasingSpeed);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            index = (index + 1) % texts.length;
        }
        setTimeout(type, newTextDelay);
    }
}

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
    setTimeout(type, newTextDelay);

    /* progress bar*/
    const progressBars = document.querySelectorAll('.progress-bar');

    progressBars.forEach(function(bar) {
      const percentage = bar.getAttribute('data-percentage');
      let count = 0;
      const interval = setInterval(function() {
        if (count <= percentage) {
          bar.style.width = count + '%';
          count++;
        } else {
          clearInterval(interval);
        }
      }, 15); // Adjust the speed of the animation by changing the interval time
    });



    /* circular bar*/

    const circularProgressBars = document.querySelectorAll('.circular-progress');

    circularProgressBars.forEach(function(bar) {
      const percentage = bar.getAttribute('data-percentage');
      const progressCircle = bar.querySelector('.progress-circle');
      const percentageElement = bar.querySelector('.percentage');

      let count = 0;
      const interval = setInterval(function() {
        if (count <= percentage) {
          const offset = 440 - (440 * count) / 100;
          progressCircle.style.strokeDashoffset = offset;
          percentageElement.textContent = `${count}%`;
          count++;
        } else {
          clearInterval(interval);
        }
      }, 15); // Adjust the speed of the animation by changing the interval time
    });

    /* education */

    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        threshold: 0.1 // Adjust the threshold as needed
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    /* projects */

    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const modalTitle = document.getElementById('projectModalLabel');
    const modalImage = document.getElementById('projectModalImage');
    const modalDescription = document.getElementById('projectModalDescription');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            filterProjects(filter);
        });
    });

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const description = card.getAttribute('data-description');
            const imgSrc = card.querySelector('img').src;

            modalTitle.textContent = title;
            modalImage.src = imgSrc;
            modalDescription.textContent = description;
        });
    });

    function filterProjects(filter) {
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    const educationobserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    });

    projectCards.forEach(card => {
        educationobserver.observe(card);
    });

    
});





