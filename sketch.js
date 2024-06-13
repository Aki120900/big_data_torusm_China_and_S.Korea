let chinaCrewData, chinaAgeData, chinaCountryData, chinaGenderData;
let koreaCrewData, koreaAgeData, koreaCountryData, koreaGenderData;
let font;
let dataPoints = [];
let angleX = 0;
let angleY = 0;
let zoom = 1;
let selectedPoint = null;

function preload() {
    chinaCrewData = loadTable('China_crew_number.csv', 'csv', 'header');
    chinaAgeData = loadTable('China_visitors_by_age.csv', 'csv', 'header');
    chinaCountryData = loadTable('China_visitors_by_country.csv', 'csv', 'header');
    chinaGenderData = loadTable('China_visitors_by_gender.csv', 'csv', 'header');
    koreaCrewData = loadTable('South_Korea_crew_number.csv', 'csv', 'header');
    koreaAgeData = loadTable('South_Korea_visitor_by_age.csv', 'csv', 'header');
    koreaCountryData = loadTable('South_Korea_visitors_by_country.csv', 'csv', 'header');
    koreaGenderData = loadTable('South_Korea_visitor_by_gender.csv', 'csv', 'header');
    font = loadFont('assets/Roboto-Regular.ttf');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    textFont(font);

    console.log("China Crew Data Columns:", chinaCrewData.columns);
    console.log("China Age Data Columns:", chinaAgeData.columns);
    console.log("China Country Data Columns:", chinaCountryData.columns);
    console.log("China Gender Data Columns:", chinaGenderData.columns);
    console.log("Korea Crew Data Columns:", koreaCrewData.columns);
    console.log("Korea Age Data Columns:", koreaAgeData.columns);
    console.log("Korea Country Data Columns:", koreaCountryData.columns);
    console.log("Korea Gender Data Columns:", koreaGenderData.columns);

    loadData();
}

function loadData() {
    processChinaCrewData();
    processChinaAgeData();
    processChinaCountryData();
    processChinaGenderData();
    processKoreaCrewData();
    processKoreaAgeData();
    processKoreaCountryData();
    processKoreaGenderData();
}

function draw() {
    background(30);
    scale(zoom);
    rotateX(angleX);
    rotateY(angleY);

    drawDataPoints();
    drawAxes();
    drawLegend();

    if (selectedPoint) {
        drawTooltip();
    }
}

function drawDataPoints() {
    for (let data of dataPoints) {
        push();
        translate(data.x, data.y, data.z);
        fill(data.color);
        box(data.size);
        pop();
    }
}

function drawAxes() {
    stroke(200);
    line(-width / 2, 0, 0, width / 2, 0, 0); // X-axis
    line(0, -height / 2, 0, 0, height / 2, 0); // Y-axis
    line(0, 0, -200, 0, 0, 200); // Z-axis

    fill(255);
    noStroke();
    text("X-axis", width / 2 - 40, -10, 0);
    text("Y-axis", 10, height / 2 - 20, 0);
    text("Z-axis", 0, 10, 200);
}

function drawTooltip() {
    let screenPos = screenPosition(createVector(selectedPoint.x, selectedPoint.y, selectedPoint.z));
    push();
    translate(screenPos.x - width / 2, screenPos.y - height / 2, 0);
    fill(0, 150);
    rect(10, 10, 150, 60);
    fill(255);
    textSize(12);
    text(`Country: ${selectedPoint.country}`, 20, 30);
    text(`Category: ${selectedPoint.category}`, 20, 45);
    text(`Value: ${selectedPoint.value}`, 20, 60);
    pop();
}

function processChinaCrewData() {
    let maxVal = max(chinaCrewData.getColumn('Visitors number').map(parseFloat));
    for (let i = 0; i < chinaCrewData.getRowCount(); i++) {
        let job = chinaCrewData.getString(i, 'Job');
        let value = parseFloat(chinaCrewData.getString(i, 'Visitors number'));
        if (isNaN(value)) continue;

        let x = map(i, 0, chinaCrewData.getRowCount(), -width / 2, width / 2);
        let y = map(value, 0, maxVal, height / 2, -height / 2);
        let z = random(-200, 200);
        let size = map(value, 0, maxVal, 10, 100);
        let colorValue = map(value, 0, maxVal, 0, 255);
        
        dataPoints.push({
            x: x,
            y: y,
            z: z,
            size: size,
            color: color(230, 159, 0),
            country: job,
            category: 'China Crew',
            value: value
        });
    }
}

