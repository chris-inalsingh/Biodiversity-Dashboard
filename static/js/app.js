function buildPlot(id){

d3.json("samples.json").then(function(data){
    console.log(data);
    //filter based off specified id
    var topdata = data.samples.filter(d => d.id.toString() === id)[0];
    console.log(topdata);
    //select top 10 sample values
    var sample_value = topdata.sample_values.slice(0,10).reverse();
    console.log(sample_value);
    //select corresponding top 10 otu_ids
    var otu = topdata.otu_ids.slice(0,10).reverse();
    var otu_id = otu.map(s => "OTU " + s);
    console.log(otu_id);
    //select otu_labels for hovertext
    var otu_label = topdata.otu_labels.slice(0,10);
    console.log(otu_label);

    //create trace for bar
    var trace1 = {
        x: sample_value,
        y: otu_id,
        text: otu_label,
        name: `Top 10 OTU`,
        type: "bar",
        orientation: "h"
    };
    console.log(trace1);

    //data set for bar
    var data = [trace1];

    //create the layout for bar
    var layout = {
        title: `Top 10 OTU for ID#${id}`,
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        }
    }
    Plotly.newPlot("bar", data, layout);

    //create trace for bubble
    var trace2 = {
        x: topdata.otu_ids,
        y: topdata.sample_values,
        mode: "markers",
        marker:{
            color: topdata.otu_ids,
            size: topdata.sample_values
        },
        text: topdata.otu_labels
    }
    console.log(trace2);
    //data set for bubble
    var data2 = [trace2];

    //create the layout for bubble
    var layout2 = {
        title: `OTU bubble chart`,
        margin: {
            height: 500,
            width: 1500
        }   
    }
    Plotly.newPlot("bubble", data2, layout2);
})
};

//create demographic data display
function demoData(id){
    d3.json("samples.json").then(function(data){
        //select metadata
        var meta = data.metadata;
        console.log(meta);
        //filter based off specified id
        var filtermeta = meta.filter(d => d.id.toString() === id)[0];
        console.log(filtermeta);
        //d3 select area
        var d3area=d3.select(".panel-body");
        //reset area
        d3area.html("");

        Object.entries(filtermeta).forEach(([key, value])=> {
            d3area.append("h5").text(`${key.toUpperCase()} : ${value}`)
        })
       
    
    })
};

function init(){
    //Add values to dropdown
    d3.json("samples.json").then(function(data){
    data.names.forEach(function(id){

    //select dropdown
    d3.select("#selDataset").append("option").text(id).property("value");
    });
    buildPlot(data.names[0]);
    demoData(data.names[0]);
    });

};

function optionChanged(id){
    buildPlot(id);
    demoData(id);
}
init();