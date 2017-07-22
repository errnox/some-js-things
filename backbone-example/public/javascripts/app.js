$(document).ready(function() {

  var self = this;

  self.names = {
    itemTemplateId: 'item-template',
    itemListTemplateId: 'item-list-template',
    mainContentId: 'main-content',
    editableFieldClass: 'editable-field',
    fieldInputClass: 'field-input',
    innerItemsClass: 'inner-items',
  }


  //=======================================================================
  // Items
  //=======================================================================

  self.ItemCollection = Backbone.Collection.extend({
    model: self.Item,
    localStorage: new Backbone.LocalStorage('item-collection'),
  });

  self.Item = Backbone.Model.extend({
    defaults: {
      name: 'Item',
      price: 0,
      items: new self.ItemCollection(),
      action: function() {
        console.log('Action!');
      },
    },
  });


  self.ItemView = Backbone.View.extend({
    tagName: 'div',
    className: 'item-view',
    template: _.template($('#' + self.names.itemTemplateId).html()),
    events: {
      // Ignore.
    },
    initialize: function() {
      this.bindEvents();
    },
    bindEvents: function() {
      this.events['click .' + self.names.editableFieldClass] =
        function(e) {
          $(e.target).addClass('hidden');
          $(e.target).next('.' + self.names.fieldInputClass).first()
            .removeClass('hidden').focus();
        };
      this.events['keypress input'] = 'closeAndSave';
      this.events['blur input'] = 'hideInput';
    },
    closeAndSave: function(e) {
      var that = this;
      that.code = e.which || e.keyCode;
      that.fieldName = $(e.target).attr('data-field-name');
      if (_.contains([13, 27], that.code)) {
        e.preventDefault();
        if (that.code == 13) {  // Return
          this.model.attributes[that.fieldName] = $(e.target).val();
          this.model.save();
          this.render();
        } else if (that.code == 27) {  // Esc
          $('input').blur();
        }
        this.hideInput(e);
      }
    },
    hideInput: function(e) {
      var fieldName = $(e.target).attr('data-field-name');
      $(e.target).prev('.' + self.names.editableFieldClass)
        .removeClass('hidden');
      $(e.target).addClass('hidden');
      if (e.type != 'focusout') {
        $(e.target).blur();
      }
      $(e.target).val(this.model.attributes[fieldName]);
    },
    render: function() {
      var that = this;
      try {
        this.$el.html(this.template(this.model.toJSON()));
        // _.each(this.model.attributes.items, function(item) {
        //   that.$el.find('.' + self.names.innerItemsClass).first().append(
        //     new self.ItemView({model: item}).render());
        // });
      } catch(error) {
        // Ignore.
      }
      return this.$el;
    },
  });

  self.ItemListView = Backbone.View.extend({
    defaults: {
      items: new self.ItemCollection(),
    },
    tagName: 'div',
    className: 'item-list-view',
    initialize: function() {
      // this.model.each(function(item) {
      //   item.save();
      // });
      this.model.fetch();
      this.render();
    },
    render: function() {
      var that = this;
      this.model.each(function(item) {
        $('#' + self.names.mainContentId).append(
          new self.ItemView({model: item}).render());
      });
      return this;
    },
  });


  //=======================================================================
  // App
  //=======================================================================

  self.App = function() {
    var that = this;
    self.testItems = [];

    that.generateData = function() {
      for (var i = 0; i < 10; i++) {
        self.testItems.push(new self.Item({
          name: 'Some Item ' + i,
          price: i * i,
          items: new self.ItemCollection([
            new self.Item(),
            new self.Item({
              name: 'Test Item',
              price: 10,
              items: new self.ItemCollection([
                new self.Item(),
                new self.Item({
                  name: 'Another Item',
                  price: 22,
                }),
              ]),
            }),
          ]),
          action: function() {
            console.log('Action! - Item #' + i);
          },
        }));
      }
      self.itemCollection = new self.ItemCollection(self.testItems);
      self.itemCollection.each(function(item) {
        that.saveItem(item);
      });
      self.itemListView = new self.ItemListView(
        {model: self.itemCollection});
    }

    that.saveItem = function(item) {
      item.save();
      // try {
      //   item.save();
      // } catch(error) {
      //   console.log(error);  // DEBUG
      //   console.log(item);  // DEBUG
      // }

      // new self.ItemCollection(item.attributes.items).each(function(itm) {
      _.each(item.attributes.items, function(itm) {
        // itm.save();
        if (itm) {
          // console.log('---');  // DEBUG
          that.saveItem(itm);
        }
      });
    };

    self.itemCollection = new self.ItemCollection();

    self.itemListView = new self.ItemListView(
      {model: self.itemCollection});

    this.start = function() {
      Backbone.history.start();
    };

    $('#generate-data-button').click(function(e) {
      e.preventDefault();
      localStorage.clear();
      that.generateData();
    });

  };

  self.app = new self.App();
  self.app.start();

});
