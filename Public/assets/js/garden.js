
const user = {
  id: 1,
  name: "TT"
}

const maturities = {
  "magnolia": 70,
  "lily": 50,
  "peony": 60,
  "iris": 40,
  "sunflower": 100,
  "poppy": 30,
  "mushroom": 90
}

const imgs = {
  magnolia: "assets/TT Images/magnolia.png",
  lily: "assets/TT Images/lily.png",
  peony: "assets/TT Images/peony.png",
  iris: "assets/TT Images/iris.png",
  sunflower: "assets/TT Images/sunflower.png",
  poppy: "assets/TT Images/poppy.png",
  mushroom: "assets/TT Images/mushroom.png"
}


function drag_start(event) {
  var style = window.getComputedStyle(event.target, null);
  var str = (parseInt(style.getPropertyValue("left")) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top")) - event.clientY) + ',' + event.target.id;
  event.dataTransfer.setData("Text", str);
}

function drop(event) {
  var offset = event.dataTransfer.getData("Text").split(',');
  // console.log(offset)
  var dm = document.getElementById(offset[2]);
  dm.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
  dm.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
  event.preventDefault();

  
  // console.log(dm.style.left, dm.style.top);
  updatePosition(dm.style.left.replace("px", ''), dm.style.top.replace('px', ''), offset[2])
  return false;
}

function drag_over(event) {
  event.preventDefault();
  return false;
}


function updatePosition (left,top,id){
  console.log(left,top)
    $.ajax({
      method: "PUT",
      url: "/api/garden/location/"+id,
      data: {left,top}
    }).then(data=> console.log(data))
  }


  // rendering ---
$(document).ready(function() {

  const date = new Date();
  // console.log(date.valueOf());

  // $.get("/api/user_data").then(user=>console.log(user));

  renderAll();

function renderAll(){
  $.get('/api/all/garden').then(data=> {
    renderGarden(data)
  }).catch(err=>console.log(err))
}


function renderGarden(garden){
  for (i=0; i<garden.length; i++) {

    let daysToMature = Math.min(~~((date.valueOf() - garden[i].dayPlanted)/86400000), garden[i].maturity);
    let height = Math.max(daysToMature/garden[i].maturity * 200, 40);
    $("#plantsDiv").prepend(`<p>${garden[i].name}: ${daysToMature}/${garden[i].maturity}<p>`);
    $("#gardendiv").append(`<img id="${garden[i].id}" draggable="true" ondragstart="drag_start(event)" class="plants" src="${garden[i].img}" style="position:fixed; top:${garden[i].positionTop}px; left:${garden[i].positionLeft}px; height:${height}px">`);
}
}


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

  $("#gardendiv").on("click", ".plants", function(event){

    event.stopPropagation();
    $(this).animate({
      height: '+=30px',
      top: '-=30px', 
      left: '-=15px', 
    }, 500);
  }); 


  $(document).on("click", "#savePlantBtn", function(event){
  // $("#savePlantBtn").on("click", function(event){

    let newPlant = $("#plantSelector").val();
    let plantDate = $("#plantDate").val();

    $.post("/api/garden/new/" + user.id, 
    {
      name: newPlant,
      dayPlanted: Date.parse(plantDate),
      maturity: maturities[newPlant],
      img: imgs[newPlant],
      positionTop: 200,
      positionLeft: 500
    })
      .then(function(data) {

      })
      .catch(function(err) {
        console.log(err);
      });
  });

    $("#savePlantBtn").on("click", function(event){
      $('#plant-added').attr("style", "color: red");
        setTimeout(function(){
          $('#plant-added').attr("style", "color: white");
        }, 3000);
    });

  $('#plantsModal').on('hidden.bs.modal', function () {
    location.reload();
   })


    $("#gardendiv").click(function(event){
      event.stopPropagation();
    });

})


