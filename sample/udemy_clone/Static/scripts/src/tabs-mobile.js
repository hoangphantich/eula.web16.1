define(['jquery'], function ($) {
    function init(container) {
        var tabs = container,
                tabItems = tabs.find('ul.cd-tabs-navigation'),
                tabNavigation = tabs.find('nav');
        //hide the .cd-tabs::after element when tabbed navigation has scrolled to the end (mobile version)
        tabItems.find('li').css('width', 'auto');
        var tabItems_childs_width = 0;
        tabItems.find('li').each(function () {
            tabItems_childs_width += $(this).outerWidth() + 1;
        });
        tabItems.width(tabItems_childs_width);

        var selectedTab = $('ul.cd-tabs-navigation li a.active').eq(0);
        scrollToSelectedTab(tabNavigation, selectedTab);

        checkScrolling(tabNavigation);

        // check scroll status when scrolling end
        tabNavigation.on('scroll', function () {
            checkScrolling($(this));
        });

        // scroll to selected tab when clicking on it
        tabs.find('a').on('click', function () {
            scrollToSelectedTab(tabNavigation, $(this));
        });

        if (tabItems_childs_width < tabNavigation.width()) {
            var maxWidth = 0;
            tabItems.find('li').each(function () {
                var tabWidth = $(this).outerWidth();
                if (maxWidth < tabWidth) {
                    maxWidth = tabWidth;
                }
            });
            if (maxWidth > 0) {
                if ((maxWidth + 1) * tabItems.find('li').length < tabNavigation.width()) {
                    tabItems.find('li').css('width', 100 / (tabItems.find('li').length) + '%');

                    tabItems.css('width', '100%');
                }
                else {
                    tabItems.find('li').css('width', maxWidth + 'px');

                    tabItems.css('width', (maxWidth + 1) * tabItems.find('li').length + 'px');
                }
            }
        }
        else {
            tabItems.find('li').css('width', 'auto');
        }

        var timeout = null;
        $(window).on('resize', function () {
            if (timeout)
                clearTimeout(timeout);

            timeout = setTimeout(function () {
                clearTimeout(timeout);
                init(container);
            }, 200);
        });
    }

    function scrollToSelectedTab(tab, selectedItem) {
        if (selectedItem && selectedItem.length > 0) {
            var current_tab_offset = selectedItem.offset().left - 89;
            tab.animate({ scrollLeft: "+=" + current_tab_offset }, 500);
        }
    }

    function checkScrolling(tabs) {
        var totalTabWidth = parseInt(tabs.children('.cd-tabs-navigation').width()),
		 	tabsViewport = parseInt(tabs.width());
        if (tabs.scrollLeft() >= totalTabWidth - tabsViewport) {
            tabs.parent('.cd-tabs').addClass('is-ended');
        } else {
            tabs.parent('.cd-tabs').removeClass('is-ended');
        }
    }
    return {
        init: function (container) {
            init(container);
        }
    };
});
