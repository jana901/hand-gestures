prediction_1="";
prediction_2="";


Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});


camera=document.getElementById("camera");

Webcam.attach("#camera");


function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML=
        "<img id='capture_image' src='"+data_uri+"'/>"
    })
}

console.log("ml5 version=",ml5.version);

Classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Aylmo_l-n/model.json",modelLoaded);

function modelLoaded(){
    console.log("model is lodaded");
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The first prediction is "+prediction_1;
    speak_data_2="And the second prediction is"+prediction_2;
    var Utterthis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(Utterthis);
}

function check(){
    img=document.getElementById("capture_image");
    Classifier.classify(img,gotresult);
}

function gotresult(error,results){
    if (error){
console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML=results[0].label;
        document.getElementById("result_gesture_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();
        if (results[0].label=="cheese"){
            document.getElementById("update_handgesture").innerHTML="&#9996";
        }
        if (results[0].label=="perfect"){
            document.getElementById("update_handgesture").innerHTML="&#128076";
        }
        if (results[0].label=="thumbs up"){
            document.getElementById("update_handgesture").innerHTML="&#128077";
        }
        if (results[1].label=="cheese"){
            document.getElementById("update_handgesture2").innerHTML="&#9996";
        }
        if (results[1].label=="perfect"){
            document.getElementById("update_handgesture2").innerHTML="&#128076";
        }
        if (results[1].label=="thumbs up"){
            document.getElementById("update_handgesture2").innerHTML="&#128077";
        }
    }
}
