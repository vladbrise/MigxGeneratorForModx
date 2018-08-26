$(document).ready(function () {

  generate = $('#generate');
  outcol = $('#columns');
  outhead = $('#headers');
  add = $('#add_field');


  add.click(function () {


    var fields = $('.item');
    $('.fields_list').append('<div class="item">\n' +
      '      <input type="text" placeholder="Поле" name="field" id="migx_field">\n' +
      '      <input type="text" placeholder="Название" id="caption">\n' +
      '      <select name="type" id="option">\n' +
      '        <option value="text">text</option>\n' +
      '        <option value="textarea">textarea</option>\n' +
      '        <option value="image">image</option>\n' +
      '        <option value="richtext">richtext</option>\n' +
      '        <option value="option">option</option>\n' +
      '        <option value="listbox">listbox</option>\n' +
      '      </select>\n' +
      '      <label>\n' +
      '        <span>Sortable?</span>\n' +
      '        <input type="checkbox" id="sort">\n' +
      '      </label>\n' +
      '\n' +
      '      <span id="remove">Удалить</span>\n' +
      '    </div>');
    $('.item').find('#remove').click(function () {
      $(this).parent().remove();
    });
  });

  generate.click(function () {
    getColumns();
    getHeaders();

  });


  function getColumns() {
    arr = [];
    var list = $('.fields_list').find('.item');
    $.each(list, function (index) {
      field = $(this).find('#migx_field').val();
      caption = $(this).find('#caption').val();
      option = $(this).find('#option').val();



      fields = {
        field: field,
        caption: caption,
        inputTVtype: option,

      };

      arr.push(fields);

    });
    json = JSON.stringify(arr, '', 2);
    console.log(json);


    var arr_field = [];
    arr_field.push({
      caption: "Заголовок",
      fields: arr
    });



    jsonfinal = JSON.stringify(arr_field, "", 2);

    outcol.text(jsonfinal).val();
  }

  function getHeaders() {
    var list = $('.fields_list').find('.item');
    var arr_columns_out = []
    sort = 'false';

    $.each(list, function (index) {
      field = $(this).find('#migx_field').val();
      caption = $(this).find('#caption').val();
      issort = $(this).find('#sort');
      option = $(this).find('#option').val();

      sort = 'false'
      if (issort.is(':checked')){
        sort = 'true'
      }

      arr_columns = {
        header: caption,
        dataIndex: field,
        sortable: sort
      };
      if (option == 'image'){
        arr_columns = {
          header: caption,
          dataIndex: field,
          sortable: sort,
          renderer: "this.renderImage"
        };
      }
      arr_columns_out.push(arr_columns);
    });
    if (issort)

    json_columns = JSON.stringify(arr_columns_out, "", 2);

    outhead.text(json_columns).val();
  }
});

