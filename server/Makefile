# Go parameters
PROJECTNAME="ptlibrary"
ENTRYFILE="main.go"

GOCMD=go

MAKEFLAGS += --silent

run:
	@echo " > Running..."
	$(GOCMD) run $(ENTRYFILE)

build-amd64:
	@echo " > Building for amd64..."
	env GOOS=linux GOARCH=amd64 go build -o dist/ptlibrary_linux_amd64
	@echo " -     Built for linux."
	env GOOS=darwin GOARCH=amd64 go build -o dist/ptlibrary_darwin_amd64
	@echo " -     Built for darwin."
	env GOOS=windows GOARCH=amd64 go build -o dist/ptlibrary_windows_amd64.exe
	@echo " -     Built for windows."

build-x86:
	@echo " > Building for x86..."
	env GOOS=linux GOARCH=386 go build -o dist/ptlibrary_linux_x86
	@echo " -     Built for linux."
	env GOOS=darwin GOARCH=386 go build -o dist/ptlibrary_darwin_x86
	@echo " -     Built for darwin."
	env GOOS=windows GOARCH=386 go build -o dist/ptlibrary_windows_x86.exe
	@echo " -     Built for windows."

build:
	rm -rf dist
	mkdir -p dist
	make build-amd64
	make build-x86
	@echo " > Done building binaries for version."

test:
	@echo " > Running tests..."
	rm -rf ./coverage
	mkdir -p coverage
	$(GOCMD) test ./... -cover -v -coverprofile=coverage.out -outputdir=coverage
	@echo " > Done."

cover:
	@echo " > Checking coverage..."
	$(GOCMD) tool cover -html=coverage.out

.PHONY: help
all: help
help: Makefile
	@echo
	@echo "Choose a command to run in "$(PROJECTNAME)":"
	@echo
	sed -n 's/^##//p' $< | column -t -s ':' | sed -e 's/^/ /'
	@echo