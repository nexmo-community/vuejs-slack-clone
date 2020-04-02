![Vonage][logo]

# Building a Slack Clone Using Vue.js

Have you ever wanted to build a chat application, but get stuck on features to add, or just how to build it generally? This repository supports a blog post on building a clone of everyone's favourite chat software, Slack. Using Vue.js, everyone's favourite framework. And, Vonage Conversation API, everyone's favourite conversation service.

**Table of Contents**

- [Getting Started](#getting-started)
  - [Node & NPM](#node--npm)
  - [Our CLI](#our-cli)
  - [Git (Optional)](#git-optional)
  - [This Demo Application](#this-demo-application)
  - [Configure the Application](#configure-the-application)
    - [Create an Application](#create-an-application)
    - [Create a Conversation](#create-a-conversation)
    - [Create Your User](#create-your-user)
    - [Add the User to a Conversation](#add-the-user-to-a-conversation)
    - [Generate a User Token](#generate-a-user-token)
  - [Store the Credentials in the Environment](#store-the-credentials-in-the-environment)
  - [Start the App Locally](#start-the-app-locally)
- [Code of Conduct](#code-of-conduct)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Node & NPM

```bash
node --version
npm --version
```

> Both Node and NPM need to be installed and at the correct version. [Go to nodejs.org](https://nodejs.org/), download and install the correct version if you don't have it.

### Our CLI

To set up your application, you'll need to install [our CLI](https://www.npmjs.com/package/nexmo-cli). Install it using NPM in the terminal.

```bash
npm install -g nexmo-cli@beta
```

You can check you have the right version with this command. At the time of writing, I was using version `0.4.9-beta-3`.

```bash
nexmo --version
```

Remember to [sign up for a free Vonage account](https://dashboard.nexmo.com/sign-up) and configure the CLI with the API key and secret found on your dashboard.

```bash
nexmo setup <your_api_key> <your_api_secret>
```

### Git (Optional)

You can use git to clone the [demo application](https://github.com/nexmo-community/vuejs-slack-clone) from GitHub.

> For those uncomfortable with git commands, don't worry, I've you covered.

Follow this [guide to install git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

### This Demo Application

Clone or download the demo application. To download, [go to the repository](https://github.com/nexmo-community/vuejs-slack-clone) and click on the *Clone or download* button on GitHub.

> ***Note:*** If you download, make sure you're on the right version number before downloading.

```bash
git clone https://github.com/nexmo-community/vuejs-slack-clone.git
```

Once unzipped or cloned, change into the directory.

```bash
cd vuejs-slack-clone
```

If you cloned the repository, checkout the version you want to set up.

```bash
git checkout part-1
```

Then, use npm to install the dependencies for the server and client apps.

```bash
npm install && npm install -C client/
```

### Configure the Application

Using our CLI, set up the service and configure the app with credentials to begin.

#### Create an Application

Create an application with RTC (real-time communication) capabilities. The event URL receives a live log of events happening on the service, like users joining/leaving, sending messages. It's an example URL for the moment.

```bash
nexmo app:create "Vue.js Slack Chat" --capabilities=rtc --rtc-event-url=http://example.com --keyfile=private.key
# Application created: 4556dbae-bf...f6e33350d8
# Credentials written to .nexmo-app
# Private Key saved to: private.key
```

#### Create a Conversation

Secondly, create a conversation, which acts like a chatroom. Or, a container for messages and events.

```bash
nexmo conversation:create display_name="general"
# Conversation created: CON-a57b0...11e57f56d
```

#### Create Your User

Now, create a user for yourself.

```bash
nexmo user:create name=USER_NAME display_name=DISPLAY_NAME
# User created: USR-6eaa4...e36b8a47f
```

#### Add the User to a Conversation

Next, add your new user to the conversation. A user can be a member of an application, but they still need to join the conversation.

```bash
nexmo member:add CONVERSATION_ID action=join channel='{"type":"app"}' user_id=USER_ID
# Member added: MEM-df772...1ad7fa06
```

#### Generate a User Token

Lastly, generate your new user a token. This token represents the user when accessing the application. This access token identifies them, so anyone using it will be assumed to be the correct user.

In practice, you'll configure the application with this token. In production, these should be guarded, kept secret and very carefully exposed to the client application, if at all.

The token is only usable for 24 hours. After that, you will need to re-run this `nexmo jwt:generate` command again to grant access to your client user again.

```bash
nexmo jwt:generate ./private.key sub=USER_NAME exp=$(($(date +%s)+86400)) acl='{"paths":{"/*/users/**":{},"/*/conversations/**":{},"/*/sessions/**":{},"/*/devices/**":{},"/*/image/**":{},"/*/media/**":{},"/*/applications/**":{},"/*/push/**":{},"/*/knocking/**":{}}}' application_id=APPLICATION_ID
# eyJhbGciOi...XVCJ9.eyJpYXQiOjE1NzM5M...In0.qn7J6...efWBpemaCDC7HtqA
```

### Store the Credentials in the Environment

Now, create a `.env` file and add the credentials you've now generated.

```bash
# server config
PORT=3000

# user config
VONAGE_USER=username
# USER_NAME from the above commands
VONAGE_USER_TOKEN=eyJhbGciOi...XVCJ9.eyJpYXQiOjE1NzM5M...In0.qn7J6...efWBpemaCDC7HtqA
# as generated from `nexmo jwt:generate`

# app config
VONAGE_DEFAULT_CONVERSATION_ID=CON-a57b0...11e57f56d
# as generated from `nexmo conversation:create`
```

### Start the App Locally

For now, there is no build. Later versions will provide build and deployment steps.

Dev will run the server and client concurrently.

```bash
npm run dev
```

## Code of Conduct

In the interest of fostering an open and welcoming environment, we strive to make participation in our project and our community a harassment-free experience for everyone. Please check out our [Code of Conduct][coc] in full.

## Contributing
We :heart: contributions from everyone! Check out the [Contributing Guidelines][contributing] for more information.

[![contributions welcome][contribadge]][issues]

## License

This project is subject to the [MIT License][license]

[logo]: vonage_logo.png "Vonage"
[contribadge]: https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat "Contributions Welcome"

[coc]: CODE_OF_CONDUCT.md "Code of Conduct"
[contributing]: CONTRIBUTING.md "Contributing"
[license]: LICENSE "MIT License"

[issues]: ./../../issues "Issues"
