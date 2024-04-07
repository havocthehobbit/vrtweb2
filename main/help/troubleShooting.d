## Startup for Development
### node dev
* listen EACCES: permission denied 127.0.0.1:3007
    * windows 
        * potential cause :
            * cause : if windows reboots unexpectantly it can leave behind locks on the local network driver and saved net procs
            * resolution : 
                * restart the winnat service
                    * net stop winnat
                    * net start winnat
            * related checks 
                * check whats using what ports 
                    * netstat -a -n -p tcp -b
        * potential cause :
            * cause : firewall may not be open for the port or blocking it
                * go to windows firewall, settups and open the port for tcp incoming and outgoing connections 
    * linux        
        * potential cause :
            * cause : you may have an old process or another process that is using the port
                * resolution : 
                    * check whats using the port
                        * netstat -nltp # or netstat -nltp | grep portnumber
                        * evaluate if its safe to stop or kill that process linked to the port's use or if you should rather be using a different port 
        * potential cause :
            * cause : firewall may not be open for the port or blocking it
                * go to windows firewall, settups and open the port for tcp incoming and outgoing connections 

