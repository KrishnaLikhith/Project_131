
img = "";
status = "";
objects = [];
function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
}
function preload() {
    img = loadImage("image2.jpg");
}
function draw() {
    image(img, 0, 0, 640, 420);
    if (status != "") {
        document.getElementById("status").innerHTML = "Status : Object Detected";
        for (index = 0; index < objects.length; index++) {
            fill(255, 0, 0);
            percentage = floor(objects[index].confidence * 100);
            text(objects[index].label + " " + percentage + "%", objects[index].x + 15, objects[index].y + 15);
            fill("#FF0000");
            noFill();
            stroke("#FF0000");
            rect(objects[index].x, objects[index].y, objects[index].width, objects[index].height);
            

        }
    }
}
function modelLoaded() {
    console.log("Model is Loaded");
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    status = true;
    object_detector.detect(img, gotResults);
}
function gotResults(error, result) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(result);
        objects = result;
    }
}