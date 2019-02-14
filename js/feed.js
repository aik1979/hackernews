// Fetch the ids for the top stories
fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
  .then(function (response) {
    return response.json()
  })
  // Filter out the top 50 stories
  .then(function (data) {
    var text = "";
    var counter = 0;
    var i;
    for (i = 0; i < 50; i++) {
      text += data[i] + "<br>";
      var html = "";
      // Fetch the top 50 stories using the for loop above and the fetch below
      fetch('https://hacker-news.firebaseio.com/v0/item/' + data[i] + '.json')
        .then(function (response) {
          return response.json();
        })
        // return the JSON content as ITEMS and parse the data into the html code below
        .then(function (items) {
          // document.write(items.title)
          // below
          // Pop up window to display the url of the item 
          // Function from bottom of script used to convert the UNIX timestamp to legible time and date 
          // Pass on the kids ids onto the comments page      
          html = html + `
                          <div class='row'>
                            <div class='col-md-3'></div>
                              <div class='col-md-6'>
                                <div class='panel panel-danger'>
                                  <a class="urlLink" value="Open new window" onclick="window.open('${items.url}','popUpWindow','height=500, width=400, left=100, top=100, resizable=yes, scrollbars=yes, toolbar=yes, menubar=no, location=no, directories=no, status=yes');">  
                                    <div class='panel-heading'>
                                      <h3 class='panel-heading'>${items.title}</h3>
                                    </div>
                                  </a>
                                  <div class='panel-footer'>
                                    <div class='row'><div class='col-md-4' id='timeStamp'>` + timeConverter(items.time) + `</div>
                                    <div class='col-md-4'><a href='comments.html?=${items.kids}'>Read Comments</a></div>
                                    <div class='col-md-4 pull-right'>Provided by: ${items.by}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class='col-md-3'></div>
                          </div>
                          `;
          // Document method used to pass on the html to the story element of the index.html file                          
          document.getElementById('story').innerHTML = html;
        })
    }
  })
  .catch(function (error) {
    console.log('Requestfailed', error)
  });
// Timestamp conversion
function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + '  ' + hour + ':' + min + ':' + sec;
  return time;
}


