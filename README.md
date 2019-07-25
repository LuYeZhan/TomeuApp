# Project Name

## Description

Tomeu App is an app where the user can either create an event, which is a homemade meal in a private house or attend events which are already created. 
 
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **Landing Page** - As a user I want to be able to sign up or log in
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend or Create
- **login** - As a user I want to be able to log in on the webpage so that I can access to my account
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about, and the events I can attend
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **all events list** - As a user I want to see all the events available so that I can choose which ones I want to attend (is inside homepage)
- **events create** - As a user I want to create an event so that I can invite others to attend
- **events detail** - As a user I want to see the event details of one event so that I can decide if I want to attend 
- **event attend** - As a user I want to be able to attend to event so that the event organizer can count me in
- **event delete** - As a user I want to be able to delete any event I create, so that I can delete it.
- **event update** - As a user I want to be able to update any event, so that I can modify my events.

## Backlog

List of other features outside of the MVPs scope

User profile:
- upload my profile picture
- see other users profile
- add age, location, description
- send a request to the event organizer to attend the event
- receive the confirmation or rejection from the event organizer
- Be able to add to favorites any event I like


Geo Location:
- add geolocation to events when creating
- show event in a map in event detail page
- show all events in a map in the event list page

Mail:
- Send username info to the mail the user registered

## ROUTES:

- GET / 
  - redirects to /home if user logged in
  - renders the landing page 
- GET /auth/signup
  - redirects to /home if user logged in
  - renders the signup form 
- POST /auth/signup
  - redirects to /home if user logged in
  - body:
    - username
    - password
    - email
- GET /auth/login
  - redirects to /home if user logged in
  - renders the login form 
- POST /auth/login
  - redirects to /home if user logged in
  - body:
    - username
    - password
- POST /auth/logout
  - redirects to landing page
  - body: (empty)

- GET /events
  - redirects to / if user not logged in
  - renders homepage and events list

- GET /events/create
  - redirects to / if user not logged in
  - renders the create form

- POST /events/create 
  - redirects to / if user not logged in
  - body: 
    - title
    - date
    - location
    - capacity
    - description
    - pictures

- GET /events/:id
  - redirects to / if user not logged in
  - renders the event detail page
  - attend button if user not attending yet

- POST /events/:id/attend 
  - redirects to / if user not logged in
  - body: request message

- GET /profile/:id
  - redirects to / if user not logged in
  - renders user´s profile page
    - renders list of events created
    - renders list of events to attend

- POST /profile/:id
  - redirects to / if user not logged in
  - update:
    - events created
- POST /profile/:id
  - redirects to / if user not logged in
  - delete:
    - events created 

## Models

## User model
 
```
username: {
  type: String,
  required: true,
  unique: true
},
password: {
  type: String,
  required: true
},
email : {
  type: String,
},
events : [{
  type: ObjectId,
  ref: 'Event'
}]
timestamps: true
```

## Event model

```
title: {
  type: String,
  required: true,
  unique: true
},
location: {
  type: String,
  required: true,
},
description: {
  type: String
  required: true,

},
date: {
  type: Date, (only the day after today)
  required: true,
},

attendees: {
  type: Number,
  required: true,
}
carta: {
  type: Number,
  required: true,
}

``` 

## Links



### Trello

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
