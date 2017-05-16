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

	var stats = [];
	function file(i){	//串行执行
		var filename = files[i];

		fs.stat(__dirname + '/' + filename, function(err, stat){
			stats[i] = stat;
			if(stat.isDirectory()){
				console.log('		' + i + '	\033[36m' + filename + '/\033[39m');
			}else{
				console.log('		' + i + '	\033[90m' + filename + '\033[39m');
			}

			i++;
			if(i == files.length){
				read();
			}else{
				file(i);
			}
		});
	}

	//read user input when files are shown
	function read () {
		console.log('');
		process.stdout.write('	\033[33mEnter your choice: \033[39m');
		process.stdin.resume(); //wait for user input
		process.stdin.setEncoding('utf8');

		process.stdin.on('data', option);
	}

	//called with the option supplied by the user
	function option (data) {
		var filename = files[Number(data)];
		if(!filename) {
			process.stdout.write('	\033[31mEnter your choice: \033[39m');
		} else {
			process.stdin.pause(); //暂停流（stdin流的默认状态），以便后续做完fs操作后程序能顺利退出

			if(stats[Number(data)].isDirectory()){
				fs.readdir(__dirname + '/' + filename, function(err, files){
					console.log('');
					console.log('	(' + files.length + ' files)');
					files.forEach(function(file){
						console.log('		- 	' + file);
					});
					console.log('');
				});
			} else {
				fs.readFile(__dirname + '/' + filename, 'utf8', function(err, data){ //指定编码，得到的数据即为相应字符串
					console.log('');
					console.log('\033[90m' + data.replace(/(.*)/g, '	$1') + '\033[39m'); //正则表达式添加辅助缩进
				});
			}
			
		}
	}

	file(0);
});