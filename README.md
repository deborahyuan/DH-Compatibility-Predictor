# DH Compatibility Predictor
 This DataHouse Compatibility Predictor was written in JavaScript; Node.js was used to test and run the code during development.

 Overview:
 The key files in this repository are:
 - 'compatibilitytester_console.js'; this was the file used to originally write and run the code. This .js file takes the data from 'members.json' (located in this repository) and runs calculations, outputting the list of scored applicants and their respective compatibility scores in the console.
  - 'members.json'; this JSON file provides sample data which contains the list of team members and applicants. The data provided in 'members.json' slightly differs from the sample data provided in the Take Home Project instructional PDF -- the structure of the data remains the same.
 - The "application" folder, where 'compatibilitytester_interface.html' can be found. This html file can be viewed and tested on https://htmlpreview.github.io/?https://github.com/deborahyuan/DH-Compatibility-Predictor/blob/main/application/compatibilitytester_interface.html. Unlike 'compatibilitytester_console.js', this site allows for users to upload their own JSON file. If not, they can choose to use the provided 'members.json' file which contains sample data. 


 Description:
 Using JavaScript to create an application that will predict the compatibility of new team members with existing team members.  


 Personal Notes:
 Although this assignment posed quite a big challenge for me as I didn't have much coding experience, I ended up enjoying the process a lot more than I expected. I spent around 8 hours working on it, with 1 hour spent on figuring out how I wanted to approach calculating the compatibility score, 4 hours on the actual coding, 1 hours on debugging, 1 hour on HTML/CSS, and around 1 hour writing out this README file and commenting my code. I know the instructions mentioned that we didn't need to spend a lot of time on this assignment, but I had some free time this weekend and wanted to complete it as much as possible; it also proved to be a good refresher on some of the coding skills I learned in class last semester.