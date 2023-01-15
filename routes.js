const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === "/") {
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<head><title>Form</title></head>");
        res.write("<body><form action='/message' method='POST'><input type='text' name='message' /> <button type='submit'>Send</button> </form></body>")
        res.write("</html>");
        return res.end();
    }
    if (url === "/message" && method === "POST") {
        const body = [];
        req.on("data", (chunk) => {
            console.log(chunk);
            body.push(chunk);
        })
        return req.on("end", (data) => {
            const parseString = Buffer.concat(body).toString();
            console.log(parseString);
            const message = parseString.split("=")[1];
            fs.writeFile("message.txt", message, () => {
                res.statusCode = 302;
                res.setHeader('Location', "/");
                return res.end();
            });
        })

    }
}

module.exports = requestHandler;