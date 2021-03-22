# Fire Mitigation App

Before running create start MongoDB instance running at mongodb://localhost:32768/fireapp. Recommend to use Docker to run.

```
npm install
webpack -w
npm start
```

Visit http://localhost:8080
How to Get Fire App Running Locally

1. Download Docker Desktop
2. Start Docker Desktop
3. Download Kitematic https://github.com/docker/kitematic
    1. Start Kitematic
    2. Search for Mongo on Dockerhub search bar
    3. Click create
    4. Click on the running container, on the right hand side of the window click on the settings tab
    5. Under the general tab, there is a list of environment variables
    6. To the end of the list add the environment variable named: PORT
    7. The value of this variable is 32768
    8. Restart the container with the new port setting, check it's running on
    9. (From here on out you should be able to launch this container from Docker Desktop, not perfectly sure about this though)
4. Git clone the following repository and create your working branch: https://github.com/ChangePlusPlusVandy/fire-app.git
5. Open the project in Webstorm
    1. If you don't already have Webstorm, download it from JetBrain's website and use your login to authorize the app
6. Install node.js
7. Install Webpack (Might not be needed)
    1. npminstall --save-dev webpack
    2. npminstall --save-dev webpack-cli
8. In webstorm, open the terminal and run: npm install
9. In the same terminal, run: npm install Babel-loader
10. Run webpack -w in the same terminal window
11. After the webpack -w stops outputting information on the console, run: npm start
12. The application should be accessible on localhost:8080/
    1. As a backup try localhost:8443/
    2. If you get an error on Rachio.js lines 45 and 69, try removing the period and see if it works
    Let me know if you need to do this
