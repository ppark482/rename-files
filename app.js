var glob 		= require('glob'),
	path 		= require('path'),
	fs 			= require('fs'),
	prompt 		= require('prompt'),
	colors		= require('colors');

var currentPath = __filename;
var splitPath = currentPath.split('/');
splitPath.pop();
var newPath = splitPath.join('/');
// console.log(newPath); // this parent directory

prompt.start();
// folderPath = newPath + '/' + 'Folder Name';
var askForPath = function () {
	prompt.get(['Folder_Path'], function (err, result) {
		if (err) { console.log(err); return; }
	    console.log('Folder location: ' + newPath + '/' + result.Folder_Path);
		console.log(colors.red('Is ' + colors.green(newPath + '/' + result.Folder_Path) + ' correct?'));
		var folderPath = newPath + '/' + result.Folder_Path + '/*.*';
		prompt.get(['Answer (y/n)'], function (err, result) {
			if (err) { console.log(err); return; }
			if (result['Answer (y/n)'] === 'y') {
				filesToLowerCase(folderPath);
			} else {
				askForPath();
			}
		});
	});
};

var filesToLowerCase = function (folderPath) {
	glob(folderPath, function (err, files) {
		if (err) console.log(err);
		var processed = 0;
		files.forEach( function (file) {
			var dir = path.dirname(file);
			var filename = path.basename(file);
			fs.renameSync(file, dir + '/' + filename.toLowerCase());
			console.log(file.green);
			processed++;
		});
		console.log(colors.green(processed) + ' files processed');
	});	
};

askForPath();