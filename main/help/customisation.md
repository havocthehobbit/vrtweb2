


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
