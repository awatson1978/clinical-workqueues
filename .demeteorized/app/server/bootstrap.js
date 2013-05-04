// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (Lists.find().count() === 0) {
    var data = [
      {name: "Inbox",
       contents: [
                 ["Provide smoking cessation education.","nutrition"],
                ["Evaluate patient history for symptoms of hypertension.","nutrition"],
           ["Rule out tachacardia arhythmia as cause of fainting.","nutrition"],
           ["Review patient eating habits.  Discuss blood sugar level monitoring.","nutrition"],
           ["Prescribe anti-nausea medication for motion sickness.","nutrition"]
       ]
      },
      {name: "Emergency",
       contents: [
         ["Reconcile tamoxifen side effects with current medications.", "medications"],
         ["Evaluate risk of pulmonary embolism.", "medications", "risk evaluation"]
         ]
      },
      {name: "Completed",
            contents: [
                ["Double check insurance eligibility before end of month.", "insurance", "medications"],
                ["Contact technetium-99m supplier for shortage routing instructions.", "protocols", "medications", "supply chain"]
            ]
      },
      {name: "Routine",
       contents: [
           ["Get annual flu shot.","annual checkup"],
           ["Donate blood.","community"],
           ["Make organ donation decision.","community"],
           ["Get mammogram.", "cancer screening"],
           ["Take hypertension medication once a day.","medication tracking"],
           ["Take vitamin supplement once a day.","medication tracking"],
           ["Keep below 1500 calories per day.","nutrition"],
           ["Replace milk with almond milk.","nutrition"],
           ["Increase heart rate by at least 30 minutes today.","exercise"],
           ["Yoga stretches for 30 minutes a day.","exercise"],
           ["Get eye sight checked.","annual checkup"],
           ["Annual dental visit.","annual checkup"],
           ["Get blood type checked.","baseline"],
           ["Buy genetic testing kit from 23andme. ","baseline", "genetics"],
           ["Fill out family history worksheet for diabetes risks.","risk factors"],
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


// Begoña is one of the best anatomists and medical illustrators I've ever had the opportunity to work with. In an age where people get distracted by the glitz and flash of the technical aspects of medical illustration and scientific visualization, she has an ability to focus in on the content of production unlike anybody else. Her attention to anatomical detail is simply masterful; at a level that I didn't know people even worked at. Not only is she a walking anatomy textbook, she networks with other professionals effortlessly, and is in the know on the latest industry trends ranging from telomere medications to 3D anatomical printing. Add to that a simply delightful personality that lights up whatever room she's in, and the result is a coworker who will be sorely missed. Do yourself a favor, and sponsor her for an H1B visa already!!