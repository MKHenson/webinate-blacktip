var gulp = require( 'gulp' );
var fs = require( 'fs' );
var concat = require( 'gulp-concat' );
var ts = require( 'gulp-typescript' );
var filter = require( 'gulp-filter' );
var ngHtml2Js = require( 'gulp-ng-html2js' );
var minifyHtml = require( 'gulp-minify-html' );
var uglify = require( 'gulp-uglify' );
var gulpif = require( 'gulp-if' );
var sprity = require( 'sprity' );
var sass = require( 'gulp-sass' );
var spritySass = require( 'sprity-sass' );
var rimraf = require( 'rimraf' );
var rename = require( 'gulp-rename' );
var cleanCss = require( 'gulp-clean-css' );
var setup = require( './gulp/setup.js' );
var tslint = require( 'gulp-tslint' );

// CONFIG
// ==============================
var outDir = './dist';
const tsProject = ts.createProject( 'tsconfig.json' );
const configFiles = [
    './readme.md',
    './install-script.sh',
    './package.json'
];
var thirdPartyFiles = [
    './third-party/jquery/dist/jquery.js',
    './third-party/angular/angular.js',
    './third-party/angular-ui-router/release/angular-ui-router.js',
    './third-party/angular-sanitize/angular-sanitize.js',
    './third-party/angular-animate/angular-animate.js',
    './third-party/angular-loading-bar/build/loading-bar.js',
    './third-party/angular-loading-bar/build/loading-bar.css',
    './third-party/modepress-client/dist/plugin.js',
    './third-party/jssor-slider/js/jssor.slider.mini.js'
];

gulp.task( 'sass', [ 'sprites' ], function() {

    // Compile all sass files into temp/css
    return gulp.src( './src/style.scss', { base: './src' })
        .pipe( sass().on( 'error', sass.logError ) )
        .pipe( gulp.dest( outDir + '/css' ) )
})

gulp.task( 'sass-release', [ 'sprites' ], function() {

    // Compile all sass files into temp/css
    return gulp.src( './src/style.scss', { base: './src' })
        .pipe( sass().on( 'error', sass.logError ) )
        .pipe( cleanCss() )
        .pipe( gulp.dest( outDir + '/css' ) )
})

/**
 * Generate dist/media/sprites/sprite.png and /src/temp/sprite.scss
 */
gulp.task( 'sprites', function() {
    return sprity.src( {
        src: './src/media/sprites/**/*.{png,jpg}',
        style: './sprites.scss',
        cssPath: '/media/sprites',
        name: 'sprites',
        orientation: 'binary-tree',
        prefix: 'sprite',
        processor: 'sass',
        'style-type': 'scss',
        margin: 0
    })
        .pipe( gulpif( '*.png', gulp.dest( outDir + '/media/sprites' ), gulp.dest( 'src/temp-css' ) ) )
});

/**
 * Builds each of the ts files into JS files in the output folder
 */
gulp.task( 'ts-code', function() {

    var tsResult = tsProject.src()
        .pipe( tsProject() );

    return tsResult.js.pipe( gulp.dest( outDir ) );
});

/**
 * Builds each of the ts files into JS files in the output folder. Also performs an uglify on the code to make it compact.
 */
gulp.task( 'ts-code-release', function() {

    var tsResult = tsProject.src()
        .pipe( tsProject() );

    return tsResult.js.pipe( uglify() )
        .pipe( gulp.dest( outDir ) );
});

/**
 * Ensures the code quality is up to scratch
 */
gulp.task( 'tslint', [ 'ts-code' ], function() {
    return tsProject.src()
        .pipe( tslint( {
            configuration: 'tslint.json',
            formatter: 'verbose'
        }) )
        .pipe( tslint.report( {
            emitError: false
        }) )
});

/**
 * Copies the html source to its output directory
 */
gulp.task( 'copy-index', function() {

    return gulp.src( [ 'src/index.jade',
        'src/sitemap.xml',
        'src/favicon.png',
        'src/media/images/**/*.*'
    ], { base: 'src' })
        .pipe( gulp.dest( outDir ) );

});

/**
 * Copies the html source to its output directory
 */
gulp.task( 'copy-index-release', function() {

    return Promise.all( [

        gulp.src( 'src/index-prod.jade', { base: 'src' })
            .pipe( rename( 'index.jade' ) )
            .pipe( gulp.dest( outDir ) ),

        gulp.src( [
            'src/sitemap.xml',
            'src/favicon.png',
            'src/media/images/**/*.*'
        ], { base: 'src' })
            .pipe( gulp.dest( outDir ) )
    ] );
});

