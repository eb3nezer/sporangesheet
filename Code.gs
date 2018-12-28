/**
 * The total number of newcomers that have a certain status in Jethro.
 *
 * @param {Date} currentMonth The date at the end of the month of interest.
 * @param {String} jethroStatus Include newcomers who have this status
 * @return {Number} The total number of newcomers.
 */
function TOTALNEWCOMERS(currentMonth, arrivalRangeValues, jethroStatusValues, jethroStatus) {
  
  var result = 0;

  for (var row in arrivalRangeValues) {
    // Check if this cell is defined, and if it is a valid date
    if (Object.prototype.toString.call(arrivalRangeValues[row][0]) === "[object Date]") {
      // OK it is a date. Is it on or before the month we're interested in?
      var newcomerArrivalDate = arrivalRangeValues[row][0].getTime();
      if (newcomerArrivalDate <= currentMonth.getTime()) {
        // Now check the status
        var newcomerJethroStatus = jethroStatusValues[row][0];
        if (jethroStatus === "" || newcomerJethroStatus === jethroStatus) {
          result++;
        }
      }      
    }
  }
  return result;
}

/**
 * The percentage of newcomers that had a date entered on time.
 *
 * @param {Date} currentMonth The date at the end of the month of interest.
 * @param {Array} arrivalRangeValues The range of dates (i.e. named range) for when the newcomer arrived
 * @param {Array} targetRangeValues The range of dates (i.e. named range) for when the data was entered
 * @param {Number} leniency The number of days allowed before the target date becomes invalid
 * @return {Object} The percentage.
 */
function PCTONTIME(currentMonth, arrivalRangeValues, targetRangeValues, leniency) {
  var endDate = currentMonth.getTime();
  var startDate = endDate - ((30 + leniency) * 1000 * 60 * 60 * 24);
  var leniencyMillis = leniency * 1000 * 60 * 60 * 24;

  var totalPeople = 0;
  var totalValid = 0;
  //var totalValidRows = 0;

  for (var row in arrivalRangeValues) {
    // Check if this cell is defined, and if it is a valid date
    if (Object.prototype.toString.call(arrivalRangeValues[row][0]) === "[object Date]" &&
       Object.prototype.toString.call(targetRangeValues[row][0]) === "[object Date]") {
      //totalValidRows++;
      // OK it is a date. Is it in range?
      var newcomerArrivalDate = arrivalRangeValues[row][0];
      if ((newcomerArrivalDate.getTime() >= startDate) && (newcomerArrivalDate.getTime() <= endDate)) {
        // Yes this row is in range, so add 1 person
        totalPeople++;
        var validationDate = targetRangeValues[row][0];
        if ((validationDate.getTime() - newcomerArrivalDate.getTime()) <= leniencyMillis) {
          // Congrats!
          totalValid++;
        }
      }      
    }
  }
    
  if (totalPeople == 0) {
    return null;
  } else {
    return totalValid / totalPeople;
  }  
}

/**
 * The percentage of newcomers that had a date entered on time.
 *
 * @param {Date} currentMonth The date at the end of the month of interest.
 * @param {Array} arrivalRangeValues The range of dates (i.e. named range) for when the newcomer arrived
 * @param {Array} inviteRangeValues The range of dates (i.e. named range) for when the person was invited
 * @param {Array} acceptRangeValues The range of dates (i.e. named range) for when the person accepted
 * @return {Object} The percentage.
 */
function PCTACCEPTED(currentMonth, arrivalRangeValues, inviteRangeValues, acceptRangeValues) {
  var endDate = currentMonth.getTime();
  var startDate = endDate - (30 * 1000 * 60 * 60 * 24);

  var totalPeople = 0;
  var totalAccepted = 0;

  for (var row in arrivalRangeValues) {
    // Check if this cell is defined, and if it is a valid date
    if (Object.prototype.toString.call(arrivalRangeValues[row][0]) === "[object Date]" &&
       Object.prototype.toString.call(inviteRangeValues[row][0]) === "[object Date]") {
      // This person was invited
      //totalValidRows++;
      // Were they invited during the current month
      var newcomerArrivalDate = arrivalRangeValues[row][0];
      if ((newcomerArrivalDate.getTime() >= startDate) && (newcomerArrivalDate.getTime() <= endDate)) {
        // Yes this row is in range, so add 1 person
        totalPeople++;
        var acceptDate = acceptRangeValues[row][0];
        if (Object.prototype.toString.call(acceptDate) === "[object Date]") {
          // Accept date is defined
          totalAccepted++;
        }
      }      
    }
  }
    
  if (totalPeople == 0) {
    return null;
  } else {
    return totalAccepted / totalPeople;
  }  
}
