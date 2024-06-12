const textElement = document.getElementById('animated-text');
const texts = ["developer", "creative person"];
let index = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100; // Speed of typing in milliseconds
const delayBetweenTexts = 2000; // Delay between texts in milliseconds

function type() {
    const currentText = texts[index];
    if (isDeleting) {
        textElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            index = (index + 1) % texts.length;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(type, typingSpeed / 2);
        }
    } else {
        textElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, delayBetweenTexts);
        } else {
            setTimeout(type, typingSpeed);
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if (texts.length > 0) {
        type();
    }

    const progressBars = document.querySelectorAll('.progress');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const percentage = bar.getAttribute('data-percentage');
                bar.style.width = `${percentage}%`;

                // Show the percentage after the animation completes
                setTimeout(() => {
                    const percentageSpan = bar.querySelector('.percentage');
                    percentageSpan.style.opacity = 1;
                    // Adjust the position of the percentage span to be outside the progress bar
                    percentageSpan.style.transform = `translateX(0)`;
                }, 2000); // Match the transition duration in CSS
            }
        });
    }, {
        threshold: 0.5 // Adjust as needed
    });

    progressBars.forEach(bar => {
        observer.observe(bar);
    });

    const circularprogressBars = document.querySelectorAll('.circular-progress');

    circularprogressBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        const circle = bar.querySelector('.progress-ring__circle');
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;

        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;

        const offset = circumference - (percentage / 100) * circumference;
        
        // Start animation after a short delay to ensure initial render
        setTimeout(() => {
            circle.style.strokeDashoffset = offset;
        }, 100);
    });

    const educationDetails = document.querySelectorAll('.education-detail');

    const educationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, { threshold: 0.1 });

    educationDetails.forEach((detail, index) => {
        educationObserver.observe(detail);
    });


    // projects


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

    const Projectobserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    });

    projectCards.forEach(card => {
        Projectobserver.observe(card);
    });    

})


/* circular progress bar */

const numbers = document.querySelectorAll(".number");

// Define the target percentages for each progress bar
const targetPercentages = [50, 75, 90,80]; // Adjust the percentages for each progress bar as needed

// Calculate the total durations for each progress bar to complete
const totalDurations = [1500, 2000, 2500,2100]; // Adjust the durations for each progress bar as needed

// Calculate the total frames for each duration
const framesPerSecond = 60;
const totalFrames = totalDurations.map(duration => duration / (1000 / framesPerSecond));

let frames = new Array(numbers.length).fill(0); // Initialize frames for each progress bar

const interval = setInterval(() => {
    let allCompleted = true;

    frames.forEach((frame, index) => {
        if (frame < totalFrames[index]) {
            allCompleted = false;
            frame++;

            // Calculate percentage based on current frame, total frames, and target percentage
            const percentage = Math.min((frame / totalFrames[index]) * targetPercentages[index], 100); // Ensure percentage doesn't exceed 100
            numbers[index].innerHTML = percentage.toFixed(0) + "%";

            frames[index] = frame;
        }
    });

    if (allCompleted) {
        clearInterval(interval);
    }
}, 1000 / framesPerSecond);