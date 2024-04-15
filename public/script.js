document.addEventListener('DOMContentLoaded', function() {
    // Function to load the content of the markdown file and display it
    function loadMarkdownContent(filePath) {
        fetch(filePath)
            .then(response => response.text())
            .then(text => {
                const converter = new showdown.Converter();
                const html = converter.makeHtml(text);
                const postContent = document.getElementById('postContent');
                // Ensure the close button is inside postContent and then append the content
                postContent.innerHTML = '<div id="closeArticle" class="close-btn">&times;</div>' + html;
                postContent.style.display = 'block'; // Show the article element
                // Add event listener for the close button each time content is loaded
                document.getElementById('closeArticle').addEventListener('click', function() {
                    postContent.style.display = 'none'; // Hide the article element
                });
            });
    }

    // Function to hide the article content
    function hideArticleContent() {
        const postContent = document.getElementById('postContent');
        postContent.style.display = 'none'; // Hide the article element
    }

    // Handle clicks for both post and learning docket links
    const links = document.querySelectorAll('#posts a, #learning-docket a');

    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const filePath = e.target.getAttribute('data-md');
            loadMarkdownContent(filePath);
        });
    });
});


function glitchText() {
    const elements = document.querySelectorAll('.glitch');
    const overlay = document.createElement('div');
    overlay.className = 'hacker-effect';
    document.body.appendChild(overlay);

    elements.forEach(element => {
        const cloned = element.cloneNode(true);
        overlay.appendChild(cloned);
    });

    overlay.classList.add('active');

    let maxDuration = 1000;
    let elapsed = 0;
    const interval = 25;   

    const glitchInterval = setInterval(() => {
        if (elapsed >= maxDuration) {
            clearInterval(glitchInterval);
            overlay.classList.remove('active');  
            overlay.remove();  
        } else {
            document.querySelectorAll('.hacker-effect .glitch').forEach((element, index) => {
                if (Math.random() < 0.5) { 
                    let glitchedText = elements[index].innerText
                        .split('')
                        .map(char => Math.random() < 0.8 ? randomChar() : char)
                        .join('');
                    element.innerText = glitchedText;
                }
            });
            elapsed += interval;
        }
    }, interval);
}

function randomChar() {
    return String.fromCharCode(33 + Math.floor(Math.random() * 94));
}

document.addEventListener('DOMContentLoaded', glitchText);
