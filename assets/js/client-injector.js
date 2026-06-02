document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("client-sidebar-container");
    
    if (container) {
        fetch("client-sidebar.html")
            .then(response => {
                if (!response.ok) throw new Error("Failed to load client navigation node.");
                return response.text();
            })
            .then(htmlContent => {
                container.innerHTML = htmlContent;

                // 1. Automatic link routing highlighter
                const currentUrl = window.location.pathname.split("/").pop();
                const activePage = currentUrl === "" ? "member-dashboard.html" : currentUrl;

                const links = container.querySelectorAll(".sidebar-link");
                links.forEach(link => {
                    if (link.getAttribute("href") === activePage) {
                        link.classList.add("is-active");
                    } else {
                        link.classList.remove("is-active");
                    }
                });

                // 2. Mobile Responsive Hamburg Trigger Loop
                const burgerToggle = document.getElementById("clientBurgerToggle");
                const sidebarNav = document.getElementById("clientSidebarNav");

                if (burgerToggle && sidebarNav) {
                    burgerToggle.addEventListener("click", function() {
                        burgerToggle.classList.toggle("is-active");
                        sidebarNav.classList.toggle("is-open");
                    });
                }
            })
            .catch(error => console.error("Error setting template frame component:", error));
    }
});