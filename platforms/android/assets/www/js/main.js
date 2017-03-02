(function(window, document, $, undefined) {

  var momentlang = 'eu';

  var momentCat = -1;
  //var selectorSelectedIndex = 1;

  var initialized = false;
  var config = null;

  // UI elements (pre-cached to speed up updates)
  var $app = $('#app');
  var $homeView = $('#hizkuntza')
  var $eventCover = $('#event-cover');
  var $backButton = $('.back-button');
  var $detailsTitle = $('#details-title');
  var $detailsBack = $('#details-back');
  var $detailsButton = $('.details-button');
  var $mapTitle = $('#map-title');
  var $mapEventTitle = $('#map-events-title');
  var $infoTitle = $('#info-title');
  var $infoButton = $('.info-button');
  var $infoContainer = $('#info-container');
  var $whenTitle = $('#when-title');

  var $shareTitle = $('#share-but-p');
  var $shareButton = $('#share-but')
  var $startingTitle = $('#starting-title');
  var $endingTitle = $('#ending-title');
  var $whereTitle = $('#where-title');
  var $priceTitle = $('#price-title');
  var $eventPriceContainer = $('#event-price-container');
  var $eventPrice = $('#event-price');
  var $registrationTitle = $('#registration-title');
  var $spotsTitle = $('#spots-title');
  var $deadlineTitle = $('#deadline-title');
  //var $descriptionTitle = $('#description-title');
  var $galleryTitle = $('#gallery-title');
  var $eventsList = $('#events-list');
  var $eventTitle = $('#event-title');
  //var $eventCat = $('#event-cat');
  var $eventMap = $('#event-map');
  var $eventLocation = $('#event-location');
  var $eventSpotsContainer = $('#event-spots-container');
  var $eventSpots = $('#event-spots');
  var $eventRegistrationContainer = $('#event-registration-container');
  var $eventDeadlineContainer = $('#event-deadline-container');
  var $eventDeadline = $('#event-deadline');
  var $registrationButton = $('#registration-button');
  var $eventStartDate = $('#event-start-date');
  var $eventEndDate = $('#event-end-date');
  var $eventDescription = $('#event-description');
  var $eventGalleryContainer = $('#event-gallery-container');
  var $eventGallery = $('#event-gallery');
  var $map = $('#map');
  var $mapCanvas = $('#map-canvas');
  var $mapEvent = $('#map-events');
  var $mapEventCanvas = $('#map-events-canvas');
  var $details = $('#details');
  var $info = $('#info');
  var $eventsCont = $('#events');
  var $detCatCont = $('#detail-cat-container');

  var $iniButMap = $('ini-but-map');
  var $iniButAgenda = $('ini-but-agenda');
  var $iniButInfo = $('#ini-but-info');
  var $iniButWeb = $('ini-but-web');

  var $categorySelecter = $('#categories-select');

  var $categoryBaseOption = $('#base-option');

  var $eventsTitle = $('#events-title');
  var $eventsInfo = $('#events-info');
  var $eventsLang = $('#events-lang');

  var $langEu = $('#hizkuntza_eu');
  var $langEs = $('#hizkuntza_es');
  var $langEn = $('#hizkuntza_en');
  var $langFr = $('#hizkuntza_fr');

  var $mapBackButton = $('#details-back');

  var $HizkuntzaIrudia =  $('#hizkuntza_img');
  var $HizkuntzaErreferentzia =  $('#hizkuntza_ref');

  var currentEvent = null;

  var camesFromMap = false;

  $eventsList.attr('data-filter-placeholder', "...");

  $langEu.off('click').on('click', function(e) {
    momentlang = "eu";
    momentCat = 1;
    //$categorySelecter.eq(0);
    initialize();
  });

  $langEs.off('click').on('click', function(e) {
    momentlang = "es";
    momentCat = 1;
    //$categorySelecter.eq(0);
    initialize();
  });

  $langEn.off('click').on('click', function(e) {
      momentlang = "en";
      momentCat = 1;
      //$categorySelecter.eq(0);
      initialize();
    });

  $langFr.off('click').on('click', function(e) {
      momentlang = "fr";
      momentCat = 1;
      //$categorySelecter.eq(0);
      initialize();
    });

  $iniButInfo.off('click').on('click', function(e) {
    switch(momentlang)
    {
       case "eu":
          window.location.href = "http://www.donostia.eus/ataria/eu/web/bizi2016/hasiera";
       break;
       case "es":
          window.location.href = "http://www.donostia.eus/ataria/es/web/bizi2016/hasiera";
       break;
       case "en":
          window.location.href = "http://www.donostia.eus/ataria/en/web/bizi2016/hasiera";
       break;
       case "fr":
          window.location.href = "http://www.donostia.eus/ataria/fr/web/bizi2016/hasiera";
       break;
    }
  });

  $mapBackButton.off('click').on('click', function(e) {
    if(camesFromMap)
    {
        camesFromMap = false;
        $.mobile.navigate( "#map-events", { transition : "slide"});
    }
    else
    {
        $.mobile.navigate( "#events", { transition : "slide"});
    }
  });

  $categorySelecter.on('change', function(e) {
        var e = document.getElementById("categories-select");
        //selectorSelectedIndex = e.selectedIndex;
        momentCat = e.options[e.selectedIndex].value;
        console.log("momentCat:"+momentCat);
        //alert(selectorSelectedIndex);
        initialize();
  });

  /*function shareClicked() {
      document.getElementById("demo").style.color = "red";
  }*/

  var setupUI = function() {
    if(!config.infoSection)
      $infoButton.hide();
    else
      $infoContainer.html(config.infoSection);

    moment.lang(config.lang);

    //$eventsInfo.height($eventsInfo.width());
    //$eventsLang.height($eventsLang.width());

    //$eventsTitle.text(config.labels.COM_OHANAH_MOBILEAPP_EVENTS);
    //$backButton.text(config.labels.COM_OHANAH_MOBILEAPP_BACK);
    //$eventsList.attr('data-filter-placeholder', config.labels.COM_OHANAH_MOBILEAPP_FILTER_ITEMS);

    //$eventsList.attr('data-filter-placeholder', "tururur");
    $detailsTitle.text(config.labels.COM_OHANAH_MOBILEAPP_DETAILS);
    $detailsButton.text(config.labels.COM_OHANAH_MOBILEAPP_DETAILS);
    $mapTitle.text(config.labels.COM_OHANAH_MOBILEAPP_MAP);
    $infoTitle.text(config.labels.COM_OHANAH_MOBILEAPP_INFO);
    $infoButton.text(config.labels.COM_OHANAH_MOBILEAPP_INFO);
    //$whenTitle.text(config.labels.COM_OHANAH_MOBILEAPP_WHEN);
    $startingTitle.text(config.labels.COM_OHANAH_MOBILEAPP_STARTING);
    $endingTitle.text(config.labels.COM_OHANAH_MOBILEAPP_ENDING);
    //$whereTitle.text(config.labels.COM_OHANAH_MOBILEAPP_WHERE);
    $priceTitle.text(config.labels.COM_OHANAH_MOBILEAPP_PRICE);
    $registrationTitle.text(config.labels.COM_OHANAH_MOBILEAPP_REGISTRATION);
    $spotsTitle.text(config.labels.OHANAH_PLACES_LEFT);
    $deadlineTitle.text(config.labels.COM_OHANAH_MOBILEAPP_DEADLINE);
    //$descriptionTitle.text(config.labels.OHANAH_DESCRIPTION);
    $galleryTitle.text(config.labels.COM_OHANAH_MOBILEAPP_GALLERY);
    $registrationButton.text(config.labels.OHANAH_REGISTER);
  };

  var asyncLoadScript = function(url, callback) {
    var script = document.createElement('script');
    if(script.readyState) {
      script.onreadystatechange = function() {
        if(script.readyState === 'loaded' || script.readyState === 'complete') {
          script.onreadystatechange = null;
          callback();
        }
      };
    }
    else {
      script.onload = function() {
        callback();
      };
    }

    script.src = url;
    document.getElementsByTagName('body')[0].appendChild(script);
  };

  var initialize = function() {
    console.log("Initializiting...");
    var windowWidth = $(window).width();

    var events = [];

    var lastMarker = null;

    var eventMarkers = [];
    var userMarker = null;

    var mainCats = [];

    var map = null;
    var eventsmap = null;

    camesFromMap = false;

    var str1 = "img/res/dss2016_";
    var str2 = ".png";
    var res = str1.concat(momentlang,str2);

    var str1 = "http://dss2016.eu/";
    var str2 = "/";
    var ref = str1.concat(momentlang,str2);

    document.getElementById('hizkuntza_eu').style.color = "#999999";
    document.getElementById('hizkuntza_es').style.color = "#999999";
    document.getElementById('hizkuntza_en').style.color = "#999999";
    document.getElementById('hizkuntza_fr').style.color = "#999999";

    switch(momentlang) {
             case "eu":
                document.getElementById('hizkuntza_eu').style.color = "#46A0DC";
                document.getElementById('ini-but-map-p').innerHTML='Mapa';
                document.getElementById('ini-but-agenda-p').innerHTML='Agenda';
                document.getElementById('ini-but-info-p').innerHTML='Informazioa';
             break;
             case "es":
                document.getElementById('hizkuntza_es').style.color = "#46A0DC";
                document.getElementById('ini-but-map-p').innerHTML='Mapa';
                document.getElementById('ini-but-agenda-p').innerHTML='Agenda';
                document.getElementById('ini-but-info-p').innerHTML='Información';
             break;
             case "en":
                document.getElementById('hizkuntza_en').style.color = "#46A0DC";
                document.getElementById('ini-but-map-p').innerHTML='Map';
                document.getElementById('ini-but-agenda-p').innerHTML='Events';
                document.getElementById('ini-but-info-p').innerHTML='Information';
             break;
             case "fr":
                document.getElementById('hizkuntza_fr').style.color = "#46A0DC";
                document.getElementById('ini-but-map-p').innerHTML='Carte';
                document.getElementById('ini-but-agenda-p').innerHTML='Agenda';
                document.getElementById('ini-but-info-p').innerHTML='Infos pratiques';
             break;
     }

    $HizkuntzaIrudia.attr('src',res);
    $HizkuntzaErreferentzia.attr('href',ref);

    $eventsTitle.attr('src',res);
    $mapEventTitle.attr('src',res);
    $infoTitle.attr('src',res);
    $detailsTitle.attr('src',res);
    $mapTitle.attr('src',res);
    $mapEventTitle.attr('src',res);

    var isRegistrationOpen = function(event) {
      return event.canRegister === '1';
    };

    var isLimitedSpots = function(event) {
      return event.limit_number_of_attendees === '1';
    };

    $shareButton.off('click').on('click', function(e) {
          if(currentEvent!=null)
          {
            var tit = getIdioma(currentEvent.title);
            var urlLag = "http://dss2016.eu/"+momentlang+"/agenda/"+currentEvent.eventSlug;
            window.plugins.socialsharing.share(tit, null, null, urlLag);
          }
      });

    var getIdioma = function(content)
    {
      var result = "";
      //var llaveIni = "{lang"+momentlang+"}";
      //var llaveFin = "{/lang"+momentlang+"}";
      var llaveIni = "{lang "+momentlang+"}";
      var llaveFin = "{/lang}";
      var iniPos = content.indexOf(llaveIni);
      if( iniPos > -1)
      {
        iniPos = iniPos + llaveIni.length;
        //endPos = content.indexOf(llaveFin);
        endPos = content.indexOf(llaveFin,iniPos);
        result = content.substring(iniPos,endPos);
      }
      else
      {
        result = content;
      }
      return result;
    };

    // Render the list of events
    var renderEvents = function()
    {
      var fragment = document.createDocumentFragment();
      var i, len, event, date, groupingDate, listItem, linkItem, imageItem, titleItem, subtitleItem;

      camesFromMap = false;

      $eventsList.empty();
      //eventMarkers = new Array(events.length-1);

      $categorySelecter
          .find('option')
          .remove()
          .end()
          /*.append('<option id= "base-option" value="-1">Please select a category</option>')
          .val('0')*/
      ;



      var opt = document.createElement("option");
      opt.value= 1;
      //var opt2 = document.createElement("option");
      //opt2.value= 2;
      //opt.innerHTML = getIdioma(event.categorytitle);

      switch(momentlang) {
         case "eu":
            opt.innerHTML = "Kategoria aukeratu";
            //opt2.innerHTML = "Kategoria guztiak";
         break;
         case "es":
            opt.innerHTML = "Seleccione categoria";
            //opt2.innerHTML = "Todas las categorias";
         break;
         case "en":
            opt.innerHTML = "Select category";
            //opt2.innerHTML = "All categories";
         break;
         case "fr":
            opt.innerHTML = "Sélectionnez la catégorie";
            //opt2.innerHTML = "Toutes les catégories";
         break;
      }
      $categorySelecter.append(opt);
      //$categorySelecter.append(opt2);

      var selectorChildIndex = 2;

      for(i = 0, len = events.length; i < len; i++) {
        event = events[i];

        /*if(config.groupByDay === '1') {
                  date = moment.utc(event.date_UTC).local().format(config.dateFormat);
        }
        else {
                  date = moment.utc(event.date_UTC).local().fromNow();
        }

        event.lengthInDays = moment(event.end_date).diff(event.date, 'd') + 1;

        if(date !== groupingDate) {
                  groupingDate = date;
                  listItem = document.createElement('li');
                  //listItem.innerText = groupingDate+" / "+moment.utc(event.date_UTC).local().format('YYYY-MM-DD');
                  listItem.innerText = moment.utc(event.date_UTC).local().format('YYYY-MM-DD');
                  listItem.setAttribute('data-role', 'list-divider');

                  //var lag = windowWidth*4/100;
                  //listItem.setAttribute('height','20px');

                  fragment.appendChild(listItem);
         }*/

        var arrayCat = getIdioma(event.tags).split(',');

        for(j = 0, len2 = arrayCat.length; j < len2; j++) {
          if(optionExists(arrayCat[j])==false)
          {
            if(arrayCat[j]!="")
            {
              var opt = document.createElement("option");
              opt.value= selectorChildIndex;
              selectorChildIndex++;
              opt.innerHTML = getIdioma(arrayCat[j]);
              $categorySelecter.append(opt);

              mainCats.push(getIdioma(arrayCat[j]));
            }
          }
        }

        if(momentCat > 1)
        {
           var selected = mainCats[momentCat-2];
           var finded = false;
           for(k = 0, len3 = arrayCat.length; k < len3; k++) {
              if(selected === arrayCat[k])
              {
                finded = true;
              }
           }
           if(finded != true){
             continue;
           }
        }

        listItem = document.createElement('li');
        listItem.innerText = "";
        listItem.setAttribute('data-role', 'list-divider');

        fragment.appendChild(listItem);

        var evMarker = new google.maps.Marker({
                                        position: new google.maps.LatLng(event.latitude, event.longitude),
                                        map: null,
                                        id:i,
                                        title: event.title,
                                        icon: config.mapMarkerURL
                                      });
        if(eventMarkers.length < 20)
        {
            eventMarkers.push(evMarker);
        }
        //var lag2 = windowWidth*40/100;

        listItem = document.createElement('li');
        listItem.setAttribute('data-id', i);

        linkItem = document.createElement('a');
        linkItem.setAttribute('href', '#details');
        linkItem.setAttribute('data-transition', 'slide');
        linkItem.setAttribute('display', 'table');

        if(config.showEventPicture === '1') {
          imageItem = document.createElement('img');
          imageItem.setAttribute('src', event.picture ? config.attachmentBaseURL + event.picture : 'img/touch/apple-touch-icon-144x144-precomposed.png');

          //imageItem.setAttribute('width','40%');
          //imageItem.setAttribute('height','100%');
          linkItem.appendChild(imageItem);
        }

        titleItem = document.createElement('p');
        titleItem.setAttribute('class','titulocelda');
        //titleItem.setAttribute('rows','2');

        titleItem.innerHTML = getIdioma(event.title);
        linkItem.appendChild(titleItem);

        for(j = 0, len2 = arrayCat.length; j < len2; j++) {
          if(arrayCat[j]!="")
          {
            var categoryItem = document.createElement('span');
            categoryItem.setAttribute('class','catcelda');
            categoryItem.innerHTML = arrayCat[j];
            linkItem.appendChild(categoryItem);
          }
        }

        jumpItem = document.createElement('br');
        linkItem.appendChild(jumpItem);

        subdateItem = document.createElement('p');
        subdateItem.setAttribute('class','textocelda');
        subdateItem.innerHTML = moment.utc(event.date_UTC).local().format('YYYY-MM-DD HH:mm') +' - '+getIdioma(event.location ? event.location : '');
        linkItem.appendChild(subdateItem);

        /*subtitleItem = document.createElement('span');
        subtitleItem.setAttribute('class','textocelda');
        subtitleItem.innerHTML = getIdioma(event.location ? event.location : '');
        linkItem.appendChild(subtitleItem);*/

        listItem.appendChild(linkItem);
        fragment.appendChild(listItem);

      }

      var e = document.getElementById("categories-select");
              //e.hide().show();

      e.selectedIndex = momentCat-1;


              //e.value = "";

       //console.log("e.selectedIndex "+e.selectedIndex);

      if(eventsmap) updateEventsMap();

      $eventsList.append(fragment).listview('refresh');
      $categorySelecter.selectmenu('refresh',true);

      $eventsList.children('li').off('click').on('click', function(e) {
              //alert($(this).attr('data-id'));
          currentEvent = events[$(this).attr('data-id')];
      });
    };

    function optionExists(val) {
      return $("#categories-select option").filter(function() {
               return this.innerHTML === val;
             }).length !== 0;
    }

    // Render an event
    var renderEvent = function(event) {

      var price = 0;

      switch(momentlang) {
        case "eu":
          $detailsTitle.text("Xehetasunak");
          //$detailsBack.text("Atzera");
          //$descriptionTitle.text("Deskribapena");
          //$whenTitle.text("Noiz");
          $startingTitle.text("Hasiera");
          $endingTitle.text("Bukaera");
          //$whereTitle.text("Non");
          $priceTitle.text("Prezioa");
          $registrationTitle.text("Erregistroa");
          $galleryTitle.text("Galeria");
          $shareTitle.text("Partekatu");
          break;
        case "es":
          $detailsTitle.text("Detailes");
          //$detailsBack.text("Atras");
          //$descriptionTitle.text("Descripción");
          //$whenTitle.text("Cuando");
          $startingTitle.text("Inicio");
          $endingTitle.text("Fin");
          //$whereTitle.text("Donde");
          $priceTitle.text("Precio");
          $registrationTitle.text("Registro");
          $galleryTitle.text("Galeria");
          $shareTitle.text("Compartir");
          break;
        case "en":
          $detailsTitle.text("Details");
          //$detailsBack.text("Back");
          //$descriptionTitle.text("Description");
          //$whenTitle.text("When");
          $startingTitle.text("Starting");
          $endingTitle.text("Ending");
          //$whereTitle.text("Where");
          $priceTitle.text("Price");
          $registrationTitle.text("Registration");
          $galleryTitle.text("Gallery");
          $shareTitle.text("Share");
          break;
        case "fr":
          $detailsTitle.text("Détails");
          //$detailsBack.text("Arriére");
          //$descriptionTitle.text("Description");
          //$whenTitle.text("Quand");
          $startingTitle.text("Départ");
          $endingTitle.text("Fin");
          //$whereTitle.text("Où");
          $priceTitle.text("Prix");
          $registrationTitle.text("Enregistrement");
          $galleryTitle.text("Galerie");
          $shareTitle.text("Partager");
          break;
      }

      $eventTitle.text(getIdioma(event.title));
      //$eventCat.text(getIdioma(event.categorytitle));

      var arrayCat = getIdioma(event.tags).split(',');

      //<span id="event-cat" class="catdetail">Category</span>
      document.getElementById("#detail-cat-container").innerHTML = "";

      for(j = 0, len2 = arrayCat.length; j < len2; j++) {
                if(arrayCat[j]!="")
                {
                  var categoryItem = document.createElement('span');
                  categoryItem.setAttribute('class','catdetail');
                  categoryItem.innerHTML = arrayCat[j];
                  document.getElementById("#detail-cat-container").appendChild(categoryItem);
                }
              }

      //$eventStartDate.text(moment.utc(event.date_UTC).local().format(config.dateFormat + ', ' + config.timeFormat));
      //$eventEndDate.text(moment.utc(event.end_date_UTC).local().format(config.dateFormat + ', ' + config.timeFormat));

      $eventStartDate.text(moment.utc(event.date_UTC).local().format('YYYY-MM-DD, HH:mm'));
      $eventEndDate.text(moment.utc(event.end_date_UTC).local().format('YYYY-MM-DD, HH:mm'));

      $eventMap.empty();
      var imageMap = document.createElement('img');
      imageMap.setAttribute('src', 'http://maps.google.com/maps/api/staticmap?key=AIzaSyCM2QBu-9et8SCre5f14eECly3QQZX1MqE&center=' + event.latitude + ',' + event.longitude + '&zoom=15&markers=' + (config.mapMarkerURL ? 'icon:' + encodeURIComponent(config.mapMarkerURL) + '|shadow:false|' : '') + event.latitude + ',' + event.longitude + '&size=288x200&sensor=false');
      imageMap.setAttribute('width', '288');
      imageMap.setAttribute('height', '200');
      $eventMap.append(imageMap);

      $eventLocation.html(getIdioma(event.venue) + '<br />' + getIdioma(event.address));

      if(isLimitedSpots(event)) {
        $eventSpots.text(event.attendees_limit);
        $eventSpotsContainer.show();
      }
      else {
        $eventSpotsContainer.hide();
      }

      if(isRegistrationOpen(event)) {
        if(event.close_registration_UTC && event.close_registration_day !== '0000-00-00') {
          $eventDeadline.text(moment.utc(event.close_registration_UTC).local().fromNow());
          $eventDeadlineContainer.show();
        }
        else {
          $eventDeadlineContainer.hide();
        }

        if(event.custom_registration_url) {
          $registrationButton.attr('href', event.custom_registration_url);
        }
        else {
          $registrationButton.attr('href', config.registrationBaseURL + '?option=com_ohanah&view=registration&ohanah_event_id=' + event.id);
        }

        price = parseInt(event.ticket_cost, 10);
        if(price > 0) {
          $eventPrice.text(price + ' ' + event.payment_currency);
        }
        else {
          $eventPrice.text(config.labels.COM_OHANAH_MOBILEAPP_PRICE_FREE);
        }

        $eventRegistrationContainer.show();
      }
      else {
        $eventRegistrationContainer.hide();
      }

      $eventDescription.html(getIdioma(event.description));

      if(lastMarker) lastMarker.setMap(null);

      lastMarker = new google.maps.Marker({
        position: new google.maps.LatLng(event.latitude, event.longitude),
        map: map,
        title: event.title,
        icon: config.mapMarkerURL
      });
      if(map) updateMap();

      renderGallery(event);
    };

    var renderGallery = function(event) {

      var images = [];
      var fragment = document.createDocumentFragment();
      var i, linkItem, thumbItem, popupItem, closeItem, imageItem;

      $eventCover.hide();
      $eventGalleryContainer.hide();
      $eventGallery.empty();
      $('.ui-popup-screen, .ui-popup-container').remove();

      if(event.picture) {
        if(config.showEventCover === '1') {
          $eventCover.attr('src', config.attachmentBaseURL + event.picture);
          $eventCover.show();
        }
        else {
          images.push(event.picture);
        }
      }
      for(i in event) {
        if(!event.hasOwnProperty(i)) continue;
        if(i.indexOf('image_') === 0) images.push(event[i]);
      }

      if(images.length === 0) return;

      closeItem = document.createElement('a');
      closeItem.setAttribute('href', '#');
      closeItem.setAttribute('data-rel', 'back');
      closeItem.setAttribute('data-role', 'button');
      closeItem.setAttribute('data-icon', 'delete');
      closeItem.setAttribute('data-iconpos', 'notext');
      closeItem.setAttribute('class', 'ui-btn-right');
      closeItem.innerHTML = 'Close';

      for(i = 0; i < images.length; i++) {
        linkItem = document.createElement('a');
        linkItem.setAttribute('href', '#gallery' + i);
        linkItem.setAttribute('data-rel', 'popup');

        thumbItem = document.createElement('img');
        thumbItem.setAttribute('src', config.attachmentBaseURL + images[i]);
        linkItem.appendChild(thumbItem);

        popupItem = document.createElement('div');
        popupItem.setAttribute('data-role', 'popup');
        popupItem.setAttribute('data-position-to', 'window');
        popupItem.setAttribute('id', 'gallery' + i);

        popupItem.appendChild(closeItem.cloneNode(true));

        imageItem = document.createElement('img');
        imageItem.setAttribute('src', config.attachmentBaseURL + images[i]);
        popupItem.appendChild(imageItem);

        fragment.appendChild(popupItem);
        fragment.appendChild(linkItem);
      }

      $eventGallery.html(fragment);
    };

    var infowindow =  new google.maps.InfoWindow({
            content: "",
            disableAutoPan: true
            ,isHidden:false
            ,pixelOffset: new google.maps.Size(-10, -10)
            ,closeBoxURL: ""
            ,pane: "mapPane"
            ,enableEventPropagation: true
        });

    function bindInfoWindow(marker, map, infowindow, description, id) {

        marker.addListener('click', function() {

            var contentString = '<div id="infoWindow">'
                                +'<div id="bodyContent">'
                                +'<a id="'+id+'">'
                                + description
                                +'</a>'
                                +'</div>'
                                + '</div>';

            google.maps.event.addDomListener(infowindow, 'domready', function() {
                var target = "#"+id;
                $(target).click(function() {
                    currentEvent = events[id];

                    camesFromMap = true;

                    $.mobile.navigate( "#details", { transition : "slide"});
                });
            });

            infowindow.setContent(contentString);
            infowindow.open(map, this);
        });
    }

    var updateMap = function() {
      lastMarker.setMap(map);
      map.setCenter(lastMarker.position);
      //bindInfoWindow(lastMarker, map, infowindow, lastMarker.title, lastMarker.id);
    };

    var loadEvents = function() {
      $.mobile.loading('show');
      $.getJSON(config.apiURL, function(data) {
        events = data;
        renderEvents();
        $.mobile.loading('hide');
      });
    };

    var updateEventsMap = function() {
      if(eventMarkers.length > 0)
      {
        for(i = 0, len = eventMarkers.length; i < len; i++) {
            eventMarkers[i].setMap(eventsmap);
            bindInfoWindow(eventMarkers[i], eventsmap, infowindow, getIdioma(eventMarkers[i].title), eventMarkers[i].id);
        }
        eventsmap.setCenter(eventMarkers[0].position);
      }
    };

    $eventsCont.on('pageshow', function()
                   {
                     if(initialized==false)
                     {
                      initialized=true;
                      initialize();
                     }
                   });

    $map.on('pageshow', function()
    {
      if(!map) {
        map = new google.maps.Map($mapCanvas.get(0), {
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        updateMap();
      }
      window.analytics.trackView('App_Event_Map->'+getIdioma(currentEvent.title));
      //mixpanel.track('mobileapp_v2_map');
    });

    $details.on('pagebeforeshow', function() {
      renderEvent(currentEvent);
      $eventGallery.trigger('create');
      if(!$eventGallery.is(':empty')) $eventGalleryContainer.show();
      window.analytics.trackView('App_Event_Detail->'+getIdioma(currentEvent.title));
      //mixpanel.track('mobileapp_v2_details');
    });

    $mapEvent.on('pageshow', function() {
      if(!eventsmap) {
        eventsmap = new google.maps.Map($mapEventCanvas.get(0), {
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        updateEventsMap();
      }

      if ( navigator.geolocation ) {
        function success(pos) {
          if(userMarker) userMarker.setMap(null);
          userMarker = new google.maps.Marker({
            position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
            map: eventsmap,
            title: "Zu",
            icon: "img/res/tokia_map.png",
            zIndex: 0
          });
          eventsmap.setCenter(userMarker.position);
          //bindInfoWindow(userMarker, eventsmap, infowindow, userMarker.title, eventMarkers[i].id);
        }

        function fail(error) {
           if(userMarker) userMarker.setMap(null);
        }

        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
      }
      else{
        if(userMarker) userMarker.setMap(null);
      }
      window.analytics.trackView('App_Map');
      //mixpanel.track('mobileapp_v2_events_map');
    });

    loadEvents();

    $.mobile.loading('hide');
  };

  /*$( document ).on( "mobileinit", function() {
    $.mobile.loadingMessage = false;
    //$.mobile.hidePageLoadingMsg()
  });*/

  $(document).on('ready', function() {

    if(location.href.indexOf('#') !== -1) {
      location.href = location.href.replace(new RegExp('#.*$', 'i'), '');
    }

    //$(".ui-loader").hide();

    $.getJSON('http://dss2016.eu/index.php?option=com_ohanah&view=mobileappconfig&format=json', function(data) {

      config = data;
      if(config.mobileAppEnable !== '1') document.location.href = '../index.php';
      if(config.isLocalhost === '1') delete config.mapMarkerURL;
      if(config.showInfoSection !== '1') delete config.infoSection;
      if(config.showPrice !== '1') $eventPriceContainer.hide();

      setupUI();
      asyncLoadScript('js/jquery.mobile-1.4.5.min.js', function() {
        var settings = $.extend({}, config);
        delete settings.labels;
        $app.show();
        initialize();
        google.maps.event.addDomListener(window, 'load', initialize);

        window.analytics.startTrackerWithId('UA-51377481-6');
        window.analytics.trackView('App_Ini -> android');
        //mixpanel.track('mobileapp_v2_open', settings);
      });


    });
  });

})(window, document, jQuery);


