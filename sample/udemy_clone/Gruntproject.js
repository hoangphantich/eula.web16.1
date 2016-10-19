var path = require('path');

const 
	BASE_DIR = 'Static',
    STATIC_DIR = path.join(BASE_DIR, 'compiled'),
    RESOURCES_DIR = path.join(BASE_DIR, '../'),
	CLIENT_SCRIPTS_DIR = path.join(BASE_DIR, 'scripts'),
    CLIENT_STYLES_DIR = path.join(BASE_DIR, 'styles'),
    CLIENT_FONTS_DIR = path.join(BASE_DIR, 'fonts'),
    CLIENT_IMAGES_DIR = path.join(BASE_DIR, 'images');
    CLIENT_VIDEOS_DIR = path.join(BASE_DIR, 'videos');

	var dirs = {
	    resources: RESOURCES_DIR,
	    base: BASE_DIR,
	    scripts: {
	        main: CLIENT_SCRIPTS_DIR,
	        lib: path.join(CLIENT_SCRIPTS_DIR, 'lib'),
	        bower: path.join(CLIENT_SCRIPTS_DIR, 'lib', 'bower'),
	        templates: path.join(CLIENT_SCRIPTS_DIR, 'templates'),
	        src: path.join(CLIENT_SCRIPTS_DIR, 'src'),
	        out: path.join(RESOURCES_DIR, 'js')
	    },
	    styles: {
	        main: CLIENT_STYLES_DIR,
	        partials: path.join(BASE_DIR, 'views/_components'),
	        out: path.join(RESOURCES_DIR, 'css')
	    },
	    images: {
	        main: CLIENT_IMAGES_DIR,
	        out: path.join(RESOURCES_DIR, 'img')
	    },
	    fonts: {
	        main: CLIENT_FONTS_DIR,
	        out: path.join(RESOURCES_DIR, 'fonts')
	    },
	    views: {
	        main: path.join(BASE_DIR, 'views'),
	        layouts: path.join(BASE_DIR, 'views/_layouts'),
	        partials: path.join(BASE_DIR, 'views/_components')
	    },
	    static: {
	        main: STATIC_DIR,
	        partials: path.join(STATIC_DIR, 'components'),
	        views: path.join(STATIC_DIR, 'pages'),
	        data: path.join(STATIC_DIR, 'data')
	    },
	    videos: {
	        main: CLIENT_VIDEOS_DIR,
	        out: path.join(RESOURCES_DIR, 'videos')
	    }
};

var options = {
    modernizrOutput: 'modernizr-custom.js',
    watchInterval: 1000,
    webfontOutput: '_resources-icons.scss'
};

var stylesheets = {
    screen: 'screen.css',
    ie9: 'screen-ie9.css',
    print: 'print.css'
};

var reports = {
    js: {
        files: [
            path.join(dirs.scripts.main, '**/*.js'),
            '!' + path.join(dirs.scripts.lib, '**'),
            '!' + dirs.scripts.main
        ]
    }
};

module.exports = {
    dirs: dirs,
    options: options,
    stylesheets: stylesheets,
    reports: reports
};
