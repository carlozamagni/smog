// Generated by CoffeeScript 1.3.1
(function() {

  define(["smog/notify", "smog/editor", "templates/edit"], function(notify, editor, templ) {
    return function(_arg) {
      var edit, id, name, realname;
      name = _arg.name, id = _arg.id;
      realname = name.toLowerCase();
      $('#content').append(templ({
        id: id
      }));
      edit = editor.create("" + id + "-edit-view", "json");
      edit.getSession().setUseWrapMode(true);
      edit.getSession().setWrapLimitRange(100, 100);
      edit.getSession().setValue($("#" + id + "-value").text());
      $('#edit-modal').modal().css({
        'margin-left': function() {
          return -($(this).width() / 2);
        }
      });
      return $('#edit-modal').on('hidden', function() {
        var handleChange, val;
        edit.destroy();
        $('#edit-modal').remove();
        handleChange = function(value) {};
        try {
          val = JSON.parse(value);
          val._id = this.getAttribute('id');
          server.collection({
            collection: realname,
            type: 'update',
            query: val
          }, function(err) {
            if (err != null) {
              return notify.error("Error saving document: " + err);
            }
            return notify.success("Document saved!");
          });
          return value;
        } catch (err) {
          return notify.error("Invalid JSON: " + err);
        }
      });
    };
  });

}).call(this);