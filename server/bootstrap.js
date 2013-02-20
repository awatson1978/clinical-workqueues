// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (Lists.find().count() === 0) {
    var data = [
      {name: "Inbox",
       contents: [
         ["Coverage of nanoparticle therapy?", "nanoparticles", "coverage"],
         ["Covered treatment options for prostate cancer?", "coverage", "prostate cancer"]
       ]
      },
      {name: "Emergency",
       contents: [
         ["Contraindications of tamoxifen?", "drugs"],
         ["Clinical protocol in case of tamoxifen shortage?", "protocols", "drugs", "supply chain"]
         ]
      },
      {name: "Urgent",
            contents: [
                ["Contraindications of tamoxifen?", "drugs"],
                ["Clinical protocol in case of tamoxifen shortage?", "protocols", "drugs", "supply chain"]
            ]
      },
      {name: "Public",
       contents: [
           ["2nd opinion on breast lump?", "breast cancer", "second opinion"],
           ["Side effects of Nolvadex?", "drugs", "side effects"],
           ["Is 5 years without an exam too long?", "exams", "general"],
           ["Sea lettuce pumpkin salsify rock melon nori courgette celery parsnip burdock."],
           ["Tatsoi garbanzo napa cabbage azuki bean."],
           ["Jícama plantain leek chicory broccoli rabe asparagus beetroot."],
           ["Wakame zucchini gram spinach melon desert raisin seakale pumpkin spring onion."],
           ["Fennel gram sierra leone bologi pumpkin chickweed amaranth pea."],
           ["Kale desert raisin jícama cabbage broccoli azuki bean garlic seakale rutabaga."],
           ["Turnip green bean plantain jícama epazote pea taro winter purslane."],
           ["Bamboo shoot eggplant endive chickpea horseradish scallion leek."],
           ["Parsnip turnip greens bok choy leek green bean."],
           ["Broccoli rabe lotus root endive carrot chicory."],
           ["Melon bush tomato jícama garbanzo potato peanut spinach."],
           ["Beetroot fava bean wattle seed asparagus courgette potato."],
           ["Lentil spring onion summer purslane bell pepper okra."],
           ["Why can't they make chemo drugs that don't make you naseated?", "chemotherapy", "drugs", "side effects"]
       ]
      }
    ];


    var timestamp = (new Date()).getTime();
    for (var i = 0; i < data.length; i++) {
      var list_id = Lists.insert({name: data[i].name});
      for (var j = 0; j < data[i].contents.length; j++) {
        var info = data[i].contents[j];
        console.log(Todos.insert({list_id: list_id,
                      text: info[0],
                      timestamp: timestamp,
                      tags: info.slice(1)}));
        timestamp += 1; // ensure unique timestamp.
      }
    }
  }
});
