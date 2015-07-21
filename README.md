# FixedRouter

FixedRouter is a simple router for non-SPA webpages.

In regacy websites, we used to do "routing" manually.
We had to care about the order of JS loading, or configuration of concat, uglify, bundle...

FixedRouter manages controllers with Promises.
It works no matter how the controllers are defined or when they be called.
We don't have to care about the order files are loaded.

FixedRouter doesn't provide typical routing features like URL matching, pushState support, etc.

## Usage

Assume that every page has `page-id` in body tag.

```html
<title>User : John Doe</title>
<body page-id="user-read" user-name="John Doe">
  <ul>
    <li class=".name"></li>
    <li class=".age"></li>
  </ul>

  <script src="./controllers/user/index.js"></script>
  <script src="base.js"></script>
</body>
```

Register a controller, or more:

```javascript
// controller/user/index.js
Router.register('user-index', function () {
    var username = $('body').attr('user-name');

    return $.get('/-/api/user/' + username).then(function (res) {
        $('.name').text(res.name);
        $('.age').text(res.age);
    });
});
```

and then call it:

```javascript
// base.js
$(function () {
    var pageID = $('body').attr('page-id');

    Router.selectRoute(pageID).then(function () {
        console.log('page initalized');
    });
})
```

The order of JS loading is convertible:

```html
  <script src="base.js"></script>
  <script src="./controllers/user/index.js"></script>
```

You can also add controllers dynamically:

```javascript
// controller/user.js
Router.register('item', function () {
    // These controllers won't be registered
    // until the user visits "item" page.
    Router.register('item-index',  itemIndex);
    Router.register('item-create', itemCreate);
    Router.register('item-update', itemUpdate);
    Router.register('item-delete', itemDelete);
});
```
