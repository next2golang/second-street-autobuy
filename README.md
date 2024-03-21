
This is a chrome extension which automate the buying user experience in Second Street in Japan.
The site is here: https://www.2ndstreet.jp
The original one was using kind of Javascript web scraping:
  Getting goodsId and categoryId from url when user clicks a certain button and navigate to specific page...
In order to make this action fast, moved this part from scraping to api resulting in boosting the speed up from about 3.5s to about 1.5s.

There was a fail sometimes among many attempts and this was to the original site not the extension problem.
After several tests, I get to know this site stores user's cart information in their db.
The api was successful but the item is not stored in the user's cart: db.
I don't know but I guess this occurs in some sort of highpeak time of the site because of simultaneous requests of many users.
In this case, the extension detects the problem and resend the api request to resolve the issue.
