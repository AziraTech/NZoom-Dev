## Steps to setup the Powerpoint Add-in

1. Ensure that you have configure 
2. Open Visual Studio
3. Create new project 
4. Search `Add-in` in the search templates
5. Select Powerpoint-Addin from the lists
6. From the New window select `Add new feature to the Powerpoint`
7. Click on Finish.

A Solution will be created with two project

1. Office Manifests project
2. Html Project where we have to setup our UI which needs to be displayed in the Powerpoint side pane
3. Update Home.html and add your html within <div id="content-main"></div>
4. Add required *.js and *.css and Images file to the respective folders and linked them to the html file
5. Click on Start button to test your Add-In. Powerpoint will get open with the Add-In. Verify the html gets displayed properly

## Deployment Steps

### Publish your Website

1. Right click on the web project and click on Publish
2. Create publish profile with Folder location (If profile not exists). Else select existing profile
3. Click on publish button

### Host your website in IIS

1. Open IIS using (windows + R) and type inetmgr and enter
2. Expand the sites node and add new website
3. Provide Site name and appropriate port number 
4. Provide the Physical path which was mentioned in the publish profile
5. Click on OK button
6. Open the Default document from the middle pane
7. Add new item and provide - home.html and click on OK
8. Click on Browse and verify the html gets displayed in your default browser

### Publish the manifest file

1. Right click on the manifest project and click on Publish
2. Deploy your web project if you have updated any code in html/scripts. SKIP this step if you have already publish and hosted your website in IIS
3. Click on Package the add-in. A popup will get open
4. Provide the URL of the web site you hosted in the IIS and click on Finish
5. File explore will get open having the manifest file.
6. Copy the XML file and move to some other which can be shared to the network

### Shared the folder to the Network

1. Ensured that the `Network Sharing` is turned `ON` in your system
2. Right Click on the Folder which has the Manifest XML File and click on `Properties`.
3. Switch to the `Sharing` tab and click on `Share` button.
4. From the dropdown select appropriate user and give Read/write permission 
5. Click on the `Share` button and let the process be complete and then click on Done button. 
Copy the path of the shared folder and ensure it by opening the folder using (windows + R) and pasting the copied path. Ensure the xml folder gets opened
6. Close all the dialogs

### Setup Trusted Center in Powerpoint

1. Open your Powerpoint application with blank presentation.
2. Move your mouse Cursor to the top menu and Right Click and select Customize ribbon.
3. Select `Trust Center` from the left menu.
4. Click on `Trust Center Settigns` button from the select tab content area.
5. From the New Pop window, select `TrustedAppCatalogs`.
6. Provide the URL of your shared folder which has manifest xml file 
7. Checked the Show in Menu checkbox
8. Click on the Ok Button. A warning dialog of changes will be implemented on next opening of Office. click on OK
9. Restart the Powerpoint application with blank presentation

### Select Your Add-In

1. Switch to the Insert tab
2. Find `My Apps` or `My Add-Ins`
3. Switch to the Shared Folder tab in the newly opened popup
4. You fill find your created powerpoint add-in - Select it 
5. Click on Insert button of the popup
6. You will find that new slide pane gets opened and after few seconds your html project gets displayed in powerpoint as a Side Add-In.





