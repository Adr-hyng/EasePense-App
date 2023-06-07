const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

async function sendMessage() {
  const message = "Hello, this is a test message!";
  const response = await fetch("http://localhost:5000/api/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (response.ok) {
    console.log("Message sent successfully");
  } else {
    console.error("Failed to send message");
  }
}

sendMessage();
