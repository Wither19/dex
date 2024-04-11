var i = 0;
var p = 1;
var s;

$(document).ready(function () {
  p = localStorage.getItem("pkmn");
  pkmnLoad();
});

$(document).ready(function () {
  inputUpdate();
});

$("input").keydown(function () {
  inputUpdate();
});

// Grabs the National Pokédex
function get() {
  fetch("https://pokeapi.co/api/v2/pokedex/1")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < 1025; i++) {
        const pkmnName = data.pokemon_entries[i].pokemon_species.name;

        const spriteUrl =
          "https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/" +
          pkmnName +
          ".png";

        var newEntry = document.createElement("div");

        newEntry.classList.add("entry");
        newEntry.setAttribute("id", i + 1);
        newEntry.addEventListener("click", pkmnSelect);
        newEntry.addEventListener("click", function () {
          $(".container").removeClass("hide");
        });
        newEntry.innerHTML = `
        <img class="entryImg" src="${spriteUrl}">
        <br>
        <center>
        <span>${pkmnName}</span>
        </center>`;
        document.querySelector("div.container").appendChild(newEntry);
      }
    });
}

function pkmnSelect(event) {
  // Called when a Pokémon is manually selected (Highlights the selected element)
  p = event.currentTarget.id;
  pkmnLoad();
}
// Actually loads the Pokémon and all relevant data from the Pokédex number (as expressed by p) being changed
function pkmnLoad() {
  fetch("https://pokeapi.co/api/v2/pokemon/" + p)
    .then((response) => response.json())
    .then((data) => {
      const hp = data.stats[0].base_stat;
      const atk = data.stats[1].base_stat;
      const def = data.stats[2].base_stat;
      const spAtk = data.stats[3].base_stat;
      const spDef = data.stats[4].base_stat;
      const spd = data.stats[5].base_stat;
      const bst = hp + atk + def + spAtk + spDef + spd;

      if (bst <= 150) {
        $(".tier").html("D");
      } else if (bst > 150 && bst <= 300) {
        $(".tier").html("C");
      } else if (bst > 3000 && bst <= 400) {
        $(".tier").html("B");
      } else if (bst > 400 && bst <= 600) {
        $(".tier").html("A");
      } else if (bst > 600 && bst <= 800) {
        $(".tier").html("S");
      }

      if (data.id < 10) {
        $("h1").html(
          `#00${data.id} - ${data.name
            .replace("nidoran-m", "Nidoran ♂")
            .replace("nidoran-f", "Nidoran ♀")
            .replace("-mega", " (Mega)")
            .replace("-gmax", " (G-Max)")
            .replace("-alola", " (Alolan)")
            .replace("-galar", " (Galarian)")
            .replace("-hisui", " (Hisuian)")
            .replace("-paldea", " (Paldea)")
            .replace("-10-power-construct", " (10%)")
            .replace("-50-power-construct", " (50%)")
            .replace("-complete", " (Complete)")}`
        );
      } else if (data.id >= 10 && data.id < 100) {
        $("h1").html(
          `#0${data.id} - ${data.name
            .replace("nidoran-m", "Nidoran ♂")
            .replace("nidoran-f", "Nidoran ♀")
            .replace("-mega", " (Mega)")
            .replace("-gmax", " (G-Max)")
            .replace("-alola", " (Alolan)")
            .replace("-galar", " (Galarian)")
            .replace("-hisui", " (Hisuian)")
            .replace("-paldea", " (Paldea)")
            .replace("-10-power-construct", " (10%)")
            .replace("-50-power-construct", " (50%)")
            .replace("-complete", " (Complete)")}`
        );
      } else if (data.id > 10000) {
        $("h1").html(
          `${data.name
            .replace("nidoran-m", "Nidoran ♂")
            .replace("nidoran-f", "Nidoran ♀")
            .replace("-mega", " (Mega)")
            .replace("-gmax", " (G-Max)")
            .replace("-alola", " (Alolan)")
            .replace("-galar", " (Galarian)")
            .replace("-hisui", " (Hisuian)")
            .replace("-paldea", " (Paldea)")
            .replace("-10-power-construct", " (10%)")
            .replace("-50-power-construct", " (50%)")
            .replace("-complete", " (Complete)")}`
        );
      } else {
        $("h1").html(
          `#${data.id} - ${data.name
            .replace("nidoran-m", "Nidoran ♂")
            .replace("nidoran-f", "Nidoran ♀")
            .replace("-mega", " (Mega)")
            .replace("-gmax", " (G-Max)")
            .replace("-alola", " (Alolan)")
            .replace("-galar", " (Galarian)")
            .replace("-hisui", " (Hisuian)")
            .replace("-paldea", " (Paldea)")
            .replace("-10-power-construct", " (10%)")
            .replace("-50-power-construct", " (50%)")
            .replace("-complete", " (Complete)")}`
        );
      }
      $("img.art.reg").attr(
        "src",
        data.sprites.other[localStorage.getItem("art")].front_default
      );
      $("img.art.shiny").attr(
        "src",
        data.sprites.other[localStorage.getItem("art")].front_shiny
      );

      $(".hp").html(
        `HP <div class="bar" style="width: ${(hp / 2.55) * 4}px">${hp}</div>`
      );
      $(".atk").html(
        `Attack <div class="bar" style="width: ${
          (atk / 2.55) * 4
        }px">${atk}</div>`
      );
      $(".def").html(
        `Defense <div class="bar" style="width: ${
          (def / 2.55) * 4
        }px">${def}</div>`
      );
      $(".spAtk").html(
        `Sp. Attack <div class="bar" style="width: ${
          (spAtk / 2.55) * 4
        }px">${spAtk}</div>`
      );
      $(".spDef").html(
        `Sp. Defense <div class="bar" style="width: ${
          (spDef / 2.55) * 4
        }px">${spDef}</div>`
      );
      $(".spd").html(
        `Speed <div class="bar" style="width: ${
          (spd / 2.55) * 4
        }px">${spd}</div>`
      );
      $(".bst").html(
        `Total <div class="bar orange" style="width: ${
          (bst / 2.55) * 1.2
        }px">${bst}</div>`
      );
      $(".height").html((data.height / 3.048).toFixed() + "'");
      $(".weight").html((data.weight / 4.536).toFixed() + " lbs.");
      $(".types").html("");
      $(".abilities").html("");
      for (let t = 0; t <= data.types.length; t++) {
        // iterates through all the given Pokémon's types
        $(".types").append(
          `<div class="icon ${
            data.types[t].type.name
          }"><img src="${localStorage.getItem("types")}/icons/${
            data.types[t].type.name
          }.svg"></div>`
        );
      }
    });

  // iterates through all the given Pokémon's abilities
  fetch("https://pokeapi.co/api/v2/pokemon/" + p)
    .then((response) => response.json())
    .then((data) => {
      for (let a = 0; a <= data.abilities.length; a++) {
        if (data.abilities[a].is_hidden === true) {
          $(".abilities").append(
            `<br><a target="_blank" title="View ${data.abilities[
              a
            ].ability.name.replace(
              "-",
              " "
            )} on Smogon" href="https://www.smogon.com/dex/sv/abilities/${
              data.abilities[a].ability.name
            }"><span style="font-weight: 900">(H) </span>${data.abilities[
              a
            ].ability.name.replace("-", " ")}</a>`
          );
        } else {
          $(".abilities").append(
            `<br><a target="_blank" title="View ${data.abilities[
              a
            ].ability.name.replace(
              "-",
              " "
            )} on Smogon" href="https://www.smogon.com/dex/sv/abilities/${
              data.abilities[a].ability.name
            }">${data.abilities[a].ability.name.replace("-", " ")}</a>`
          );
        }
      }
    });

  fetch("https://pokeapi.co/api/v2/pokeon/" + p)
    .then((response) => response.json())
    .then((data) => {
      $(".moves").html("");
      for (let h = 0; h < 4; h++) {
        let r = Math.floor(Math.random() * data.moves.length);
        fetch(data.moves[r].move.url)
          .then((moveR) => moveR.json())
          .then((move) => {
            $(".moves").append(`
        <li class="move ${move.type.name}">
          <div class="icon ${move.type.name}">
              <img src="https://duiker101.github.io/pokemon-type-svg-icons/icons/${
                move.type.name
              }.svg">
          </div>
          <h2>${move.name.replace("-", " ")}</h2>
          <p><span>Power: ${
            move.power
          } </span><span> <img src="https://raw.githubusercontent.com/Wither19/dex/main/${
              move.damage_class.name
            }.png"></span><span>Accuracy: ${move.accuracy}</span></p>
          <p><span style="text-transform: none !important">${
            move.effect_entries[0].short_effect
          }</span></p>
        </li>`);
          });
      }
    });

  // Fetches the Pokémon species endpoint for p and iterates through its Pokédex entries to find the most recent English entry
  fetch("https://pokeapi.co/api/v2/pokemon-species/" + p)
    .then((response) => response.json())
    .then((data) => {
      for (let f = 0; f <= data.flavor_text_entries.length; f++) {
        let fLang = data.flavor_text_entries[f].language.name.lastIndexOf("en");
        if (fLang === 0) {
          $(".lore").html(
            `<span style="font-style: italic;">"${
              data.flavor_text_entries[f].flavor_text
            }"</span><br><br><sub style="text-transform: capitalize;">Pokémon ${data.flavor_text_entries[
              f
            ].version.name.replace("-", " ")}</sub>`
          );
        }
      }
    });

  // Finds the English genus
  fetch("https://pokeapi.co/api/v2/pokemon-species/" + p)
    .then((response) => response.json())
    .then((data) => {
      for (let g = 0; g <= data.genera.length; g++) {
        let gLang = data.genera[g].language.name.indexOf("en");
        if (gLang === 0) {
          $(".genus").html(`${data.genera[g].genus}`);
        }
      }
    });

  // loads all the different forms for a Pokémon
  fetch("https://pokeapi.co/api/v2/pokeon-species/" + p)
    .then((response) => response.json())
    .then((data) => {
      $(".varieties").html("");
      for (let v = 0; v < data.varieties.length; v++) {
        fetch(data.varieties[v + 1].pokemon.url)
          .then((vResponse) => vResponse.json())
          .then((v) => {
            $(".varieties").append(
              `<div>
              <img src="${
                v.sprites.other[localStorage.getItem("art")].front_default
              }">
              <br>
              <h3>${v.name
                .replace("-mega", " (Mega)")
                .replace("-primal", " (Primal)")
                .replace("-gmax", " (G-Max)")
                .replace("-alola", " (Alolan)")
                .replace("-galar", " (Galarian)")
                .replace("-hisui", " (Hisuian)")
                .replace("-paldea", " (Paldean)")
                .replace("-10-power-construct", " (10%)")
                .replace("-50-power-construct", " (50%)")
                .replace("-complete", " (Complete)")}</h3>
              </div>`
            );
          });
      }
    });
  if (p >= 10001) {
    $(".genus").html("");
    $(".lore").html("");
    $(".varieties").html("");
  }
}

