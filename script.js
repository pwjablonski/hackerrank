/////////////////// 
//Defining the variables and values
///////////////////

      var classes= [
        {
          'name' : 'aoit',
          'spreadsheetId': '1xZGXZplyxqhMJFdZ5R4BOQeO0YIYw0ocSPw_kvul2iU'
        },
        {
          'name' : 'aoit5',
          'spreadsheetId': '1XPgcfI4eal9TUWA3vO6x6jRFCNisceW3yn8pYqh7'
        },
        {
          'name' : 'gat',
          'spreadsheetId': '1aeSLOOG0-B8-qyYho0LjQ4mC7tomx7HnPhnFVWxQh_g'
        },
        {
         'name' : 'qvt',
         'spreadsheetId': '1j6Cp-BslWQUjWCpiwxGAABj9T2AYlpUf5hmFxD44rw8'
        },
        {
          'name' : 'salesforce',
          'spreadsheetId': '13XjwHZLDiubErx3d8YcdqSUqWBRS3WXkYfKrpGDZVPU'
        },
        {
          'name' : 'hbc',
          'spreadsheetId': '1whsv_D_OQMSo48DiQ2F7QosKbVL9xh7Y3XKONruJo7I'
        }
      ]

      var challenges = [
        { 
          'name' : 'unit1',
          'id' : '1' 
        },
        { 
          'name' : 'unit2',
          'id' : '1' 
        },
        { 
          'name' : 'unit2',
          'id' : '1' 
        },
        { 
          'name' : 'unit3',
          'id' : '1' 
        },
        { 
          'name' : 'unit4',
          'id' : '1' 
        },
        { 
          'name' : 'unit5',
          'id' : '80107',
          'questions' : {
            '1' : '249150',
            '2' : '249152'
          } 
        },
        { 
          'name' : 'unit6',
          'id' : '1' 
        },
        { 
          'name' : 'unit7',
          'id' : '1' 
        },
        { 
          'name' : 'midYear',
          'id' : '107096'
        },
        { 
          'name' : 'unit8',
          'id' : '1' 
        },
        { 
          'name' : 'unit9',
          'id' : '1' 
        },
        { 
          'name' : 'unit10',
          'id' : '1' 
        },
        { 
          'name' : 'unit11',
          'id' : '1' 
        },
        { 
          'name' : 'unit12',
          'id' : '1' 
        },
        { 
          'name' : 'unit13',
          'id' : '1' 
        },
        { 
          'name' : 'endYear',
          'id' : '1' 
        },
        { 
          'name' : 'advancedMidYear',
          'id' : '109919',
          'questions':{
              '1' : "303114",
              '2' : "223166",
              '3' : "292168",
              '4' : "289673",
              '5' : "289674",
              '6' : "229964",
              '7' : "290988",
              '8' : "256445",
              '9' : "302276",
              '10' : "286927",
              '11' : "286985",
              '12' :"237133",
              '13' : "291325",
              '14' : "291325",
              '15' : "226727",
              '16' : "226746",
              '17' : "251703",       
              '18' : "230030",  
          } 
        },
        { 
          'name' : 'advancedEndYear',
          'id' : '1' 
        }
      ]

/////////////////// 
// Google sheet Authentication
///////////////////
      var CLIENT_ID = '583003067737-k9h91jrfghcvch4ff7cmpu1r84pl3gj1.apps.googleusercontent.com';
      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
      // Authorization scopes required by the API; multiple scopes can be
      var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";
      var authorizeButton = document.getElementById('authorize-button');
      var signoutButton = document.getElementById('signout-button');
     
       // On load, called to load the auth2 library and API client library.

      function handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }

      //Initializes the API client library and sets up sign-in state listeners.       
      function initClient() {
        gapi.client.init({
          discoveryDocs: DISCOVERY_DOCS,
          clientId: CLIENT_ID,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        });
      }

      // Called when the signed in status changes, to update the UI
      // appropriately. After a sign-in, the API is called.
       
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
  
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
      }
      //Sign in the user upon button click.
      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }
      //Sign out the user upon button click.
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }
 
/////////////////// 
//Handling the clicks
///////////////////

      //Add classes to the dropsown button
      for (var i = classes.length - 1; i >= 0; i--) {
          $("#classes").append('<li class="dropdownItemClass" id="'+ classes[i].name +'"><a href="#">' + classes[i].name +' </a></li>'); 
       }

      //Add challenges to the dropsown button 
      for (var i = challenges.length - 1; i >= 0; i--) {
          $("#challenges").append('<li class="dropdownItemChallenge" id="'+ challenges[i].name +'"><a href="#">' + challenges[i].name +' </a></li>'); 
       }


  

      //Listens for click and assigns value to slected class when cicked
      var selectedClass = ''
      var selectedSpreadSheetId = ''

      $(".dropdownItemClass").click(function(){
        emptyData()
        selectedClass = $(this).attr('id')
        findClassSpreadSheetId()
        listClass()
      })

      //Listens for click and assigns value to slected challenge when cicked
      var selectedChallenge = ''
      var selectedChallengeId = ''
      $(".dropdownItemChallenge").click(function(){
        selectedChallenge = $(this).attr('id')
        findChallengeId()
        firstUrl = "https://www.hackerrank.com/x/api/v3/tests/" + selectedChallengeId +"/candidates?limit=100&offset=0&fields=id,email,full_name,score,questions,report_url,pdf_url"

        setHeader()
        getStudentChallengeData(firstUrl)
      })


      // Find spreadsheet id of selected class
      function findClassSpreadSheetId(){
          classes.forEach(function(classroom){
            if(classroom.name === selectedClass){
              selectedSpreadSheetId = classroom.spreadsheetId
            }
          })
      }

      // Find id of selected challenge
      function findChallengeId(){
          challenges.forEach(function(challenge){
            if(challenge.name === selectedChallenge){
              selectedChallengeId = challenge.id
            }
          })
      }


      function emptyData(){ 
          $(".studentData").empty()
      }

