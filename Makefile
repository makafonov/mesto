install:
	npm install

lint:
	npx htmlhint *.html
	npx stylelint pages/*.css blocks/
