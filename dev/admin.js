var AdminPanel = new Marionette.Application();

AdminPanel.AdModel = Backbone.Model.extend({
    urlRoot: '/admin/data',

    idAttribute : "_id",

    defaults: {
        _id: null,
        dateForSort: 'empty',
        url: 'empty',
        adName: 'empty',
        adMessage: 'empty',
        phone: 'empty',
        price: 'empty',
        date: 'empty',
        category: 'empty',
        subCategory: 'empty',
        newFilePath: 'empty',
        keywords: 'empty'
    }
});


AdminPanel.AdsCollection = Backbone.Collection.extend({
    url: '/data',
    model: AdminPanel.AdModel,

    // sort ads
    comparator: 'date'
});


AdminPanel.AdView = Marionette.ItemView.extend({
    tagName: 'tr',
    template: '#ads-item',

    events: {
        'click .glyphicon-remove': 'deleteAd',
        'click .glyphicon-refresh': 'updateAd'
    },

    deleteAd: function(event) {
        event.preventDefault();
        var thisAd = this.model;

        if (confirm('Do you really want to delete this ad?')) {
            this.$el.fadeOut(400, function() {
                thisAd.destroy();
            });
        }
    },

    updateAd: function(event) {
        event.preventDefault();

        //// create date, ex.: 30 oct. 2014
        var monthNames = [ 'ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie' ];
        var date = new Date().getDate() + " " + monthNames[new Date().getMonth()] + " " + new Date().getFullYear();

        if (confirm('Do you really want to update this ad?')) {
            this.model.save({
                date: date
            });
        }
    }
});


AdminPanel.AdsListView = Marionette.CompositeView.extend({
    tagName: 'table',
    className: 'table table-striped',
    template: '#ads-list',
    childView: AdminPanel.AdView,
    childViewContainer: 'tbody',

    collectionEvents: {
        'change': 'renderPage'
    },

    renderPage: function() {
        this.collection.sort();
    }
});

var adsCollection = new AdminPanel.AdsCollection();
adsCollection.fetch();


AdminPanel.addRegions({
    adsListRegion: '#main-region'
});


AdminPanel.on('start', function() {
    var newAdsListView = new AdminPanel.AdsListView({
        collection: adsCollection
    });

    AdminPanel.adsListRegion.show(newAdsListView);
});


AdminPanel.start();
