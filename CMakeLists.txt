cmake_minimum_required(VERSION 3.16)

project(barcode-reader
  VERSION 0.1
  DESCRIPTION "Build WebAssembly"
  LANGUAGES C CXX)

set (CMAKE_CXX_STANDARD 17)

option (BUILD_READERS "Build with reader support (decoders)" ON)

add_definitions ("-s DISABLE_EXCEPTION_CATCHING=0")

if (NOT CMAKE_BUILD_TYPE)
    set (CMAKE_BUILD_TYPE "MinSizeRel" CACHE STRING "Choose the type of build." FORCE)
endif()

include(FetchContent)

FetchContent_Declare(
  zxing
  GIT_REPOSITORY https://github.com/nu-book/zxing-cpp.git
  GIT_TAG        v1.2.0 
)

FetchContent_GetProperties(zxing)

if (NOT zxing_POPULATED)
    FetchContent_Populate(zxing)
endif ()

add_subdirectory (${zxing_SOURCE_DIR}/core ${zxing_BINARY_DIR}/ZXing)

include_directories ("${zxing_SOURCE_DIR}/thirdparty/stb")

set (CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} --bind -s ENVIRONMENT=web -s DISABLE_EXCEPTION_CATCHING=0 -s FILESYSTEM=0 -s MODULARIZE=1 -s EXPORT_NAME=ZXing -s ALLOW_MEMORY_GROWTH=1")

set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY  ${CMAKE_SOURCE_DIR}/assets/bin)
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY  ${CMAKE_SOURCE_DIR}/assets/bin)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY  ${CMAKE_SOURCE_DIR}/assets/bin)

add_executable (${PROJECT_NAME} src/BarcodeReader.cpp)
target_link_libraries (${PROJECT_NAME}  ZXing::ZXing)
