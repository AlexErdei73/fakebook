# fakebook

This is a facebook clone, which is made to show my skills as a webdeveloper in JavaScript. The frontend is going to be build by React, the backend is a Firebase project. This work is the final project of the The Odin Project curriculum in the JavaScript modul. More information can be found on the [TOP website](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript/lessons/final-project).

# used simplifications

This has been my largest Java Script project. Although it's a fairly large project, I needed to make lot of simplifications, just to keep the project manageble by myself. 

- First of all I simplified the data structure as much as possible. Here every registered user is friend with all other registered users. This is a major simplification and restricts the functionality. You can't delete your friends and they can't do it with you either. Nobody can be blocked. This is fine for a demonstration app like this.

- Registered users are able to read and write all the data, therefore the app is unprotected from the very important point of data protection. In theory it wouldn't be difficult to give it a relatively strong protection. We could do it with a bit more difficult rules on the Firebase Firestore database. Unfortunately the protection of user communication is more difficult and it requires the application of Firebase cloud functions, which are not available within the free tier of Firebase apps. I really wanted to keep the app within the free tier, therefore it has not been implemented. Of course I bear all the necessary concepts and I have some experience with cloud functions, therefore I know the necessary technology to protect the app if it was a real world application.

- The available functionality is strongly restricted. It does not have any kind of group communication. There is no commercial or sponsored content at all. There are no storries about users, the amount of personal data is restricted for data protection reasons. There are no emojis, GIFs there are no videos either, apart from YouTube videos. There is no webcamera, or mic applied, therefore no video or voice chat functionality available. The uploaded pictures has no textual description apart from messages, posts or comments. Even the comment structure is simplified compared to the real world app.

# applied technology

This app seemed to be way more complicated even with the mentioned simplifications than anything else I have done before. It seemed to be natural to apply some libraries beside vanilla Java Script. The back end is handled by Firebase. For more information visit https://firebase.google.com. 

-The actual front end part is built by React, just like the real world version. The Odin Project has a great intermediate React course, which gave me the basics. This was great basic foundation, but I needed to go slightly deeper. The official React documentation was great help with this. More information can be found here: https://reactjs.org/

-Communicating with Firebase is a deeply asynchronous process. The inner working of React is deeply asynchronous too. The application of these technologies in the same app is not completely straightforward. Luckily there is a library, which connects the two. This is called reactfire, from the developers of Firebase. This contains costum hooks and React components, to use Firebase easily in a React app. Unfortunately this is still in experimental phase, and older versions were supposed to work with only experimental versions of React, not with the stable build. By now this situation is improving and this library is at it's 4.2.0 version. I used the 3.0.0 version, which works great even with the latest stable React build, apart from a few issues, especially with the Firebase Auth product. 
One of the reason, why this library is so powerful, is that it's based on the rxjs library, which is an implementation of the Observer pattern for client-server communication. I've met with it before regarding Angular, but I experienced the true power of it during building this app. More information can be found about reactfire here: https://github.com/FirebaseExtended/reactfire/tree/v3.0.0 It's certainly worth to get some information about the relevant Observer pattern, which is one of the most common and powerful OOP design pattern. I certainly need further studies to fully understand it.

-Regarding the styling Bootstrap was tremendous help and I used components from React-Bootstrap. This made my work much easier, especially because the visual world of these tools and the look of the original app is very similar. Wherever these tools were not powerful enough, vanilla CSS was a great help. For more information: https://react-bootstrap.github.io

-All the icons have been taken from the react-icons library. You can find it here: https://react-icons.github.io/react-icons

# What have I learnt from this project?

During building this app I learnt more than I could have imagined. There were so many problems to solve, that it was just incredible. The more interesting points are in the code in the form of comments. Let me mention here a few things:

- Some more React hooks than the simple useState and useEffect hooks. This app contains hooks like: useRef, useHistory, useLocation, etc. Most of the react-fire code is applied in the form of hooks too. This app is full of these as well.

- I needed more information about the react-router, than the the Odin Project really teaches in its material. Of course they take you to the relevant documentation and I needed to deal with it a lot. I learnt how to handle nested routs for example. This app is full of tricky usage of the react-router.

- Lot's of minor or major problems regarding the styling of components. I needed to find some non-trivial solutions in CSS. Some of the solutions are really interesting. I would only mention just how you can style an image to become responsive but to keep its aspect ratio. This is surprisingly difficult problem, or even the dynamic styling of textarea components to allow them to follow their content size horizontally. This is far from trivial especially in React code. Some of these solutions could be a great blog topic at least in React. Luckily vanilla Java Script solutions have already documented well.

- The responsive design is mostly done by Bootstrap. There were some points, where Bootstrap was not powerful enough. I made a unique React solution for this problem, but I can imagine that it can be done easier with advanced CSS. That's going to be one of the topic of my further studies for example. 

- It was non trivial how I can apply Firebase timestamps without cloud functions. It was not obvious at all. Although the solution, which I found, works well, I am not sure it's the best.

- Deploying React apps to gh-pages can be a lot of work, if they contain a lot of routes like this app. The relative links work fine in the developer version without the fakebook in the path. On the other hand the deployed webpage has to contain fakebook/ at the beginning of all the paths, because the relative links are relative to the root directory of the gh-pages.

# What are the possible directions for improvement? 

- Relatively simple improvement would be to add the messaging functionality to other pages of the app. This is currently available on the homepage, but in the real world app there are "Message" buttons on the user cards or even user profiles too. 

- Another possible improvement would be to add videos to the app. At the moment only YouTube videos can be added to posts and comments, and only pictures to user profiles. If videos were available, that would make the storage usage much higher. This is a good compromise to keep the app free from Firebase fees.

- We could add GIF-s and emoji-s to the app. For keep things simple I haven't dome it yet, but these are great, so there is opportunity for improvement here.

- Cloud functions would be great to maintain data security. They would also give oportunity to apply AI technologies from Firebase to filter out inappropriate content automatically. 

- This app has not been designed to target users with accessibility needs. If we added more text content to pictures, and users it could be used for this purposes too. We could for example populate the alt properties of the images with usful text descriptions.

- Although Firebase may not be the right technology for video and audio messaging, it can be interesting, how it could be included in this app. There may be some existing API for this purpose. It's also interesting how the backend can be built and how this kind of messaging can be implemented. This is for the my future studies.

- It is also interesting how the used libraries work and how could I build similar libraries myself. The Odin Project contain further material regarding this, so I keep on studying. The time might be comming to find some job on the field as a front-end developer. That's my future plan from this point.

# Testing

The project description requires us to do high-level testing for this project. Because this project is a React front-end code, simple automated unit testing is out of question. It's not obvious how high level should this testing be. Most of the components contain some connection with Firebase. Automated testing of these is difficult, because mocking the whole back end can be difficult. We should perhaps use the firebase emulator and we could build test with including that tool. We also could choose some components, which is free from communicating with Firebase, to test. This code contains lot of side effects, so the components are hardly ever pure functions. Testing this code with the automated unit testing tools seems to be hard at the moment. I will try to find some ways to do it in the future, but I am affraid the test coverage will not be very high in this case. I will perhaps restrict myself to test some of the simplest components. 

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
