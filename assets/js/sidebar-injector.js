document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("sidebar-container");
    
    if (container) {
        // 1. Fetch the shared sidebar file
        fetch("sidebar.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to load sidebar component.");
                }
                return response.text();
            })
            .then(htmlContent => {
                // 2. Inject the code into the container
                container.innerHTML = htmlContent;

                // 3. SMART AUTO-HIGHLIGHT: Get current page filename (e.g., "branches.html")
                const currentUrl = window.location.pathname.split("/").pop();
                // Fallback to dashboard if path is empty
                const activePage = currentUrl === "" ? "dashboard.html" : currentUrl;

                // 4. Find matching link and toggle the 'is-active' class natively
                const navLinks = container.querySelectorAll(".sidebar-link");
                navLinks.forEach(link => {
                    if (link.getAttribute("href") === activePage) {
                        link.classList.add("is-active");
                    } else {
                        link.classList.remove("is-active");
                    }
                });
            })
            .catch(error => console.error("Error rendering template component:", error));
    }
});