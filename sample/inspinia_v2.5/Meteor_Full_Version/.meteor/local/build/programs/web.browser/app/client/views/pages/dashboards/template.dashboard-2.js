(function(){
Template.__checkName("dashboard2");
Template["dashboard2"] = new Template("Template.dashboard2", (function() {
  var view = this;
  return HTML.DIV({
    "class": "wrapper wrapper-content"
  }, HTML.Raw('\n        <div class="row">\n            <div class="col-lg-3">\n                <div class="ibox float-e-margins">\n                    <div class="ibox-title">\n                        <span class="label label-success pull-right">Monthly</span>\n                        <h5>Income</h5>\n                    </div>\n                    <div class="ibox-content">\n                        <h1 class="no-margins">40 886,200</h1>\n\n                        <div class="stat-percent font-bold text-success">98% <i class="fa fa-bolt"></i></div>\n                        <small>Total income</small>\n                    </div>\n                </div>\n            </div>\n            <div class="col-lg-3">\n                <div class="ibox float-e-margins">\n                    <div class="ibox-title">\n                        <span class="label label-info pull-right">Annual</span>\n                        <h5>Orders</h5>\n                    </div>\n                    <div class="ibox-content">\n                        <h1 class="no-margins">275,800</h1>\n\n                        <div class="stat-percent font-bold text-info">20% <i class="fa fa-level-up"></i></div>\n                        <small>New orders</small>\n                    </div>\n                </div>\n            </div>\n            <div class="col-lg-3">\n                <div class="ibox float-e-margins">\n                    <div class="ibox-title">\n                        <span class="label label-primary pull-right">Today</span>\n                        <h5>Vistits</h5>\n                    </div>\n                    <div class="ibox-content">\n                        <h1 class="no-margins">106,120</h1>\n\n                        <div class="stat-percent font-bold text-navy">44% <i class="fa fa-level-up"></i></div>\n                        <small>New visits</small>\n                    </div>\n                </div>\n            </div>\n            <div class="col-lg-3">\n                <div class="ibox float-e-margins">\n                    <div class="ibox-title">\n                        <span class="label label-danger pull-right">Low value</span>\n                        <h5>User activity</h5>\n                    </div>\n                    <div class="ibox-content">\n                        <h1 class="no-margins">80,600</h1>\n\n                        <div class="stat-percent font-bold text-danger">38% <i class="fa fa-level-down"></i></div>\n                        <small>In first month</small>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class="row">\n            <div class="col-lg-12">\n                <div class="ibox float-e-margins">\n                    <div class="ibox-title">\n                        <h5>Orders</h5>\n\n                        <div class="pull-right">\n                            <div class="btn-group">\n                                <button type="button" class="btn btn-xs btn-white active">Today</button>\n                                <button type="button" class="btn btn-xs btn-white">Monthly</button>\n                                <button type="button" class="btn btn-xs btn-white">Annual</button>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="ibox-content">\n                        <div class="row">\n                            <div class="col-lg-9">\n                                <div class="flot-chart">\n                                    <div class="flot-chart-content" id="flot-dashboard-chart"></div>\n                                </div>\n                            </div>\n                            <div class="col-lg-3">\n                                <ul class="stat-list">\n                                    <li>\n                                        <h2 class="no-margins">2,346</h2>\n                                        <small>Total orders in period</small>\n                                        <div class="stat-percent">48% <i class="fa fa-level-up text-navy"></i></div>\n                                        <div class="progress progress-mini">\n                                            <div style="width: 48%;" class="progress-bar"></div>\n                                        </div>\n                                    </li>\n                                    <li>\n                                        <h2 class="no-margins ">4,422</h2>\n                                        <small>Orders in last month</small>\n                                        <div class="stat-percent">60% <i class="fa fa-level-down text-navy"></i></div>\n                                        <div class="progress progress-mini">\n                                            <div style="width: 60%;" class="progress-bar"></div>\n                                        </div>\n                                    </li>\n                                    <li>\n                                        <h2 class="no-margins ">9,180</h2>\n                                        <small>Monthly income from orders</small>\n                                        <div class="stat-percent">22% <i class="fa fa-bolt text-navy"></i></div>\n                                        <div class="progress progress-mini">\n                                            <div style="width: 22%;" class="progress-bar"></div>\n                                        </div>\n                                    </li>\n                                </ul>\n                            </div>\n                        </div>\n                    </div>\n\n                </div>\n            </div>\n        </div>\n        '), HTML.DIV({
    "class": "row"
  }, "\n            ", HTML.DIV({
    "class": "col-lg-4"
  }, "\n                ", HTML.DIV({
    "class": "ibox float-e-margins"
  }, "\n                    ", HTML.DIV({
    "class": "ibox-title"
  }, "\n                        ", HTML.Raw("<h5>Messages</h5>"), "\n                        ", Spacebars.include(view.lookupTemplate("iboxTools")), "\n                    "), "\n                    ", HTML.Raw('<div class="ibox-content ibox-heading">\n                        <h3><i class="fa fa-envelope-o"></i> New messages</h3>\n                        <small><i class="fa fa-tim"></i> You have 22 new messages and 16 waiting in draft folder.\n                        </small>\n                    </div>'), "\n                    ", HTML.Raw('<div class="ibox-content">\n                        <div class="feed-activity-list">\n\n                            <div class="feed-element">\n                                <div>\n                                    <small class="pull-right text-navy">1m ago</small>\n                                    <strong>Monica Smith</strong>\n\n                                    <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry.\n                                        Lorem Ipsum\n                                    </div>\n                                    <small class="text-muted">Today 5:60 pm - 12.06.2014</small>\n                                </div>\n                            </div>\n\n                            <div class="feed-element">\n                                <div>\n                                    <small class="pull-right">2m ago</small>\n                                    <strong>Jogn Angel</strong>\n\n                                    <div>There are many variations of passages of Lorem Ipsum available</div>\n                                    <small class="text-muted">Today 2:23 pm - 11.06.2014</small>\n                                </div>\n                            </div>\n\n                            <div class="feed-element">\n                                <div>\n                                    <small class="pull-right">5m ago</small>\n                                    <strong>Jesica Ocean</strong>\n\n                                    <div>Contrary to popular belief, Lorem Ipsum</div>\n                                    <small class="text-muted">Today 1:00 pm - 08.06.2014</small>\n                                </div>\n                            </div>\n\n                            <div class="feed-element">\n                                <div>\n                                    <small class="pull-right">5m ago</small>\n                                    <strong>Monica Jackson</strong>\n\n                                    <div>The generated Lorem Ipsum is therefore</div>\n                                    <small class="text-muted">Yesterday 8:48 pm - 10.06.2014</small>\n                                </div>\n                            </div>\n\n\n                            <div class="feed-element">\n                                <div>\n                                    <small class="pull-right">5m ago</small>\n                                    <strong>Anna Legend</strong>\n\n                                    <div>All the Lorem Ipsum generators on the Internet tend to repeat</div>\n                                    <small class="text-muted">Yesterday 8:48 pm - 10.06.2014</small>\n                                </div>\n                            </div>\n                            <div class="feed-element">\n                                <div>\n                                    <small class="pull-right">5m ago</small>\n                                    <strong>Damian Nowak</strong>\n\n                                    <div>The standard chunk of Lorem Ipsum used</div>\n                                    <small class="text-muted">Yesterday 8:48 pm - 10.06.2014</small>\n                                </div>\n                            </div>\n                            <div class="feed-element">\n                                <div>\n                                    <small class="pull-right">5m ago</small>\n                                    <strong>Gary Smith</strong>\n\n                                    <div>200 Latin words, combined with a handful</div>\n                                    <small class="text-muted">Yesterday 8:48 pm - 10.06.2014</small>\n                                </div>\n                            </div>\n\n                        </div>\n                    </div>'), "\n                "), "\n            "), "\n\n            ", HTML.DIV({
    "class": "col-lg-8"
  }, "\n\n                ", HTML.DIV({
    "class": "row"
  }, "\n                    ", HTML.DIV({
    "class": "col-lg-6"
  }, "\n                        ", HTML.DIV({
    "class": "ibox float-e-margins"
  }, "\n                            ", HTML.DIV({
    "class": "ibox-title"
  }, "\n                                ", HTML.Raw("<h5>User project list</h5>"), "\n                                ", Spacebars.include(view.lookupTemplate("iboxTools")), "\n                            "), "\n                            ", HTML.DIV({
    "class": "ibox-content"
  }, "\n                                ", HTML.TABLE({
    "class": "table table-hover no-margins"
  }, "\n                                    ", HTML.THEAD("\n                                    ", HTML.TR("\n                                        ", HTML.TH("Status"), "\n                                        ", HTML.TH("Date"), "\n                                        ", HTML.TH("User"), "\n                                        ", HTML.TH("Value"), "\n                                    "), "\n                                    "), "\n                                    ", HTML.TBODY("\n                                    ", HTML.TR("\n                                        ", HTML.TD("\n                                            ", HTML.SMALL("Pending..."), "\n                                        "), "\n                                        ", HTML.TD(HTML.I({
    "class": "fa fa-clock-o"
  }), " 11:20pm"), "\n                                        ", HTML.TD("Samantha"), "\n                                        ", HTML.TD({
    "class": "text-navy"
  }, HTML.I({
    "class": "fa fa-level-up"
  }), " 24%"), "\n                                    "), "\n                                    ", HTML.TR("\n                                        ", HTML.TD(HTML.SPAN({
    "class": "label label-warning"
  }, "Canceled")), "\n                                        ", HTML.TD(HTML.I({
    "class": "fa fa-clock-o"
  }), " 10:40am"), "\n                                        ", HTML.TD("Monica"), "\n                                        ", HTML.TD({
    "class": "text-navy"
  }, HTML.I({
    "class": "fa fa-level-up"
  }), " 66%"), "\n                                    "), "\n                                    ", HTML.TR("\n                                        ", HTML.TD("\n                                            ", HTML.SMALL("Pending..."), "\n                                        "), "\n                                        ", HTML.TD(HTML.I({
    "class": "fa fa-clock-o"
  }), " 01:30pm"), "\n                                        ", HTML.TD("John"), "\n                                        ", HTML.TD({
    "class": "text-navy"
  }, HTML.I({
    "class": "fa fa-level-up"
  }), " 54%"), "\n                                    "), "\n                                    ", HTML.TR("\n                                        ", HTML.TD("\n                                            ", HTML.SMALL("Pending..."), "\n                                        "), "\n                                        ", HTML.TD(HTML.I({
    "class": "fa fa-clock-o"
  }), " 02:20pm"), "\n                                        ", HTML.TD("Agnes"), "\n                                        ", HTML.TD({
    "class": "text-navy"
  }, HTML.I({
    "class": "fa fa-level-up"
  }), " 12%"), "\n                                    "), "\n                                    ", HTML.TR("\n                                        ", HTML.TD("\n                                            ", HTML.SMALL("Pending..."), "\n                                        "), "\n                                        ", HTML.TD(HTML.I({
    "class": "fa fa-clock-o"
  }), " 09:40pm"), "\n                                        ", HTML.TD("Janet"), "\n                                        ", HTML.TD({
    "class": "text-navy"
  }, HTML.I({
    "class": "fa fa-level-up"
  }), " 22%"), "\n                                    "), "\n                                    ", HTML.TR("\n                                        ", HTML.TD(HTML.SPAN({
    "class": "label label-primary"
  }, "Completed")), "\n                                        ", HTML.TD(HTML.I({
    "class": "fa fa-clock-o"
  }), " 04:10am"), "\n                                        ", HTML.TD("Amelia"), "\n                                        ", HTML.TD({
    "class": "text-navy"
  }, HTML.I({
    "class": "fa fa-level-up"
  }), " 66%"), "\n                                    "), "\n                                    ", HTML.TR("\n                                        ", HTML.TD("\n                                            ", HTML.SMALL("Pending..."), "\n                                        "), "\n                                        ", HTML.TD(HTML.I({
    "class": "fa fa-clock-o"
  }), " 12:08am"), "\n                                        ", HTML.TD("Damian"), "\n                                        ", HTML.TD({
    "class": "text-navy"
  }, HTML.I({
    "class": "fa fa-level-up"
  }), " 23%"), "\n                                    "), "\n                                    "), "\n                                "), "\n                            "), "\n                        "), "\n                    "), "\n                    ", HTML.DIV({
    "class": "col-lg-6"
  }, "\n                        ", HTML.DIV({
    "class": "ibox float-e-margins"
  }, "\n                            ", HTML.DIV({
    "class": "ibox-title"
  }, "\n                                ", HTML.Raw("<h5>Small todo list</h5>"), "\n                                ", Spacebars.include(view.lookupTemplate("iboxTools")), "\n                            "), "\n                            ", HTML.Raw('<div class="ibox-content">\n                                <ul class="todo-list m-t small-list">\n                                    <li>\n                                        <div class="checkbox">\n                                            <input type="checkbox" id="checkbox1" checked="">\n                                            <label for="checkbox1">\n                                                Buy a milk\n                                            </label>\n                                        </div>\n                                    </li>\n                                    <li>\n                                        <div class="checkbox">\n                                            <input type="checkbox" id="checkbox2">\n                                            <label for="checkbox2">\n                                                Go to shop and find some products\n                                            </label>\n                                        </div>\n\n                                    </li>\n                                    <li>\n                                        <div class="checkbox">\n                                            <input type="checkbox" id="checkbox3">\n                                            <label for="checkbox3">\n                                                Send documents to Mike\n                                                <small class="label label-primary"><i class="fa fa-clock-o"></i> 1 mins</small>\n                                            </label>\n                                        </div>\n\n                                    </li>\n                                    <li>\n                                        <div class="checkbox">\n                                            <input type="checkbox" id="checkbox4" checked="">\n                                            <label for="checkbox4">\n                                                Go to the doctor dr Smith\n                                            </label>\n                                        </div>\n\n                                    </li>\n                                    <li>\n                                        <div class="checkbox">\n                                            <input type="checkbox" id="checkbox5">\n                                            <label for="checkbox5">\n                                                Plan vacation\n                                            </label>\n                                        </div>\n\n                                    </li>\n                                    <li>\n                                        <div class="checkbox">\n                                            <input type="checkbox" id="checkbox6">\n                                            <label for="checkbox6">\n                                                Create new stuff\n                                            </label>\n                                        </div>\n\n                                    </li>\n                                    <li>\n                                        <div class="checkbox">\n                                            <input type="checkbox" id="checkbox7">\n                                            <label for="checkbox7">\n                                                Call to Anna for dinner\n                                            </label>\n                                        </div>\n\n                                    </li>\n                                </ul>\n                            </div>'), "\n                        "), "\n                    "), "\n                "), "\n                ", HTML.DIV({
    "class": "row"
  }, "\n                    ", HTML.DIV({
    "class": "col-lg-12"
  }, "\n                        ", HTML.DIV({
    "class": "ibox float-e-margins"
  }, "\n                            ", HTML.DIV({
    "class": "ibox-title"
  }, "\n                                ", HTML.Raw("<h5>Transactions worldwide</h5>"), "\n                                ", Spacebars.include(view.lookupTemplate("iboxTools")), "\n                            "), "\n                            ", HTML.DIV({
    "class": "ibox-content"
  }, "\n\n                                ", HTML.DIV({
    "class": "row"
  }, "\n                                    ", HTML.DIV({
    "class": "col-lg-6"
  }, "\n                                        ", HTML.TABLE({
    "class": "table table-hover margin bottom"
  }, "\n                                            ", HTML.THEAD("\n                                            ", HTML.TR("\n                                                ", HTML.TH({
    style: "width: 1%",
    "class": "text-center"
  }, "No."), "\n                                                ", HTML.TH("Transaction"), "\n                                                ", HTML.TH({
    "class": "text-center"
  }, "Date"), "\n                                                ", HTML.TH({
    "class": "text-center"
  }, "Amount"), "\n                                            "), "\n                                            "), "\n                                            ", HTML.TBODY("\n                                            ", HTML.TR("\n                                                ", HTML.TD({
    "class": "text-center"
  }, "1"), "\n                                                ", HTML.TD(" Security doors\n                                                "), "\n                                                ", HTML.TD({
    "class": "text-center small"
  }, "16 Jun 2014"), "\n                                                ", HTML.TD({
    "class": "text-center"
  }, HTML.SPAN({
    "class": "label label-primary"
  }, "$483.00"), "\n                                                "), "\n\n                                            "), "\n                                            ", HTML.TR("\n                                                ", HTML.TD({
    "class": "text-center"
  }, "2"), "\n                                                ", HTML.TD(" Wardrobes\n                                                "), "\n                                                ", HTML.TD({
    "class": "text-center small"
  }, "10 Jun 2014"), "\n                                                ", HTML.TD({
    "class": "text-center"
  }, HTML.SPAN({
    "class": "label label-primary"
  }, "$327.00"), "\n                                                "), "\n\n                                            "), "\n                                            ", HTML.TR("\n                                                ", HTML.TD({
    "class": "text-center"
  }, "3"), "\n                                                ", HTML.TD(" Set of tools\n                                                "), "\n                                                ", HTML.TD({
    "class": "text-center small"
  }, "12 Jun 2014"), "\n                                                ", HTML.TD({
    "class": "text-center"
  }, HTML.SPAN({
    "class": "label label-warning"
  }, "$125.00"), "\n                                                "), "\n\n                                            "), "\n                                            ", HTML.TR("\n                                                ", HTML.TD({
    "class": "text-center"
  }, "4"), "\n                                                ", HTML.TD(" Panoramic pictures"), "\n                                                ", HTML.TD({
    "class": "text-center small"
  }, "22 Jun 2013"), "\n                                                ", HTML.TD({
    "class": "text-center"
  }, HTML.SPAN({
    "class": "label label-primary"
  }, "$344.00"), "\n                                                "), "\n                                            "), "\n                                            ", HTML.TR("\n                                                ", HTML.TD({
    "class": "text-center"
  }, "5"), "\n                                                ", HTML.TD("Phones"), "\n                                                ", HTML.TD({
    "class": "text-center small"
  }, "24 Jun 2013"), "\n                                                ", HTML.TD({
    "class": "text-center"
  }, HTML.SPAN({
    "class": "label label-primary"
  }, "$235.00"), "\n                                                "), "\n                                            "), "\n                                            ", HTML.TR("\n                                                ", HTML.TD({
    "class": "text-center"
  }, "6"), "\n                                                ", HTML.TD("Monitors"), "\n                                                ", HTML.TD({
    "class": "text-center small"
  }, "26 Jun 2013"), "\n                                                ", HTML.TD({
    "class": "text-center"
  }, HTML.SPAN({
    "class": "label label-primary"
  }, "$100.00"), "\n                                                "), "\n                                            "), "\n                                            "), "\n                                        "), "\n                                    "), "\n                                    ", HTML.Raw('<div class="col-lg-6">\n                                        <div id="world-map" style="height: 300px;"></div>\n                                    </div>'), "\n                                "), "\n                            "), "\n                        "), "\n                    "), "\n                "), "\n\n            "), "\n        "), "\n    ");
}));

}).call(this);