function pkmnLoadFromSearch() {
  fetch("https://pokeapi.co/api/v2/pokemon/" + s)
    .then((response) => response.json())
    .then((data) => {
      const hp = data.stats[0].base_stat;
      const atk = data.stats[1].base_stat;
      const def = data.stats[2].base_stat;
      const spAtk = data.stats[3].base_stat;
      const spDef = data.stats[4].base_stat;
      const spd = data.stats[5].base_stat;
      const bst = hp + atk + def + spAtk + spDef + spd;

      if (bst <= 150) {
        $(".tier").html("D");
      } else if (bst > 150 && bst <= 300) {
        $(".tier").html("C");
      } else if (bst > 3000 && bst <= 400) {
        $(".tier").html("B");
      } else if (bst > 400 && bst <= 600) {
        $(".tier").html("A");
      } else if (bst > 600 && bst <= 800) {
        $(".tier").html("S");
      }

      if (data.id < 10) {
        $("h1").html(
          `#00${data.id} - ${data.name
            .replace("nidoran-m", "Nidoran ♂")
            .replace("nidoran-f", "Nidoran ♀")
            .replace("-mega", " (Mega)")
            .replace("-gmax", " (G-Max)")
            .replace("-alola", " (Alolan)")
            .replace("-galar", " (Galarian)")
            .replace("-hisui", " (Hisuian)")
            .replace("-paldea", " (Paldea)")
            .replace("-10-power-construct", " (10%)")
            .replace("-50-power-construct", " (50%)")
            .replace("-complete", " (Complete)")}`
        );
      } else if (data.id >= 10 && data.id < 100) {
        $("h1").html(
          `#0${data.id} - ${data.name
            .replace("nidoran-m", "Nidoran ♂")
            .replace("nidoran-f", "Nidoran ♀")
            .replace("-mega", " (Mega)")
            .replace("-gmax", " (G-Max)")
            .replace("-alola", " (Alolan)")
            .replace("-galar", " (Galarian)")
            .replace("-hisui", " (Hisuian)")
            .replace("-paldea", " (Paldea)")
            .replace("-10-power-construct", " (10%)")
            .replace("-50-power-construct", " (50%)")
            .replace("-complete", " (Complete)")}`
        );
      } else if (data.id > 10000) {
        $("h1").html(
          `${data.name
            .replace("nidoran-m", "Nidoran ♂")
            .replace("nidoran-f", "Nidoran ♀")
            .replace("-mega", " (Mega)")
            .replace("-gmax", " (G-Max)")
            .replace("-alola", " (Alolan)")
            .replace("-galar", " (Galarian)")
            .replace("-hisui", " (Hisuian)")
            .replace("-paldea", " (Paldea)")
            .replace("-10-power-construct", " (10%)")
            .replace("-50-power-construct", " (50%)")
            .replace("-complete", " (Complete)")}`
        );
        $(".genus").html("");
        $(".lore").html("");
      } else {
        $("h1").html(
          `#${data.id} - ${data.name
            .replace("nidoran-m", "Nidoran ♂")
            .replace("nidoran-f", "Nidoran ♀")
            .replace("-mega", " (Mega)")
            .replace("-gmax", " (G-Max)")
            .replace("-alola", " (Alolan)")
            .replace("-galar", " (Galarian)")
            .replace("-hisui", " (Hisuian)")
            .replace("-paldea", " (Paldea)")
            .replace("-10-power-construct", " (10%)")
            .replace("-50-power-construct", " (50%)")
            .replace("-complete", " (Complete)")}`
        );
      }
      $("img.art.reg").attr(
        "src",
        data.sprites.other[localStorage.getItem("art")].front_default
      );
      $("img.art.shiny").attr(
        "src",
        data.sprites.other[localStorage.getItem("art")].front_shiny
      );

      $(".hp").html(
        `HP <div class="bar" style="width: ${(hp / 2.55) * 4}px">${hp}</div>`
      );
      $(".atk").html(
        `Attack <div class="bar" style="width: ${
          (atk / 2.55) * 4
        }px">${atk}</div>`
      );
      $(".def").html(
        `Defense <div class="bar" style="width: ${
          (def / 2.55) * 4
        }px">${def}</div>`
      );
      $(".spAtk").html(
        `Sp. Attack <div class="bar" style="width: ${
          (spAtk / 2.55) * 4
        }px">${spAtk}</div>`
      );
      $(".spDef").html(
        `Sp. Defense <div class="bar" style="width: ${
          (spDef / 2.55) * 4
        }px">${spDef}</div>`
      );
      $(".spd").html(
        `Speed <div class="bar" style="width: ${
          (spd / 2.55) * 4
        }px">${spd}</div>`
      );
      $(".bst").html(
        `Total <div class="bar orange" style="width: ${
          (bst / 2.55) * 1.2
        }px">${bst}</div>`
      );
      $(".height").html((data.height / 3.048).toFixed() + "'");
      $(".weight").html((data.weight / 4.536).toFixed() + " lbs.");
      $(".types").html("");
      $(".abilities").html("");
      for (let t = 0; t <= data.types.length; t++) {
        // iterates through all the given Pokémon's types
        $(".types").append(
          `<div class="icon ${
            data.types[t].type.name
          }"><img src="${localStorage.getItem("types")}/icons/${
            data.types[t].type.name
          }.svg"></div>`
        );
      }
      p = data.id;
      document.querySelector("#autoComplete").value = "";
    });

  // iterates through all the given Pokémon's abilities
  fetch("https://pokeapi.co/api/v2/pokemon/" + s)
    .then((response) => response.json())
    .then((data) => {
      for (let a = 0; a <= data.abilities.length; a++) {
        if (data.abilities[a].is_hidden === true) {
          $(".abilities").append(
            `<br><a target="_blank" title="View ${data.abilities[
              a
            ].ability.name.replace(
              "-",
              " "
            )} on Smogon" href="https://www.smogon.com/dex/sv/abilities/${
              data.abilities[a].ability.name
            }"><span style="font-weight: 900">(H) </span>${data.abilities[
              a
            ].ability.name.replace("-", " ")}</a>`
          );
        } else {
          $(".abilities").append(
            `<br><a target="_blank" title="View ${data.abilities[
              a
            ].ability.name.replace(
              "-",
              " "
            )} on Smogon" href="https://www.smogon.com/dex/sv/abilities/${
              data.abilities[a].ability.name
            }">${data.abilities[a].ability.name.replace("-", " ")}</a>`
          );
        }
      }
    });

  fetch("https://pokeapi.co/api/v2/pokeon/" + s)
    .then((response) => response.json())
    .then((data) => {
      $(".moves").html("");
      for (let h = 0; h < 4; h++) {
        let r = Math.floor(Math.random() * data.moves.length);
        fetch(data.moves[r].move.url)
          .then((moveR) => moveR.json())
          .then((move) => {
            $(".moves").append(`
        <li class="move ${move.type.name}">
          <div class="icon ${move.type.name}">
              <img src="https://duiker101.github.io/pokemon-type-svg-icons/icons/${
                move.type.name
              }.svg">
          </div>
          <h2>${move.name.replace("-", " ")}</h2>
          <p><span>Power: ${
            move.power
          } </span><span> <img src="https://raw.githubusercontent.com/Wither19/dex/main/${
              move.damage_class.name
            }.png"></span><span>Accuracy: ${move.accuracy}</span></p>
          <p><span style="text-transform: none !important">${
            move.effect_entries[0].short_effect
          }</span></p>
        </li>`);
          });
      }
    });

  // Fetches the Pokémon species endpoint for p and iterates through its Pokédex entries to find the most recent English entry
  fetch("https://pokeapi.co/api/v2/pokemon-species/" + s)
    .then((response) => response.json())
    .then((data) => {
      for (let f = 0; f <= data.flavor_text_entries.length; f++) {
        let fLang = data.flavor_text_entries[f].language.name.lastIndexOf("en");
        if (fLang === 0) {
          $(".lore").html(
            `<span style="font-style: italic;">"${
              data.flavor_text_entries[f].flavor_text
            }"</span><br><br><sub style="text-transform: capitalize;">Pokémon ${data.flavor_text_entries[
              f
            ].version.name.replace("-", " ")}</sub>`
          );
        }
      }
    });

  // Finds the English genus
  fetch("https://pokeapi.co/api/v2/pokemon-species/" + s)
    .then((response) => response.json())
    .then((data) => {
      for (let g = 0; g <= data.genera.length; g++) {
        let gLang = data.genera[g].language.name.indexOf("en");
        if (gLang === 0) {
          $(".genus").html(`${data.genera[g].genus}`);
        }
      }
    });

  // loads all the different forms for a Pokémon
  fetch("https://pokeapi.co/api/v2/pokeon-species/" + s)
    .then((response) => response.json())
    .then((data) => {
      $(".varieties").html("");
      for (let v = 0; v < data.varieties.length; v++) {
        fetch(data.varieties[v + 1].pokemon.url)
          .then((vResponse) => vResponse.json())
          .then((v) => {
            $(".varieties").append(
              `<div>
              <img src="${
                v.sprites.other[localStorage.getItem("art")].front_default
              }">
              <br>
              <h3>${v.name
                .replace("-mega", " (Mega)")
                .replace("-primal", " (Primal)")
                .replace("-gmax", " (G-Max)")
                .replace("-alola", " (Alolan)")
                .replace("-galar", " (Galarian)")
                .replace("-hisui", " (Hisuian)")
                .replace("-paldea", " (Paldean)")
                .replace("-10-power-construct", " (10%)")
                .replace("-50-power-construct", " (50%)")
                .replace("-complete", " (Complete)")}</h3>
              </div>`
            );
          });
      }
    });
  if (p >= 10001) {
    $(".genus").html("");
    $(".lore").html("");
    $(".varieties").html("");
  }
  p = data.id;
}

