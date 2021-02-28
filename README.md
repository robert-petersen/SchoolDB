# SchoolDB

## Endpoints

```
-------------------------------------------------------------------------------------
CRUD    | Route                                     | Description
-------------------------------------------------------------------------------------
Register and Login Endpoints
-------------------------------------------------------------------------------------
POST    | "api/auth/register-student"               | Registers a student user
        |                                           | requires object: {
        |                                           |     username: "",
        |                                           |     firstName: "",
        |                                           |     lastName: "",
        |                                           |     password: ""
        |                                           |   }
        |                                           | Returns a user object 
-------------------------------------------------------------------------------------
POST    | "api/auth/register-volunteer"             | Registers a volunteer user
        |                                           | requires object: {
        |                                           |     username: "",
        |                                           |     firstName: "",
        |                                           |     lastName: "",
        |                                           |     password: "",
        |                                           |   }
        |                                           | Returns a user object
-------------------------------------------------------------------------------------
POST    | "api/auth/register-admin"                 | Registers a admin user
        |                                           | requires object: {
        |                                           |     username: "",
        |                                           |     password: "",
        |                                           |     adminCode: "", (on Slack)
        |                                           |   }
        |                                           | Returns a user object
-------------------------------------------------------------------------------------
POST    | "api/auth/login"                          | Logins in a user
        |                                           | requires object: {
        |                                           |     username: "",
        |                                           |     password: "",
        |                                           |     role: (must be "student",
        |                                           |      "volunteer", or "admin")
        |                                           |   }
        |                                           | Returns object: {
        |                                           |     message: "",
        |                                           |     token: "",
        |                                           |     role: "",
        |                                           |     username: ""
        |                                           |   }
-------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------
Student Funtionality Endpoints
-------------------------------------------------------------------------------------
        | see volunteers available if no volunteer  |
        |                                           |
        |                                           |
-------------------------------------------------------------------------------------
        | select volunteer                          |
        |                                           |
        |                                           |
-------------------------------------------------------------------------------------
        | needs to see the tasks assigned to them   |
        |                                           |
        |                                           |
-------------------------------------------------------------------------------------
        | set needMeeting to true or false          |
        |                                           |
        |                                           |
-------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------
Volunteer Functionality Endpoints
-------------------------------------------------------------------------------------
        | set subject                               |
        |                                           |
        |                                           |
-------------------------------------------------------------------------------------
        | see all students paired to them           |
        |                                           |
        |                                           |
-------------------------------------------------------------------------------------
        | see a students tasks                      |
        |                                           |
        |                                           |
-------------------------------------------------------------------------------------
        | set a students task as complete           |
        |                                           |
        |                                           |
-------------------------------------------------------------------------------------
        | creates tasks                             |
        |                                           |
        |                                           |
-------------------------------------------------------------------------------------
        | assigns tasks to students                 |
        |                                           |
        |
-------------------------------------------------------------------------------------
Admin Functionality Endpoints
-------------------------------------------------------------------------------------
        | can see all volunteers                    |
        |     - see all volunteers students         |
        |     - see all volunteer students tasks    |
-------------------------------------------------------------------------------------
        | can use volunteer endpoints to            |
        |     - create / assign tasks               |
        |                                           |
-------------------------------------------------------------------------------------
        | remove students and volunteers            |
        |                                           |
        |                                           |
-------------------------------------------------------------------------------------
```

## Data Tables

```
 studentId | username | firstname | lastName | password | volunteerId | needMeeting
------------------------------------------------------------------------------------
      #    |   "_"    |    "_"    |    "_"   |    "_"   |     #       |   bool


 volunteerId | username | firstname | lastName | password | subject
--------------------------------------------------------------------
      #      |    "_"   |    "_"    |   "_"    |    "_"   |   "_"


 adminId | username | password
-------------------------------
    #    |   "_"    |    "_"


 taskId | task | description
-----------------------------
    #   | "_"  |     "_"


 taskPairId | taskId | studentId | completed
---------------------------------------------
     #      |    #   |     #     |    bool

```

## ☝️ **Pitch**

School in the Cloud is a platform that trains senior volunteers to teach students in a group or individual setting. This helps kids in communities with high student to teacher ratios. It also provides retired volunteers a sense of purpose and meaning in their day to day life when they find themselves with more free time. The platform also connects volunteers with the students. 

The aim is to help close the achievement gap by connecting students with available, qualified volunteer mentors. The first piece of this app will be creating the three main user types, and allowing an admin to create a training checklist for new volunteers.

## ✅  **MVP**

1. On-boarding for three user types: `admin`, `student`, and `volunteer`. Each user type will have their own view.

2. Ability for an `admin` to create and edit a training “`tasks`” volunteers to complete. Saving a to do list will make it appear on the volunteers homepage.

3. Homepage for `volunteer` to view their `tasks` from an `admin`.

4. Homepage for `student`s to see the profiles of all registered `volunteers`. They can search by their listed `availability time`s, or their `country`.

## 🏃‍♀️ **Stretch**

1. Ability for `volunteer` to check off `items` in their `tasks`, and progress is reported back to the `admin`.

2. Ability for a `student` to schedule a `time` to meet with a `volunteer` (see the Github for previous flex together project which worked on scheduling ability).