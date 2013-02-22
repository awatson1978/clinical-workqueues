// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (Lists.find().count() === 0) {
    var data = [
      {name: "Inbox",
       contents: [
            ["Use list tabs to select a list.", "tutorial"],
            ["Use tag tabs to filter and sort tags.", "tutorial"],
             ["Select a recipient to messages to from the community page.", "tutorial"],
             ["Double click on a task to view it in detailed mode.", "tutorial"],
             ["Swipe left or right to send a task to a recipient.", "tutorial"]
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
           ["Sea lettuce pumpkin salsify rock melon nori courgette celery parsnip burdock.","nutrition"],
           ["Tatsoi garbanzo napa cabbage azuki bean.","nutrition"],
           ["Jícama plantain leek chicory broccoli rabe asparagus beetroot.","nutrition"],
           ["Wakame zucchini gram spinach melon desert raisin seakale pumpkin spring onion.","nutrition"],
           ["Fennel gram sierra leone bologi pumpkin chickweed amaranth pea.","nutrition"],
           ["Kale desert raisin jícama cabbage broccoli azuki bean garlic seakale rutabaga.","nutrition"],
           ["Turnip green bean plantain jícama epazote pea taro winter purslane.","nutrition"],
           ["Bamboo shoot eggplant endive chickpea horseradish scallion leek.","nutrition"],
           ["Parsnip turnip greens bok choy leek green bean.","nutrition"],
           ["Broccoli rabe lotus root endive carrot chicory.","nutrition"],
           ["Melon bush tomato jícama garbanzo potato peanut spinach.","nutrition"],
           ["Beetroot fava bean wattle seed asparagus courgette potato.","nutrition"],
           ["Lentil spring onion summer purslane bell pepper okra.","nutrition"],
           ["Celery spinach garlic dulse broccoli earthnut pea.","nutrition"],
           ["Wakame rock melon desert raisin lotus root chickpea pea komatsuna asparagus.","nutrition"],
           ["Tomatillo cauliflower ricebean jícama epazote asparagus tomato beet.","nutrition"],
           ["Greens parsley lentil pea sweet pepper bell pepper kale silver beet earthnut pea peanut. ","nutrition"],
           ["Pea sprouts yarrow asparagus burdock okra endive fava bean grape coriander soko garlic chard.","nutrition"],
           ["Spring onion asparagus nori aubergine soybean maize chicory cauliflower catsear.","nutrition"],
           ["Squash cauliflower fennel black-eyed pea asparagus jícama salad.","nutrition"],
           ["Leek radish radicchio bush tomato soybean.","nutrition"],
           ["Lotus root leek horseradish celery jícama cucumber tigernut dandelion bunya nuts pea.","nutrition"],
           ["Aubergine bitterleaf bell pepper courgette chicory caulie.","nutrition"],
           ["Bush tomato napa cabbage dandelion sweet pepper yarrow welsh onion.","nutrition"],
           ["Okra mustard lettuce celery gourd spring onion collard greens.","nutrition"],
           ["Yarrow sweet pepper salsify swiss chard.","nutrition"],
           ["Tigernut plantain avocado bell pepper arugula bitterleaf bush tomato.","nutrition"],
           ["Sorrel maize yarrow gourd beet greens bell pepper sierra leone bologi lettuce sorrel chicory.","nutrition"],
           ["Bok choy caulie parsnip coriander yarrow mung bean tigernut squash","nutrition"],
           ["Sorrel collard greens sea lettuce ricebean napa cabbage soybean leek bok choy.","nutrition"],
           ["Yarrow pumpkin catsear leek nori shallot parsley radish.","nutrition"],
           ["Ricebean corn prairie turnip silver beet black-eyed pea cauliflower.","nutrition"],
           ["Tatsoi sorrel summer purslane sweet pepper jícama horseradish burdock daikon taro.","nutrition"],
           ["Artichoke daikon chicory summer purslane garbanzo black-eyed pea.","nutrition"],
           ["Turnip greens daikon nori broccoli salsify bamboo shoot.","nutrition"],
           ["Black-eyed pea bok choy winter purslane arugula.","nutrition"],
           ["Summer purslane chicory chickweed scallion desert raisin welsh onion.","nutrition"],
           ["Okra melon water chestnut cabbage eggplant komatsuna earthnut pea arugula.","nutrition"]
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