function reloadMoves() {
  fetch("https://pokeapi.co/api/v2/pokemon/" + s)
    .then((response) => response.json())
    .then((data) => {
      $(".moves").html("");
      for (let h = 0; h < 4; h++) {
        let r = Math.floor(Math.random() * data.moves.length);
        fetch(data.moves[r].move.url)
          .then((moveR) => moveR.json())
          .then((move) => {
            $(".moves").append(`
        <li class="move ${move.type.name}">
          <div class="icon ${move.type.name}">
              <img src="https://duiker101.github.io/pokemon-type-svg-icons/icons/${
                move.type.name
              }.svg">
          </div>
          <h2>${move.name.replace("-", " ")}</h2>
          <p><span>Power: ${
            move.power
          } </span><span> <img src="https://raw.githubusercontent.com/Wither19/dex/main/${
              move.damage_class.name
            }.png"></span><span>Accuracy: ${move.accuracy}</span></p>
          <p><span style="text-transform: none !important">${
            move.effect_entries[0].short_effect
          }</span></p>
        </li>`);
          });
      }
    });
}

$(".optButton").click(function () {
  $(".options").toggleClass("hide");
});

$("dexButton").click(function () {
  $("container").toggleClass("hide");
});

$(".options > *").click(function inputUpdate() {
  pkmnLoad();
  fetch(`https://pokeapi.co/api/v2/pokemon/${localStorage.getItem("pkmn")}`)
    .then((response) => response.json())
    .then((data) => {
      $(".textarea").html(`
    Default Pokémon: #${localStorage.getItem(
      "pkmn"
    )} - <span style="text-transform: capitalize;">${data.name}</span><br>
    Artwork: ${localStorage.getItem("art-notif")}<br>
    Type Icons: ${localStorage.getItem("type-notif")}
  `);
    });
});

