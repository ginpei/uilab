# Backbone Patterns

Some features and patterns I often implement.

## Name Space for Profuct

```js
var NS = window.NS = {};
NS.Model      = Backbone.Model     .extend({});
NS.Collection = Backbone.Collection.extend({});
NS.View       = Backbone.View      .extend({});

NS.Controller = NS.View.extend({});
```

## Naming

Type   |Style                |Examples
-------|---------------------|--------------------------------
General|Noun                 |`user`, `curUser`
Method |Verb                 |`drive`, `clearUserName`
Boolean|Adjective, `b` + Nown|`working`, `moved`, `bNew`
Listener of UI Event   |`on` + eventType [+ target]             |`onchangeName`, `onsubmitSearchForm`
Listener of Model Event|modelName + `_on` + eventType [+ target]|`model_onchange`, `curUsers_onadd`

## NS.template(name)

```js
/**
 * @param {String} name
 * @requires _.template
 * @example
 * <script id="FooView" type="text/x-template">
 * <div>My name is <%- name %>.</div>
 * </script>
 */
NS.template = function(name) {
  var elScript = document.getElementById(name);
  var templateText = elScript.text;
  var template = _.template(templateText);
  return template;
}
```

```js
NS.FooView = NS.View.extend({

  _template: NS.template('FooView'),

  render: function() {
    this.setElement($(this._template({ name:'Alice' })));
    return this;
  }
});
```
