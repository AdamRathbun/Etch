# Etch
Etch is a creative collaboration tool that helps remote team members easily work together, especially when it comes to creative projects. Etch comes with accessible markup tools, comments, and project sharing to help you work with others and get your designs where they need to be.

## Video demo: https://soapbox.wistia.com/videos/hyu7fA6EOa

![short-demo](https://user-images.githubusercontent.com/92285612/196845404-3887cc5f-acbc-439e-b065-19ae5248c7d5.gif)

<!-- **Link to project:**  -->

## How It's Made:

**Tech used:** JavaScript, React, MongoDB, Mongoose, Node, Express, Redux, HTML, CSS, and Canvas

After making an account and logging in, users can create projects (with key project details like image, title, description, etc.). Users can then click on a project to open it up, where they can mark up the design image with various drawing tools and write comments to designate creative changes. Additional features include approvals, project deletion, project sharing, and authentication. Etch was built following Model-View-Controller architecture.

## Optimizations

Given more time, I would've liked to implement proper version control. I would've also liked to include an additional "sticky comment" feature that allows the user to attach a comment to a sticky on the image that highlights the connected comment when clicked on.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser. 
Make sure to create PORT, CONNECTION_URL, and JWT_SECRET in the .env in the server folder.
