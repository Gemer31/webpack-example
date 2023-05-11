async function start() {
  return Promise.resolve("I'm async");
}

start().then(console.log);

class Util {
  static id = Date.now();
}

console.log("Util id: ", Util.id);