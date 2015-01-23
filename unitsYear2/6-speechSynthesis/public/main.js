var authUrl      = "/token";
var translateUrl = "/translate";

var langs = [
    {code: 'ar', name: 'Arabic'},
    {code: 'fr', name: 'French'},
    {code: 'es', name: 'Spanish'}
];

function getAuthToken(tokenHandler) {
    $.get(authUrl).done(function(data) {
        tokenHandler(data["access_token"]);
    }).fail(function(data) {
        console.log("Fail: " + JSON.stringify(data));
    });
}

function translate(text, from, to, authToken, handler) {
    var settings = {
        headers: {
            Authorization: "Bearer " + authToken
        },
        data: {
            text: text, from: from, to: to
        },
        type: 'GET'
    };
    $.ajax(translateUrl, settings).done(function(data){
        handler(data.toString().slice(1, -1));
    });
}


function say (text, voice) {
    var speech = new SpeechSynthesisUtterance(text);
    speech.voice = voice;
    speechSynthesis.speak(speech);
}

$(function() {
    
    var voices;

    // wait on voices to be loaded before fetching list
    speechSynthesis.onvoiceschanged = function() {
        voices = speechSynthesis.getVoices()
        voices.forEach(function (voice, index) {
            $('#voices').append('<option>' + voice.name + '</option>');
        });
    };

    function getVoiceFromName (name) {
      var foundVoice = null;

      voices.forEach(function (voice, index) {
        if (voice.name === name) {
          foundVoice = voice;
        }
      });

      return foundVoice;
    }
    
    for (var i = 0; i < langs.length; i++) {
        $('#langs').append('<option data-lang-code="' + langs[i].code + '">' + langs[i].name + '</option>');
    }
   
    $("#translate-btn").click(function(event) {
        event.preventDefault();
        
        getAuthToken(function(authToken){
           var text = $("#translateFrom").val();
           var langTo = $('#langs option:selected').first().attr('data-lang-code');
           translate(text, "en", langTo, authToken, function(data){
               $("#translateTo").val(data);
           }); 
        });
    })
    
    $('#speak-btn').click(function (event) {
        event.preventDefault();

        var text = $('#translateTo').val();
        var voiceName = $("#voices option:selected").first().text();
        var voice = getVoiceFromName(voiceName);
        say(text, voice);
    });
});