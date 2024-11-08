# Serve JSON

![ci](https://github.com/jonlabelle/serve-json/actions/workflows/ci.yml/badge.svg)

> A simple HTTP server for static JSON files. Simply drop your JSON files in the [`src/data`](src/data) directory and start serving!

Check out the [sample JSON file](src/data/sample.json) that comes with the project, or [start the server](#starting-the-server) to browse the files in the `data/` directory.

![Server JSON screenshot](screenshot.png 'Server JSON screenshot')

## Installation

### Installation Steps

To install the project, clone the repo and install the dependencies:

```console
# Clone the repo
git clone https://github.com/jonlabelle/serve-json.git

# Change to the repo directory
cd serve-json

# Install dependencies
npm install
```

### Starting the Server

To start the server, run the following command:

```console
npm serve
```

## Docker

### Running with Docker

To run the server in a Docker container, build the image and run the container:

```console
# Build the Docker image
docker build -t serve-json .

# Run the Docker container
docker run -p 3000:3000 serve-json
```

## License

[MIT](LICENSE)
