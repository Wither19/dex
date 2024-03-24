var i = 0;
var p = 1;

function get() {
  fetch("https://pokeapi.co/api/v2/pokedex/1").then(response => response.json()).then(data => {
    console.log(data);
    for (let i = 0; i < 898; i++) {
      const pkmnName = data.pokemon_entries[i].pokemon_species.name;

      const spriteUrl = "https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/" + pkmnName + ".png";

      var newEntry = document.createElement("div");



      newEntry.classList.add("entry");
      newEntry.setAttribute("id", i + 1);
      newEntry.addEventListener("click", pkmnSelect);
      newEntry.addEventListener("click", function() {
              $(".container").removeClass("hide");
      });
      newEntry.innerHTML = `<img src="${spriteUrl}"><br><center><span>${pkmnName}</span></center>`;
      document.querySelector("div.container").appendChild(newEntry);
    }
  });
}

function pkmnSelect(event) {
  if (p <= 0) {
    p = 1;
  }

  p = event.currentTarget.id;
  $("#" + p).addClass("hl");
  $(":not(#" + p + ")").removeClass("hl");
  pkmnLoad();
}

function pkmnLoad() {
  
  fetch("https://pokeapi.co/api/v2/pokemon/" + p).then(response => response.json()).then(data => {
    const hp = data.stats[0].base_stat;
    const atk = data.stats[1].base_stat;
    const def = data.stats[2].base_stat;
    const spAtk = data.stats[3].base_stat;
    const spDef = data.stats[4].base_stat;
    const spd = data.stats[5].base_stat;



    $("#" + p).addClass("hl");
    $(":not(#" + p + ")").removeClass("hl");


    if (data.id < 10) {
      $("h1").html(`#00${data.id} - ${data.name}`);
    }
    else if (data.id > 10 && data.id < 100) {
      $("h1").html(`#0${data.id} - ${data.name}`);
    }
    else {
      $("h1").html(`#${data.id} - ${data.name}`);
    }
    $("img.art.reg").attr("src", data.sprites.other["official-artwork"].front_default);
    $("img.art.shiny").attr("src", data.sprites.other["official-artwork"].front_shiny);
    $(".hp").html(`HP <div class="bar" style="width: ${hp / 2.55 * 4}px">${hp}</div>`);
    $(".atk").html(`Attack <div class="bar" style="width: ${atk / 2.55 * 4}px">${atk}</div>`);
    $(".def").html(`Defense <div class="bar" style="width: ${def / 2.55 * 4}px">${def}</div>`);
    $(".spAtk").html(`Sp. Attack <div class="bar" style="width: ${spAtk / 2.55 * 4}px">${spAtk}</div>`);
    $(".spDef").html(`Sp. Defense <div class="bar" style="width: ${spDef / 2.55 * 4}px">${spDef}</div>`);
    $(".spd").html(`Speed <div class="bar" style="width: ${spd / 2.55 * 4}px">${spd}</div>`);
    $(".height").html((data.height / 3.048).toFixed() + "\'");
    $(".weight").html((data.weight / 4.536).toFixed() + " lbs.")
    $(".types").html("");
    $(".abilities").html(``);
    for (let t = 0; t <= data.types.length; t++) {
      $(".types").append(`<div class="icon ${data.types[t].type.name}"><img src="https://duiker101.github.io/pokemon-type-svg-icons/icons/${data.types[t].type.name}.svg"></div>`);
    }
  });

  fetch("https://pokeapi.co/api/v2/pokemon/" + p).then(response => response.json()).then(data => {
    for (let a = 0; a <= data.abilities.length; a++) {
      if (data.abilities[a].is_hidden === true) {
       $(".abilities").append(`<a target="_blank" href="https://www.smogon.com/dex/sv/abilities/${data.abilities[a].ability.name}"><span style="font-weight: 900">(H) </span>${data.abilities[a].ability.name.replace("-", " ")}</a><br>`);
      }
      else {
       $(".abilities").append(`<a target="_blank" href="https://www.smogon.com/dex/sv/abilities/${data.abilities[a].ability.name}">${data.abilities[a].ability.name.replace("-", " ")}</a><br>`);
      }
   }
  });
   
  fetch("https://pokeapi.co/api/v2/pokemon-species/" + p).then(response => response.json()).then(data => {
      for (let f = 0; f <= data.flavor_text_entries.length; f++) {
          let fLang = data.flavor_text_entries[f].language.name.lastIndexOf("en");
          if (fLang === 0) {
            $(".lore").html(`<span>${data.flavor_text_entries[f].flavor_text}</span><br><br><sub style="text-transform: capitalize;">Pokemon ${data.flavor_text_entries[f].version.name.replace("-", " ")}</sub>`);
          }
      }
  });

  fetch("https://pokeapi.co/api/v2/pokemon-species/" + p).then(response => response.json()).then(data => {
for (let g = 0; g <= data.genera.length; g++) {
  let gLang = data.genera[g].language.name.indexOf("en");
  if (gLang === 0) {
    $(".genus").html(`The ${data.genera[g].genus}`);
  }
}
});
}
$(document).keydown(function(e) {
  if (e.key == "r") {
    p = Math.floor(Math.random() * 898 + 1);
    pkmnLoad();
  }
  if (e.key == "p") {
    $(".container").toggleClass("hide");
  }
  else if (e.key == "s") {
    $("img.art").toggleClass("hide");
  }
  else if (e.key == "ArrowLeft") {
      p--;
      pkmnLoad();
  }
  else if (e.key == "ArrowRight") {
      p++;
      pkmnLoad();
  }
  else if (e.key == "ArrowUp") {
      e.preventDefault();
      p -= 3;
      pkmnLoad();
  }
  else if (e.key == "ArrowDown") {
    e.preventDefault();
    p += 3;
    pkmnLoad();
}
});
