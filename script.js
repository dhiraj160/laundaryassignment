// Toggle button state between "Add Item" and "Remove Item"
function toggleItem(serviceName, servicePrice, btn) {
    if (btn.classList.contains("remove-btn-state")) {
        btn.innerHTML = 'Add Item <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>';
        btn.classList.remove("remove-btn-state");
    } else {
        btn.innerHTML = 'Remove Item <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
        btn.classList.add("remove-btn-state");
    }
}

// Set up page events when HTML is loaded
document.addEventListener("DOMContentLoaded", function () {
    
    // Booking Form
    const bookForm = document.getElementById("booking-form");
    if (bookForm) {
        bookForm.addEventListener("submit", function (e) {
            e.preventDefault(); 
            const nameInput = document.getElementById("full-name").value;
            
            if (nameInput.trim() === "") {
                alert("Please enter your name!");
                return;
            }

            alert("Thank you for your booking, " + nameInput + "! We will contact you soon.");
            bookForm.reset();
        });
    }

    // Newsletter Form
    const nlForm = document.getElementById("newsletter-form");
    if (nlForm) {
        nlForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const subscriberName = document.getElementById("newsletter-name").value;
            alert("Thank you for subscribing, " + subscriberName + "!");
            nlForm.reset();
        });
    }

    // Scroll to booking form when clicking username button
    const userBtn = document.querySelector(".user-btn");
    const nameInput = document.getElementById("full-name");
    
    if (userBtn && nameInput) {
        userBtn.addEventListener("click", function () {
            nameInput.scrollIntoView({ behavior: "smooth", block: "center" });
            nameInput.focus();
        });
    }
});
