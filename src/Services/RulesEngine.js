const NUM_RANKED_RULES = 6;
const READING_LOWER_QUARTILE = 1.61; //words per second
const VISUOSPATIAL_LOWER_QUARTILE = 2;
const FIVEWORDS_UPPER_QUARTILE = 91518.5;

export function runRankRules(patientData) {
  let results = new Array(NUM_RANKED_RULES).fill(0);
  patientData.forEach((element) => {
    //SATURN SCORE
    let saturn = checkSaturn(element.Results);
    if (saturn > results[0]) {
      results[0] = saturn;
    }
    //READING SPEED
    let readingSpeed = checkReadingSpeed(element["Reading Speed"]);
    if (readingSpeed > results[1]) {
      results[1] = readingSpeed;
    }
    //PRIOR SCORES
    let priorScores = checkPriorScores(patientData);
    if (priorScores > results[2]) {
      results[2] = priorScores;
    }
    //PRIOR TIMES
    let priorTimes = checkPriorTimes(patientData);
    if (priorTimes > results[3]) {
      results[3] = priorTimes;
    }

    //VISUOSPATIAL
    let visuospatial = checkVisuospatial(element.Visuospatial);
    if (visuospatial > results[4]) {
      results[4] = visuospatial;
    }

    //FIVEWORDS
    let fiveWords = checkFiveWord(element.Recall);
    if (fiveWords > results[5]) {
      results[5] = fiveWords;
    }
  });
  return results;
}

export function getRetestFlag(patientData) {
  if (!patientData) {
    return checkAge(65);
  }

  let results = patientData.map((snap) => checkLastTestDate(snap.date));
  console.log(results);
  return !results.includes(true);
}

// Rule: If latest testing date > 12 months set Self Assessment Test is Recommend Flag
// Rationale: Based on recommendations from the Alzheimer's Association (Cordell et al., 2013) guideline that suggest testing should be done every 12 months for cognitive decline
function checkLastTestDate(date) {
  let testDate = new Date(date);
  let checkDate = new Date();
  checkDate.setDate(checkDate.getDate() - 365);
  if (testDate > checkDate) {
    return true;
  } else {
    return false;
  }
}

// Rule: If the patient is > 65 years old and has not completed a self assessment set Self Assessment Test is Recommend Flag
// Rationale: Based on emerging clinical guidelines (Petersen et al., 2018) that suggest routine testing for those 65 years and older and findings from (Boustani et al., 2005) outline a primary care screening program.
//check not in use right now because of how data is loaded
function checkAge(age) {
  return age > 65 ? true : false;
}

// Rule: If the SATURN score is < 24 a clinical assessment is suggested
// Rationale: Based on the findings of (Bissig et al., 2020), who created a Receiver-operating characteristic (ROC) detailing the ability of the SATURN and MOCA score to detect cognitive impairment as defined by CDR. Using a CDR score >0 (very mild or greater) (Morris, 1993), it is optimal to label one cognitively impaired if one’s score is <24 on SATURN (sensitivity 82%, specificity 92%)
// Rule: If the SATURN score is < 21 a clinical assessment is recommended
// Rationale: Based on the findings of (Bissig et al., 2020). Using a CDR score >0.5 (mild or greater) (Morris, 1993), it is optimal to label one cognitively impaired if one’s score is <21 on SATURN (sensitivity 92%, specificity 88%)
function checkSaturn(score) {
  if (score >= 24) return 1;
  if (score >= 21) return 3;
  else return 4;
}

// Rule: If reading speed is in the lower quartile a review of the patient record is recommended.
// Rationale: Based on the findings of (Bissig et al., 2020) reading speed complemented the self-assessment scores.
// 1st Quartile calculated but could easily be done dynamically
function checkReadingSpeed(readingSpeed) {
  if (readingSpeed <= READING_LOWER_QUARTILE) return 2;
  else return 1;
}
// Rule: If a later test score is lower than the previous test score a review of patient records is recommended.
// Rationale: Based on findings of (Boustani et al., 2005) that assess longitudinal screening of cognition in primary care.
function checkPriorScores(data) {
  data.forEach((element, i) => {
    if (i + 1 < data.length) {
      if (data[i + 1].Results < element.Results) {
        return 2;
      }
    }
  });
  return 1;
}

// Rule: If the time to complete test is 20% higher than the previous test a review of patient records is recommended.
// Rationale: Based on the findings of (Chan et al., 2021) that showed test time as an important factor.
function checkPriorTimes(data) {
  data.forEach((element, i) => {
    if (i + 1 < data.length) {
      if (data[i + 1]["Time to Complete"] * 1.2 < element["Time to Complete"]) {
        return 2;
      }
    }
  });
  return 1;
}

// Rule: If the visuospatial scores are in the lower quartile review of patient records is recommended is suggested.
// Rationale: Based on the findings of (Brown et al., 2009) that identified visuospatial as a strong indicator for Alzheimer’s disease.
function checkVisuospatial(results) {
  if (results < VISUOSPATIAL_LOWER_QUARTILE) return 2;
  else return 1;
}

// Rule: If time spent on the recall 5 words tasks is in the upper quartile a review of patient records is suggested.
// Rationale: Based on the findings of (Chan et al., 2020) that indicated time spent on recall as a strong indicator for cognitive performance.
function checkFiveWord(results) {
  if (results > FIVEWORDS_UPPER_QUARTILE) return 2;
  else return 1;
}

// Levels:
// Level 4 - Red – Clinical Assessment is recommended
// Level 3 - Orange – Clinical Assessment is suggested
// Level 2 - Yellow – Review of patient records is suggested
// Level 1 - Green – No further action is suggested
// Rationale: Levels based on informal discussions with subject matter expert

// Flags: Self Assessment Test is Recommended Flag
