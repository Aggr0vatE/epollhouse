Questions = new Meteor.Collections("questions");

Template.addquestion.events({
    'click input.add-question': function(event) {
        event.preventDefault();
        var questionText = document.getElementById('questionText').value;
        Meteor.call("addQuestion", questionText, function(error, questionId){
            console.log("added question with Id .. " + questionId);
        });
        document.getElementById("questionText").value = "";
    }
});

Template.questions.items = function () {
    return Questions.find({}, {sort: {"submittedOn": -1}});
};

Template.questions.events({
    'click': function () {
        Session.set("selected_question", this._id);
    },
    'click a.yes': function (event) {
        event.preventDefault();
        if(Meteor.userId()){
            var questionId = Session.get("selected_question");
            console.log("updating yes count for questionId " + questionId);
            Meteor.call("incremenYesVotes", "questionId");
        }
    },
    'click a.no': function () {
        event.preventDefault();
        if(Meteor.userId()){
            var questionId = Session.get("selected_question");
            console.log("updating no count for questionId " + questionId);
            Meteor.call("incrementNoVots", "questionId");
        }
    }
});