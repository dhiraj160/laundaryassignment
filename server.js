const http = require("http");
const fs = require("fs");

const port = process.env.PORT || 3000;

// Determine the correct Content-Type for image files
function getContentType(fileName) {
    if (fileName.endsWith(".png")) {
        return "image/png";
    }
    if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
        return "image/jpeg";
    }
    if (fileName.endsWith(".webp")) {
        return "image/webp";
    }
    
    // Default fallback
    return "application/octet-stream";
}

// Helper function to read and send a file to the browser
function sendFile(fileName, contentType, res, statusCode = 200) {
    // Read the requested file asynchronously before sending it to the browser
    fs.readFile(fileName, function (error, data) {
        if (error) {
            console.log("Error reading file: " + fileName);
            // If the file cannot be read, send a 500 server error
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("500 Internal Server Error");
            return;
        }

        // The content type tells the browser how to handle the file
        res.writeHead(statusCode, { "Content-Type": contentType });
        res.end(data);
    });
}

// Create the server to handle incoming requests
const server = http.createServer(function (req, res) {
    // Check the URL requested by the browser
    console.log("Request URL: " + req.url);

    // Clean the URL safely
    let cleanUrl = req.url.split('?')[0].trim().toLowerCase();

    // Remove trailing slash if present (e.g., /home/ -> /home)
    if (cleanUrl.endsWith('/') && cleanUrl.length > 1) {
        cleanUrl = cleanUrl.slice(0, -1);
    }

    // Route to the correct file based on the cleaned URL
    if (cleanUrl === "/" || cleanUrl === "" || cleanUrl.includes("home")) {
        sendFile("./index.html", "text/html", res);
    } 
    else if (cleanUrl.includes("about")) {
        sendFile("./about.html", "text/html", res);
    } 
    else if (cleanUrl.includes("contact")) {
        sendFile("./contact.html", "text/html", res);
    } 
    else if (cleanUrl.includes("style.css")) {
        sendFile("./style.css", "text/css", res);
    } 
    else if (cleanUrl.includes("script.js")) {
        sendFile("./script.js", "application/javascript", res);
    } 
    else if (cleanUrl.includes("images/")) {
        // For images, extract just the filename part to avoid path issues
        let parts = req.url.split('?')[0].split('/');
        let fileName = parts[parts.length - 1];
        
        let imagePath = "./images/" + fileName;
        let type = getContentType(imagePath);
        sendFile(imagePath, type, res);
    } 
    else {
        // Return the custom 404 page when the requested route does not exist
        console.log("404 Not Found triggered for URL: " + cleanUrl);
        sendFile("./404.html", "text/html", res, 404);
    }
});

server.listen(port, function () {
    console.log("Server started on port " + port);
    console.log("Open http://localhost:" + port + "/home");
});
