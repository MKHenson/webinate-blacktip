var fs = require( 'fs' );
var download = require( 'gulp-download' );
var rename = require( "gulp-rename" );
var gulp = require( 'gulp' );
var gutil = require( 'gulp-util' );
var gunzip = require( 'gulp-gunzip' );
var request = require( 'request' );
var untar = require( 'gulp-untar' );
var source = require( 'vinyl-source-stream' );
var download = require( 'gulp-download' );

/**
 * Goes through each of the main config files and increments
 * the version
 * @param {( currentVersion: string ) => string} f A function to transform the version into a new version
 * @returns {string}
 */
module.exports.bumpVersion = function( f, files ) {
    let fileStr = '';
    let version = '';

    if ( !fs.existsSync( './package.json' ) )
        throw new Error( `You dont seem to have a package json file. This is needed to identify the version.` );

    version = JSON.parse( fs.readFileSync( './package.json' ) ).version;
    const bumpedVersion = f( version );

    return Promise.all( files.map( function( file ) {
        return new Promise( function( resolve, reject ) {
            if ( !fs.existsSync( file ) )
                throw new Error( `File ${file} does not exist` );

            fileStr = fs.readFileSync( file ).toString();
            const matchedVersion = fileStr.match( new RegExp( version, 'i' ) );
            if ( !matchedVersion || matchedVersion.length === 0 )
                throw new Error( `File ${file} does not have a consistent version number of '${version}'` );

            fileStr = fileStr.replace( version, bumpedVersion );
            fs.writeFileSync( file, fileStr );
        });
    }) );
}

/**
 * Increments a semvar version patch number
 * @param {string} version The version coming in. E.g. 1.0.1
 * @returns {string}
 */
module.exports.bumpPatchNum = function( version ) {
    const segments = version.split( '.' );
    const patch = parseInt( segments[ 2 ] ) + 1;
    return `${segments[ 0 ]}.${segments[ 1 ]}.${patch}`
};

/**
 * Increments a semvar version mid number
 * @param {string} version The version coming in. E.g. 1.0.1
 * @returns {string}
 */
module.exports.bumpMidNum = function( version ) {
    const segments = version.split( '.' );
    const minor = parseInt( segments[ 1 ] ) + 1;
    return `${segments[ 0 ]}.${minor}.0`
};

/**
 * Increments a semvar version major number
 * @param {string} version The version coming in. E.g. 1.0.1
 * @returns {string}
 */
module.exports.bumpMajorNum = function( version ) {
    const segments = version.split( '.' );
    const major = parseInt( segments[ 0 ] ) + 1;
    return `${major}.0.0`
};

/**
 * This function downloads a definition file from github and writes it to a destination
 * @param {string} url The url of the file to download
 * @param {string} dest The destination folder to move the file to
 * @param {string} name The name of the downloaded file
 */
module.exports.getDefinition = function( url, dest, name ) {
    return new Promise( function( resolve, reject ) {
        download( url )
            .pipe( rename( name ) )
            .pipe( gulp.dest( dest ) )
            .on( 'error', function( err ) {
                throw ( err )
            })
            .on( 'end', function() {
                resolve( true );
            })
    });
}

/**
 * Deletes a folder and all its children recursively
 * @param {string} path The folder path to remove
 */
module.exports.deleteFolderRecursive = function( path ) {
    if ( fs.existsSync( path ) ) {
        fs.readdirSync( path ).forEach( function( file, index ) {
            var curPath = path + "/" + file;
            if ( fs.lstatSync( curPath ).isDirectory() ) { // recurse
                module.exports.deleteFolderRecursive( curPath );
            }
            else
                fs.unlinkSync( curPath );
        });
        fs.rmdirSync( path );
    }
};

/**
 * Downloads a tarbal from a given url and unzips it into a specified folder
 * @param {string} url The URL of the tarball to download
 * @param {string} folder The folder we are moving the contents to
 */
module.exports.downloadTarball = function( url, folder ) {
    return new Promise( function( resolve, reject ) {
        gutil.log( 'Downloading file "' + url + '" into folder "' + folder + '"' );
        return request( url )
            .pipe( source( 'hello.tar.gz' ) )
            .on( 'end', function() {
                gutil.log( 'Unzipping... "' + url + '"' );
            })
            .pipe( gunzip() )
            .pipe( untar() )
            .pipe( gulp.dest( folder ) )
            .on( 'end', function() {
                var folders = fs.readdirSync( folder );
                gulp.src( folder + '/' + folders[ 0 ] + "/**/*.*" )
                    .pipe( gulp.dest( folder ) )
                    .on( 'end', function() {
                        module.exports.deleteFolderRecursive( folder + '/' + folders[ 0 ] );
                        gutil.log( gutil.colors.green( 'Finished download of "' + url + '"' ) );
                        resolve( true );
                    });
            })
    });
}