function processChinaAgeData() {
    let maxVal = max(chinaAgeData.getColumn('Visitors number').map(parseFloat));
    for (let i = 0; i < chinaAgeData.getRowCount(); i++) {
        let ageGroup = chinaAgeData.getString(i, 'Age');
        let value = parseFloat(chinaAgeData.getString(i, 'Visitors number'));
        if (isNaN(value)) continue;

        let x = map(i, 0, chinaAgeData.getRowCount(), -width / 2, width / 2);
        let y = map(value, 0, maxVal, height / 2, -height / 2);
        let z = random(-200, 200);
        let size = map(value, 0, maxVal, 10, 100);
        let colorValue = map(value, 0, maxVal, 0, 255);
        
        dataPoints.push({
            x: x,
            y: y,
            z: z,
            size: size,
            color: color(86, 180, 233),
            country: ageGroup,
            category: 'China Age',
            value: value
        });
    }
}

function processChinaCountryData() {
    let maxVal = max(chinaCountryData.getColumn('Visitors number').map(parseFloat));
    for (let i = 0; i < chinaCountryData.getRowCount(); i++) {
        let country = chinaCountryData.getString(i, 'Region');
        let value = parseFloat(chinaCountryData.getString(i, 'Visitors number'));
        if (isNaN(value)) continue;

        let x = map(i, 0, chinaCountryData.getRowCount(), -width / 2, width / 2);
        let y = map(value, 0, maxVal, height / 2, -height / 2);
        let z = random(-200, 200);
        let size = map(value, 0, maxVal, 10, 100);
        let colorValue = map(value, 0, maxVal, 0, 255);
        
        dataPoints.push({
            x: x,
            y: y,
            z: z,
            size: size,
            color: color(0, 158, 115),
            country: country,
            category: 'China Country',
            value: value
        });
    }
}

function processChinaGenderData() {
    let maxVal = max(chinaGenderData.getColumn('Visitors number').map(parseFloat));
    for (let i = 0; i < chinaGenderData.getRowCount(); i++) {
        let gender = chinaGenderData.getString(i, 'Gender');
        let value = parseFloat(chinaGenderData.getString(i, 'Visitors number'));
        if (isNaN(value)) continue;

        let x = map(i, 0, chinaGenderData.getRowCount(), -width / 2, width / 2);
        let y = map(value, 0, maxVal, height / 2, -height / 2);
        let z = random(-200, 200);
        let size = map(value, 0, maxVal, 10, 100);
        let colorValue = map(value, 0, maxVal, 0, 255);
        
        dataPoints.push({
            x: x,
            y: y,
            z: z,
            size: size,
            color: color(240, 228, 66),
            country: gender,
            category: 'China Gender',
            value: value
        });
    }
}

function processKoreaCrewData() {
    let maxVal = max(koreaCrewData.getColumn('Visitors number').map(parseFloat));
    for (let i = 0; i < koreaCrewData.getRowCount(); i++) {
        let job = koreaCrewData.getString(i, 'Job');
        let value = parseFloat(koreaCrewData.getString(i, 'Visitors number'));
        if (isNaN(value)) continue;

        let x = map(i, 0, koreaCrewData.getRowCount(), -width / 2, width / 2);
        let y = map(value, 0, maxVal, height / 2, -height / 2);
        let z = random(-200, 200);
        let size = map(value, 0, maxVal, 10, 100);
        let colorValue = map(value, 0, maxVal, 0, 255);
        
        dataPoints.push({
            x: x,
            y: y,
            z: z,
            size: size,
            color: color(0, 114, 178),
            country: job,
            category: 'Korea Crew',
            value: value
        });
    }
}

