// This line looks at the url and gets the search substring
var string = window.location.search
// This line removes the '?=' from the beginning of the string
const newString = string.replace("?=", "");
// This line splits the string up removing the commas
var data = newString.split(',');
// console.log(data);
// The string is processed and split up into separate ids ready to pass onto fetch the JSON
var text = "";
var i;
for (i = 0; i < data.length; i++) {
    text += data[i] + "<br>";
    // console.log(text);
    var html = "";
    // The ids are used in a loop to fetch each comment using the url below
    fetch('https://hacker-news.firebaseio.com/v0/item/' + data[i] + '.json')
        .then(function (response) {
            return response.json()
        })
        .then(function (comments) {
            // console.log(comments)
            // Below the comments are dropoped into a bootstrap grid component
            html = html + `
                        <div class='row'>
                        <div class='col-sm-3'></div>
                            <div class='well well-sm col-sm-6'>
                            <p>${comments.text}</p>
                                <span class='pull-right'><em>${comments.by}</em></span>
                            </div>
                            <div class='col-sm-3'></div>
                        </div>
                        `;
            // Document method used to pass on the html to the story element of the comments.html file
            // A button is placed above the content so the user can go back to the index page using JS window.history.go
            // Total number of comments is displayed at the top of the page below the header
            document.getElementById('story').innerHTML = `
                                                        <center>
                                                            <button type="button" class="btn btn-warning" action="action" onclick="window.history.go(-1); return false;">Go
                                                                Back
                                                            </button>
                                                            <h5>
                                                                Total ${data.length} comments
                                                            </h5>
                                                        </center>
                                                        ` + html;
        })
}
