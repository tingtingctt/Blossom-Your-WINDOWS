
const user = {
  id: 1,
  name: "TT"
}

const maturities = {
  parsley: 70,
  basil: 50,
  rosemary: 180,
  cilantro: 21,
  pepper: 60
}

const imgs = {
  parsley: "assets/TT Images/parsley.png",
  basil: "assets/TT Images/basil.png",
  rosemary: "assets/TT Images/rosemary.png",
  cilantro: "assets/TT Images/cilantro.png",
  pepper: "assets/TT Images/pepper.png"
}


const garden = [
    {
        name: "parsley",
        dayPlanted: 1589932800,
        daysToMature: 50,
        maturity:70,
        img: "assets/TT Images/parsley.png",
        positionTop: 200,
        positionLeft: 100,
    },
    {
        name: "basil",
        daysToMature: 40,
        dayPlanted: 1589932800,
        maturity:50,
        img: "assets/TT Images/basil.png",
        positionTop: 200,
        positionLeft: 200,
    },
    {
        name: "rosemary",
        daysToMature: 120,
        dayPlanted: 1589932800,
        maturity:180,
        img: "assets/TT Images/rosemary.png",
        positionTop: 200,
        positionLeft: 300,
    },
    {
        name: "cilantro",
        daysToMature: 14,
        dayPlanted: 1589932800,
        maturity:21,
        img: "assets/TT Images/cilantro.png",
        positionTop: 200,
        positionLeft: 400,
    },
    {
        name: "pepper",
        daysToMature: 30,
        dayPlanted: 1589932800,
        maturity:60,
        img: "assets/TT Images/pepper.png",
        positionTop: 200,
        positionLeft: 500,
    }
]

// const grids = {
//     1:{

//     },
//     2:null,
    
// }

const date = new Date();
console.log(date.valueOf());
$.get("/api/user_data").then(user=>console.log(user))
for (i=0; i<garden.length; i++) {
  // change this equation to database value
    let daysToMature = Math.min(~~((date.valueOf()/1000 - garden[i].dayPlanted)/86400), garden[i].maturity);
    let height = Math.max(daysToMature/garden[i].maturity * 200, 40);
    $("#plantsDiv").prepend(`<p>${garden[i].name}: ${daysToMature}/${garden[i].maturity}<p>`);
    $("#gardendiv").append(`<img id="plant${i}" draggable="true" ondragstart="drag_start(event)" class="plants" src="${garden[i].img}" style="position:fixed; top:${garden[i].positionTop}px; left:${garden[i].positionLeft}px; height:${height}px">`);
}


$(document).ready(function() {
    // to open virtual garden
    $("#gardenbtndiv").on("click", function(event){
      event.stopPropagation();
        $("#whiteout").attr("style", "display: block");
    }); 

    $("#addPlantBtn").on("click", function(event){
      event.stopPropagation();
      $('#plantsModal').modal({
        show: true
    });
  }); 

  $(".plants").on("click", function(event){
    event.stopPropagation();
    $(this).animate({
      height: '+=30px',
      top: '-=30px', 
      left: '-=15px', 
    }, 500);
  }); 

  // name: DataTypes.STRING,
  //       dayPlanted: DataTypes.INTEGER,
  //       maturity: DataTypes.INTEGER,
  //       img: DataTypes.STRING,
  //       positionTop: {
  //         type: DataTypes.INTEGER,
  //         defaultValue: 200
  //       },
  //       positionLeft: {
  //         type: DataTypes.INTEGER,
  //         defaultValue: 150
  //       }


  $("#savePlantBtn").on("click", function(event){
    event.stopPropagation();
    let newPlant = $("#plantSelector").val();
    let plantDate = $("#plantDate").val();
    console.log((~~((date.valueOf()-Date.parse(plantDate))/86400000)));
    $.post("/api/garden/new/" + user.id, {
      name: newPlant,
      dayPlanted: Date.parse(plantDate)/86400000,
      maturity: maturities.newPlant,
      img: imgs.newPlant,
      positionTop: 200,
      positionLeft: 100*garden.length
    })
      .then(function() {
        window.location.replace("/index");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  });



    // to close virtual garden
    $(document).click(function(event){
      $("#whiteout").attr("style", "display: none");
    });

    $("#gardendiv").click(function(event){
      event.stopPropagation();
    });

})


