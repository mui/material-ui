publish:
	./node_modules/.bin/jsx --harmony -x jsx ./src/js ./src/js
	npm publish
	git clean -fX