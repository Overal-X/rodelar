# Rodelar - Event Streaming Server

Rodelar is an open-source event streaming server inspired by services like [Ably](https://ably.com). It enables real-time data streaming and messaging over WebSocket connections, allowing you to build fast, scalable, and reliable event-driven applications.

With **Rodelar**, you can easily publish and subscribe to event streams in your system, using a simple and intuitive API for both Go and JavaScript/TypeScript environments (and any language you want).

## Key Features
- **Real-time event streaming:** Publish and subscribe to events in real-time over WebSocket connections.
- **Lightweight and fast:** Minimal client footprint, designed for performance and scalability.
- **Multi-language support:** Available for Go and JavaScript/TypeScript environments.
- **Custom event handlers:** Easily register and manage event-specific callbacks.
- **Simple API:** Effortless integration with your existing systems.

## Use Cases
- **Live data feeds:** Power real-time dashboards, live sports scores, or financial tickers.
- **Collaborative applications:** Enable live editing, messaging, and file-sharing in collaborative tools.
- **IoT device communication:** Stream data between IoT devices and centralized systems in real time.
- **Gaming:** Facilitate real-time interactions between players, leaderboards, and game events.

### JavaScript/TypeScript Example:
```ts
import { RodelarClient } from 'rodelar/core';

const client = new RodelarClient({ url: 'ws://localhost:3000/ws/' });

client.subscribe({
  queue: 'updates',
  callback: (data) => {
    console.log('Received event:', data);
  },
});

client.publish({
  event: 'updates',
  payload: { message: 'Hello, World!' },
});
```

### Go Example:
```go
package main

import (
	"fmt"
	"log"

	"github.com/overal-x/rodelar-go-sdk"
)

func main() {
	client, err := rodelar.NewRodelarClient(rodelar.RodelarClientConfig{Url: "ws://localhost:3000/ws/"})
	if err != nil {
		log.Fatal(err)
	}

	err = client.Subscribe(rodelar.SubscribeArgs{
		Event: "updates",
		Callback: func(m rodelar.Message) {
			fmt.Println("Received event:", m)
		},
	})
	if err != nil {
		log.Fatal(err)
	}
}
```

## Why Rodelar?
Rodelar provides a powerful, open-source alternative to commercial event-streaming platforms like Ably and Pusher. It offers flexibility, control, and extensibility for developers building real-time applications without the overhead of closed ecosystems.

---

Start building real-time applications today with **Rodelar**, and take control of your event streams!

# SDKs
- [Golang](https://github.com/Overal-X/rodelar-go-sdk)
- [TypeScript](https://github.com/Overal-X/rodelar-ts-sdk)
- and we look forward to your implementations too 😉

## Getting Started

Requirements
- Bun
- Redis Server (or use [./docker-compose.yaml](./docker-compose.yaml)

Install dependencies and start Elysia server
```bash
bun install
bun run dev
```

The WebSocket connection should be at `ws://localhost:3000/ws/`

## Production setup

### Using the Codebase
We recommend creating a fork of this project

Requirements
- Bun
- Redis Server

1. Clone the forked repo
2. Install dependecies
3. Add `.env` container Redis credentials
4. Run `bun run build`
5. Start the executable, `./rodelar`

For custom other build options, please refer to [Bun](https://bun.sh/docs/bundler)'s bundler documentation.

### Using Docker

Requirements
- Docker
- Redis Server

```sh
docker pull ghcr.io/overal-x/rodelar
docker run ghcr.io/overal-x/rodelar \
  -p 3000:3000 \
  -e REDIS_HOST=redis.host.local \
  -e REDIS_PORT=6379
  -e REDIS_USERNAME=username
  -e REDIS_PASSWORD=password
```

## Contributions
We welcome contributions! Feel free to submit issues, feature requests, or pull requests to improve Rodelar.
