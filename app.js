// import 'http' module
const http = require("http");
// import 'fs' module
const fs = require("fs");

// creating server listners
// method 1: extenal function
// function rqListener(req, res) {

// }

// http.createServer(reqListener);

// method 2: anonymous function
// http.createServer(
//   function(req,res) {

//   }
// );

// method 3: Next generation Js : Arrow functions
const server = http.createServer((req, res) => {
  // REQUSET
  // stores current requst url
  const url = req.url;
  // stores current method
  const method = req.method;

  // Execute current if url === '/'
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }

  // Execute current if url === '/message' and method === 'POST'
  if (url === "/message" && method === "POST") { 
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
      console.log(chunk);
    });
    // execute 'end' listener once 'data' listener is done
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split("=")[1];
      console.log(message);
      fs.writeFile("message.txt", message, (err) => {
        // RESPONSE
        // res.writeHead(302,{});
        // OR
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  // hard exits the event loop
  // process.exit();

  //  RESPONSE
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
});

// listen to incoming requsts
server.listen(3000);