function processKoreaAgeData() {
    let maxVal = max(koreaAgeData.getColumn('Visitor number').map(parseFloat));
    for (let i = 0; i < koreaAgeData.getRowCount(); i++) {
        let ageGroup = koreaAgeData.getString(i, 'Age');
        let value = parseFloat(koreaAgeData.getString(i, 'Visitor number'));
        if (isNaN(value)) continue;

        let x = map(i, 0, koreaAgeData.getRowCount(), -width / 2, width / 2);
        let y = map(value, 0, maxVal, height / 2, -height / 2);
        let z = random(-200, 200);
        let size = map(value, 0, maxVal, 10, 100);
        let colorValue = map(value, 0, maxVal, 0, 255);
        
        dataPoints.push({
            x: x,
            y: y,
            z: z,
            size: size,
            color: color(213, 94, 0),
            country: ageGroup,
            category: 'Korea Age',
            value: value
        });
    }
}

function processKoreaCountryData() {
    let maxVal = max(koreaCountryData.getColumn('Visitors number').map(parseFloat));
    for (let i = 0; i < koreaCountryData.getRowCount(); i++) {
        let country = koreaCountryData.getString(i, 'Year');
        let value = parseFloat(koreaCountryData.getString(i, 'Visitors number'));
        if (isNaN(value)) continue;

        let x = map(i, 0, koreaCountryData.getRowCount(), -width / 2, width / 2);
        let y = map(value, 0, maxVal, height / 2, -height / 2);
        let z = random(-200, 200);
        let size = map(value, 0, maxVal, 10, 100);
        let colorValue = map(value, 0, maxVal, 0, 255);
        
        dataPoints.push({
            x: x,
            y: y,
            z: z,
            size: size,
            color: color(204, 121, 167),
            country: country,
            category: 'Korea Country',
            value: value
        });
    }
}

function processKoreaGenderData() {
    let maxVal = max(koreaGenderData.getColumn('Visitors number').map(parseFloat));
    for (let i = 0; i < koreaGenderData.getRowCount(); i++) {
        let gender = koreaGenderData.getString(i, 'Gender');
        let value = parseFloat(koreaGenderData.getString(i, 'Visitors number'));
        if (isNaN(value)) continue;

        let x = map(i, 0, koreaGenderData.getRowCount(), -width / 2, width / 2);
        let y = map(value, 0, maxVal, height / 2, -height / 2);
        let z = random(-200, 200);
        let size = map(value, 0, maxVal, 10, 100);
        let colorValue = map(value, 0, maxVal, 0, 255);
        
        dataPoints.push({
            x: x,
            y: y,
            z: z,
            size: size,
            color: color(117, 112, 179),
            country: gender,
            category: 'Korea Gender',
            value: value
        });
    }
}

function mouseDragged() {
    angleY += movedX * 0.01;
    angleX -= movedY * 0.01;
}

function mouseWheel(event) {
    zoom += event.delta * -0.001;
}

function drawLegend() {
    push();
    translate(width / 2 - 200, -height / 2 + 50, 0);
    fill(255);
    textSize(16);
    text("Legend:", 0, 0);
    textSize(12);
    text("China Crew", 0, 20);
    text("China Age", 0, 35);
    text("China Country", 0, 50);
    text("China Gender", 0, 65);
    text("Korea Crew", 0, 80);
    text("Korea Age", 0, 95);
    text("Korea Country", 0, 110);
    text("Korea Gender", 0, 125);
    
    fill(230, 159, 0);  // China Crew color
    rect(-20, 10, 10, 10);
    fill(86, 180, 233);  // China Age color
    rect(-20, 25, 10, 10);
    fill(0, 158, 115);  // China Country color
    rect(-20, 40, 10, 10);
    fill(240, 228, 66);  // China Gender color
    rect(-20, 55, 10, 10);
    fill(0, 114, 178);  // Korea Crew color
    rect(-20, 70, 10, 10);
    fill(213, 94, 0);  // Korea Age color
    rect(-20, 85, 10, 10);
    fill(204, 121, 167);  // Korea Country color
    rect(-20, 100, 10, 10);
    fill(117, 112, 179);  // Korea Gender color
    rect(-20, 115, 10, 10);
    pop();
}