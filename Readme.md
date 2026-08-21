# Assignment 6 - Simple Web Server with Node.js

## About this project

For this assignment I reused my Laundry Services frontend from before (we were told that was fine). The main point of this project was to build a Node.js server without using Express, just the built in `http` and `fs` modules, and get it to actually serve my HTML/CSS/JS/images correctly.

It runs locally on port 3000.

Honestly the hardest part for me wasn't the routing itself, it was remembering that `fs.readFile` is async and figuring out content types for images lol.

## Features

- Basic Node http server (no Express)
- Home / About / Contact routes
- Reads files asynchronously with `fs.readFile()`
- Serves CSS and JS files
- Serves images with correct content-type
- Custom 404 page
- Basic 500 error handling

## Routes

- `/` or `/home` → `index.html`
- `/about` → `about.html`
- `/contact` → `contact.html`
- `/style.css` → the css file
- `/script.js` → the js file
- `/images/...` → whatever image is requested
- anything else → `404.html`

## How it actually works

When a request comes in, the server looks at `req.url` and figures out which file to send back. At first I was just copy-pasting `fs.readFile()` for every single route which got messy fast, so I made a `sendFile()` helper that all the routes call instead. It reads the file, and if it works, `res.writeHead()` sets the status code + content type and `res.end()` sends it. If the route doesn't match anything, it sends back `404.html`. If the file read itself fails for some reason, it sends a 500.

### Status codes I used

- **200** – file found, sent normally
- **404** – route doesn't exist, so it shows my custom 404 page
- **500** – server tried to read a file but it failed

## What I learned

This was basically my first time using `http.createServer()` without any framework doing the work for me, so it made me actually understand what's happening under the hood. Some stuff I picked up:

- how routing manually with `req.url` works
- `fs.readFile()` is async so you have to handle it with a callback (this tripped me up at first)
- why content-type headers matter — browser doesn't know if it's getting HTML, an image, etc without it
- how to send proper error responses instead of just letting the server crash

## Notes on what changed as I worked on it

1. Started out with separate `fs.readFile()` blocks copy-pasted for every route, then refactored into one `sendFile()` helper once I realized how repetitive it was.
2. Realized images were breaking because I wasn't setting content-type correctly, so I added handling for PNG/JPG/JPEG/WebP.
3. Added actual error handling so a failed file read returns 500 instead of just hanging or crashing.
4. Cleaned up my frontend JS so it's just doing simple DOM stuff and form handling, nothing fancy.

## Project structure

```text
Laundry-Project/
│
├── server.js
├── package.json
├── index.html
├── about.html
├── contact.html
├── 404.html
├── style.css
├── script.js
├── README.md
├── images/
└── screenshot/
```

## Project Files & Screenshots

The complete project files and testing screenshots are available in the Google Drive link below:
[https://drive.google.com/file/d/1WyAqX3aYhj5qdWKYi-5bVXRyiNC-lf7U/view?usp=sharing](https://drive.google.com/file/d/1WyAqX3aYhj5qdWKYi-5bVXRyiNC-lf7U/view?usp=sharing)