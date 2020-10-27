# asset-log

<h4>What does this app do</h4>
<p>
  Provides a way for assets to be managed in one place and the ability to export them as an excel or csv file.
  <br>
  Prevents saving duplicate assets.
  <br>
  Provides an efficient way to filter the data and then export this filtered data.
</p>

<h4>Run the app locally</h4>
<p>First make sure you have downloaded and installed the apps below</p>
<ul>
<li>NodeJS</li>
<li>Npm (comes with Node)</li>
<li>MongoDB</li>
</ul>

<p>Clone the repo and cd into the root directory. Run npm install.</p>
<p>Make sure the mongod service has started on port 27017 and is waiting for a connection</p>
<p>
Now run node app.js in the root directory of this project, open a web browser and go to localhost:3000
<br>
You should now see the app running in the browser
</p>
<p>Commit any changes to this develop branch</p>

<h4>What is needed?</h4>
<p>Pagination on the index.ejs page to prevent performance issues</p>
<p>Adjust loading spinner so page cannot be scrolled while loading</p>
<p>Any code cleanup or file structure - break up into modules where possible</p>