$("#ok").click(function () {
  $(".options").toggleClass("hide");
});

$("#of").click(function () {
  localStorage.setItem("art", "official-artwork");
  localStorage.setItem("art-notif", "Ken Sugimori");
});

$("#ho").click(function () {
  localStorage.setItem("art", "home");
  localStorage.setItem("art-notif", "Pokémon HOME");
});

$("#pogo").click(function () {
  localStorage.setItem(
    "types",
    "https://duiker101.github.io/pokemon-type-svg-icons"
  );
  localStorage.setItem("type-notif", "POGO Icons");
});

$("#bdsp").click(function () {
  localStorage.setItem(
    "types",
    "https://raw.githubusercontent.com/partywhale/pokemon-type-icons/fcbe6978c61c359680bc07636c3f9bdc0f346b43"
  );
  localStorage.setItem("type-notif", "BDSP Icons");
});

$(".surprise").click(function () {
  p = Math.floor(Math.random() * 1025 + 1);
  pkmnLoad();
});

$(".art, .shinyButton").click(function () {
  $("img.art").toggleClass("hide");
});

$("body").keydown(function (e) {
  if (e.which == 13) {
    s = document.querySelector("#autoComplete").value;
    pkmnLoadFromSearch();
  } else if (e.key == "r" && e.altKey) {
    p = Math.floor(Math.random() * 1025 + 1);
    pkmnLoad();
    e.stopPropagation();
  } else if (e.key == "p" && e.altKey) {
    $(".container").toggleClass("hide");
    pkmnLoad();
    e.stopPropagation();
  } else if (e.key == "s" && e.altKey) {
    $("img.art").toggleClass("hide");
    e.stopPropagation();
  } else if (e.key == "l" && e.altKey) {
    reloadMoves();
    e.stopPropagation();
  } else if (e.key == "ArrowLeft" && e.altKey) {
    e.stopPropagation();
    e.preventDefault();
    p--;
    pkmnLoad();
  } else if (e.key == "ArrowRight" && e.altKey) {
    e.stopPropagation();
    e.preventDefault();
    p++;
    pkmnLoad();
  } else if (e.key == "ArrowUp" && e.altKey) {
    e.stopPropagation();
    e.preventDefault();
    p -= 3;
    pkmnLoad();
  } else if (e.key == "ArrowDown" && e.altKey) {
    e.stopPropagation();
    e.preventDefault();
    p += 3;
    pkmnLoad();
  } else if (e.key == "l" && e.altKey) {
    e.stopPropagation();
    reloadMoves();
  } else if (e.key == "v" && e.altKey) {
    e.stopPropagation();
    p = 10001;
    pkmnLoad();
  } else if (e.key == "c" && e.altKey) {
    e.stopPropagation();
    let start = prompt(
      "Type in the National Pokédex Number for the Pokémon you want to see on startup."
    );
    localStorage.setItem("pkmn", start);
    inputUpdate();
  } else if (e.key == "o" && e.altKey) {
    $(".options").toggleClass("hide");
  }
});

$("#autoComplete").autocomplete({
  source: dex,
});

$(".ui-autocomplete").click(function () {
  s = document.querySelector("#autoComplete").value;
  pkmnLoadFromSearch();
});
