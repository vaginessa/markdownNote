
#Sync to Dropbox

##Create a spike to save to and load a file from dropbox, using [dropbox.js](https://github.com/dropbox/dropbox-js)

###Insert dropbox.js to template

```html
<!-- dropbox.html -->
<html>
<head>
  <title>spike for dropbox</title>
  <script src="//cdnjs.cloudflare.com/ajax/libs/dropbox.js/0.10.2/dropbox.min.js">
  </script>
</head>
<body>
  <script src="syncToDropbox.js"></script>
</body>
</html>

```

###Create app in [Dropbox Console](https://www.dropbox.com/developers/apps)

###Use a local server for testing purposes (I use [local-web-server](https://www.npmjs.com/package/local-web-server))

###Launch the server in the project library

```bash
$ ws
```

###Add Redirect URI to the registered app on dropbox app console

`http://localhost:8000/dropbox.html`

###Copy app key from app console

It will be something like this `pbqyznysf6jffyl`

###Follow the instructions [here](https://github.com/dropbox/dropbox-js/blob/stable/guides/getting_started.md) for getting started using dropbox client


##Testing of save file to Dropbox

I use when library when I have to mock promises. For that 

- I needed to [build the browserified version of when](https://github.com/cujojs/when/blob/master/docs/installation.md#browser-environments-via-browserify)
- connect the file to karma files

Now we can write a test like this:

```js
it('should call writeDataToDropbox with client arg', function (done) {
  var client = 'authenticated';

  sinon.stub(isolated.ctrl, 'authentication')
    .returns(when(client));

  var mock = sinon.mock(isolated.ctrl);
  mock.expects('writeDataToDropbox').withArgs(client);

  isolated.ctrl.save();

  setTimeout(function() {
    expect(mock.verify()).to.equal(true);
    isolated.ctrl.authentication.restore();
    done();
  }, 10);
});
```