/**
 * Downloads each of the third party archives and unzips them into the third-party folder respectively
 */
gulp.task( 'install-third-parties', function() {

    setup.deleteFolderRecursive( './third-party' );

    return Promise.all( [
        setup.downloadTarball( 'https://github.com/angular/bower-angular/tarball/v1.5.3-build.4695+sha.7489d56', './third-party/angular' ),
        setup.downloadTarball( 'https://github.com/angular/bower-angular-animate/tarball/v1.5.3-build.4691+sha.e34ef23', './third-party/angular-animate' ),
        setup.downloadTarball( 'https://github.com/angular/bower-angular-sanitize/tarball/v1.5.3-build.4691+sha.e34ef23', './third-party/angular-sanitize' ),
        setup.downloadTarball( 'https://github.com/angular-ui/ui-router/tarball/0.2.18', './third-party/angular-ui-router' ),
        setup.downloadTarball( 'https://github.com/jquery/jquery/tarball/2.2.2', './third-party/jquery' ),
        setup.downloadTarball( 'https://github.com/chieffancypants/angular-loading-bar/tarball/0.9.0', './third-party/angular-loading-bar' ),
        setup.downloadTarball( 'https://github.com/Webinate/modepress-client-angular/tarball/master', './third-party/modepress-client' ),
        setup.downloadTarball( 'https://github.com/jssor/slider/tarball/20.0.0', './third-party/jssor-slider' ),
    ] );
});


/**
 * Downloads the definition files used in the development of the application and moves them into the definitions folder
 */
gulp.task( 'install-definitions', function() {
    return Promise.all( [
        setup.getDefinition( 'https://raw.githubusercontent.com/Webinate/users/dev/src/definitions/generated/users.d.ts', 'src/definitions/required/', 'users.d.ts' ),
        setup.getDefinition( 'https://raw.githubusercontent.com/Webinate/modepress/dev/src/definitions/generated/modepress.d.ts', 'src/definitions/required/', 'modepress-api.d.ts' ),
        setup.getDefinition( 'https://raw.githubusercontent.com/Webinate/modepress-client-angular/master/src/definitions/generated/plugin.d.ts', 'src/definitions/required/', 'modepress-client.d.ts' )
    ] );
});

/**
 * Copies the required third party files to the index file
 */
gulp.task( 'deploy-third-party', function() {

    return gulp.src( thirdPartyFiles, { base: 'third-party' })
        .pipe( gulp.dest( outDir + '/third-party' ) );
});

/**
 * Copies the required third party files to the index file. Also concatenates the files into 1, compressed, JS file
 */
gulp.task( 'deploy-third-party-release', function() {

    const jsFilter = filter( '**/*.js', { restore: true });
    const cssFilter = filter( '**/*.css', { restore: true });

    return gulp.src( thirdPartyFiles, { base: 'third-party' })
        .pipe( jsFilter )
        .pipe( concat( 'third-party.min.js' ) )
        .pipe( uglify() )
        .pipe( jsFilter.restore )
        .pipe( cssFilter )
        .pipe( cleanCss() )
        .pipe( concat( 'third-party.min.css' ) )
        .pipe( cssFilter.restore )
        .pipe( gulp.dest( outDir + '/third-party' ) );
});

/**
 * Builds the definition
 */
gulp.task( 'html-to-ng', function() {
    return gulp.src( './src/**/*.html' )
        .pipe( minifyHtml( {
            empty: true,
            spare: true,
            quotes: true
        }) )
        .pipe( ngHtml2Js( {
            moduleName: 'admin-templates',
            prefix: ''
        }) )
        .pipe( concat( 'partials.min.js' ) )
        .pipe( uglify() )
        .pipe( gulp.dest( outDir + '/templates' ) );
});

gulp.task( 'bump-patch', function() { return setup.bumpVersion( setup.bumpPatchNum, configFiles ) });
gulp.task( 'bump-minor', function() { return setup.bumpVersion( setup.bumpMidNum, configFiles ) });
gulp.task( 'bump-major', function() { return setup.bumpVersion( setup.bumpMajorNum, configFiles ) });
gulp.task( 'install', [ 'install-definitions', 'install-third-parties' ] );
gulp.task( 'build-all', [ 'deploy-third-party', 'html-to-ng', 'copy-index', 'sass', 'tslint' ] );
gulp.task( 'build-all-release', [ 'deploy-third-party-release', 'html-to-ng', 'copy-index-release', 'sass-release', 'ts-code-release' ] );