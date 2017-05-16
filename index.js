/**
 * Module dependencies
 */
var fs = require('fs');

/*
	for test
 */
// fs.readdir(__dirname, function(err, file){
// 	console.log(file);
// });

fs.readdir(process.cwd(), function(err, files){
	console.log(''); //friendly output

	if(!files.length){
		return console.log('	\033[31m No files to show!\33[39m\n');
	}

	console.log('	Select which file or directory you want to see\n');

	function file(i){	//串行执行
		var filename = files[i];

		fs.stat(__dirname + '/' + filename, function(err, stat){
			if(stat.isDirectory()){
				console.log('		' + i + '	\033[36m' + filename + '/\033[39m');
			}else{
				console.log('		' + i + '	\033[90m' + filename + '\033[39m');
			}

			i++;
			if(i == files.length){
				console.log('');
				process.stdout.write('	\033[33mEnter your choice: \033[39m');
				process.stdin.resume(); //wait for user input
				process.stdin.setEncoding('utf8');
			}else{
				file(i);
			}
		});
	}

	file(0);
});