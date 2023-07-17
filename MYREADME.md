## Improving the Quality of the Codebase (In Order of Least to Most Importance)
- Adding comments for each function and definition written that explain 
the purpose of these segments and how they play a roll in the functionality of the program to improve readability for users and other programmers alike.
- Currently, there is an abundant amount of hard coding involved in this program such as with the API URL, the name and the color of the generate button, and the example url displayed to the user. 
In an effort to make this program more flexible and versatile, these values could be assigned to variables or even passed in to the functions utilizing them so the code is more adaptable. If you wanted to change any of these values you would only have to do it once, which is called parameterization.
- As of now, regardless if the link the user inputs is valid or not, a shortened url is still being created for the given link.
Therefore, I would check if the user's input leads to a valid, pre-existing link or not because there would be no point of creating a shorter url for a url that does not exist. It would not only make more logical sense but decrease the amount of unnecessary numbers being logged in the console. If the link is invalid I would display an error to the user and tell them to try again.

## Implementing an improvement
- I decided to implement checking if the user's input leads to a valid pre-existing link and attempted to make a popup that would display to the user if their inputted url was invalid.
- If the user inputted an invalid url, a shortened url would not be created
  (see in files persist.ts, app.tsx, and popup.tsx)
