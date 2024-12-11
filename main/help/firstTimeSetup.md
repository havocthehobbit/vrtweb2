* 1. download vrtweb2 from :
    * http://github/havocthehobbit/vrtweb2


* 2. install nodejs
    * 2.2 install nodemon and pm2 globally
        * ...
        ```bash
            npm i -g pm2 nodemon
        ```
* 3. with shell/cmd, navigate to vrtweb2/main 
and run initial install script 
    ```bash
        node install.js
    ```

* to develop on 
    * with two seperate sessions ,
        * navigate to vrtweb2/main/web_ui
            * run command in startdev.bat
        * navigate to vrtweb2/main/node_serv
            * run command in startdev.bat 
            or 
            * node app.js
        * you may need to run above twice as first run will try to create the main/data/settings.main


* to run and start prod
    * take node of your data/settings.json , host and port settings .
    * to build html files
        * ....
        ```bash
            run npm run build
        ```
    * ...
        * navigate to 
            * vrtweb2/main/node_serv
        * pm2 start app.js
        * navigate to your URL