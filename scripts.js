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
          "https://raw.githubusercontent.com/wither19/pokerogue/main/public/images/pokemon/icons/" +
          i +
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
  // Called when a Pokémon is manually selected
  p = event.currentTarget.id;
  $("#cry").attr(
    "src",
    `https://github.com/PokeAPI/cries/raw/main/cries/pokemon/latest/${data.id}.ogg`
  );
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

      if (data.id < 10) {
        $("h1 span").html(
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
            .replace("-complete", " (Complete)")
            .replace("iron-", "iron ")}`
        );
      } else if (data.id >= 10 && data.id < 100) {
        $("h1 span").html(
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
            .replace("-complete", " (Complete)")
            .replace("iron-", "iron ")}`
        );
      } else if (data.id > 10000) {
        $("h1 span").html(
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
            .replace("-complete", " (Complete)")
            .replace("iron-", "iron ")}`
        );
      } else {
        $("h1 span").html(
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
            .replace("-complete", " (Complete)")
            .replace("iron-", "iron ")}`
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

      $("img.spriteImg.reg").attr(
        "src",
        `https://raw.githubusercontent.com/wither19/pokerogue/main/public/images/pokemon/icons/${data.id}.png`
      );

      $("img.spriteImg.shiny").attr(
        "src",
        `https://raw.githubusercontent.com/wither19/pokerogue/main/public/images/pokemon/icons/${data.id}s.png`
      );

      $(".hp").html(
        `HP <div class="bar" style="width: ${(hp / 2.55) * 3}px">${hp}</div>`
      );
      $(".atk").html(
        `Attack <div class="bar" style="width: ${
          (atk / 2.55) * 3
        }px">${atk}</div>`
      );
      $(".def").html(
        `Defense <div class="bar" style="width: ${
          (def / 2.55) * 3
        }px">${def}</div>`
      );
      $(".spAtk").html(
        `Sp. Attack <div class="bar" style="width: ${
          (spAtk / 2.55) * 3
        }px">${spAtk}</div>`
      );
      $(".spDef").html(
        `Sp. Defense <div class="bar" style="width: ${
          (spDef / 2.55) * 3
        }px">${spDef}</div>`
      );
      $(".spd").html(
        `Speed <div class="bar" style="width: ${
          (spd / 2.55) * 3
        }px">${spd}</div>`
      );
      $(".bst").html(
        `Total <div class="bar orange" style="width: ${
          (bst / 2.55) * 1.2
        }px">${bst}</div>`
      );
      $(".height").html(
        `${Math.floor((data.height * 3.937) / 12)}'${(
          (data.height * 3.937) %
          12
        ).toFixed()}" <sub>(${data.height / 10} m)</sub>`
      );
      $(".weight").html(
        (data.weight / 4.536).toFixed() +
          " lbs. <sub>(" +
          (data.weight / 10).toFixed(1) +
          " kg)</sub>"
      );
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
      fetch(
        "https://raw.githubusercontent.com/pkmn/ps/main/dex/data/abilities.json"
      )
        .then((abi) => abi.json())
        .then((ab) => {
          for (let a = 0; a <= data.abilities.length; a++) {
            if (data.abilities[a].is_hidden === true) {
              $(".abilities").append(
                `<br><a target="_blank" href="https://www.smogon.com/dex/sv/abilities/${
                  data.abilities[a].ability.name
                }"><span style="font-weight: 900">(H) </span>${data.abilities[
                  a
                ].ability.name.replace("-", " ")}</a>`
              );
            } else {
              $(".abilities").append(
                `<br><a target="_blank" href="https://www.smogon.com/dex/sv/abilities/${
                  data.abilities[a].ability.name
                }">${data.abilities[a].ability.name.replace("-", " ")}</a>`
              );
            }
          }
        });
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
  if (p >= 10001) {
    $(".genus").html("");
    $(".lore").html("");
    $(".varieties").html("");
  }

  // Fetches the Pokémon's competitive metagame
  fetch("https://pokeapi.co/api/v2/pokemon/" + p)
    .then((response) => response.json())
    .then((data) => {
      fetch(
        "https://raw.githubusercontent.com/pkmn/ps/main/dex/data/formats-data.json"
      )
        .then((response) => response.json())
        .then((t) => {
          $(".tier").html(t["9"][data.name.replace("-", "")].tier);
        });
    });

  // Fetches gender ratio
  fetch("https://pokeapi.co/api/v2/pokemon-species/" + p)
    .then((response) => response.json())
    .then((data) => {
      if (data.gender_rate === -1) {
        $(".genderRatio").css({
          background: "lime",
        });
        $(".genderNotif").html(
          '<span style="color: #82d98c">Genderless</span>'
        );
      } else if (data.gender_rate === 0) {
        $(".genderRatio").css({
          background: "#0061ff",
        });
        $(".genderNotif").html('<span style="color: #0061ff;">All Male</span>');
      } else if (data.gender_rate === 8) {
        $(".genderRatio").css({
          background: "#fd2dde",
        });
        $(".genderNotif").html(
          '<span style="color: #fd2dde;">All Female</span>'
        );
      } else {
        let adjustedGR = (data.gender_rate - 8) * -1 * 12.5;
        $(".genderRatio").css({
          background: `linear-gradient(90deg, #0061ff ${adjustedGR}%, #fd2dde ${
            adjustedGR + 4
          }%)`,
        });
        $(".genderNotif").html(
          `<span style="color: #0061ff;">${adjustedGR}% </span> <span>/</span> <span style="color: #fd2dde;">${
            100 - adjustedGR
          }%</span>`
        );
      }
    });
  // Fetches the Pokémon species endpoint for p and iterates through its Pokédex entries to find the most recent English entry
  fetch("https://pokeapi.co/api/v2/pokemon-species/" + p)
    .then((response) => response.json())
    .then((data) => {
      const english = data.flavor_text_entries.findLast(
        (entry) => entry.language.name === "en"
      );
      $(".lore").html(english.flavor_text);
    });

  // Iterates through names to display the Japanese name
  fetch("https://pokeapi.co/api/v2/pokemon-species/" + p)
    .then((response) => response.json())
    .then((data) => {
      const japanese = data.names.findLast(
        (jp) => jp.language.name === "ja-Hrkt"
      );
      $(".jp").html(jp.name);
    });
}

