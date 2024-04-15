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
