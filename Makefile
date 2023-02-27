help:
	@echo "Makefile for ELN app"
	@echo "  usage: make [command]"
	@echo ""
	@echo "commands:"
	@echo "  bench: start bench server"
	@echo "  build: build dashboard"
	@echo "  dev: build dashboard and start dev server"
	@echo "  help: show this help message"

bench:
	bench start

build:
	cd dashboard && npm run build

dev: build
	cd dashboard && npm run dev
