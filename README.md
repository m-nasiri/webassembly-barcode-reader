# webassembly-barcode-reader

It was originally ported from the ZXing-C++ Library. It is compiled to WebAssembly and loaded in html static page. It can detect most barcode formats and recognize them correctly.

There are two methods for running this project:

## Make project and running that with the help of emrun web server

1- Install Emscripten if not done already.

2- Build project with emcmake

```sh
mkdir build
cd build
emcmake cmake .. 
cmake --build .
```

3- Finally, run project with emrun (emrun is a command line tool that can run generated HTML pages via a locally launched web server.)

```sh
cd ..
emrun --no_browser --port=7000 --serve_after_close index.html
```

## Run project with the help of docker

We attached WebAssembly binary to repository, so you can only build docker and run that.

```sh
docker build -t barcode-reader .
docker run --rm --name barcode -p 7000:7000 -d barcode-reader
```

## Open webpage

you will be able to access the barcode webpage in port 7000 (http://localhost:7000/)
