const fs = require('fs');
const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');

module.exports = function (eleventyConfig) {
	// ****** INJECT CLASSES INTO MARKDOWN FILES ******
	const markdownItOptions = {
		html: true,
		breaks: true,
		linkify: true,
	};

	const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs);
	eleventyConfig.setLibrary('md', markdownLib);
	// ****** END MARKDOWN CONFIG ******

	// SET CSS AND ASSETS FOLDERS
	eleventyConfig.addPassthroughCopy('./src/assets/css/');
	eleventyConfig.addPassthroughCopy('./src/assets/images/');

	// Override Browsersync defaults (used only with --serve)
	eleventyConfig.setBrowserSyncConfig({
		callbacks: {
			ready: function (err, browserSync) {
				const content_404 = fs.readFileSync('public/404/index.html');

				browserSync.addMiddleware('*', (req, res) => {
					// Provides the 404 content without redirect.
					res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
					res.write(content_404);
					res.end();
				});
			},
		},
		ui: false,
		ghostMode: false,
	});

	return {
		dir: {
			input: 'src',
			output: 'public',
		},
		dataTemplateEngine: 'njk',
		markdownTemplateEngine: 'njk',
	};
};
