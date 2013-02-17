// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (Lists.find().count() === 0) {
    var data = [
      {name: "Registered - Insurance",
       contents: [
         ["Coverage of nanoparticle therapy?", "nanoparticles", "coverage"],
         ["Covered treatment options for prostate cancer?", "coverage", "prostate cancer"],
       ]
      },
      {name: "Registered - Hospital",
       contents: [
         ["Contraindications of tamoxifen?", "drugs"],
         ["Clinical protocol in case of tamoxifen shortage?", "protocols", "drugs", "supply chain"],
         ]
      },
      {name: "Public",
       contents: [
         ["2nd opinion on breast lump?", "breast cancer", "second opinion"],
         ["Side effects of Nolvadex?", "drugs", "side effects"],
         ["Is 5 years without an exam too long?", "exams", "general"],
         ["Why can't they make chemo drugs that don't make you naseated?", "chemotherapy", "drugs", "side effects"],
       ]
      }
    ];

    var timestamp = (new Date()).getTime();
    for (var i = 0; i < data.length; i++) {
      var list_id = Lists.insert({name: data[i].name});
      for (var j = 0; j < data[i].contents.length; j++) {
        var info = data[i].contents[j];
        Todos.insert({list_id: list_id,
                      text: info[0],
                      timestamp: timestamp,
                      tags: info.slice(1)});
        timestamp += 1; // ensure unique timestamp.
      }
    }
  }
});
