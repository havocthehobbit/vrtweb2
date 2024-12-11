


### front end ( reactjs )

* create "cview" folder in "main/web-ui/src/components" 
    * optionally add these jsx folders/files and return a defualt react component
        * main.jsx
            * example : 
                *   export const Main=()=>{ return ( <div>... do something</div>) }
                    export default Main
        * profileMain.jsx
            * replace default profiles box, note this will also replace menu child items unless you have a props child access is you component
        * profile.jsx
            * replace inner context on defauly profile box, do things like add custom image loaders 
        
        * menus/main.jsx
            * replace menu witho your own

* public folders
    * create a jsx in cview called mainPublic.jsx
        * then customise that however you want
        * that is accessible through the ...myurl/public , "public" route  . 



### backend end ( nodejs)
* create folder prefixed with the text "custom_"  in "main/node_serv/modules"
    * the "custom_" folder you create can have any name as long as its prefixed with custom_, for example : custom_myNewModule
        * note that you can also find template examples to copy from into the modules folder ( main/node_serv/templates/custom_testmod )
    * the custom_??? folder should contain at least one javascript file , for example "myNewModule.js". However it is not limited to one , you can create as many as you want .
        * these javascript files will auto run, however while it is not needed , inorder to use alot of built in functionalit y you will need to create and export an object .
        * example , "myNewModule.js" : 
            * ...
            ```js
                let mod_name="testmod"
                var main={
                    auto_run : function(){ 
                        console.log("auto_running " + mod_name)
                    },            
                    __app : [ 
                            {  // with browser navigate to your nodejs url ( localhost:3001/test123)  
                                name  : "test123",
                                route : "/test123", // if route not included it will defualt to to name
                                type : "get", // get or post
                                cb : function(req, res, corestuff){ 
                                    res.send("testing test123")
                                } 
                            }
                    ]
                }
                module.exports[mod_name]=main;
            ```


* plugins 
    * plugins can be , additional web components that add front end or backend functionality to your web app or assets like icons , images , fonts 
    * there are some standard plugins that come with vrtweb , are installable from remote repositories or designers and admins can create shareable or reusable plugins ,     
        * vDev , a plugin of its own , can help manage and assist to install and create plugins 
        * notible folders 
            * where plugins packages are generally stored ( pre install )
                * main/setup/packages/...    ...all_custom &  ...all 
                    * all_custom can be created and your custom plugin folder can be dropped in , then instaled once they are there 
                    * all plugins must be stored as folders , that contain at minimal a plugins.json file , which is what tells the system the version of the plugin and destination paths that plugins must be installed in as well as other addional useful data regarding the plugin 



### data/settings

* "extraJson" : 
    * express json data handling middleware parameters for the express backend
    * defaults : extraJson : { limit : '100mb' };
* "extraJUrlEncode" : 
    * express URL ecoding middleware parameters for the express backend
    * extraJUrlEncode : {extended: true};



* "name"
    * name of the project web server
    * ...
* "desc"
    * descriptions , can be any text you wish to include.
    * ...
* "env":
    * enviroment of this server , can be named anything , like Production , Test , Development ...
    
* "host"
    * local server host or ip, that requests will be forwarded or proxied to.
    * ...
* "port"
    * ...
* "pathFrontEndPublic
    * path that html entry files will be served from.
    * ...
* 
* "dbName
    * database name, can be anything , recommended to be named the same as your environment.
    * ...
* "dbHost"
    * hostname or ip of the database server, most small to medium web servers are usually hosted on the same server as the web server , so default is 127.0.0.1 .
    * ...
* "dbtype"
    * database vender type , mongodb, mysql , oracledb, surrealdb. jsonlocalfiledb , etc... , 
    * ...
* 
* "jwtSecret
    * ...
* "cookieSecret"
    * ...
* "cookieExpires"
    * expiration of cookies , for auto login expirery 
    * ...