/////////////////// 
// Making Web Requests to fetch from the google spreadsheet
///////////////////
      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }

      /**
       * Print the names and majors of students in a sample spreadsheet:
       * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
       */
      function listClass() {
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: selectedSpreadSheetId,
          range: 'Sheet1!A3:H',
        }).then(function(response) {
          var range = response.result;
          if (range.values.length > 0) {
            for (i = 0; i < range.values.length; i++) {
              var row = range.values[i];
              // Print columns A and E, which correspond to indices 0 and 4.
              if (row[2].toLowerCase() === "student"){
                $(".studentData").append('<tr class="' + row[0].toLowerCase() + " " + row[1].toLowerCase() + '"><td class="name">' + row[0] + " " + row[1] + '</td><td>' + row[2] + '</td><td class="attendancePercentage">' + row[4] + '</td></tr>');
              }
              //appendPre(row[0] + ', ' + row[4]);
            }
          } else {     
            console.log('No data found.');
            //appendPre('No data found.');
          }
        }, function(response) {
          console.log('Error: ' + response.result.error.message);
          //appendPre('Error: ' + response.result.error.message);
        });
      }


/////////////////// 
// Making Web Requests for hackkerank 
///////////////////
      // set header for questions
      function setHeader(){
        challenges.forEach(function(challenge){
            if(challenge.name === selectedChallenge){
                for (var key in challenge.questions) {
                  $('.studentDataHeader').append('<th class="questionHeader" id="'+ challenge.questions[key] +'">' + key + '</th>');
                }
            }
        })        
      }


      //AJAX request to retrieve test data
      function getStudentChallengeData(url) {
          console.log(url)
          var settings = {
           "async": true,
           "crossDomain": true,
           "url": url,
           "method": "GET",
           "headers": {
             "authorization": "80ddf214335149dab53312d8faad0e0e33485fced288d2fa989fd21b934fb391"
           }
         }
         var testCandidates
         $.ajax(settings).done(function (response) {  
            listChallengeData(response.data) 
            if(response.next !== ""){
              getStudentChallengeData(response.next+"&fields=id,email,full_name,score,questions,report_url,pdf_url")
            }
         }); 
      } 

      function listChallengeData(data){  
          
          students = $(".studentData tr")
          
          //iterate through all the challenges
          for (i = 0; i < data.length; i++) {
              
             for (j = 0; j < students.length; j++) {
                // Print columns A and E, which correspond to indices 0 and 4.
                if (data[i].full_name == null){
                    continue
                }
                else if (data[i].full_name.toLowerCase() === students[j].className){
                  $('tr[class="'+ students[j].className +'"]').append('<td class="totalScore"> <a href="' + data[i].report_url + '" target="_blank"> Rpt </a>|<a href="' + data[i].pdf_url + '" target="_blank"> PDF </a></td>');
                  $('tr[class="'+ students[j].className +'"]').append('<td class="totalScore">' + data[i].score + '</td>');

                  
                  headers = $('.questionHeader')

                 for (k = 0; k < headers.length; k++) {
                   var found = false
                   for (var key in data[i].questions) {       
                     if (headers[k].id === key){
                       $('tr[class="'+ students[j].className +'"]').append('<td class="questionResult">' + data[i].questions[key] + '</td>')
                       found = true
                       break
                     }
                    }

                    if (found === false){
                      $('tr[class="'+ students[j].className +'"]').append('<td class="questionResult"> X </td>')
                    }

                  }

                }
                //appendPre(row[0] + ', ' + row[4]);
              }  
          }      
      }

/////////////////// 
// Conditinal Formating 
///////////////////

      $('#formatButton').click(function(){
        formatCells()


      })

      function formatCells(){
        $('.questionResult').each(function() {
            if (parseInt($(this).text()) === 5) {
                $(this).css('background-color','green');
            }
            else if(parseInt($(this).text()) > 0 && parseInt($(this).text()) < 5) {
              $(this).css('background-color','yellow');
            }
            else if(parseInt($(this).text()) === 0){
              $(this).css('background-color','red');
            }
        });
      }

/////////////////// 
// Diplaying  the Data
///////////////////


/////////////////// 
// Extra stuffs
///////////////////

      // Gets all the tests and appends to the table
      var allTests = [];
      console.log(allTests)
      //AJAX request to retrieve test data
      function getAllTests(callback) {
          var settings = {
           "async": true,
           "crossDomain": true,
           "url": "https://www.hackerrank.com/x/api/v3/tests?limit=10&offset=0",
           "method": "GET",
           "headers": {
             "authorization": "80ddf214335149dab53312d8faad0e0e33485fced288d2fa989fd21b934fb391"
           }
         }
         $.ajax(settings).done(function (response) {  
           allTests = response.data ;
           allTests = allTests.sort(); 
           callback(allTests);
         });   
      } 

      //appends the tests to the DOM
      function appendTests(allTests){
        for (var i = allTests.length - 1; i >= 0; i--) {
              $(".allTestsTableBody").append('<tr><td>' + allTests[i].id + '</td><td>' + allTests[i].name + '</td><td>' + allTests[i].duration + '</td><td>' + allTests[i].state + '</td><td>' + allTests[i].created_at + '</td></tr>'); 
           }
      }

      //Runs the getAllTest() when button clicked

      $('.getalltests').click(function() {
          emptyTests()
          getAllTests(appendTests);
      });


      //Clear table
      function emptyTests(){ 
          $(".allTestsTableBody").empty()
      }
