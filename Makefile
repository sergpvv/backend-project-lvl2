install:
	npm install

run:
	npx babel-node 'src/bin/gendiff.js' -h

publish:
	npm publish --dry-run

lint:
	npx eslint .

build:
	rm -rf dist
	npm run build
test:
	npm test
