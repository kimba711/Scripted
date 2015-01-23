/**
* Created with Ed-ScriptEd-Curriculum.
* User: efuquen
* Date: 2014-08-11
* Time: 04:16 AM
* To change this template use Tools | Templates.
*/
var apiPort = 3000;
if (window.location.protocol === 'https:') {
    apiPort = 9500;
}

var apiBaseUrl = window.location.protocol + "//cabaret-combat.codio.io:" + apiPort;
var authUrl      = apiBaseUrl + "/token";
var translateUrl = apiBaseUrl + "/translate";

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

    if (speechSynthesis) {
      // wait on voices to be loaded before fetching list
      speechSynthesis.onvoiceschanged = function() {
        voices = speechSynthesis.getVoices()
        voices.forEach(function (voice, index) {
          //$('#voiceButtons').append('<li><button class="speak-btn btn btn-default">' + voice.name + '</button></li>');
          $('#voices').append('<option>' + voice.name + '</option>');
        });

        $('#voices').selectpicker();
      };

    } else {
      alert("Bad news!  Your browser doesn't have the Speech Synthesis API this project requires.  Try opening this webpage using the newest version of Google Chrome.");
    }

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
    $('#langs').selectpicker();
   
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