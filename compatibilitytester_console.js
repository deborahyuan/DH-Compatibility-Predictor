// using node.js's file system module
const fs = require('fs');
const members = JSON.parse(fs.readFileSync('members.json')); // the data in members.json is parsed into a JS object, `members`

const team = members.team;// Get the array of applicants
const applicants = members.applicants;

// ------------------------- Creating Team Attribute Arrays for Each Attribute -------------------------// 
// creates an array for each attribute, storing each team member's attribute value

function getAttributeArray(team, attribute) {
    const attributeArray = [];
  
    for (let i = 0; i < team.length; i++) {
      const memberAttribute = team[i].attributes[attribute];
      attributeArray.push(memberAttribute);
    }

    return attributeArray;
  }
  
  const team_intelligence = getAttributeArray(team, 'intelligence');
  const team_problemSolving = getAttributeArray(team, 'problemSolving');
  const team_collaboration = getAttributeArray(team, 'collaboration');
  const team_reliability = getAttributeArray(team, 'reliability');
  const team_communication = getAttributeArray(team, 'communication');

  /* checking team attribute arrays in console
  console.log('team intelligence array = ' + team_intelligence);
  console.log('team problem solving array = ' + team_problemSolving);
  console.log('team collaboration array = ' + team_collaboration);
  console.log('team reliability array = ' + team_reliability);
  console.log('team communication array = ' + team_communication);
 */
  

// ------------------------- Averaging Team Attribute Arrays -------------------------// 
// averaging the team's attribute values, storing the averages in a variable

function average(array) {
    const sum = array.reduce((acc, value) => acc + value, 0); // reduces the array into a single value by summing them together
    const avg = sum / array.length; // finds the avg
    return avg.toFixed(2); // limits average to 2 decimal places
  }

const team_intelligence_avg = average(team_intelligence);
const team_problemSolving_avg = average(team_problemSolving);
const team_collaboration_avg = average(team_collaboration);
const team_reliability_avg = average(team_reliability);
const team_communication_avg = average(team_communication);

/* checking team attribute avgs in console
console.log('team intelligence avg = ' + team_intelligence_avg);
console.log('team problem solving avg = ' + team_problemSolving_avg);
console.log('team collaboration avg = ' + team_collaboration_avg);
console.log('team reliability avg = ' + team_reliability_avg);
console.log('team communication avg = ' + team_communication_avg);
*/

// ------------------------- Finding the Team Attribute Modes -------------------------// 
// finding the mode for the team's attribute values, storing the mode in a variable

function mode(array) {
    const counts = {}; // object that keeps track of how many instances a value appears
    let maxCount = 0;
    let modeValue = undefined;
    let isMultipleModes = false; // assume that there is no more than one mode
  
    for (let i = 0; i < array.length; i++) {
      const value = array[i];
      if (counts[value] === undefined) {
        counts[value] = 0; // creates a new key if the key doesn't exist, sets value to 0
      }
      counts[value]++; // +1 to the value (frequency of the key)
      if (counts[value] > maxCount) { // checks to see if there is an attribute with a count greater than the current mode
        maxCount = counts[value];
        modeValue = value; // sets modeValue to the mode
        isMultipleModes = false;
      } else if (counts[value] === maxCount && value !== modeValue) {
        isMultipleModes = true;
      }
    }
  
    return isMultipleModes ? false : modeValue; // if the value of isMultipleModes is false, then return false; if not, then return the mode
  }
  
const team_intelligence_mode = mode(team_intelligence);
const team_problemSolving_mode = mode(team_problemSolving);
const team_collaboration_mode = mode(team_collaboration);
const team_reliability_mode = mode(team_reliability);
const team_communication_mode = mode(team_communication);

/* checking team attribute modes in console
console.log('team intelligence mode = ' + team_intelligence_mode);
console.log('team problem solving mode = ' + team_problemSolving_mode);
console.log('team collaboration mode = ' + team_collaboration_mode);
console.log('team reliability mode = ' + team_reliability_mode);
console.log('team communication mode = ' + team_communication_mode);
*/

// ------------------------- Calculating Applicant Comaptibility Score -------------------------// 
/* mainly consists of two functions, the first one, calculateCompatibilityScore, is a generic function that compares an 
applicant's attribute score to the team's attribute scores, looking at both team average and mode (if applicable), and using it to
generate a compatibility score for each attribute; the second one, scoreApplicants, focuses on combining all of an applicant's 
attribute compatibility scores and turning it into one number using an average -- then orders the applicants by their overall 
compatibility scores in a JSON */

function calculateCompatibilityScore(applicant, attribute, teamAvg, teamMode) {
    const applicantAttribute = applicant.attributes[attribute];
    let attributeCompatibilityScore = 0;
    let avg_weight = 0;
    let attributeCompatibility = 0;
    let mode_weight = undefined;
    let mode_addscore = 0;

    if (teamMode != false) { // if there is a mode value for team members' attributes
        avg_weight = 0.9;
        mode_weight = 0.1;
        if (applicantAttribute == teamMode) { // if the applicant's attribute is the same as the team's mode, give 0.1 additional points
            mode_addscore = 1;
        } else {
            mode_addscore = 0;
        }
    } else {
        avg_weight = 1;
        mode_weight = 0;
    }

    if (applicantAttribute >= teamAvg) {
        attributeCompatibility = 1;
    } else if ((teamAvg - 1) <= applicantAttribute) {
        attributeCompatibility = 0.8;
    } else if ((teamAvg - 2) <= applicantAttribute) {
        attributeCompatibility = 0.6;
    } else {
        attributeCompatibility = 0;
    }

    attributeCompatibilityScore = (attributeCompatibility * avg_weight) + (mode_weight * mode_addscore);

    /* testing code that was used to compare manual calculations with an isolated applicant's attributes to see if the math was correct
    console.log(`team_${attribute}_avg= ${teamAvg}`);
    console.log(`${attribute}CompatibilityScore= ${attributeCompatibilityScore}`);
    */

    return attributeCompatibilityScore;
}


function scoreApplicants(members) {
    const scoredApplicants = []
    const compatibilityScoreArray = []
    let applicants = members.applicants
    for (let i = 0; i < applicants.length; i++) { // iterates through the list of applicants, creating a compatibilityScoreArray for all of them 
      const applicantName = applicants[i].name;
      compatibilityScoreArray.push(calculateCompatibilityScore(applicants[i], 'intelligence', team_intelligence_avg, team_intelligence_mode));
      compatibilityScoreArray.push(calculateCompatibilityScore(applicants[i], 'problemSolving', team_problemSolving_avg, team_problemSolving_mode));
      compatibilityScoreArray.push(calculateCompatibilityScore(applicants[i], 'collaboration', team_collaboration_avg, team_collaboration_mode));
      compatibilityScoreArray.push(calculateCompatibilityScore(applicants[i], 'reliability', team_reliability_avg, team_reliability_mode));
      compatibilityScoreArray.push(calculateCompatibilityScore(applicants[i], 'communication', team_communication_avg, team_communication_mode));
      let compatibilityScore = average(compatibilityScoreArray)
      scoredApplicants.push({ name: applicantName, score: compatibilityScore }); // toFixed rounds to 2 decimal places
    }
    scoredApplicants.sort((a, b) => b.score - a.score); // sorts list of applicants from highest compatibility to lowest
    const output = { scoredApplicants };
    return JSON.stringify(output, null, 2); // returns a "pretty" JSON output
  }
  
  console.log(scoreApplicants(members)) // logs JSON output to console