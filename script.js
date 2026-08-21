// This function handles the visual state of the service buttons.
// The serviceName and servicePrice parameters are kept for compatibility with the existing HTML onclick attributes.
function toggleItem(serviceName, servicePrice, btn) {
    // Check which state the button is currently in by looking at its class
    if (btn.classList.contains("remove-btn-state")) {
        // Change the button back so the user can add the item again
        btn.innerHTML = 'Add Item <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>';
        btn.classList.remove("remove-btn-state");
    } else {
        // Change the button so the user can remove the item
        btn.innerHTML = 'Remove Item <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
        btn.classList.add("remove-btn-state");
    }
}

// Wait for the HTML document to fully load before trying to access elements
document.addEventListener("DOMContentLoaded", function () {
    
    // We must check if the booking form exists before adding an event listener, 
    // because this script is also used on the About and Contact pages where the form is missing.
    const bookForm = document.getElementById("booking-form");
    if (bookForm) {
        bookForm.addEventListener("submit", function (e) {
            // Stop the form from refreshing the page when it is submitted
            e.preventDefault(); 
            
            // Check if the user entered a name before proceeding
            const nameInput = document.getElementById("full-name").value;
            if (nameInput.trim() === "") {
                alert("Please enter your name!");
                return;
            }

            // Show a simple success message and clear the form after submission
            alert("Thank you for your booking, " + nameInput + "! We will contact you soon.");
            bookForm.reset();
        });
    }

    // Handle newsletter subscription in a similar way if the form is present on the page
    const nlForm = document.getElementById("newsletter-form");
    if (nlForm) {
        nlForm.addEventListener("submit", function (e) {
            // Prevent default page reload
            e.preventDefault();
            const subscriberName = document.getElementById("newsletter-name").value;
            alert("Thank you for subscribing, " + subscriberName + "!");
            nlForm.reset();
        });
    }

    // If the user clicks the top right username button, scroll smoothly down to the booking form
    const userBtn = document.querySelector(".user-btn");
    const nameInput = document.getElementById("full-name");
    
    // We check both elements to prevent errors on pages where either the button or the form is missing
    if (userBtn && nameInput) {
        userBtn.addEventListener("click", function () {
            nameInput.scrollIntoView({ behavior: "smooth", block: "center" });
            nameInput.focus();
        });
    }
});
