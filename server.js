const http = require("http");
const fs = require("fs");

const port = process.env.PORT || 3000;

// Get content type for images
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

// Read file and send response
function sendFile(fileName, contentType, res, statusCode = 200) {
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
    console.log("Request URL: " + req.url);

    // Clean the URL safely
    let cleanUrl = req.url.split('?')[0].trim().toLowerCase();

    // Remove trailing slash if present (e.g., /home/ -> /home)
    if (cleanUrl.endsWith('/') && cleanUrl.length > 1) {
        cleanUrl = cleanUrl.slice(0, -1);
    }

    // Check requested route
    if (cleanUrl === "/" || cleanUrl === "/home") {
        sendFile("./index.html", "text/html", res);
    } 
    else if (cleanUrl === "/about") {
        sendFile("./about.html", "text/html", res);
    } 
    else if (cleanUrl === "/contact") {
        sendFile("./contact.html", "text/html", res);
    } 
    else if (cleanUrl === "/style.css") {
        sendFile("./style.css", "text/css", res);
    } 
    else if (cleanUrl === "/script.js") {
        sendFile("./script.js", "application/javascript", res);
    } 
    else if (cleanUrl.startsWith("/images/")) {
        let imagePath = "." + cleanUrl;
        let type = getContentType(imagePath);
        sendFile(imagePath, type, res);
    } 
    else {
        console.log("404 Not Found triggered for URL: " + cleanUrl);
        sendFile("./404.html", "text/html", res, 404);
    }
});

server.listen(port, function () {
    console.log("Server started on port " + port);
    console.log("Open http://localhost:" + port + "/home");
});
