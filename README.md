# file-explorer
《了不起的Node.js》chapter-5 example
#### Step 1
实现递归读取该文件夹下的文件、目录，并用彩色展示；
用`process.stdin`和`process.stdout`读取用户输入及输出内容到屏幕。

#### Step 2
重构：
抽离`read`函数，读取用户输入，并监听`data`事件：根据用户的选择进一步采取操作(`option`函数)，可根据用户输入读取并展示文件内容

#### Step 3
如果用户选择了目录，则输出该目录下的文件名