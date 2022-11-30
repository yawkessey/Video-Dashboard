var updateView = async (e) => {
  // var view = document.getElementById("view");
  // view.innerHTML = e.data;

  if (e.dataset.querytype == "by_name") {
    let queryvalue = document.querySelector("#nameQuery").value;
    api = `http://localhost:3000/api//books?name=${queryvalue}`;
    // api = `http://localhost:3000/api/books/${e.dataset.queryvalue}`
  }
  const data = await fetch(api);
  const model = await data.json();
  render_view(model);
  // else if other types of data
};

var render_view = (model) => {
    // Template view
  var source = document.querySelector("#view-template").innerHTML;
  var template = Handlebars.compile(source);
  var html = template(model);
    // Where we display the results
  document.querySelector('#results').innherHTML = html;
};
