window.onload = function() {
    var model = {
        cats: [
        	{
                name: "CSScat",
                src: "images/cat-0.jpg",
                clicks: 0
            },
            {
                name: "HTMLcat",
                src: "images/cat-1.jpg",
                clicks: 0
            },
            {
                name: "JavaScriptCat",
                src: "images/cat-2.jpg",
                clicks: 0
            },
            {
                name: "BootstrabCat",
                src: "images/cat-3.jpg",
                clicks: 0
            },
            {
                name: "AJAXcat",
                src: "images/cat-4.jpg",
                clicks: 0
            }
        ],
        currentCat: null
    };

    var controller = {
        catsNames: function() {
            let catsNames = [];
            model.cats.forEach(function(catObj) {
                catsNames.push(catObj.name);
            });
            return catsNames;
        },
        updateCat: function(catId) {
            // get the item with "index" from cats array
            model.currentCat = model.cats[catId];
        },
        addClick: function() {
            model.currentCat.clicks++;
            viewCat.render();
        },
        getCurrentCat: function() {
            return model.currentCat;
        },
        adminbtn: function() {
            viewAdmin.$adminDiv.toggleClass('hidden');
        },
        savebtn: function(name, src, clicks) {
            if (src) {
                var cat = function() {
                    this.name = name;
                    this.src = src;
                    this.clicks = clicks;
                };
                model.currentCat = new cat();
            }
            viewCat.render();
        },
        cancelbtn: function() {
            viewAdmin.$adminDiv.toggleClass('hidden');
        },
        getCatTemplateDone: function(catTemplate) {
            var currentCat = controller.getCurrentCat();
            var catTemplate = catTemplate.replace('%name%', currentCat.name);
            catTemplate = catTemplate.replace('%src%', currentCat.src);
            catTemplate = catTemplate.replace('%clicks%', currentCat.clicks);
            catTemplate = catTemplate.replace('%id%', currentCat.id);
            return catTemplate;
        },
        hideViewAdmin: function(catTemplate) {
            viewAdmin.$adminDiv.toggleClass('hidden');
        },
        init: function() {
            //set currentCat to the first cat
            controller.updateCat(0);

            viewList.init();
            viewCat.init();
            viewAdmin.init();
        }
    };
    var viewList = {
        init: function() {
            this.$catsList = $('#cats-list');
            this.render();
        },
        render: function() {
            var catsNames = controller.catsNames();
            for (let i = 0; i < catsNames.length; i++) {
                var $li = $('<li>' + catsNames[i] + '</li>');
                this.$catsList.append($li);
                $li.on('click', (function(newCatId) {
                    return function() {
                        controller.updateCat(newCatId);
                        viewCat.render();
                        viewAdmin.render();
                    }
                })(i));
            }
        }
    };

    var viewCat = {
        init: function() {
            this.$catFrame = $('#cat-frame');
            this.$catTemplate = $('script[data-template="cat-template"]').html();
            this.$catFrame.on('click', 'img', function() {
                controller.addClick();
            });
            this.render();
        },
        render: function() {
            this.$catFrame.html('');
            var doneCatTemplate = controller.getCatTemplateDone(this.$catTemplate);
            this.$catFrame.append(doneCatTemplate);
        }
    };

    var viewAdmin = {
        init: function() {
            this.$adminDiv = $('#admin');
            this.$btnad = $('#admin-btn');
            this.$savebtn = $('#save');
            this.$cancelbtn = $('#cancel');
            this.$name = $('#name');
            this.$src = $('#src');
            this.$clicks = $('#clicks');

            this.$btnad.click(function() {
                controller.adminbtn();
            });

            this.$savebtn.click(function() {
                controller.savebtn(viewAdmin.$name.val(), viewAdmin.$src.val(), viewAdmin.$clicks.val());
            });

            this.$cancelbtn.click(function() {
                controller.hideViewAdmin();
            });

            this.render();
        },
        render: function() {
            var currentCat = controller.getCurrentCat();

            this.$name.val(currentCat.name);
            this.$src.val(currentCat.src);
            this.$clicks.val(currentCat.clicks);

        }
    }
    controller.init();
}