
const garden = [
    {
        name: "parsley",
        daysToMature: 50,
        maturity:70,
        img: "assets/TT Images/parsley.png",
        positionTop: -70,
        positionLeft: 100,
        height: 70
    },
    {
        name: "basil",
        daysToMature: 40,
        maturity:50,
        img: "assets/TT Images/basil.png",
        positionTop: -70,
        positionLeft: 200,
        height: 70
    },
    {
        name: "rosemary",
        daysToMature: 100,
        maturity:180,
        img: "assets/TT Images/rosemary.png",
        positionTop: -70,
        positionLeft: 300,
        height: 70
    },
    {
        name: "cilantro",
        daysToMature: 14,
        maturity:21,
        img: "assets/TT Images/cilantro.png",
        positionTop: -70,
        positionLeft: 400,
        height: 70
    },
    {
        name: "pepper",
        daysToMature: 30,
        maturity:60,
        img: "assets/TT Images/pepper.png",
        positionTop: -70,
        positionLeft: 500,
        height: 70
    }
]

for (i=0; i<garden.length; i++) {
    $("#maturity-div").append(`<p>${garden[i].name}: ${garden[i].daysToMature}/${garden[i].maturity}<p>`);
    $("#gardendiv").append(`<img src="${garden[i].img}" style="position:fixed; top:${garden[i].positionTop}px; left:${garden[i].positionLeft}px; height:${garden[i].height}px">`);
}



$(document).ready(function() {
    // to open virtual garden
    $("#gardenbtndiv").on("click", function(event){
        event.stopPropagation();
        $("#whiteout").attr("style", "display: block");
    }); 

    



    // to close virtual garden
    $(document).click(function(event){
      $("#whiteout").attr("style", "display: none");
    });

    $("#gardendiv").click(function(event){
      event.stopPropagation();
    });

})
