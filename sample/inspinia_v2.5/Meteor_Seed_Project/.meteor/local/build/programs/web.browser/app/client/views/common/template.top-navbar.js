(function(){
Template.__checkName("topNavbar");
Template["topNavbar"] = new Template("Template.topNavbar", (function() {
  var view = this;
  return HTML.Raw('<div class="row border-bottom">\n        <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">\n            <div class="navbar-header">\n                <a id="navbar-minimalize" class="minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a>\n                <form role="search" class="navbar-form-custom" action="search_results">\n                    <div class="form-group">\n                        <input type="text" placeholder="Search for something..." class="form-control" name="top-search" id="top-search">\n                    </div>\n                </form>\n            </div>\n            <ul class="nav navbar-top-links navbar-right">\n                <li>\n                    <a href="#">\n                        <i class="fa fa-sign-out"></i> Log out\n                    </a>\n                </li>\n\n            </ul>\n\n        </nav>\n    </div>');
}));

}).call(this);