function pkmnLoadFromSearch() {
  fetch("https://pokeapi.co/api/v2/pokemon/" + s)
    .then((response) => response.json())
    .then((data) => {
      p = data.id;
      $("#cry").attr(
        "src",
        `https://github.com/PokeAPI/cries/raw/main/cries/pokemon/latest/${data.id}.ogg`
      );
      document.querySelector("#autoComplete").value = "";
      const hp = data.stats[0].base_stat;
      const atk = data.stats[1].base_stat;
      const def = data.stats[2].base_stat;
      const spAtk = data.stats[3].base_stat;
      const spDef = data.stats[4].base_stat;
      const spd = data.stats[5].base_stat;
      const bst = hp + atk + def + spAtk + spDef + spd;

      if (data.id < 10) {
        $("h1 span").html(
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
            .replace("-complete", " (Complete)")
            .replace("iron-", "iron ")}`
        );
      } else if (data.id >= 10 && data.id < 100) {
        $("h1 span").html(
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
            .replace("-complete", " (Complete)")
            .replace("iron-", "iron ")}`
        );
      } else if (data.id > 10000) {
        $("h1 span").html(
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
            .replace("-complete", " (Complete)")
            .replace("iron-", "iron ")}`
        );
        $(".genus").html("");
        $(".lore").html("");
      } else {
        $("h1 span").html(
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
            .replace("-complete", " (Complete)")
            .replace("iron-", "iron ")}`
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

      $("img.spriteImg.reg").attr(
        "src",
        `https://raw.githubusercontent.com/wither19/pokerogue/main/public/images/pokemon/icons/${data.id}.png`
      );

      $("img.spriteImg.shiny").attr(
        "src",
        `https://raw.githubusercontent.com/wither19/pokerogue/main/public/images/pokemon/icons/${data.id}s.png`
      );

      $(".hp").html(
        `HP <div class="bar" style="width: ${(hp / 2.55) * 3}px">${hp}</div>`
      );
      $(".atk").html(
        `Attack <div class="bar" style="width: ${
          (atk / 2.55) * 3
        }px">${atk}</div>`
      );
      $(".def").html(
        `Defense <div class="bar" style="width: ${
          (def / 2.55) * 3
        }px">${def}</div>`
      );
      $(".spAtk").html(
        `Sp. Attack <div class="bar" style="width: ${
          (spAtk / 2.55) * 3
        }px">${spAtk}</div>`
      );
      $(".spDef").html(
        `Sp. Defense <div class="bar" style="width: ${
          (spDef / 2.55) * 3
        }px">${spDef}</div>`
      );
      $(".spd").html(
        `Speed <div class="bar" style="width: ${
          (spd / 2.55) * 3
        }px">${spd}</div>`
      );
      $(".bst").html(
        `Total <div class="bar orange" style="width: ${
          (bst / 2.55) * 1.2
        }px">${bst}</div>`
      );
      $(".height").html(
        `${Math.floor((data.height * 3.937) / 12)}'${(
          (data.height * 3.937) %
          12
        ).toFixed()}" <sub>(${data.height / 10} m)</sub>`
      );
      $(".weight").html(
        (data.weight / 4.536).toFixed() +
          " lbs. <sub>(" +
          (data.weight / 10).toFixed(1) +
          " kg)</sub>"
      );
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
  if (p >= 10001) {
    $(".genus").html("");
    $(".lore").html("");
    $(".varieties").html("");
  }
  fetch(
    "https://raw.githubusercontent.com/pkmn/ps/main/dex/data/formats-data.json"
  )
    .then((response) => response.json())
    .then((t) => {
      $(".tier").html(t["9"][s.replace("-", "")].tier);
    });

  fetch("https://pokeapi.co/api/v2/pokemon-species/" + s)
    .then((response) => response.json())
    .then((data) => {
      if (data.gender_rate === -1) {
        $(".genderRatio").css({
          background: "lime",
        });
        $(".genderNotif").html(
          '<span style="color: #82d98c">Genderless</span>'
        );
      } else if (data.gender_rate === 0) {
        $(".genderRatio").css({
          background: "#0061ff",
        });
        $(".genderNotif").html('<span style="color: #0061ff;">All Male</span>');
      } else if (data.gender_rate === 8) {
        $(".genderRatio").css({
          background: "#fd2dde",
        });
        $(".genderNotif").html(
          '<span style="color: #fd2dde;">All Female</span>'
        );
      } else {
        let adjustedGR = (data.gender_rate - 8) * -1 * 12.5;
        $(".genderRatio").css({
          background: `linear-gradient(90deg, #0061ff ${adjustedGR}%, #fd2dde ${
            adjustedGR + 4
          }%)`,
        });
        $(".genderNotif").html(
          `<span style="color: #0061ff;">${adjustedGR}% </span> <span>/</span> <span style="color: #fd2dde;">${
            100 - adjustedGR
          }%</span>`
        );
      }
    });

  fetch("https://pokeapi.co/api/v2/pokemon-species/" + s)
    .then((response) => response.json())
    .then((data) => {
      const japanese = data.names.findLast(
        (jp) => jp.language.name === "ja-Hrkt"
      );
      $(".jp").html(jp.name);
    });

  // Fetches the Pokémon species endpoint for s and iterates through its Pokédex entries to find the most recent English entry
  fetch("https://pokeapi.co/api/v2/pokemon-species/" + s)
    .then((response) => response.json())
    .then((data) => {
      const english = data.flavor_text_entries.findLast(
        (entry) => entry.language.name === "en"
      );
      $(".lore").html(english.flavor_text);
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
  $("img.spriteImg").toggleClass("hide");
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
    $("img.spriteImg").toggleClass("hide");
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
