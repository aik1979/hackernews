# HackerNews API

## Demo

https://aik1979.github.io/hackernews/

## Description

Created as a part of the Technical Interview stage for AND Digital.

## Task

To write a hackernews client to fetch the top stories from hackernews using their [official API](https://github.com/HackerNews/API).

## Usage

The project is very lightweight. It has been built using HTML, CSS, Javascript and Bootstrap. Simply upload to your local server and navigate to the index.html file.

All Bootstrap files are called via CDN and any custom CSS is included in the \css folder.

## Javascript Code

All the Javascript within the project has been created with comments added on strategic areas.

There are 2 JS files, feed.js serves the index.html file and comments.js serves the comments.html file

### feed.js -

```

_// Fetch the ids for the top stories_

fetch(&#39;https://hacker-news.firebaseio.com/v0/topstories.json&#39;)

  .then(function (response) {

    return response.json()

  })

  _// Filter out the top 50 stories_

  .then(function (data) {

    var text =&quot;&quot;;

    var counter =0;

    var i;

    for (i =0; i \&lt;50; i++) {

      text += data[i] +&quot;\&lt;br\&gt;&quot;;

      var html =&quot;&quot;;

      _// Fetch the top 50 stories using the for loop above and the fetch below_

      fetch(&#39;https://hacker-news.firebaseio.com/v0/item/&#39;+ data[i] +&#39;.json&#39;)

        .then(function (response) {

          return response.json();

        })

        _// return the JSON content as ITEMS and parse the data into the html code below_

        .then(function (items) {

          _// document.write(items.title)_

          _// below_

          _// Pop up window to display the url of the item_

          _// Function from bottom of script used to convert the UNIX timestamp to legible time and date_

          _// Pass on the kids ids onto the comments page      _

          html = html +`

                          \&lt;div class=&#39;row&#39;\&gt;

                            \&lt;div class=&#39;col-md-3&#39;\&gt;\&lt;/div\&gt;

                              \&lt;div class=&#39;col-md-6&#39;\&gt;

                                \&lt;div class=&#39;panel panel-danger&#39;\&gt;

                                  \&lt;a class=&quot;urlLink&quot; value=&quot;Open new window&quot; onclick=&quot;window.open(&#39;${items.url}&#39;,&#39;popUpWindow&#39;,&#39;height=500, width=400, left=100, top=100, resizable=yes, scrollbars=yes, toolbar=yes, menubar=no, location=no, directories=no, status=yes&#39;);&quot;\&gt;

                                    \&lt;div class=&#39;panel-heading&#39;\&gt;

                                      \&lt;h3 class=&#39;panel-heading&#39;\&gt;${items.title}\&lt;/h3\&gt;

                                    \&lt;/div\&gt;

                                  \&lt;/a\&gt;

                                  \&lt;div class=&#39;panel-footer&#39;\&gt;

                                    \&lt;div class=&#39;row&#39;\&gt;\&lt;div class=&#39;col-md-4&#39; id=&#39;timeStamp&#39;\&gt;`+timeConverter(items.time) +`\&lt;/div\&gt;

                                    \&lt;div class=&#39;col-md-4&#39;\&gt;\&lt;a href=&#39;comments.html?=${items.kids}&#39;\&gt;Read Comments\&lt;/a\&gt;\&lt;/div\&gt;

                                    \&lt;div class=&#39;col-md-4 pull-right&#39;\&gt;Provided by: ${items.by}\&lt;/div\&gt;

                                  \&lt;/div\&gt;

                                \&lt;/div\&gt;

                              \&lt;/div\&gt;

                            \&lt;/div\&gt;

                            \&lt;div class=&#39;col-md-3&#39;\&gt;\&lt;/div\&gt;

                          \&lt;/div\&gt;

                          `;

          _// Document method used to pass on the html to the story element of the index.html file                          _

          document.getElementById(&#39;story&#39;).innerHTML = html;

        })

    }

  })

  .catch(function (error) {

    console.log(&#39;Requestfailed&#39;, error)

  });

_// Timestamp conversion_

functiontimeConverter(UNIX\_timestamp) {

  var a =newDate(UNIX\_timestamp \*1000);

  var months = [&#39;Jan&#39;, &#39;Feb&#39;, &#39;Mar&#39;, &#39;Apr&#39;, &#39;May&#39;, &#39;Jun&#39;, &#39;Jul&#39;, &#39;Aug&#39;, &#39;Sep&#39;, &#39;Oct&#39;, &#39;Nov&#39;, &#39;Dec&#39;];

  var year = a.getFullYear();

  var month = months[a.getMonth()];

  var date = a.getDate();

  var hour = a.getHours();

  var min = a.getMinutes();

  var sec = a.getSeconds();

  var time = date +&#39; &#39;+ month +&#39; &#39;+ year +&#39;  &#39;+ hour +&#39;:&#39;+ min +&#39;:&#39;+ sec;

  return time;

}

```

### comments.js

```

_// This line looks at the url and gets the search substring_

var string = window.location.search

_// This line removes the &#39;?=&#39; from the beginning of the string_

const newString = string.replace(&quot;?=&quot;, &quot;&quot;);

_// This line splits the string up removing the commas_

var data = newString.split(&#39;,&#39;);

_// console.log(data);_

_// The string is processed and split up into separate ids ready to pass onto fetch the JSON_

var text =&quot;&quot;;

var i;

for (i =0; i \&lt; data.length; i++) {

    text += data[i] +&quot;\&lt;br\&gt;&quot;;

    _// console.log(text);_

    var html =&quot;&quot;;

    _// The ids are used in a loop to fetch each comment using the url below_

    fetch(&#39;https://hacker-news.firebaseio.com/v0/item/&#39;+ data[i] +&#39;.json&#39;)

        .then(function (response) {

            return response.json()

        })

        .then(function (comments) {

            _// console.log(comments)_

            _// Below the comments are dropoped into a bootstrap grid component_

            html = html +`

                        \&lt;div class=&#39;row&#39;\&gt;

                        \&lt;div class=&#39;col-sm-3&#39;\&gt;\&lt;/div\&gt;

                            \&lt;div class=&#39;well well-sm col-sm-6&#39;\&gt;

                            \&lt;p\&gt;${comments.text}\&lt;/p\&gt;

                                \&lt;span class=&#39;pull-right&#39;\&gt;\&lt;em\&gt;${comments.by}\&lt;/em\&gt;\&lt;/span\&gt;

                            \&lt;/div\&gt;

                            \&lt;div class=&#39;col-sm-3&#39;\&gt;\&lt;/div\&gt;

                        \&lt;/div\&gt;

                        `;

            _// Document method used to pass on the html to the story element of the comments.html file_

            _// A button is placed above the content so the user can go back to the index page using JS window.history.go_

            _// Total number of comments is displayed at the top of the page below the header_

            document.getElementById(&#39;story&#39;).innerHTML =`

                                                        \&lt;center\&gt;

                                                            \&lt;button type=&quot;button&quot; class=&quot;btn btn-warning&quot; action=&quot;action&quot; onclick=&quot;window.history.go(-1); return false;&quot;\&gt;Go

                                                                Back

                                                            \&lt;/button\&gt;

                                                            \&lt;h5\&gt;

                                                                Total ${data.length} comments

                                                            \&lt;/h5\&gt;

                                                        \&lt;/center\&gt;

                                                        `+ html;

        })

}

```

## Requirements

This project has no dependencies
